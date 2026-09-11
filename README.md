# Touhou Wiki (Vue 3)

基于 **Vue 3 + Vite + Element Plus + Pinia + Vue Router** 重写的东方 Project 同人 Wiki，
由原生的 HTML/CSS/JS + Electron 多页面项目（`../Touhou Project Wiki/`）迁移而来。

## 运行

```bash
npm install
npm run dev      # 开发：http://localhost:5173
npm run build    # 生产构建到 dist/
npm run preview  # 预览生产构建
```

默认账号：`Admin1 / 123456`、`Admin2 / 123456`（首次访问自动初始化到 localStorage）。

## 功能

- **登录 / 注册 / 修改密码**：el-form 表单校验，用户数据持久化在 localStorage（Pinia store 封装）
- **登录守卫**：未登录访问任何 wiki 页面自动跳转登录页
- **首页**：东方 Project 概述
- **简介**：项目介绍（术语悬浮注释）、地方设定（9 处）、小说&漫画卡片墙（14 本）、官方游戏卡片墙（27 部）、右侧电梯导航
- **主要角色**：6 人轮播图（自动播放/箭头/圆点/悬停暂停），点击进入数据驱动详情页 `/roles/:id`
- **角色详情**：简介、基本资料、称号、人际关系（站内互跳）、剧透遮罩彩蛋（悬停显示）
- **二创作品**：《东方夜雀食堂》《幻想万华镜》介绍，外链确认弹窗
- **关于本站**：作者主页、素材来源致谢、东方同人规约

## 相对旧版的变化

| 旧版 | 新版 |
| --- | --- |
| 多页面 + iframe 切换 | vue-router 子路由 + 布局组件 |
| 6 个角色详情 HTML 页 | 1 个数据驱动路由页（`src/data/characters.js`） |
| 全局函数 + onclick | `<script setup>` 组件化 |
| 手写表单校验 + alert | el-form rules + ElMessage / ElMessageBox |
| 注册后跳转到不存在的页面 | 正确跳转登录页 |
| 退出登录不写回 localStorage | 真正持久化 |
| 琪露诺详情页链接错误无法到达 | `/roles/cirno` 正常访问（并校验非法 id） |
| 轮播定时器不清理 | 组件卸载时清理 |
| 导航栏随页面滚出视口 | sticky 固定顶栏 |

## 目录结构

```
src/
├── main.js              # 入口：Pinia + Router + Element Plus（中文 locale）
├── router/index.js      # 路由表 + 登录守卫
├── stores/user.js       # 用户状态（登录/注册/改密/退出，localStorage 持久化）
├── data/                # 从旧版 HTML 抽取的静态数据
├── layouts/WikiLayout.vue  # 顶部导航 + 固定背景 + <router-view>
├── components/          # 导航栏、轮播、剧透遮罩、术语气泡、电梯导航、外链确认
├── views/               # 9 个页面视图
└── styles/global.css    # 珊瑚红主题（Element Plus 变量）、毛玻璃卡片、固定背景层
```

图片资源位于 `public/images/`（迁移自旧版 `thpicture/` 与 `icons/`）。

> 仅作学习用途。素材版权归原作者所有，二次创作遵循 [东方同人规约](https://www.bilibili.com/read/cv6364137/)。
