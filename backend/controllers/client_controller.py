from fastapi import APIRouter, Request
from fastapi.responses import FileResponse
from dotenv import load_dotenv
import os

load_dotenv()

from services.qr_class import QRCode

router = APIRouter()

BASE_URL_LOCAL = os.getenv("BASE_URL_LOCAL")
BASE_URL_REMOTE = os.getenv("BASE_URL_REMOTE")

@router.get("/client")
def hello():
    return { "message": "Hello there, from backend!"}

@router.post("/save-feedback")
def save_feedback():
    return {"message": "Feedback saved"}

@router.get("/feedback")
def feedback():
    return {"message": "Install fucking postgres and finished this shit!"}

@router.get("/qrcodes/local")
def generate_local_qrcodes():
    qr = QRCode()
    files = qr.generate_all_local()
    return { "generated": len(files), "files": files, "type": "local" }

@router.get("/qrcodes/remote")
def generate_remote_qrcodes():
    qr = QRCode()
    files = qr.generate_all_remote()
    return { "generated": len(files), "files": files, "type": "remote" }

@router.get("/qrOffices")
def get_qrcodes(request: Request):
    qr = QRCode()
    
    local_qrs = qr.get_all_qrcode("local")
    remote_qrs = qr.get_all_qrcode("remote")
    
    def build_result(qr_list, qr_type):
        result = []
        base_url = BASE_URL_LOCAL if qr_type == "local" else BASE_URL_REMOTE
        for item in qr_list:
            result.append({
                "office_id": item["office_id"],
                "name": item["name"],
                "file": item["file"],
                "url": f"{base_url}/qrcodes/{qr_type}/{os.path.basename(item['file'])}",
                "target_url": f"{base_url}/{item['office_id']}",
                "type": qr_type
            })
        return result
    
    return {
        "local": build_result(local_qrs, "local"),
        "remote": build_result(remote_qrs, "remote")
    }


@router.get("/office/{office_id}")
def get_specific_office(office_id: str):
    import json
    from pathlib import Path

    offices_file = Path(__file__).parent.parent / "offices.json"
    with open(offices_file, "r") as f:
        offices = json.load(f)

    office = offices.get(office_id)
    if office:
        return {
            "office_id": office_id,
            "name": office.get("name")
        }
    return { "error": "Office not found" }


# @router.get("/qrcode/{office_id}")
# def get_qrcode(office_id: str, request: Request, type: str = "local"):
#     qr = QRCode()
#     qr_list = qr.get_all_qrcode(type)

#     base_url = BASE_URL_LOCAL if type == "local" else BASE_URL_REMOTE
    
#     for item in qr_list:
#         if item["office_id"] == office_id:
#             return {
#                 "office_id": item["office_id"],
#                 "name": item["name"],
#                 "url": f"{base_url}/qrcodes/{type}/{os.path.basename(item['file'])}",
#                 "target_url": f"{base_url}/{office_id}",
#                 "type": type
#             }
    
#     return {"error": "Office not found"}

