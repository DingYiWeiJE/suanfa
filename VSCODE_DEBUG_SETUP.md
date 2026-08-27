# VSCode 调试环境搭建指南（Vue3 + Vite）

本文档记录如何从 0 搭建本项目的 VSCode 断点调试环境，目标：在 VSCode 里对 `.vue` / `.ts` 文件打断点，能在自己「日常使用、已登录」的 Chrome 里命中，而不是每次弹出一个陌生的空白浏览器窗口。

---

## 1. 为什么普通配置行不通

### 1.1 Vue SFC 断点为什么容易失效

Vite 会把 `xxx.vue` 拆成多个虚拟模块（如 `xxx.vue?vue&type=script&setup=true&lang=ts`），浏览器里加载的 URL 带 query 参数。VSCode 调试器要靠 `sourceMapPathOverrides` / `webRoot` 把浏览器里的模块路径映射回本地磁盘上的源文件，如果映射规则写得不对，断点会一直是空心灰色圆（Unbound Breakpoint），或者调试器根本连不上对应文件。

### 1.2 为什么不能直接用「日常 Chrome」调试

VSCode 的 Chrome 调试本质是通过 **Chrome DevTools Protocol** 连接一个开了 `--remote-debugging-port` 的 Chrome 实例。但 Chrome 从 v127 左右开始加了安全限制：

> 如果 `--remote-debugging-port` 遇到的是**默认用户目录**（也就是你日常登录着邮箱、密码的那个 profile），Chrome 会**静默禁用**调试端口，防止其他进程窃取隐私数据。

也就是说：
- 直接用默认 profile 启动调试 → 端口不会真正监听，attach 会失败。
- 唯一可行方案：**用一个独立的、但持久保留登录状态的 Chrome 用户目录**专门做调试。第一次在这个目录里登录一次账号，以后就一直是登录态，跟"临时空白窗口"完全不同。

---

## 2. 最终方案总览

三个文件配合工作：

| 文件 | 作用 |
|---|---|
| `.vscode/tasks.json` | 定义两个任务：启动 vite dev server；用调试参数打开专用 Chrome |
| `.vscode/launch.json` | 定义调试配置：attach 到已打开的 Chrome（推荐日常用）；或临时 launch 一个新窗口（备用） |
| `.vscode/chrome-debug-profile/` | 专用 Chrome 用户数据目录，登录状态持久保存在这里，**不提交到 git** |

---

## 3. 具体搭建步骤

### 3.1 创建 `.vscode/tasks.json`

```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "vite:dev",
            "type": "npm",
            "script": "dev",
            "isBackground": true,
            "presentation": {
                "reveal": "silent",
                "panel": "dedicated",
                "clear": true
            },
            "problemMatcher": {
                "owner": "vite",
                "pattern": {
                    "regexp": "___________________________________"
                },
                "background": {
                    "activeOnStart": true,
                    "beginsPattern": "VITE v",
                    "endsPattern": "Local:"
                }
            }
        },
        {
            "label": "chrome:daily-debug",
            "type": "shell",
            "command": "open -a 'Google Chrome' --args --user-data-dir='${workspaceFolder}/.vscode/chrome-debug-profile' --remote-debugging-port=9222",
            "presentation": {
                "reveal": "silent",
                "panel": "dedicated"
            },
            "problemMatcher": []
        }
    ]
}
```

- `vite:dev`：后台跑 `npm run dev`，`problemMatcher.background` 里的 `beginsPattern`/`endsPattern` 让 VSCode 知道 vite 何时算「启动完成」，配合 `preLaunchTask` 使用时不会卡住。
- `chrome:daily-debug`：用 `--user-data-dir` 指向项目内一个专用目录（不是系统默认目录），并开启 `--remote-debugging-port=9222`。

