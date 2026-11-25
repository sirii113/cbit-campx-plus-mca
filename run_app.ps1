Set-Location -Path $PSScriptRoot
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "  Starting CBIT CampX+ MCA Autonomous R-25 Web Portal...  " -ForegroundColor Green
Write-Host "========================================================" -ForegroundColor Cyan

if (-not (Test-Path "dist")) {
    Write-Host "Building production package..." -ForegroundColor Yellow
    npm run build
}

Write-Host "Launching web browser to http://localhost:5001..." -ForegroundColor Yellow
Start-Process "http://localhost:5001"
node server.js
