# 🛠️ EESISIBLOG 网站维护指南

## 📂 目录结构说明

```
content/                    # 所有内容文件的根目录
├── course/                # 🎓 课程相关内容
│   ├── course1/          # 课程1
│   │   ├── en/          # 🇬🇧 英文内容
│   │   │   └── course1.md
│   │   └── zh/          # 🇨🇳 中文内容
│   │       └── course1.md
│   └── course2/         # 课程2（结构同上）
├── gallery/             # 🖼️ 图库内容
├── introduction/        # 📖 介绍页面内容
├── members/            # 👥 成员信息
├── projects/           # 💼 项目内容
├── publication/        # 📢 发布内容
└── translations/       # 🌐 翻译文件
    ├── en.json        # 英文翻译
    └── zh.json        # 中文翻译
```

## 📚 内容维护指南

### 🎓 课程维护指南

#### 添加新课程的步骤
1. **📂 创建课程目录**
   - 在 `content/course/` 目录下创建新的课程文件夹
   - 命名规则：`courseX`（其中 X 为数字，按顺序递增）
   - 在课程文件夹内创建 `en` 和 `zh` 两个子文件夹，分别存放英文和中文内容

2. **📄 创建课程内容文件**
   - 在对应语言文件夹中创建 Markdown 文件
   - 英文：`en/courseX.md`
   - 中文：`zh/courseX.md`

3. **📝 Markdown 文件格式**
```markdown
---
title: "课程标题"
description: "课程简短描述"
period: "2023-2024"
---

# 课程标题

**课程简介**:

课程介绍内容...

### **项目案例 1: 标题**

案例描述...

<img src="/images/course/案例图片.png" />

更多内容...
```

4. **🖼️ 添加图片**
   - 将课程相关图片放在 `public/images/course/` 目录下
   - 图片命名建议：`courseX_Y.png`（X 为课程编号，Y 为图片序号）

#### 路由配置说明
```
app/
├── [lang]/
│   ├── current-courses/
│   │   ├── page.tsx              # 📃 课程列表页面
│   │   └── [courseId]/
│   │       └── page.tsx          # 📄 课程详情页面
│   └── layout.tsx                # 🖼️ 布局文件
```

##### 路由工作原理
1. **URL 结构**
   - 课程列表：`/{lang}/current-courses`
   - 课程详情：`/{lang}/current-courses/{courseId}`

2. **自动路由匹配**
   - 课程 ID 来自文件夹名称（例如：`course1`、`course2` 等）

3. **多语言支持**
   - 根据语言参数加载对应的内容文件

### 💼 项目维护指南

#### 项目目录结构
```
content/
└── projects/
    ├── project1/          # 项目1
    │   ├── en/           # 🇬🇧 英文内容
    │   │   └── project1.md
    │   └── zh/           # 🇨🇳 中文内容
    │       └── project1.md
    └── project2/         # 项目2（结构同上）
```

#### 添加新项目步骤
1. **创建项目目录**
```bash
mkdir -p content/projects/projectX/{en,zh}
```

2. **项目文件格式规范
```markdown
---
title: "项目标题"
description: "项目简短描述"
order: 1
---

# 1. 项目标题

<div align=center><img src="/images/projects/项目图片.jpg" alt="图片描述" border="0" /></div>

<center>图 X：图片说明</center>

**项目说明**：项目详细描述内容...
```

## ⚠️ 通用注意事项

1. **📝 文件命名规范**
   - 所有文件名使用小写字母
   - 使用连字符（-）代替空格
   - 中英文内容文件保持相同的文件名

2. **🌐 多语言支持**
   - 确保所有内容都有中英文版本
   - 翻译文件位于 `content/translations/` 目录
   - 添加新内容时同时更新翻译文件

## 🖼️ 图片规范

### 通用图片规范
1. **存放位置**
```
public/
└── images/
    ├── course/              # 课程相关图片
    └── projects/            # 项目相关图片
```

2. **命名规范**
   - 课程图片：`courseX_Y.png`
   - 项目图片：`projectX_Y.png`

3. **Markdown 语法**
```markdown
<img src="/images/[类型]/图片名称.png" className="rounded-lg shadow-md" />
```

## 🛠️ 工具与配置

### 本地开发环境
```bash
npm install   # 安装依赖
npm run dev   # 启动开发服务器
npm run build # 构建生产版本
```

## ❓ 常见问题解答
1. **如何预览修改效果？**
   - 访问 http://localhost:3000 查看效果

2. **内容不显示怎么办？**
   - 检查文件名和路径是否正确

3. **如何添加翻译文本？**
   - 更新 `content/translations/` 中的对应文件

## 操作示例

### 课程添加示例
```bash
mkdir -p content/course/course3/{en,zh}
touch content/course/course3/{en,zh}/course3.md
```

### 项目添加示例
```bash
mkdir -p content/projects/project3/{en,zh}
touch content/projects/project3/{en,zh}/project3.md
```
