# FancyStudioLua

FancyStudioLua 是能够为 FancyStudio Lua 开发提供智能帮助的 VSCode 插件。

[开发文档](DevelopDoc.md)

持续扩展功能中……

## 安装 (Install)

1. 通过vsix安装

2. VSCode插件市场

    通过VSCode扩展中搜索FancyStudioLua安装

## 功能 (Features)

- [x] F3D 代码格式检查
- [x] F3D 引擎API提示
- [ ] F3D 常用代码段插入
- [ ] Lua 语法检查

## 更新说明 (Release Notes)

### 1.2.1

- 修复 `/` 后缺少空格诊断信息缺失的问题

- 优化客户端API提词
    - `:` 只提示方法

- 更新API版本
    - 至 develop-v28250 (20200828)

### 1.2.0

- 新增引擎客户端API提词功能
    - 默认打开，可在设置中关闭(Settings -> FancyStudioLua -> is Provide F3d API)
    - API对应的引擎版本为：develop-v27791 (20200722)
    - `.` 和 `:` 触发API属性方法提示； `_` 触发API提示

### 1.1.0

- 支持单行代码后加tab分割的注释；

- 修复注释中的单个引号影响字符串检查的问题；

- 优化文件关闭后的诊断信息显示。

### 1.0.0

- 优化注释和字符串的处理，提高定位准确度；

- 正式发布。

### 0.1.0

- 发布VSCode插件FancyStudioLua，提供以F3D的lua检查规则检查lua的功能，通过配置中开关可打开关闭；

- 测试发布。

## 引用 (References)

F3D-lua检查规则

VSCode-client

VSCode-server