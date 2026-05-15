@echo off
title Buxoro Maktabi
cd /d "C:\Users\hackz\Desktop\Buxoro-Maktabi"

echo ========================================
echo   BUXORO MAKTABI - Ishga tushirish
echo ========================================
echo.

echo [1/2] Frontend build...
cd /d "C:\Users\hackz\Desktop\Buxoro-Maktabi"
pnpm --filter @workspace/buxoro-maktabi run build
if %errorlevel% neq 0 (
  echo Frontend build xatosi!
  pause
  exit /b
)

echo [2/2] Backend server ishga tushmoqda...
cd /d "C:\Users\hackz\Desktop\Buxoro-Maktabi\server"
node index.js

pause
