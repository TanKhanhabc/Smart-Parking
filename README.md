# Smart Parking — Machine Learning Project

A starter monorepo for a Smart Parking student project with React + TypeScript frontend, FastAPI backend, MySQL, and ML notebooks/scripts. The project runs directly on your computer without Docker.

## Architecture

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, Recharts
- **Backend:** FastAPI, SQLAlchemy, PyMySQL
- **Database:** MySQL 8
- **ML:** scikit-learn, OpenCV, pandas, NumPy
- **Environment:** Python virtual environment (`venv`) and Node.js/npm

## Prerequisites

Install the following software before running the project:

1. **Python 3.11 or a compatible version**
2. **Node.js LTS and npm**
3. **MySQL 8** or XAMPP with MySQL
4. **Git**
5. Visual Studio Code (recommended)

Check the installations:

```powershell
python --version
node --version
npm --version
git --version
```

If `python` is not recognized on Windows, install Python and enable **Add Python to PATH** during installation.

## Quick Start — Run Without Docker

### 1. Clone the repository

```powershell
git clone <YOUR_REPOSITORY_URL>
cd Smart-Parking
```

Replace `<YOUR_REPOSITORY_URL>` with your repository's actual URL. If you have already downloaded the source code, open its root folder directly.

### 2. Configure the environment

Create a `.env` file based on `.env.example` if the project provides one.

Configure the backend settings according to your local MySQL installation, including the database name, username, password, and port.

Do not commit `.env` or real credentials to Git.

### 3. Set up the database

1. Start MySQL using your local MySQL service or XAMPP.
2. Open MySQL Workbench or phpMyAdmin.
3. Create the database required by the project.
4. Execute the SQL initialization script in `database/` if one is provided.
5. Make sure the backend database connection settings match your MySQL configuration.

The default MySQL port is usually `3306`. If your local MySQL uses another port, update the configuration accordingly.

### 4. Run the backend

Open a terminal at the project root:

```powershell
cd backend
python -m venv .venv
```

Activate the virtual environment on Windows PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
```

Install the dependencies:

```powershell
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

Start the FastAPI server:

```powershell
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Backend endpoints:

- API documentation: http://localhost:8000/docs
- Health check: http://localhost:8000/health

Keep this terminal open while using the application.

### 5. Run the frontend

Open a **second terminal** at the project root:

```powershell
cd frontend
npm install
npm run dev
```

Open the URL printed by Vite, usually:

- Frontend: http://localhost:5173

Keep this terminal open while developing the frontend.

### 6. Run the Machine Learning code

The ML notebooks and scripts are located in `ml/`.

If the project has a separate `requirements.txt` for ML dependencies, create and activate a virtual environment for that folder, then install its requirements.

For example, from the project root:

```powershell
cd ml
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
```

If `ml/requirements.txt` does not exist, install the required libraries listed in the project documentation instead.

To use Jupyter Notebook:

```powershell
python -m pip install notebook
jupyter notebook
```

Run the notebooks available in `ml/notebooks/`.

## Team Workflow — 4 People, One Repository

Keep one shared Git repository and a consistent folder structure. Each member owns a feature area and can work independently using mock data and agreed API contracts.

1. **Member 1 — Parking-space occupancy detection**
   - `ml/notebooks/02_parking_detection.ipynb`
   - `ml/src/detection/`

2. **Member 2 — Vehicle and license-plate recognition**
   - `ml/src/classification/`
   - `ml/src/recognition/`

3. **Member 3 — Parking-demand forecasting**
   - `ml/notebooks/04_parking_prediction.ipynb`
   - `ml/src/prediction/`

4. **Member 4 — Dashboard, analytics, and API integration**
   - `frontend/src/pages/`
   - `backend/app/api/v1/endpoints/`

Agree on API request and response formats before integration. Use mock data while individual features are still being developed.

Recommended Git workflow:

1. Create a separate branch for each feature.
2. Commit changes regularly.
3. Push the branch to the shared repository.
4. Create a Pull Request or merge after reviewing the changes.
5. Test the integrated application before submitting the project.

## Project Structure

```text
Smart-Parking/
├── frontend/       React + TypeScript application
├── backend/        FastAPI application and database integration
├── ml/             Notebooks, ML modules, datasets and results
├── database/       MySQL initialization SQL
├── docs/           Reports, diagrams, screenshots and presentation
├── scripts/        Helper scripts
├── .env.example    Example environment configuration
├── .gitignore
└── README.md
```

## Notes

- This is a starter scaffold, not a finished ML model.
- The frontend currently uses demo/mock data. Actual API integration must be implemented and tested.
- Start MySQL before using backend features that require database access.
- Do not commit `.env`, real credentials, large datasets, or private user data.
- Run the frontend and backend in separate terminals.
- Docker is not required for development. The project can be configured for Docker later if needed.
