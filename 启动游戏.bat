@echo off
chcp 65001 >nul 2>&1
title 育德优培冒险乐园 - 本地服务器
echo.
echo ═══════════════════════════════════════════
echo    育德优培冒险乐园 - 启动中...
echo ═══════════════════════════════════════════
echo.

cd /d "%~dp0"

:: 自动打开浏览器
start "" "http://localhost:8080/index.html"

:: 启动HTTP服务器
echo 服务器已启动！浏览器将自动打开。
echo 访问地址: http://localhost:8080/index.html
echo.
echo 关闭此窗口即可停止服务器。
echo.
"C:\Program Files\Python312\python.exe" -m http.server 8080 --bind 127.0.0.1

pause
