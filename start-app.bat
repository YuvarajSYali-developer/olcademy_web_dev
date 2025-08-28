@echo off
echo ========================================
echo    PERFUME SHOP APPLICATION
echo ========================================
echo.

echo 🔧 Checking prerequisites...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed or not in PATH
    echo 💡 Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ npm is not installed or not in PATH
    echo 💡 Please install Node.js (npm comes with it)
    pause
    exit /b 1
)

echo ✅ Node.js and npm found
echo.

echo 📦 Installing dependencies...
echo.
echo Installing backend dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install backend dependencies
    pause
    exit /b 1
)

echo.
echo Installing frontend dependencies...
cd ../frontend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install frontend dependencies
    pause
    exit /b 1
)

cd ..
echo ✅ All dependencies installed successfully!
echo.

echo 🚀 Starting Perfume Shop Application...
echo.

echo Starting Backend Server...
start "Backend Server" cmd /k "cd backend && npm run dev"

echo Waiting for backend to start...
timeout /t 5 /nobreak > nul

echo Starting Frontend Server...
start "Frontend Server" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================
echo 🎉 Application is starting up!
echo ========================================
echo.
echo 📊 Backend: http://localhost:5000
echo 🌐 Frontend: http://localhost:5173
echo 🔍 Health Check: http://localhost:5000/api/health
echo.
echo 💡 The frontend will open automatically in your browser
echo 💡 If it doesn't, manually visit: http://localhost:5173
echo.
echo ⚠️  Note: If you see warnings about MongoDB, that's normal!
echo    The app will work with demo data.
echo.
echo Press any key to close this window...
pause > nul
