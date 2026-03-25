from fastapi import APIRouter, Request
from fastapi.responses import FileResponse
import os

from services.qr_class import QRCode

router = APIRouter()

@router.get("/client")
def hello():
    return { "message": "Hello there, from backend!"}

@router.post("/save-feedback")
def save_feedback():
    return {"message": "Feedback saved"}

@router.get("/feedback")
def feedback():
    return {"message": "Install fucking postgres and finished this shit!"}

@router.get("/qrcodes")
def print_qrcodes():
    qr = QRCode()
    files = qr.generate_all_qrcode()
    return {
        "generated": len(files), "files": files}

@router.get("/qrOffices")
def get_qrcodes(request: Request):
    files = os.listdir("qrcodes")
    
    result = []

    for i, file in enumerate(files):
        result.append({
            "office_id": file.split("_")[0],
            "name": file.replace("_", " ").replace(".png", ""),
            "file": file,
            "url": f"{request.base_url}qrcodes/{file}"
        })
    return { "images": result }

# @router.get("/qrcode/{office_id}")
# def get_qrcode(office_id: str):
#     qr = QRCode()
#     for office_id_key, data in qr.offices.items():
#         if office_id_key == office_id:
#             safe_name = "".join(c if c.isalnum() else "_" for c in data["name"])
#             filename = os.path.join(qr.output_dir, f"{office_id}_{safe_name}.png")
#             if os.path.exists(filename):
#                 return FileResponse(filename, media_type="image/png")
#     return {"error": "Office not found"}