### 3.2 创建 `.vscode/launch.json`

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "chrome",
            "request": "attach",
            "name": "附加到日常调试浏览器 (推荐)",
            "port": 9222,
            "url": "http://localhost:3000/*",
            "webRoot": "${workspaceFolder}",
            "preLaunchTask": "vite:dev"
        },
        {
            "type": "chrome",
            "request": "launch",
            "name": "启动 Chrome 调试 (临时窗口)",
            "url": "http://localhost:3000",
            "webRoot": "${workspaceFolder}",
            "preLaunchTask": "vite:dev",
            "sourceMaps": true,
            "userDataDir": "${workspaceFolder}/.vscode/chrome-debug-profile"
        },
        {
            "type": "node",
            "request": "launch",
            "name": "调试 Vitest 当前文件",
            "program": "${workspaceFolder}/node_modules/vitest/vitest.mjs",
            "args": ["run", "${relativeFile}"],
            "cwd": "${workspaceFolder}",
            "console": "integratedTerminal",
            "smartStep": true,
            "skipFiles": ["<node_internals>/**", "**/node_modules/**"]
        },
        {
            "type": "node",
            "request": "launch",
            "name": "调试 Vitest 全部测试",
            "program": "${workspaceFolder}/node_modules/vitest/vitest.mjs",
            "args": ["run"],
            "cwd": "${workspaceFolder}",
            "console": "integratedTerminal",
            "smartStep": true,
            "skipFiles": ["<node_internals>/**", "**/node_modules/**"]
        }
    ]
}
```

要点：
- **「附加到日常调试浏览器」用 `request: attach`**，连接到已经用 `chrome:daily-debug` 任务打开的 Chrome（端口 9222），这样断点命中的是你登录着账号的那个专用调试 Chrome，不是空白窗口。
- **「启动 Chrome 调试 (临时窗口)」用 `request: launch`**，`userDataDir` 也指向同一个专用目录，作为备用方式（比如 attach 失败时可以直接用这个一键启动+调试）。
- 两个 Chrome 配置都加了 `preLaunchTask: vite:dev`，F5 时会自动先跑 dev server，不用手动开终端。
- `webRoot` 用 `${workspaceFolder}`（整个项目根目录）而不是 `src`，配合 Vite/Vue 默认的 source map 就足够定位到源文件，不需要手写复杂的 `sourceMapPathOverrides`。
- 额外带了两个 Vitest 的 Node 调试配置，方便调试单测。

### 3.3 更新 `.gitignore`

这些是纯本机个人配置，不应该提交，团队每个人的路径、端口习惯可能不同：

```gitignore
# 本地debugger的配置文件， 不应该上传
*/launch.json
*/tasks.json
.vscode/chrome-debug-profile/
```

---

## 4. 日常使用流程

### 首次使用（登录一次账号）

1. VSCode 里 `⇧⌘P` → `Tasks: Run Task` → 选 `chrome:daily-debug`。
2. 会弹出一个新的 Chrome 窗口（专用 profile，一开始是空的，未登录）。
3. 在这个窗口里登录你需要的账号（邮箱、公司账号等）。登录状态会保存在 `.vscode/chrome-debug-profile/` 里，**以后一直有效**，不用重复登录。

### 之后每次调试

1. 确保专用调试 Chrome 是打开的（同上，跑 `chrome:daily-debug` 任务；如果这个 Chrome 窗口一直没关，可以跳过这步）。
2. VSCode 左侧「运行和调试」面板，选择 **「附加到日常调试浏览器 (推荐)」**，按 F5。
   - 会自动先跑 `vite:dev`（如果 dev server 已经在跑，会直接复用）。
   - 然后 attach 到 9222 端口的 Chrome。
3. 在专用调试 Chrome 里打开 `http://localhost:3000`（如果没自动跳转）。
4. 在 `.vue` 或 `.ts` 文件里打断点，触发对应逻辑即可命中。

---

## 5. 常见问题排查

### 5.1 断点是空心灰色圆，没变成红色实心

- 大概率是**调试会话还没启动**，或者**这个模块还没被浏览器加载**。启动调试、让页面跑到对应代码后，断点会自动变红。这是正常现象，不是 bug。
- 如果启动调试后仍然是灰色，检查 `webRoot` 和 `sourceMaps` 配置，以及浏览器 DevTools 里 Sources 面板能不能看到对应源文件。

### 5.2 `<template>` 里写的表达式/行内函数断点打不上

这是 Vue 模板编译器的产物，不是配置问题。把逻辑抽到 `<script setup>` 里的具名函数，在函数体里打断点即可稳定命中。

### 5.3 Attach 失败，提示连不上 9222 端口

按顺序排查：

```bash
# 1. 确认 9222 端口有没有被监听
lsof -iTCP:9222 -sTCP:LISTEN

# 2. 确认专用调试 Chrome 是不是用普通方式打开的（缺少调试参数）
ps aux | grep "Google Chrome" | grep -v grep
```

最常见的原因：**从 Dock / Spotlight 直接点开了 Chrome 图标**，那样打开的是不带调试参数的普通实例，即使窗口看起来一样，9222 也不会监听。

修复：完全退出 Chrome，再通过 VSCode 的 `chrome:daily-debug` 任务（或对应的终端命令）重新打开：

```bash
# 完全退出 Chrome
osascript -e 'quit app "Google Chrome"'

# 用调试参数重新打开（复用已登录的专用 profile，不会丢登录状态）
open -a "Google Chrome" --args \
  --user-data-dir="$(pwd)/.vscode/chrome-debug-profile" \
  --remote-debugging-port=9222
```

### 5.4 为什么不能直接用日常主 Chrome，之前登录状态是不是丢了

不会丢。专用调试 Chrome 用的是**完全独立**的用户数据目录（`.vscode/chrome-debug-profile/`），跟你日常主 Chrome 的登录状态、书签、扩展没有任何关系，两者互不影响，可以同时开着。之所以不能直接用日常主 Chrome，是 Chrome 官方对默认 profile 加了远程调试端口的安全限制（见第 1.2 节），没有绕过的办法。

### 5.5 换了新电脑 / 想从 0 重新搭建

按第 3 节的三个文件重新创建即可，是完全独立于代码仓库的本机配置（已被 `.gitignore` 排除）。专用 Chrome 首次使用需要重新登录一次账号。
