# FancyStudioLua 开发文档

## 下载代码

```
cd mydir
git clone https://github.com/plainliu/FancyStudioLua
cd FancyStudioLua
```

## 运行

本地环境

- node

- VSCode 编辑器 版本1.43及以上

用 VSCode 编辑器打开 `mydir\FancyStudioLua`

安装依赖
```
# Terminal
ctrl + shift + `
npm i
```

运行

```
# Building, compile the client and server
ctrl + shift + B

# Debug viewlet
ctrl + shift + D

# 选择
# 调试客户端
Launch Client
# 调试服务端
Attach to Server

# Run
F5

[Extension Development Host]
```

重启[Extension Development Host]

```
ctrl + shift + P

Reload Window
```

## 目录结构

```
.
├── client                  // 插件客户端
│   ├── src
│   │   ├── test            // 测试
│   │   └── extension.ts    // 客户端入口
├── package.json            // 插件配置
└── server                  // 插件服务端
    └── src
        └── server.ts       // 服务端入口
```