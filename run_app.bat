@echo off
title CBIT CampX+ MCA R-25 Autonomous Portal
echo ========================================================
echo   Starting CBIT CampX+ MCA Autonomous R-25 Web Portal...
echo ========================================================
cd /d "%~dp0"

if not exist "dist" (
    echo Building production package...
    call npm run build
)

echo.
echo Server is starting... Opening browser to http://localhost:5001
echo If port 5001 is not used on your machine, check the terminal window below for the active port.
echo.
timeout /t 2 /nobreak >nul
start http://localhost:5001
node server.js
pause
