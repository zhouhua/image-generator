import { describe, it, expect } from 'vitest'
import { mockRequest } from './setup'
import { GET } from '../../app/api/date-image/route'

describe('参数验证测试', () => {
  it('应该忽略无效的字体大小', async () => {
    const invalidSizes = [-1, 0, 1001]
    for (const fontSize of invalidSizes) {
      const res = await GET(mockRequest({ fontSize: fontSize.toString() }))
      expect(res.status).toBe(200)
      const svg = await res.text()
      expect(svg).toContain('48px') // 使用默认值
    }
  })

  it('应该忽略无效的内边距', async () => {
    const invalidPaddings = [-1, 1001]
    for (const padding of invalidPaddings) {
      const res = await GET(mockRequest({ padding: padding.toString() }))
      expect(res.status).toBe(200)
      const svg = await res.text()
      expect(svg).toContain('padding: 20') // 使用默认值
    }
  })

  it('应该忽略无效的颜色格式', async () => {
    const invalidColors = ['invalid', '#gggggg', 'rgb(300,0,0)']
    for (const color of invalidColors) {
      const res = await GET(mockRequest({ color }))
      expect(res.status).toBe(200)
      const svg = await res.text()
      expect(svg).toContain('#000000') // 使用默认值
    }
  })

  it('应该忽略无效的时区格式', async () => {
    const invalidTimezones = ['+24:00', '-13:00', '+8:60', 'invalid']
    for (const utc of invalidTimezones) {
      const res = await GET(mockRequest({ utc }))
      expect(res.status).toBe(200)
      const svg = await res.text()
      expect(svg).toContain('2024-12-15') // 使用默认时区
    }
  })
}) 