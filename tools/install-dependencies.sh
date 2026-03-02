#!/bin/bash

# 钓鱼小游戏 - 资源生成工具安装脚本
# 使用方法：bash tools/install-dependencies.sh

set -e  # 遇到错误立即退出

echo "🎨 钓鱼小游戏 - 资源生成工具安装"
echo "=================================="
echo ""

# 检测操作系统
OS=$(uname -s)
echo "📱 检测到操作系统：$OS"
echo ""

# 安装系统依赖
if [ "$OS" = "Darwin" ]; then
    echo "🍺 正在安装 macOS 系统依赖..."
    
    # 检查 Homebrew
    if ! command -v brew &> /dev/null; then
        echo "❌ 未检测到 Homebrew，请先安装 Homebrew："
        echo "   /bin/bash -c \"\$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\""
        exit 1
    fi
    
    echo "✅ Homebrew 已安装"
    echo ""
    
    # 安装依赖
    echo "📦 安装系统依赖包..."
    brew install pkg-config cairo pango libpng jpeg giflib librsvg
    
elif [ "$OS" = "Linux" ]; then
    echo "🐧 正在安装 Linux 系统依赖..."
    
    # 检测包管理器
    if command -v apt-get &> /dev/null; then
        echo "📦 使用 apt-get 安装依赖..."
        sudo apt-get update
        sudo apt-get install -y libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev pkg-config
        
    elif command -v yum &> /dev/null; then
        echo "📦 使用 yum 安装依赖..."
        sudo yum install -y cairo-devel pango-devel libpng-devel libjpeg-devel giflib-devel librsvg2-devel pkgconfig
        
    elif command -v dnf &> /dev/null; then
        echo "📦 使用 dnf 安装依赖..."
        sudo dnf install -y cairo-devel pango-devel libpng-devel libjpeg-devel giflib-devel librsvg2-devel pkgconfig
    else
        echo "❌ 未检测到支持的包管理器（apt-get/yum/dnf）"
        exit 1
    fi
else
    echo "⚠️  不支持的操作系统：$OS"
    exit 1
fi

echo ""
echo "✅ 系统依赖安装完成"
echo ""

# 安装 npm 依赖
echo "📦 安装 npm 包..."
cd "$(dirname "$0")"

if [ ! -f "package.json" ]; then
    echo "❌ 未找到 package.json，请确保在正确的目录运行此脚本"
    exit 1
fi

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo "❌ 未检测到 Node.js，请先安装 Node.js"
    exit 1
fi

NODE_VERSION=$(node -v)
echo "✅ Node.js 版本：$NODE_VERSION"
echo ""

# 清理旧的 node_modules（可选）
if [ -d "node_modules" ]; then
    echo "🧹 发现旧的 node_modules，是否删除？(y/n)"
    read -r response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        rm -rf node_modules package-lock.json
        echo "✅ 已清理旧的依赖"
    fi
fi

# 安装依赖
echo "📦 运行 npm install..."
npm install

echo ""
echo "✅ npm 包安装完成"
echo ""

# 验证安装
echo "🔍 验证安装..."
if node -e "require('canvas')" 2>/dev/null; then
    echo "✅ canvas 包安装成功"
else
    echo "⚠️  canvas 包可能安装失败，请检查上面的错误信息"
    echo ""
    echo "💡 常见问题解决："
    echo "   1. 确保系统依赖已正确安装"
    echo "   2. 尝试清理缓存：npm cache clean --force"
    echo "   3. 使用淘宝镜像：npm config set registry https://registry.npmmirror.com"
    echo "   4. 重新安装：rm -rf node_modules && npm install"
    exit 1
fi

echo ""
echo "=================================="
echo "🎉 安装完成！"
echo "=================================="
echo ""
echo "📝 使用方法："
echo ""
echo "   # 生成所有资源（美术 + 音效）"
echo "   npm run generate:all"
echo ""
echo "   # 只生成美术资源"
echo "   npm run generate:assets"
echo ""
echo "   # 只生成音效"
echo "   npm run generate:audio"
echo ""
echo "📁 生成的资源位置："
echo "   - 美术资源：../assets/textures/"
echo "   - 音效资源：../assets/audio/sfx/"
echo ""
echo "🎮 下一步："
echo "   1. 运行生成脚本生成资源"
echo "   2. 在 Cocos Creator 中导入资源"
echo "   3. 搭建场景并测试游戏"
echo ""
