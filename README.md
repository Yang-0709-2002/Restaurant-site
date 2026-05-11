## Bangkok Thai Chinese Restaurant (展示官网)

技术栈：Next.js (App Router) + React + Tailwind CSS + next-intl（hu / en / zh）

### 本地运行

```bash
npm install
npm run dev
```

打开 `http://localhost:3000/`（默认会跳到匈牙利语 `/hu`）。

### 生产构建

```bash
npm run build
npm run start
```

### 内容（简单 CMS）怎么改

所有展示内容都在 `src/content/` 的 JSON 里：

- `src/content/restaurant.json`：营业时间、电话、地址、人均区间、首页 Slogan/简介
- `src/content/menu.json`：菜单分类与菜品（名称/简介/价格/图片）
- `src/content/gallery.json`：图库图片（菜品/环境）与多语言 alt 文案

改完保存即可（开发模式会热更新）。

### 站点域名配置（用于 SEO / sitemap / robots）

复制 `.env.example` 为 `.env.local`，并设置真实域名（不要带末尾 `/`）：

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### 多语言

界面文案在 `src/messages/`：

- `hu.json`（默认）
- `en.json`
- `zh.json`

路由前缀：`/hu`、`/en`、`/zh`。

