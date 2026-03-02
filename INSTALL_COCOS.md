# 🚀 快速启动指南

## ✅ 已安装

**Cocos Creator 3.8.8** 已安装在：
```
/Applications/Cocos/Creator/3.8.8/CocosCreator.app
```

---

## 🎯 快速启动（3 种方法）

### 方法 1：使用启动脚本 ⚡

```bash
cd /Users/wangxx/nanobot/workspace/games/fishing-wechat
./tools/start-cocos.sh
```

---

### 方法 2：命令行启动 🖥️

```bash
open /Applications/Cocos/Creator/3.8.8/CocosCreator.app
```

---

### 方法 3：手动启动 🖱️

1. 打开 **访达 (Finder)**
2. 进入 `/Applications/Cocos/Creator/3.8.8/`
3. 双击 `CocosCreator.app`

---

## 📂 导入项目

启动 Cocos Creator 后：

1. **点击 "打开其他项目"**
   - 或者：**文件** → **打开其他项目**

2. **选择项目路径**
   ```
   /Users/wangxx/nanobot/workspace/games/fishing-wechat
   ```

3. **点击 "打开"**

4. **等待资源导入**
   - ⏱️ 首次导入需要 1-2 分钟
   - Cocos Creator 会自动：
     - 创建 `library/` 缓存目录
     - 导入所有资源文件
     - 编译 TypeScript 脚本
     - 生成类型声明

5. **验证导入成功**
   - ✅ 资源管理器显示所有文件
   - ✅ 可以打开 `assets/scenes/game.scene`
   - ✅ 控制台没有错误

---

## 🎮 开始开发

导入成功后：

1. **打开场景**
   - 双击 `assets/scenes/game.scene`

2. **查看场景结构**
   - 检查是否有 Canvas、GameManager 等节点
   - 如果没有，参考 `SCENE_SETUP_GUIDE.md` 创建

3. **运行预览**
   - 点击工具栏的 **▶️ 播放** 按钮
   - 测试游戏功能

4. **调试**
   - 查看 **控制台** 面板
   - 检查是否有错误信息

---

## 📋 项目配置

项目已配置为使用 **Cocos Creator 3.8.8**

**project.json**：
```json
{
  "version": "3.8.8",
  "engine": "cocos-creator-js",
  "name": "fishing-wechat",
  "displayName": "钓鱼微信小游戏"
}
```

---

## 🔧 常见问题

### Q: 提示"项目版本不匹配"
**A**: 
- 项目配置为 3.8.8，与你安装的版本一致
- 如果提示不匹配，选择 **"升级项目"** 或 **"使用兼容模式"**

### Q: 资源导入很慢
**A**: 
- 首次导入需要编译所有资源，正常现象
- 等待进度条完成即可
- 后续打开会快很多

### Q: 场景文件缺失
**A**: 
- 检查 `assets/scenes/game.scene` 是否存在
- 如果不存在，参考 `SCENE_SETUP_GUIDE.md` 创建

### Q: 脚本编译错误
**A**: 
- 确保 TypeScript 配置正确
- 在 Cocos Creator 中：**项目** → **重新生成 TypeScript 配置**
- 或手动删除 `temp/` 目录后重新打开项目

---

## 📚 相关文档

- **SCENE_SETUP_GUIDE.md** - 场景搭建详细指南
- **GAME_MECHANICS.md** - 游戏机制说明
- **DEVELOPMENT_PLAN.md** - 开发计划
- **QUICK_START.md** - 快速开始指南
- **ASSETS_IMPORT_GUIDE.md** - 资源导入指南
- **EDITOR_SETUP.md** - 编辑器设置和故障排除

---

## 🎯 下一步

1. ✅ 启动 Cocos Creator
2. ✅ 导入项目
3. 📝 阅读 `SCENE_SETUP_GUIDE.md`
4. 🎨 搭建游戏场景
5. ▶️ 运行测试

---

**准备好开始了吗？**

```bash
./tools/start-cocos.sh
```

🎮 祝你开发愉快！
