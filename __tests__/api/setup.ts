import { beforeEach } from 'vitest'
import { NextRequest } from 'next/server'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

// 加载 dayjs 插件
dayjs.extend(utc)
dayjs.extend(timezone)

// 辅助函数：创建模拟请求
export const mockRequest = (params: Record<string, string> = {}) => {
  const url = new URL('https://example.com/api/date-image')
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value)
  })

  return new NextRequest(url)
}

// 辅助函数：解析 SVG 内容
export const parseSvgText = (svg: string) => {
  const match = svg.match(/<text[^>]*>(.*?)<\/text>/);
  return match ? match[1].trim() : ''
}

// 辅助函数：解析 SVG 属性
export const parseSvgAttr = (svg: string, attr: string) => {
  const match = svg.match(new RegExp(`${attr}="([^"]*)"`, 'i'))
  return match ? match[1] : null
}
