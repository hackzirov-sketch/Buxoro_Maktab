@echo off
title Buxoro Maktabi
cd /d "C:\Users\hackz\Desktop\Buxoro-Maktabi"

echo ========================================
echo   BUXORO MAKTABI
echo ========================================
echo.

:: Frontend build
echo Frontend build qilinmoqda...
cd /d "C:\Users\hackz\Desktop\Buxoro-Maktabi\artifacts\buxoro-maktabi"
call npm run build 2>&1
echo.

:: Backend server ni ishga tushirish
echo Backend server ishga tushmoqda...
cd /d "C:\Users\hackz\Desktop\Buxoro-Maktabi\server"

:: .env fayli borligini tekshirish
if not exist .env (
  echo .
  echo .env fayli topilmadi! Bot ishlamaydi.
  echo Bot token va Chat ID ni .env fayliga yozing.
  echo.
)

node index.js

pause
