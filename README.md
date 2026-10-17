# Smart Parking — Machine Learning Project

A starter monorepo for a Smart Parking student project with React + TypeScript frontend, FastAPI backend, MySQL, ML notebooks/scripts, and Docker Compose.

## Architecture
- **Frontend:** React, TypeScript, Vite, Tailwind CSS, Recharts
- **Backend:** FastAPI, SQLAlchemy, PyMySQL
- **Database:** MySQL 8
- **ML:** scikit-learn, OpenCV, pandas, NumPy
- **Containers:** Docker Compose

## Quick start (Docker)
1. Install Docker Desktop and start it.
2. Copy `.env.example` to `.env`.
3. Run:
   ```bash
   docker compose up --build
   ```
4. Open:
   - Frontend: http://localhost:5173
   - API docs: http://localhost:8000/docs
   - Health check: http://localhost:8000/health
   - MySQL: localhost:3306

Stop:
```bash
docker compose down
```
Remove containers and database volume (this deletes stored DB data):
```bash
docker compose down -v
```

## Run without Docker
Backend:
```bash
cd backend
python -m venv .venv
# Windows PowerShell: .\.venv\Scripts\Activate.ps1
# macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```
Frontend:
```bash
cd frontend
npm install
npm run dev -- --host 0.0.0.0
```

## Team workflow (4 people, same repository)
Keep one repository and one folder structure. Each person owns a feature area and can work independently using mock data/API contracts:
1. Parking-space occupancy detection (`ml/notebooks/02_parking_detection.ipynb`, `ml/src/detection/`)
2. Vehicle / license-plate recognition (`ml/src/classification/`, `ml/src/recognition/`)
3. Parking-demand forecasting (`ml/notebooks/04_parking_prediction.ipynb`, `ml/src/prediction/`)
4. Dashboard, analytics, API integration (`frontend/src/pages/`, `backend/app/api/v1/endpoints/`)
Agree on API response schemas before integration. Use mock data until APIs are ready.

## Project structure
```text
frontend/       React app
backend/        FastAPI API + database integration
ml/             notebooks, reusable ML modules, datasets and results
database/       MySQL initialization SQL
docs/           report, diagrams, screenshots, presentation
scripts/        helper scripts
docker-compose.yml
```

## Notes
- This is a starter scaffold, not a finished ML model. The frontend currently uses demo/mock data.
- Do not commit `.env`, real credentials, large datasets, or private user data.
- The app includes a basic health endpoint and demo dashboard; implement actual ML workflows as your team develops them.
