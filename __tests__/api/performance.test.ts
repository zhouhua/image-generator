import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mockRequest } from './setup'
import { GET } from '../../app/api/date-image/route'

describe('性能测试', () => {
  const fixedTime = new Date('2024-12-15T12:00:00Z').getTime()

  beforeEach(() => {
    vi.spyOn(Date, 'now').mockImplementation(() => fixedTime)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('应该在合理时间内生成响应', async () => {
    const req = mockRequest()
    const startTime = performance.now()
    await GET(req)
    const duration = performance.now() - startTime
    expect(duration).toBeLessThan(200)
  })

  it('应该能处理不同参数的并发请求', async () => {
    const requests = [
      { format: 'YYYY-MM-DD', type: 'svg' },
      { format: 'YYYY-MM-DD HH:mm', type: 'png' },
      { format: 'YYYY-MM-DD', color: 'red', type: 'jpg' },
      { format: 'YYYY-MM-DD', utc: '-05:00', type: 'webp' }
    ].map(params => GET(mockRequest(params)))
    
    const startTime = performance.now()
    const responses = await Promise.all(requests)
    const duration = performance.now() - startTime
    
    expect(duration).toBeLessThan(400)
    
    responses.forEach((res, index) => {
      const expectedType = ['image/svg+xml', 'image/png', 'image/jpeg', 'image/webp'][index]
      expect(res.headers.get('Content-Type')).toBe(expectedType)
    })
  })

}) 