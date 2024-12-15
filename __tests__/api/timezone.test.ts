import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mockRequest, parseSvgText } from './setup'
import { GET } from '../../app/api/date-image/route'
import dayjs from 'dayjs'

describe('时区功能测试', () => {
  const fixedTime = new Date('2024-12-15T12:34:56Z').getTime()
  let mockDate: dayjs.Dayjs

  beforeEach(() => {
    vi.spyOn(Date, 'now').mockImplementation(() => fixedTime)
    mockDate = dayjs(fixedTime)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('应该使用默认时区 (UTC+8)', async () => {
    const res = await GET(mockRequest())
    const svg = await res.text()
    const text = parseSvgText(svg)
    expect(text).toBe('2024-12-15')
  })

  it('应该正确处理负的 UTC 偏移', async () => {
    const res = await GET(mockRequest({ utc: '-05:00' }))
    const svg = await res.text()
    const text = parseSvgText(svg)
    const expectedDate = mockDate.utc().subtract(5, 'hour').format('YYYY-MM-DD')
    expect(text).toBe(expectedDate)
  })

  it('应该正确处理带分钟的 UTC 偏移', async () => {
    const res = await GET(mockRequest({ utc: '+05:30' }))
    const svg = await res.text()
    const text = parseSvgText(svg)
    const expectedDate = mockDate.utc().add(5.5, 'hour').format('YYYY-MM-DD')
    expect(text).toBe(expectedDate)
  })

  it('应该正确处理自定义日期格式', async () => {
    const testCases = [
      { format: 'YYYY-MM-DD HH:mm:ss', utc: '+08:00' },
      { format: 'YYYY年MM月DD日', utc: '-05:00' },
      { format: 'MM/DD/YYYY', utc: '-05:00' },
      { format: 'DD/MM/YYYY HH:mm', utc: '+01:00' }
    ]

    for (const { format, utc } of testCases) {
      const res = await GET(mockRequest({ format, utc }))
      const svg = await res.text()
      const text = parseSvgText(svg)
      const [sign, hours, minutes] = utc.match(/^([+-])(\d{2}):(\d{2})$/).slice(1)
      const totalHours = parseInt(hours) + (parseInt(minutes) / 60)
      const expectedDate = mockDate.utc().add(sign === '+' ? totalHours : -totalHours, 'hour').format(format)
      expect(text).toBe(expectedDate)
    }
  })
}) 