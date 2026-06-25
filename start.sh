#!/bin/bash

# Bakery Website Startup Script for macOS/Linux

echo "========================================"
echo "Bakery Website Startup"
echo "========================================"
echo ""

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check Node.js installed
if ! command_exists node; then
    echo "❌ Node.js not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check npm installed
if ! command_exists npm; then
    echo "❌ npm not installed. Please install Node.js first."
    exit 1
fi

# Install Backend dependencies if needed
if [ ! -d "Backend/node_modules" ]; then
    echo "[1/5] Installing Backend dependencies..."
    cd Backend
    npm install
    cd ..
else
    echo "[1/5] Backend dependencies already installed (skipped)"
fi

# Install Frontend dependencies if needed
if [ ! -d "Frontend/node_modules" ]; then
    echo "[2/5] Installing Frontend dependencies..."
    cd Frontend
    npm install
    cd ..
else
    echo "[2/5] Frontend dependencies already installed (skipped)"
fi

# Check if database is seeded
echo "[3/5] Checking if database is seeded..."
cd Backend
node seed.js
cd ..

# Start backend
echo "[4/5] Starting Backend server (port 5000)..."
cd Backend
npm start &
BACKEND_PID=$!
cd ..

# Give backend time to start
sleep 2

# Start frontend
echo "[5/5] Starting Frontend dev server (port 5173)..."
cd Frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "========================================"
echo "✓ Both servers started!"
echo "========================================"
echo ""
echo "Frontend: http://localhost:5173"
echo "Backend:  http://localhost:5000"
echo ""
echo "Backend PID: $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"
echo ""
echo "To stop both servers, run:"
echo "  kill $BACKEND_PID $FRONTEND_PID"
echo ""

# Wait for background processes
wait
