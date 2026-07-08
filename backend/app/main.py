from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.auth import router as auth_router
from app.api.complaint import router as complaint_router
from app.api.upload import router as upload_router
from app.api.ai import router as ai_router
from app.api.dashboard import router as dashboard_router
from app.api.admin import router as admin_router
from app.db.database import Base, engine
from app.db import base
from fastapi.staticfiles import StaticFiles
import os

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="JanMitra AI Backend",
    version="1.0.0"
)

# ── CORS ──────────────────────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:3001",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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
app.include_router(admin_router)


@app.get("/")
async def root():
    return {
        "message": "JanMitra AI Backend Running"
    }