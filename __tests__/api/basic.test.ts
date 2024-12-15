import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mockRequest, parseSvgText, parseSvgAttr } from './setup'
import { GET } from '../../app/api/date-image/route'

describe('基本功能测试', () => {
  const fixedTime = new Date('2024-12-15T12:34:56Z').getTime()

  beforeEach(() => {
    vi.spyOn(Date, 'now').mockImplementation(() => fixedTime)
  })

  it('应该返回默认格式的日期图片', async () => {
    const res = await GET(mockRequest())
    const svg = await res.text()
    
    expect(res.headers.get('Content-Type')).toBe('image/svg+xml')
    expect(parseSvgText(svg)).toBe('2024-12-15')
    expect(parseSvgAttr(svg, 'font-size')).toBe('48px')
  })

  it('应该支持自定义颜色', async () => {
    const res = await GET(mockRequest({ 
      color: '#ff0000',
      background: '#ffff00'
    }))
    const svg = await res.text()
    
    expect(svg).toContain('fill="#ffff00"')
  })

  it('应该支持自定义内边距', async () => {
    const res = await GET(mockRequest({ padding: '50' }))
    const svg = await res.text()
    expect(svg).toContain('padding: 50')
    // 验证实际的内边距效果
    expect(parseInt(parseSvgAttr(svg, 'width'))).toBeGreaterThan(500)
  })

  it('应该支持不同的图片格式', async () => {
    const formats = [
      { type: 'png', contentType: 'image/png' },
      { type: 'jpg', contentType: 'image/jpeg' },
      { type: 'webp', contentType: 'image/webp' }
    ]

    for (const { type, contentType } of formats) {
      const res = await GET(mockRequest({ type }))
      expect(res.headers.get('Content-Type')).toBe(contentType)
      // 这里我们只能验证响应头，因为实际图片内容需要真实的图片处理
    }
  })

  it('应该设置正确的缓存头', async () => {
    const res = await GET(mockRequest())
    const cacheControl = res.headers.get('Cache-Control')
    
    expect(cacheControl).toContain('public')
    expect(cacheControl).toMatch(/max-age=\d+/)
  })
}) 