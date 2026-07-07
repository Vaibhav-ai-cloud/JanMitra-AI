from fastapi import FastAPI
from app.api.auth import router as auth_router
from app.api.complaint import router as complaint_router
from app.api.upload import router as upload_router
from app.api.ai import router as ai_router
from app.api.dashboard import router as dashboard_router
from app.db.database import Base, engine
from app.db import base
from fastapi.staticfiles import StaticFiles
import os

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="JanMitra AI Backend",
    version="1.0.0"
)

# Create uploads folder if it doesn't exist
os.makedirs("app/uploads", exist_ok=True)

# Serve uploaded files
app.mount(
    "/uploads",
    StaticFiles(directory="app/uploads"),
    name="uploads"
)

app.include_router(auth_router)
app.include_router(complaint_router)
app.include_router(upload_router)
app.include_router(ai_router)
app.include_router(dashboard_router)

@app.get("/")
async def root():
    return {
        "message": "JanMitra AI Backend Running"
    }