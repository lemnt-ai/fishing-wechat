#!/bin/bash

# 启动 Cocos Creator 3.8.8

COOS_PATH="/Applications/Cocos/Creator/3.8.8/CocosCreator.app"

if [ -d "$COOS_PATH" ]; then
    echo "🚀 启动 Cocos Creator 3.8.8..."
    open "$COOS_PATH"
else
    echo "❌ Cocos Creator 未找到"
    echo "安装位置：$COOS_PATH"
    exit 1
fi
