@echo off
REM Bakery Website Startup Script for Windows

echo ========================================
echo Bakery Website Startup
echo ========================================

REM Check if Backend node_modules exist
if not exist "Backend\node_modules" (
    echo [1/5] Installing Backend dependencies...
    cd Backend
    call npm install
    cd ..
) else (
    echo [1/5] Backend dependencies already installed (skipped)
)

REM Check if Frontend node_modules exist
if not exist "Frontend\node_modules" (
    echo [2/5] Installing Frontend dependencies...
    cd Frontend
    call npm install
    cd ..
) else (
    echo [2/5] Frontend dependencies already installed (skipped)
)

REM Check if database is seeded
echo [3/5] Checking if database is seeded...
cd Backend
node seed.js
cd ..

REM Start backend in new window
echo [4/5] Starting Backend server (port 5000)...
start "Bakery Backend Server" cmd /k "cd Backend && npm start"

REM Wait a bit for backend to start
timeout /t 3 /nobreak

REM Start frontend in new window
echo [5/5] Starting Frontend dev server (port 5173)...
start "Bakery Frontend Server" cmd /k "cd Frontend && npm run dev"

echo ========================================
echo ✓ Both servers started in new windows!
echo ========================================
echo.
echo Frontend: http://localhost:5173
echo Backend:  http://localhost:5000
echo.
echo Close either window to stop that server.
echo Press any key in this window to exit.
pause
