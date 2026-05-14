@echo off
title Buxoro Maktabi
cd /d "C:\Users\hackz\Desktop\Buxoro-Maktabi"

echo ========================================
echo   BUXORO MAKTABI - Ishga tushirish
echo ========================================
echo.
echo [1/2] Backend server ishga tushmoqda...
cd /d "C:\Users\hackz\Desktop\Buxoro-Maktabi\server"
start "Backend" cmd /c "node index.js & pause"
timeout /t 3 /nobreak >nul

echo [2/2] Frontend server ishga tushmoqda...
cd /d "C:\Users\hackz\Desktop\Buxoro-Maktabi"
start "Frontend" cmd /c "pnpm --filter @workspace/buxoro-maktabi run dev & pause"

echo.
echo ========================================
echo   ✅  IKKALA SERVER ISHGA TUSHDI
echo ========================================
echo.
echo   Frontend: http://localhost:5173
echo   Backend:  http://localhost:4000
echo   Bot:      @BuxoroMaktabi_EDU777_bot
echo.
echo ========================================
echo.
pause
