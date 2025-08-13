# uniapp 项目模板

## 项目介绍

基于 uniapp 开发的项目模板，集成了`@uni-helper/vite-plugin-uni-layouts`、`@uni-helper/vite-plugin-uni-pages`、`uni-mini-router`、`wot-design-uni`等插件。

[Uni Helper 官方插件地址](https://uni-helper.js.org/)

配置菜单、全局样式等文件请在`pages.config.ts`文件中配置，会自动生成到`pages.json`文件中。

`uni-mini-router`插件使用请看[这里](https://moonofweisheng.github.io/uni-mini-router/),[gtihub](https://github.com/Moonofweisheng/uni-mini-router)

## 功能模块

## 技术栈

## 项目结构


uni
├─ .gitignore
├─ eslint.config.mjs
├─ index.html
├─ package.json
├─ pages.config.ts
├─ pnpm-lock.yaml
├─ README.md
├─ tsconfig.json
├─ vite.config.ts
├─ src
│  ├─ App.vue
│  ├─ main.ts
│  ├─ manifest.json
│  ├─ pages.json
│  ├─ uni.scss
│  ├─ types
│  │  ├─ env.d.ts
│  │  ├─ shime-uni.d.ts
│  │  └─ uni-pages.d.ts
│  ├─ static
│  │  └─ logo.png
│  ├─ router
│  │  └─ index.ts
│  ├─ pages
│  │  ├─ progress
│  │  │  └─ index.vue
│  │  ├─ my
│  │  │  └─ index.vue
│  │  ├─ index
│  │  │  └─ index.vue
│  │  └─ clock
│  │     └─ index.vue
│  ├─ layouts
│  │  ├─ default.vue
│  │  └─ tabbar.vue
│  ├─ composables
│  │  └─ useTabbar.ts
│  └─ common
│     └─ server.ts

```

```
