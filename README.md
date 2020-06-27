# FancyStudioLua

FancyStudioLua 是能够为 FancyStudio Lua 开发提供智能帮助的 VSCode 插件。

正在开发阶段，尚未投入使用……

## 安装 (Install)

预期

1. 打包发送
2. 发布记录到github打tag
3. 发布到VSCode插件市场

通过VSCode插件搜索安装

## 功能 (Features)

- [ ] F3D 代码格式检查
- [ ] F3D 引擎API提示
- [ ] Lua 语法检查

## 更新说明 (Release Notes)

## 引用 (References)

VSCode-client

VSCode-server

luaFormatter https://github.com/Koihik/LuaFormatter

# FancyStudioLua

Init by LSP Example

Heavily documented sample code for https://code.visualstudio.com/api/language-extensions/language-server-extension-guide

## Functionality

This Language Server works for plain text file. It has the following language features:
- Completions
- Diagnostics regenerated on each file change or configuration change

It also includes an End-to-End test.

## Structure

```
.
├── client // Language Client
│   ├── src
│   │   ├── test // End to End tests for Language Client / Server
│   │   └── extension.ts // Language Client entry point
├── package.json // The extension manifest.
└── server // Language Server
    └── src
        └── server.ts // Language Server entry point
```

## Running the Sample

- Run `npm install` in this folder. This installs all necessary npm modules in both the client and server folder
- Open VS Code on this folder.
- Press Ctrl+Shift+B to compile the client and server.
- Switch to the Debug viewlet.
- Select `Launch Client` from the drop down.
- Run the launch config.
- If you want to debug the server as well use the launch configuration `Attach to Server`
- In the [Extension Development Host] instance of VSCode, open a document in 'plain text' language mode.
  - Type `j` or `t` to see `Javascript` and `TypeScript` completion.
  - Enter text content such as `AAA aaa BBB`. The extension will emit diagnostics for all words in all-uppercase.
