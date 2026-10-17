@echo off
echo Smart Parking setup helper
echo Ensure Docker Desktop is installed and running.
if not exist .env copy .env.example .env
docker compose up --build
