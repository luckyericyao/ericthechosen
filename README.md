# Eric Yao — A life, in progress.

一个克制的私人纪录片式单页网站。它不是简历、作品集或履历页面：公开内容只提供城市、物件、动作和少数判断，让访问者自己完成判断。

## Run locally

```bash
pnpm install
pnpm dev
```

默认地址：`http://127.0.0.1:4173`

生产检查：

```bash
pnpm lint
pnpm build
pnpm preview
```

当前运行环境没有系统级 Node/npm 时，可以使用 Codex bundled runtime 对应的 pnpm；本项目不要求额外的 CSS、动画或图标库。

## 内容修改位置

- 所有公开文案、章节、图片路径、Open Graph 图像：`src/content/siteContent.ts`
- 私人页面的独立配置：`src/content/privateDoor.ts`
- 页面结构：`src/App.tsx`
- 视觉与响应式断点：`src/styles.css`
- 站点标题、description、favicon、manifest：`index.html`、`public/favicon.svg`、`public/site.webmanifest`

文案配置没有加入年龄、出生日期、公司、职位、教育时间线、客户名称、收入、资产、交易金额、具体健康数字或完整情史。请继续维持这种边界，不要在组件中散落个人事实。

## 替换真实照片

当前没有从工作区发现真实照片，因此第一版使用建筑、城市、旅行、纸张、腕表、球场、博物馆等非人物临时影像 URL。它们只是视觉过渡，不代表 Eric 的真实经历。

建议把真实照片放入 `public/images/`，然后只修改 `src/content/siteContent.ts` 中对应的 `src`：

| 配置位置 | 建议文件 | 推荐构图 |
| --- | --- | --- |
| `hero.image` | `hero-eric.jpg` | 背影、侧脸、行走或窗边；不使用正面商务头像 |
| `motion.images[0]` | `motion-01.jpg` | 会议桌一角、纸页、手边物件，不出现客户或公司标识 |
| `motion.images[1]` | `motion-02.jpg` | 航站楼、舷窗、夜间移动中的光线 |
| `motion.images[2]` | `motion-03.jpg` | 被反复修改的文档、手写材料或科学图像局部 |
| `elsewhere.images` | `elsewhere-01.jpg` / `elsewhere-02.jpg` / `elsewhere-03.jpg` | 城市、建筑、自然与窗外，不做国家统计 |
| `returns.items[0]` | `tennis.jpg` | 球场、球网、手部动作或空场 |
| `returns.items[1]` | `watch.jpg` | 机械腕表与桌面光线；避免品牌炫耀感 |
| `returns.items[2]` | `museum.jpg` | 博物馆空间、展陈局部或历史物件 |
| `returns.items[3]` | `training.jpg` | 训练空间、器械、鞋或影子，不展示健康数字 |
| `fragments.items` | `fragment-01.jpg` 等 | 票据、纸、猫、机场、夜色、仍然保存的物件 |

例如：`src: "/images/hero-eric.jpg"`。如果照片暂时缺失，页面会显示克制的占位画面，不会出现 broken image。

## Private Door

默认 `/for-you` 没有内容，首页也不会显示入口。若要启用：

1. 在 `src/content/privateDoor.ts` 中填入内容并将 `enabled` 改为 `true`。
2. 若需要音频，将文件放入 `public/audio/`，填入 `audioSrc: "/audio/your-note.mp3"`。
3. 重新构建并部署。

这是静态前端路径，不是安全密码页，也不具备真正的隐私保护；任何能访问部署域名的人都可能猜到或查看资源。若内容确实需要访问控制，请在服务端增加 session、鉴权和不公开的资源读取，再把页面接入服务端保护。

## 验收重点

- 移动端断点覆盖 375px、430px；平板和桌面覆盖 768px、1440px。
- 所有图片懒加载，首屏图像 eager 加载；图片有明确 alt 文本。
- 支持 `prefers-reduced-motion`，没有自动播放音乐、打字机或粒子效果。
- 菜单、跳转、隐藏音频按钮和页面结构支持键盘操作。
- 章节、文案和图片配置集中管理，便于替换真实资料。
