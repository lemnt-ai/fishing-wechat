@echo off
REM 钓鱼小游戏 - 资源生成工具安装脚本 (Windows)
REM 使用方法：双击运行或在命令行执行 tools\install-dependencies.bat

echo ==================================
echo 钓鱼小游戏 - 资源生成工具安装
echo ==================================
echo.

REM 检查 Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] 未检测到 Node.js
    echo.
    echo 请先安装 Node.js: https://nodejs.org/
    echo 建议安装 LTS 版本
    pause
    exit /b 1
)

echo [OK] Node.js 已安装
node -v
echo.

REM 检查 npm
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] 未检测到 npm
    echo.
    echo 请确保 Node.js 正确安装
    pause
    exit /b 1
)

echo [OK] npm 已安装
npm -v
echo.

REM 切换到脚本所在目录
cd /d "%~dp0"

REM 检查 package.json
if not exist "package.json" (
    echo [ERROR] 未找到 package.json
    echo 请确保在正确的目录运行此脚本
    pause
    exit /b 1
)

REM 清理旧的 node_modules（可选）
if exist "node_modules" (
    echo [INFO] 发现旧的 node_modules
    set /p CLEANUP="是否删除旧的 node_modules? (y/n): "
    if /i "%CLEANUP%"=="y" (
        echo [INFO] 删除旧的依赖...
        rmdir /s /q node_modules
        if exist "package-lock.json" del package-lock.json
        echo [OK] 已清理
        echo.
    )
)

REM 安装依赖
echo [INFO] 正在安装 npm 包...
echo.

REM 使用淘宝镜像加速（可选）
echo [TIP] 使用淘宝镜像加速安装
npm config set registry https://registry.npmmirror.com

npm install

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] npm install 失败
    echo.
    echo 常见问题解决：
    echo 1. 以管理员身份运行此脚本
    echo 2. 检查网络连接
    echo 3. 尝试清理缓存：npm cache clean --force
    echo 4. 手动安装：npm install canvas wav
    pause
    exit /b 1
)

echo.
echo [OK] npm 包安装完成
echo.

REM 验证安装
echo [INFO] 验证安装...
node -e "require('canvas')" 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [WARNING] canvas 包可能安装失败
    echo.
    echo 在 Windows 上安装 canvas 需要额外步骤：
    echo 1. 安装 GTK+ 3.0: https://github.com/tschoonj/GTK-for-Windows-Runtime-Environment-Installer
    echo 2. 或安装 node-gyp: npm install --global windows-build-tools
    echo 3. 或使用预编译版本：npm install canvas --build-from-source
    echo.
    echo 如果只需要测试，可以使用 PlaceholderCreator 方案（无需 canvas）
    echo 详见：QUICK_PLACEHOLDERS.md
    pause
    exit /b 1
)

echo [OK] canvas 包验证成功
echo.

echo ==================================
echo 安装完成！
echo ==================================
echo.
echo 使用方法：
echo.
echo   生成所有资源（美术 + 音效）
echo     npm run generate:all
echo.
echo   只生成美术资源
echo     npm run generate:assets
echo.
echo   只生成音效
echo     npm run generate:audio
echo.
echo 生成的资源位置：
echo   - 美术资源：..\assets\textures\
echo   - 音效资源：..\assets\audio\sfx\
echo.
echo 下一步：
echo   1. 运行生成脚本生成资源
echo   2. 在 Cocos Creator 中导入资源
echo   3. 搭建场景并测试游戏
echo.

pause
