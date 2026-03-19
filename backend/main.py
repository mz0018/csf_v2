from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from controllers import client_controller

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://192.168.3.104"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(client_controller.router)