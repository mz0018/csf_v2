from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from starlette.types import Scope, Receive, Send
import os
import hashlib

from controllers import client_controller
from controllers import hr_controller


class CacheControlStaticFiles(StaticFiles):
    """Static files with caching headers for QR code images"""
    
    async def get_response(self, path: str, scope: Scope):
        response = await super().get_response(path, scope)
        if response:
            response.headers["Cache-Control"] = "public, max-age=31536000, immutable"
            if self.directory and path:
                file_path = os.path.join(str(self.directory), path)
                if os.path.exists(file_path):
                    stat = os.stat(file_path)
                    etag_value = hashlib.md5(
                        f"{file_path}:{stat.st_mtime}:{stat.st_size}".encode()
                    ).hexdigest()
                    response.headers["ETag"] = f'"{etag_value}"'
        return response


os.makedirs("qrcodes/local", exist_ok=True)
os.makedirs("qrcodes/remote", exist_ok=True)

app = FastAPI(
    title="CSF Version 2",
    description="Refactored version optimized",
    version="2.0.0"
)

app.mount("/qrcodes/local", CacheControlStaticFiles(directory="qrcodes/local"), name="qrcodes_local")
app.mount("/qrcodes/remote", CacheControlStaticFiles(directory="qrcodes/remote"), name="qrcodes_remote")

app.add_middleware(
    CORSMiddleware,
    # allow_origins=["http://192.168.3.104"],
    allow_origins=["http://localhost:5173","http://192.168.3.104"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(client_controller.router)
app.include_router(hr_controller.router)
