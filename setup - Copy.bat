@echo off
REM EventHub Quick Start Script for Windows

echo.
echo ============================================
echo   EventHub - Quick Start Setup
echo ============================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo Please download and install Node.js from https://nodejs.org
    pause
    exit /b 1
)

echo [✓] Node.js detected: 
node --version

REM Check if PostgreSQL is running
echo.
echo [*] Checking PostgreSQL connection...
net start | find /i "PostgreSQL" >nul
if errorlevel 1 (
    echo WARNING: PostgreSQL service not found
    echo Make sure PostgreSQL is installed and running
    echo.
)

REM Install dependencies
echo.
echo [*] Installing backend dependencies...
cd backend
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install backend dependencies
    pause
    exit /b 1
)
echo [✓] Backend dependencies installed

echo.
echo [*] Installing frontend dependencies...
cd ..\frontend
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install frontend dependencies
    pause
    exit /b 1
)
echo [✓] Frontend dependencies installed

cd ..

REM Database setup instructions
echo.
echo ============================================
echo   Database Setup Instructions
echo ============================================
echo.
echo Before running the application:
echo.
echo 1. Start PostgreSQL service
echo 2. Create database:
echo    psql -U postgres
echo    CREATE DATABASE eventhub_db;
echo    \q
echo.
echo 3. Initialize schema:
echo    psql -U postgres -d eventhub_db -f database\schema.sql
echo.
echo 4. Update .env file in backend folder with:
echo    DATABASE_URL=postgresql://postgres:postgres@localhost:5432/eventhub_db
echo.

REM Check if .env exists
if not exist "backend\.env" (
    echo [!] Creating .env file...
    (
        echo # Database Configuration
        echo DATABASE_URL=postgresql://postgres:postgres@localhost:5432/eventhub_db
        echo NODE_ENV=development
        echo.
        echo # Server Configuration
        echo PORT=3000
        echo HOST=127.0.0.1
        echo.
        echo # JWT Secret
        echo JWT_SECRET=your_jwt_secret_key_change_this_in_production_12345
        echo.
        echo # OTP Configuration
        echo OTP_SECRET=your_otp_secret_key_12345
    ) > backend\.env
    echo [✓] .env file created in backend folder
)

echo.
echo ============================================
echo   Setup Complete!
echo ============================================
echo.
echo To start the application:
echo.
echo Option 1: Run backend and frontend in separate terminals
echo   Backend:  cd backend && npm start
echo   Frontend: cd frontend && npm start
echo.
echo Option 2: Run both simultaneously
echo   Press Enter to open two terminals and start both servers...
echo.

pause

REM Start backend in new terminal
start "EventHub Backend - http://localhost:3000" cmd /k "cd backend && npm start"

REM Wait a bit for backend to start
timeout /t 2 /nobreak

REM Start frontend in new terminal
start "EventHub Frontend - http://127.0.0.1:5050" cmd /k "cd frontend && npm start"

echo.
echo Servers are starting...
echo - Backend: http://127.0.0.1:3000
echo - Frontend: http://127.0.0.1:5050 (or another port if 5050 is in use)
echo.
echo Application will open shortly!
echo.

timeout /t 3 /nobreak

REM Try to open in browser
start http://127.0.0.1:5050

echo.
echo ============================================
echo   Application Ready!
echo ============================================
echo.
echo Enjoy using EventHub!
echo.

pause
