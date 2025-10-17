<div align="center">

# UniApp 项目模板

<p align="center">
  <img src="https://img.shields.io/badge/UniApp-3.0+-blue.svg" alt="UniApp">
  <img src="https://img.shields.io/badge/Vue-3.5+-brightgreen.svg" alt="Vue">
  <img src="https://img.shields.io/badge/TypeScript-5.9+-blue.svg" alt="TypeScript">
  <img src="https://img.shields.io/badge/Vite-5.2+-646CFF.svg" alt="Vite">
  <img src="https://img.shields.io/badge/pnpm-7+-orange.svg" alt="pnpm">
</p>

<p align="center">
  基于 <strong>UniApp</strong> 开发的现代化项目模板，集成了多个优秀的开发插件和工具，提供开箱即用的开发体验。<br>
  本模板采用 <strong>TypeScript</strong> + <strong>Vite</strong> 技术栈，支持多端开发。
</p>

</div>

---

## ✨ 核心特性

- 🛠️ **现代化工具链**: 基于 Vite 构建，支持 HMR 热更新
- 📱 **多端支持**: 一套代码，多端运行（小程序、H5、APP）
- 🎨 **UI 组件库**: 集成 `wot-design-uni` 组件库
- 🧭 **智能路由**: 基于 `uni-mini-router` 的路由管理
- 📄 **自动配置**: 自动生成 `pages.json` 和 `manifest.json`
- 🏗️ **布局系统**: 支持多种页面布局模式
- 📦 **分包管理**: 支持主包和分包页面管理
- 🎨 **主题配置**: 支持主题定制和切换
- 🗃️ **状态管理**: 集成状态管理解决方案
- 💪 **TypeScript**: 完整的类型支持

## 🛠️ 技术栈

- **框架**: UniApp + Vue3
- **构建工具**: Vite
- **语言**: TypeScript
- **UI 组件**: wot-design-uni
- **路由**: uni-mini-router
- **代码规范**: ESLint

## 📦 核心插件

| 插件                                   | 功能描述               | 文档链接                                                  |
| -------------------------------------- | ---------------------- | --------------------------------------------------------- |
| `@uni-helper/vite-plugin-uni-layouts`  | 页面布局系统           | [文档](https://uni-helper.js.org/)                        |
| `@uni-helper/vite-plugin-uni-pages`    | 页面路由自动生成       | [文档](https://uni-helper.js.org/)                        |
| `@uni-helper/vite-plugin-uni-manifest` | manifest.json 自动生成 | [文档](https://uni-helper.js.org/)                        |
| `uni-mini-router`                      | 路由管理               | [文档](https://moonofweisheng.github.io/uni-mini-router/) |
| `wot-design-uni`                       | UI 组件库              | [文档](https://wot-design-uni.cn/)                        |

## 📁 项目结构

```
uni/
└── src/
│  ├── App.vue                  # 根组件
│  ├── main.ts                  # 入口文件
│  ├── manifest.json            # 应用清单 (自动生成)
│  ├── pages.json               # 页面配置 (自动生成)
│  ├── theme.json               # 主题配置文件
│  ├── uni.scss                 # 全局样式
│  ├── common/                  # 公共模块
│  ├── layouts/                 # 布局组件
│  │  ├── default.vue           # 默认布局
│  │  └── tabbar.vue            # 底部导航布局
│  ├── pages/                   # 主包页面目录
│  ├── router/                  # 路由配置
│  ├── static/                  # 静态资源
│  ├── store/                   # 状态管理
│  ├── subPages/                # 分包页面目录
│  └── utils/                   # 工具函数
├── types/                      # 全局类型定义
│  ├── env.d.ts                 # 环境变量类型
│  ├── shime-uni.d.ts           # UniApp 类型扩展
│  └── uni-pages.d.ts
├── .gitignore                  # Git 忽略文件
├── eslint.config.mjs           # ESLint 配置
├── index.html                  # HTML 模板
├── manifest.config.ts          # 应用配置文件 ⭐
├── package.json                # 项目依赖
├── pages.config.ts             # 页面配置文件 ⭐
├── README.md                   # 项目说明
├── tsconfig.json               # TypeScript 配置
└── vite.config.ts              # Vite 配置
```

## 🚀 快速开始

### 环境要求

- Node.js >= 16
- pnpm >= 7 (推荐使用 pnpm)

### 安装依赖

```bash
pnpm install
```

### 启动开发

```bash
# 开发环境
pnpm dev:mp-weixin    # 微信小程序
pnpm dev:h5           # H5
pnpm dev:app          # APP

# 构建生产
pnpm build:mp-weixin  # 微信小程序
pnpm build:h5         # H5
pnpm build:app        # APP
```

## ⚙️ 配置说明

### 页面配置

**不需要手动编写 `pages.json` 文件**，只需在 `pages.config.ts` 中配置：

```typescript
// pages.config.ts
export default {
  globalStyle: {
    navigationBarTitleText: '项目名称',
    navigationBarBackgroundColor: '#ffffff'
  },
  tabBar: {
    // tabbar 配置
  }
};
```

### 页面路由配置

在 Vue 文件中使用 `<route>` 块进行页面级配置：

```vue
<route lang="json">
{
  "name": "home",
  "layout": "tabbar",
  "style": {
    "navigationBarTitleText": "首页",
    "navigationStyle": "custom"
  }
}
</route>

<template>
  <view>
    <!-- 页面内容 -->
  </view>
</template>
```

或者使用 `definePage 宏`

```ts
definePage({
  name: 'home',
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '首页',
    navigationStyle: 'custom'
  }
});
```

**配置说明:**

- `name`: 用于路由跳转的页面名称
- `layout`: 页面布局，由 `@uni-helper/vite-plugin-uni-layouts` 提供
- `style`: 页面样式配置

### 应用配置

**不需要手动编写 `manifest.json` 文件**，在 `manifest.config.ts` 中配置应用信息即可。

### 路由使用

本项目使用 `uni-mini-router` 进行路由管理：

```typescript
import { router } from '@/router';

// 路由跳转
router.push({ name: 'home' });
router.push('/pages/index/index');

// 带参数跳转
router.push({
  name: 'detail',
  params: { id: '123' }
});
```

## 🎯 开发建议

1. **页面开发**: 直接在 `src/pages` 目录下创建 Vue 文件，无需手动配置路由
2. **布局使用**: 在页面的 `<route>` 块中指定 `layout` 字段
3. **组件开发**: 推荐使用 `wot-design-uni` 组件库
4. **样式管理**: 全局样式在 `uni.scss` 中配置
5. **类型安全**: 充分利用 TypeScript 的类型检查

## 🔗 相关链接

- [UniApp 官方文档](https://uniapp.dcloud.net.cn/)
- [Uni Helper 插件集合](https://uni-helper.js.org/)
- [uni-mini-router 路由库](https://moonofweisheng.github.io/uni-mini-router/)
- [wot-design-uni 组件库](https://wot-design-uni.cn/)
