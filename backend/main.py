from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from controllers import client_controller
from core.auto_migrate import create_tables, sync_columns
import os

os.makedirs("qrcodes/local", exist_ok=True)
os.makedirs("qrcodes/remote", exist_ok=True)

app = FastAPI(
    title="CSF Version 2",
    description="Refactored version optimized",
    version="2.0.0"
)

app.mount("/qrcodes/local", StaticFiles(directory="qrcodes/local"), name="qrcodes_local")
app.mount("/qrcodes/remote", StaticFiles(directory="qrcodes/remote"), name="qrcodes_remote")

@app.on_event("startup")
def startup_event():
    print("Creating tables...")
    create_tables()
    print("Syncing database columns...")
    sync_columns()
    print("Database sync complete!")

app.add_middleware(
    CORSMiddleware,
    # allow_origins=["http://192.168.3.104"],
    allow_origins=["http://localhost:5173","http://192.168.3.104"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(client_controller.router)
