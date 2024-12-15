import sharp from 'sharp'
import fs from 'fs/promises'
import path from 'path'
import pngToIco from 'png-to-ico'

async function generateIcons() {
  // 读取源 SVG 文件
  const svgBuffer = await fs.readFile('app/icon.svg')
  
  // 确保 public 目录存在
  await fs.mkdir('public', { recursive: true })
  
  // 复制 SVG 文件
  await fs.writeFile('public/icon.svg', svgBuffer)
  
  // 生成不同尺寸的 PNG 图标
  const sizes = [16, 32, 180]
  
  for (const size of sizes) {
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(path.join('public', size === 180 ? 'apple-icon.png' : `icon${size}.png`))
  }
  
  // 生成 favicon.ico
  const pngBuffers = await Promise.all([16, 32].map(size => 
    sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toBuffer()
  ))
  
  const icoBuffer = await pngToIco(pngBuffers)
  await fs.writeFile('public/favicon.ico', icoBuffer)
}

generateIcons().catch(console.error) 