@echo off

REM 获取当前脚本所在的目录
set SCRIPT_DIR=%~dp0

REM 检查是否安装了 Node.js
node -v >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo 未检测到Node.js环境, 尝试使用Chocolatey安装...

    REM 检查是否安装了 Chocolatey
    choco -v >nul 2>&1
    if %ERRORLEVEL% neq 0 (
        echo 当前电脑未安装Chocolatey, 请手动安装后重试
        exit /b 1
    )

    choco install nodejs -y
    if %ERRORLEVEL% neq 0 (
        echo Node.js安装失败，请手动安装后重试
        exit /b 1
    )
)

REM 返回到上一层目录
cd /d %SCRIPT_DIR%..
echo 开始安装依赖...
yarn install --registry=https://registry.npm.taobao.org
if %ERRORLEVEL% neq 0 (
    echo 依赖安装失败，请检查网络连接或手动安装依赖
    exit /b 1
)

cd ..
echo 启动程序...

REM 本地开启服务
yarn start
if %ERRORLEVEL% neq 0 (
    echo 启动程序失败，请检查错误信息
    exit /b 1
)

REM 返回原始目录并退出
cd /d %SCRIPT_DIR%
exit /b 0
