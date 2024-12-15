---
name: Date Image Generator
slug: date-image-generator
description: A fun and powerful tool to create dynamic date images with customizable styles and formats.
---

# 🎉 Date Image Generator

[中文版本](README.zh.md)

## 🚀 Features

- **Multiple Formats**: Generate images in SVG, PNG, JPEG, and WebP formats to suit any occasion.
- **Timezone Support**: Easily handle internationalization with support for all time zones.
- **Custom Styles**: Tailor colors, sizes, padding, and more to match your design perfectly.
- **Smart Caching**: Enjoy optimized performance with intelligent caching based on date formats.
- **Edge Runtime**: Powered by Vercel Edge Functions for lightning-fast responses worldwide.
- **Open Source**: Free to use and modify under the MIT License.

## 🌐 Check It Out

Ready to create your own date images? Visit us at: [Date Image Generator](https://date-image-generator.vercel.app/)

## 📡 API Usage

### Generate Date Images

You can generate date images using the following API:

```
GET /api/date-image?format={format}&utc={UTC offset}&color={color}&background={background color}&fontSize={font size}&padding={padding}&radius={border radius}
```

#### Parameter Details

- `format`: The date format, default is `YYYY-MM-DD`.
- `utc`: UTC offset, e.g., `+08:00` or `-05:00`.
- `color`: Text color, default is `#000000`.
- `background`: Background color, default is transparent.
- `fontSize`: Font size, default is `48`.
- `padding`: Padding, default is `20`.
- `radius`: Border radius, default is `0`.

## 🛠️ Tech Stack

- **Framework**: Next.js
- **Styling**: Tailwind CSS
- **Runtime**: Vercel Edge Functions

## 🚧 Development Guide

1. **Clone the Project**:

   ```bash
   git clone https://github.com/zhouhua/date-image-generator.git
   cd date-image-generator
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Run in Development Mode**:

   ```bash
   npm run dev
   ```

## 📝 To-Do List

- **Enhance Test Cases**: Fix existing test issues to ensure all features work correctly.
- **Add Icon Templates**: Support not only text-based images but also icon-based images.
