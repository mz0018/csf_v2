from fastapi import FastAPI
from controllers import client_controller

app = FastAPI()

app.include_router(client_controller.router)