# EESISISI 个人学术网站

这是一个基于 Next.js 构建的个人学术网站，使用 App Router 和 Server Components，支持中英文双语切换。网站采用静态生成(SSG)方式，提供更快的加载速度和更好的SEO性能。

## 技术栈

- **框架**: [Next.js](https://nextjs.org)
- **渲染方式**: 静态生成 (SSG)
- **样式**: [Tailwind CSS](https://tailwindcss.com)
- **国际化**: [next-intl](https://next-intl-docs.vercel.app)
- **主题**: [next-themes](https://github.com/pacocoursey/next-themes)
- **Markdown**: [react-markdown](https://github.com/remarkjs/react-markdown)
- **代码高亮**: [highlight.js](https://highlightjs.org)
- **图标**: [Lucide React](https://lucide.dev)
- **字体**: 
  - [MiSans](https://web.vip.miui.com/page/info/mio/mio/detail?postId=33935854) (主要字体)
  - [JetBrains Mono](https://www.jetbrains.com/lp/mono/) (代码字体)
  - [Geist](https://vercel.com/font) (系统字体)

## 主要功能

- 🌍 中英文双语支持
- 🌓 亮色/暗色主题切换
- 📱 响应式设计
- 📝 Markdown 内容支持
- 🎨 现代化 UI 设计
- 🔍 目录自动生成
- 📊 项目展示
- 📚 课程管理
- 👥 团队成员展示
- 🖼️ 图片画廊
- ⚡ 静态生成提供更快的加载速度
- 🔎 优化的SEO性能

## 快速开始

1. **克隆项目**

```bash
git clone [repository-url]
cd eesissiblog
```

2. **安装依赖**

```bash
npm install
```

3. **运行开发服务器**

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看网站。

4. **构建静态网站**

```bash
npm run build
```

## 项目结构

```
eesissiblog/
├── app/                      # Next.js 应用目录
│   └── [lang]/              # 多语言路由
├── components/              # React 组件
├── content/                # 内容文件
│   ├── course/            # 课程内容
│   ├── gallery/          # 图库内容
│   ├── introduction/    # 介绍内容
│   ├── members/        # 成员信息
│   ├── projects/      # 项目内容
│   ├── publication/  # 发表文章
│   └── translations/ # 翻译文件
├── lib/              # 工具函数和数据获取
├── public/           # 静态资源
│   ├── images/      # 图片资源
│   └── fonts/      # 字体文件
└── styles/        # 全局样式
```

## 内容管理

- 所有内容都以 Markdown 格式存储
- 支持中英文内容分别管理
- 图片资源统一存放在 `public/images` 目录
- 详细的内容管理指南请参考 [MAINTENANCE_GUIDE.md](./MAINTENANCE_GUIDE.md)

## 静态生成

本网站采用静态生成(SSG)方式构建，具有以下优势：

- **更快的页面加载速度**：页面在构建时预渲染为静态HTML
- **改进的SEO性能**：搜索引擎可以更容易地索引静态内容
- **减少客户端负载**：不再需要在客户端获取和处理数据
- **增强的可靠性**：不依赖于API调用的成功
- **降低服务器负载**：减少了API请求

所有页面都配置了静态生成：
- 首页
- 个人介绍页
- 项目列表和详情页
- 课程列表和详情页
- 发表文章页
- 团队成员页
- 图片画廊页

每个页面都使用 `generateStaticParams` 函数预生成所有可能的路径参数组合，并配置了 `revalidate` 参数进行定期重新验证。

## 开发

- 遵循 [Next.js](https://nextjs.org/docs) 最佳实践
- 使用 TypeScript 进行类型检查
- 使用 ESLint 进行代码规范检查
- 使用 Prettier 进行代码格式化

## 浏览器支持

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 开源资源许可证

本项目使用了以下开源资源:

### 图标
- **Lucide React**: MIT License
  - 版权所有 (c) 2024 Lucide Contributors
  - https://github.com/lucide-icons/lucide/blob/main/LICENSE

### 字体
- **MiSans**: 小米开源字体
  - https://hyperos.mi.com/font/zh/
  
- **JetBrains Mono**: SIL Open Font License 1.1
  - 版权所有 (c) 2020 JetBrains s.r.o.
  - https://github.com/JetBrains/JetBrainsMono/blob/master/OFL.txt
  
- **Geist**: MIT License
  - 版权所有 (c) 2023 Vercel Inc.
  - https://github.com/vercel/geist-font/blob/main/LICENSE.txt

## 问题反馈

如果您在使用过程中遇到任何问题，欢迎通过以下方式联系我们：

📧 邮箱: 
- [frandy777@icloud.com](mailto:frandy777@icloud.com)
- [eesissi@163.com](mailto:eesissi@163.com)

我们将尽快回复您的问题并提供帮助。
