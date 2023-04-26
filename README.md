# SwitchHosts

## 技术栈

- 底层: Tauri + Rust, Utools
- UI: Vite + Vue3

## 架构图

![img](./public/switchHostsR.png)

## 开发

- 本项目采用 `pnpm` 作为包管理器, 请使用最新 pnpm，vite4.x + vue3 作为 UI 层
- `./src/plugins/Bridge/index.ts` 作为 `Bridge` 桥方法的包装
