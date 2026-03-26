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
        for item in qr_list:
            result.append({
                "office_id": item["office_id"],
                "name": item["name"],
                "file": item["file"],
                "url": f"{request.base_url}qrcodes/{qr_type}/{os.path.basename(item['file'])}",
                "target_url": item["url"],
                "type": qr_type
            })
        return result
    
    return {
        "local": build_result(local_qrs, "local"),
        "remote": build_result(remote_qrs, "remote")
    }

@router.get("/qrcode/{office_id}")
def get_qrcode(office_id: str, request: Request, type: str = "local"):
    qr = QRCode()
    qr_list = qr.get_all_qrcode(type)
    
    for item in qr_list:
        if item["office_id"] == office_id:
            return {
                "office_id": item["office_id"],
                "name": item["name"],
                "url": item["url"],
                "target_url": item["url"],
                "type": type
            }
    
    return {"error": "Office not found"}
