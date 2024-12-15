---
name: 日期图片生成器
slug: date-image-generator
description: 一个简单而强大的工具，帮助你生成各种格式的日期图片，支持多区、格式和样式自定义。
---

# 🎉 日期图片生成器

[English Version](README.md)

## 🚀 功能特点

- **多格式支持**：支持生成 SVG、PNG、JPEG 和 WebP 格式的图片，适应各种场合。
- **时区适配**：轻松处理国际化需求，支持所有时区。
- **自定义样式**：可根据设计需求调整颜色、尺寸、内边距等。
- **智能缓存**：基于日期格式的智能缓存策略，优化性能。
- **Edge Runtime**：使用 Vercel Edge Functions，快速响应全球请求。
- **开源免费**：基于 MIT 协议开源，可自由使用和修改。

## 🌐 在线访问

准备好创建自己的日期图片了吗？访问我们：[日期图片生成器](https://date-image-generator.vercel.app/)

## 📡 API 用法

### 生成日期图片

您可以通过以下 API 生成日期图片：

```
GET /api/date-image?format={格式}&utc={UTC偏移}&color={颜色}&background={背景色}&fontSize={字体大小}&padding={内边距}&radius={圆角}
```

#### 参数说明

- `format`：日期格式，默认为 `YYYY-MM-DD`。
- `utc`：UTC 偏移，例如 `+08:00` 或 `-05:00`。
- `color`：文字颜色，默认为 `#000000`。
- `background`：背景颜色，默认为透明。
- `fontSize`：字体大小，默认为 `48`。
- `padding`：内边距，默认为 `20`。
- `radius`：圆角，默认为 `0`。

## 🛠️ 技术栈

- **框架**：Next.js
- **样式**：Tailwind CSS
- **运行环境**：Vercel Edge Functions

## 🚧 开发指南

1. **克隆项目**：

   ```bash
   git clone https://github.com/zhouhua/date-image-generator.git
   cd date-image-generator
   ```

2. **安装依赖**：

   ```bash
   npm install
   ```

3. **运行开发模式**：

   ```bash
   npm run dev
   ```

## 📝 待完成事项

- **完善测试用例**：修复现有的测试问题，确保所有功能��常。
- **添加图标类型的模板**：不仅支持文字类型的图片，还要支持图标类型的图片。
