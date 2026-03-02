#!/bin/bash

# Cocos Creator 安装脚本 for macOS

echo "🎮 Cocos Creator 安装脚本"
echo "========================"
echo ""

# 检查系统
if [[ "$(uname)" != "Darwin" ]]; then
    echo "❌ 此脚本仅支持 macOS"
    exit 1
fi

echo "✅ 系统检查通过：macOS"
echo ""

# 检查是否已安装
if [ -d "/Applications/Cocos Creator.app" ]; then
    echo "✅ Cocos Creator 已安装"
    echo ""
    echo "安装位置：/Applications/Cocos Creator.app"
    echo ""
    read -p "是否要重新安装？(y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 0
    fi
fi

# 下载选项
echo ""
echo "请选择要安装的版本："
echo "1. Cocos Creator 3.8.3 (最新稳定版) - 推荐"
echo "2. Cocos Creator 3.8.0 (项目配置版本)"
echo "3. Cocos Creator 2.4.10 (经典版本)"
echo "4. 手动输入版本号"
echo ""
read -p "选择 [1-4]: " version_choice

case $version_choice in
    1)
        VERSION="3.8.3"
        ;;
    2)
        VERSION="3.8.0"
        ;;
    3)
        VERSION="2.4.10"
        ;;
    4)
        read -p "输入版本号 (例如 3.8.3): " VERSION
        ;;
    *)
        echo "❌ 无效选择"
        exit 1
        ;;
esac

echo ""
echo "📦 准备安装 Cocos Creator $VERSION"
echo ""

# 构建下载链接
# Cocos Creator 的下载链接格式
if [[ "$VERSION" == 2.* ]]; then
    # 2.x 版本
    DOWNLOAD_URL="https://download.cocos.com/CocosCreator/CocosCreator.$VERSION.dmg"
else
    # 3.x 版本
    DOWNLOAD_URL="https://download.cocos.com/CocosCreator/CocosCreator.$VERSION.dmg"
fi

echo "🔗 下载地址：$DOWNLOAD_URL"
echo ""

# 检查磁盘空间
AVAILABLE_SPACE=$(df -k / | tail -1 | awk '{print $4}')
REQUIRED_SPACE=$((3 * 1024 * 1024))  # 3GB

if [ $AVAILABLE_SPACE -lt $REQUIRED_SPACE ]; then
    echo "⚠️  警告：磁盘空间不足（需要至少 3GB）"
    read -p "是否继续？(y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# 下载
DOWNLOAD_DIR=~/Downloads
DMG_FILE="$DOWNLOAD_DIR/CocosCreator_$VERSION.dmg"

echo "📥 开始下载..."
echo "保存位置：$DMG_FILE"
echo ""

# 使用 curl 下载
curl -L -o "$DMG_FILE" "$DOWNLOAD_URL"

if [ $? -ne 0 ]; then
    echo ""
    echo "❌ 下载失败"
    echo ""
    echo "请手动下载："
    echo "1. 访问：https://www.cocos.com/creator"
    echo "2. 点击'下载'按钮"
    echo "3. 选择 macOS 版本"
    echo ""
    exit 1
fi

echo ""
echo "✅ 下载完成"
echo ""

# 验证文件大小
FILE_SIZE=$(ls -lh "$DMG_FILE" | awk '{print $5}')
echo "📊 文件大小：$FILE_SIZE"
echo ""

# 挂载 DMG
echo "💿 挂载 DMG 文件..."
hdiutil attach "$DMG_FILE" -mountpoint /Volumes/CocosCreator

if [ $? -ne 0 ]; then
    echo "❌ 挂载失败"
    exit 1
fi

echo "✅ 挂载成功"
echo ""

# 安装
echo "📲 正在安装到 Applications..."
cp -R /Volumes/CocosCreator/Cocos\ Creator.app /Applications/

if [ $? -ne 0 ]; then
    echo "❌ 安装失败"
    hdiutil detach /Volumes/CocosCreator
    exit 1
fi

echo "✅ 安装成功"
echo ""

# 卸载 DMG
hdiutil detach /Volumes/CocosCreator

# 设置权限
echo "🔧 设置权限..."
chmod -R 755 "/Applications/Cocos Creator.app"
chown -R $(whoami) "/Applications/Cocos Creator.app"

echo "✅ 权限设置完成"
echo ""

# 验证安装
if [ -d "/Applications/Cocos Creator.app" ]; then
    echo "🎉 安装完成！"
    echo ""
    echo "📍 安装位置：/Applications/Cocos Creator.app"
    echo ""
    echo "🚀 启动方法："
    echo "   1. 在 Applications 中双击 Cocos Creator"
    echo "   2. 或运行：open /Applications/Cocos\\ Creator.app"
    echo ""
    echo "📚 下一步："
    echo "   1. 打开 Cocos Creator"
    echo "   2. 点击'打开其他项目'"
    echo "   3. 选择：/Users/wangxx/nanobot/workspace/games/fishing-wechat"
    echo "   4. 开始开发！"
    echo ""
else
    echo "❌ 验证失败"
    exit 1
fi
