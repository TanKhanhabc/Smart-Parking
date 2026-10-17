import os
from datetime import datetime, timezone
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, text
from sqlalchemy.exc import SQLAlchemyError

app = FastAPI(
    title="Smart Parking API",
    description="API starter for the Smart Parking Machine Learning project.",
    version="0.1.0",
)

origins = os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in origins],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"service": "Smart Parking API", "docs": "/docs", "status": "ok"}

@app.get("/health")
def health():
    return {"status": "ok", "service": "smart-parking-api", "time": datetime.now(timezone.utc).isoformat()}

@app.get("/api/v1/dashboard")
def dashboard():
    # Demo data so the frontend can be developed before the ML/database modules are integrated.
    return {
        "mode": "demo",
        "total_slots": 36,
        "free_slots": 18,
        "occupied_slots": 14,
        "reserved_slots": 4,
        "today_vehicle_entries": 248,
        "occupancy_rate": 38.9,
    }

@app.get("/api/v1/parking/slots")
def parking_slots():
    statuses = ["occupied" if i % 3 == 0 else "reserved" if i % 11 == 0 else "free" for i in range(1, 37)]
    return {"mode": "demo", "items": [{"id": f"A-{i:02d}", "status": statuses[i-1]} for i in range(1, 37)]}

@app.get("/api/v1/analytics/occupancy")
def occupancy_analytics():
    return {
        "mode": "demo",
        "items": [
            {"time": "06:00", "value": 18}, {"time": "08:00", "value": 42},
            {"time": "10:00", "value": 68}, {"time": "12:00", "value": 57},
            {"time": "14:00", "value": 79}, {"time": "16:00", "value": 86},
            {"time": "18:00", "value": 71}, {"time": "20:00", "value": 38},
        ],
    }

@app.get("/api/v1/db-check")
def db_check():
    url = os.getenv("DATABASE_URL")
    if not url:
        return {"status": "not_configured", "message": "DATABASE_URL is not set"}
    try:
        engine = create_engine(url, pool_pre_ping=True)
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
        return {"status": "ok", "database": "connected"}
    except SQLAlchemyError as exc:
        return {"status": "error", "message": str(exc.__class__.__name__)}
