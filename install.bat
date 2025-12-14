@echo off
echo ========================================
echo Corporate To-Do Application Setup
echo ========================================
echo.

echo [1/6] Creating directory structure...
node create-backend.js
node create-frontend.js
node create-styles.js
node create-app-js.js
echo.

echo [2/6] Cleaning up setup files...
del create-backend.js
del create-frontend.js
del create-styles.js
del create-app-js.js
del setup-dirs.js
del setup.bat
echo.

echo [3/6] Installing dependencies...
call npm install
echo.

echo [4/6] Initializing database...
call npm run init-db
echo.

echo [5/6] Verifying installation...
if exist "public\index.html" (
    echo [OK] Frontend files created
) else (
    echo [ERROR] Frontend files missing
)
if exist "routes\auth.js" (
    echo [OK] Backend files created
) else (
    echo [ERROR] Backend files missing
)
if exist "database.db" (
    echo [OK] Database initialized
) else (
    echo [ERROR] Database not created
)
echo.

echo [6/6] Creating start script...
echo @echo off > start-server.bat
echo echo Starting Corporate To-Do Server... >> start-server.bat
echo echo. >> start-server.bat
echo echo Access the application at: http://localhost:3000 >> start-server.bat
echo echo. >> start-server.bat
echo echo Press Ctrl+C to stop the server >> start-server.bat
echo echo. >> start-server.bat
echo npm start >> start-server.bat
echo.

echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Demo Accounts:
echo - admin@company.com / password123
echo - john@company.com / password123
echo - jane@company.com / password123
echo - mike@company.com / password123
echo.
echo To start the server:
echo   Option 1: Double-click "start-server.bat"
echo   Option 2: Run "npm start"
echo.
echo Then open: http://localhost:3000
echo.
echo See INSTALL.txt for network deployment instructions
echo.
pause
