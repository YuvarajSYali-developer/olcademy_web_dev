@echo off
echo Checking MongoDB status...
sc query MongoDB | find "RUNNING" >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo MongoDB is already running.
) else (
    echo Starting MongoDB...
    net start MongoDB >nul 2>&1
    if %ERRORLEVEL% EQU 0 (
        echo MongoDB started successfully.
    ) else (
        echo Failed to start MongoDB. Please check if MongoDB is installed.
        echo You may need to install MongoDB first.
        pause
    )
)
pause
