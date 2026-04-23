from fastapi import APIRouter, Request, HTTPException
from fastapi.responses import JSONResponse
from services.hr_class import HR
from core.auth import set_auth_cookies, verify_token, clear_auth_cookies, get_token_from_request
from core.config import settings
from core.rate_limiter import rate_limit
from schemas.users_schema import UserCreate, SignInRequest

router = APIRouter()    


@router.post("/signup")
async def signup(data: UserCreate):
    hr = HR()
    result = hr.signup(data.model_dump())
    return result
 

@router.post("/signin")
@rate_limit("signin")
async def signin(request: Request, data: SignInRequest):
    hr = HR()
    result = hr.signin(data.model_dump())
    
    if not result["success"]:
        raise HTTPException(status_code=401, detail=result.get("error", "Invalid credentials"))
    
    response_data = {"success": True, "user": result["user"]}
    response = JSONResponse(content=response_data)
    response = set_auth_cookies(response, result["tokens"]["access_token"], result["tokens"]["refresh_token"])
    return response


@router.post("/signout")
async def signout():
    response = JSONResponse(content={"success": True})
    return clear_auth_cookies(response)


@router.get("/me")
async def get_current_user(request: Request):
    token = get_token_from_request(request, "access_token")
    if not token:
        return {"success": False, "error": "Not authenticated"}
    
    payload = verify_token(token, "access")
    if not payload:
        return {"success": False, "error": "Invalid token"}
    
    hr = HR()
    result = hr.get_user_by_id(int(payload["sub"]))
    return result


@router.post("/refresh")
async def refresh_token(request: Request):
    refresh_tk = get_token_from_request(request, "refresh_token")
    if not refresh_tk:
        return {"success": False, "error": "No refresh token"}
    
    payload = verify_token(refresh_tk, "refresh")
    if not payload:
        return {"success": False, "error": "Invalid refresh token"}
    
    hr = HR()
    result = hr.get_user_by_id(int(payload["sub"]))
    if not result["success"]:
        return result
    
    from core.auth import create_tokens
    tokens = create_tokens(result["user"])
    
    response_data = {"success": True, "user": result["user"]}
    response = JSONResponse(content=response_data)
    response = set_auth_cookies(response, tokens["access_token"], tokens["refresh_token"])
    return response