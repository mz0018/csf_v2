from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from controllers import client_controller

app = FastAPI(
    title="CSF Version 2",
    description="Refactored version optimized",
    version="2.0.0"
)

app.add_middleware(
    CORSMiddleware,
    # allow_origins=["http://192.168.3.104"],
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(client_controller.router)