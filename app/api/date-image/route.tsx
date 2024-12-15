import { ImageResponse } from '@vercel/og'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { NextRequest } from 'next/server'

// 加载插件
dayjs.extend(utc)
dayjs.extend(timezone)

// 计算缓存时间
function calculateCacheMaxAge(params: URLSearchParams): number {
  const format = params.get('format') || 'YYYY-MM-DD'
  const now = dayjs()

  // 分析格式字符串中的最小时间单位，使用更精确的正则表达式
  const hasSeconds = /ss|S{1,3}/.test(format)
  const hasMinutes = /mm|LTS?/.test(format) && !hasSeconds
  const hasHours = /HH?|kk?|hh?/.test(format) && !hasMinutes && !hasSeconds
  const hasDay = /DD?|Do|d{1,4}|E{1,4}|e{1,4}/.test(format) && !hasHours && !hasMinutes && !hasSeconds
  const hasMonth = /MM?|Mo|MMMM?/.test(format) && !hasDay && !hasHours && !hasMinutes && !hasSeconds
  const hasYear = /YY(?:YY)?/.test(format) && !hasMonth && !hasDay && !hasHours && !hasMinutes && !hasSeconds

  if (hasSeconds) {
    return 1 // 到下一秒
  }
  if (hasMinutes) {
    return 60 - now.second() // 到下一分钟
  }
  if (hasHours) {
    return 3600 - (now.minute() * 60 + now.second()) // 到下一小时
  }
  if (hasDay) {
    // 到明天 00:00:00 的秒数
    return 86400 - (now.hour() * 3600 + now.minute() * 60 + now.second())
  }
  if (hasMonth) {
    // 到下个月 1 号 00:00:00 的秒数
    return now.endOf('month').diff(now, 'second')
  }
  if (hasYear) {
    // 到明年 1 月 1 号 00:00:00 的秒数
    return now.endOf('year').diff(now, 'second')
  }

  // 默认缓存到明天
  return 86400 - (now.hour() * 3600 + now.minute() * 60 + now.second())
}

function getDateWithOffset(date: dayjs.Dayjs, offset: string): dayjs.Dayjs {
  // 解析 UTC 偏移，格式如 "+08:00", "-05:30"
  const match = offset.match(/^([+-])(\d{2}):?(\d{2})$/)
  if (!match) return date

  const [_, sign, hours, minutes] = match
  const offsetMinutes = (parseInt(hours) * 60 + parseInt(minutes)) * (sign === '+' ? 1 : -1)
  return date.add(offsetMinutes, 'minute')
}

// 解析字体大小参数
function parseFontSize(size: string | null): number {
  if (!size) return 48
  const value = parseInt(size)
  return isNaN(value) ? 48 : Math.max(1, value)
}

// 解析内边距参数
function parsePadding(padding: string | null): number {
  if (!padding) return 20
  const value = parseInt(padding)
  return isNaN(value) ? 20 : Math.max(0, value)
}

// 解析圆角参数
function parseBorderRadius(radius: string | null): number {
  if (!radius) return 0
  const value = parseInt(radius)
  return isNaN(value) ? 0 : Math.max(0, value)
}

// 生成 SVG 内容
function generateSvg(
  formattedDate: string,
  color: string,
  background: string,
  fontSize: number,
  padding: string | number,
  borderRadius: string | number
) {
  // 计算容器尺寸
  const containerWidth = fontSize * formattedDate.length + (typeof padding === 'number' ? padding * 2 : fontSize * 2)
  const containerHeight = fontSize * 2 + (typeof padding === 'number' ? padding * 2 : fontSize * 2)

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${containerWidth}" height="${containerHeight}" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <clipPath id="rounded">
      <rect x="0" y="0" width="100%" height="100%" rx="${borderRadius}" ry="${borderRadius}" />
    </clipPath>
  </defs>
  <g clip-path="url(#rounded)">
    <rect x="0" y="0" width="100%" height="100%" fill="${background === 'transparent' ? 'none' : background}"/>
    <text
      x="50%"
      y="50%"
      font-family="sans-serif"
      font-size="${fontSize}px"
      fill="${color}"
      text-anchor="middle"
      dominant-baseline="middle"
      style="padding: ${padding}"
    >${formattedDate}</text>
  </g>
</svg>`
}

// 配置 runtime
export const runtime = 'edge'

// GET 请求处理
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)

    // 计算缓存时间
    const maxAge = calculateCacheMaxAge(searchParams)

    // 获取查询参数
    const type = searchParams.get('type') || 'svg'
    const dateFormat = searchParams.get('format') || 'YYYY-MM-DD'
    const color = searchParams.get('color') || '#000000'
    const background = searchParams.get('background') || (type === 'jpg' ? '#ffffff' : 'transparent')
    const utcOffset = searchParams.get('utc') || '+08:00'

    // 样式参数
    const fontSize = parseFontSize(searchParams.get('fontSize'))
    const padding = parsePadding(searchParams.get('padding'))
    const borderRadius = parseBorderRadius(searchParams.get('radius'))

    // 获取当前时间并根据 UTC 偏移进行调整
    let currentDate = getDateWithOffset(dayjs().utc(), utcOffset)

    const formattedDate = currentDate.format(dateFormat)

    // 根据请求的类型设置响应的 Content-Type
    const contentType = type === 'jpg' ? 'image/jpeg' :
      type === 'png' ? 'image/png' :
        type === 'webp' ? 'image/webp' :
          'image/svg+xml'

    let response: Response

    if (type === 'svg') {
      // 生成 SVG
      const svgContent = generateSvg(
        formattedDate,
        color,
        background,
        fontSize,
        padding,
        borderRadius
      )
      response = new Response(svgContent, {
        headers: {
          'Content-Type': 'image/svg+xml',
          'Cache-Control': `public, max-age=${maxAge}`,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
          'Access-Control-Max-Age': '86400',
          'Vary': 'Accept'
        }
      })
    } else {
      // 生成其他格式图片
      const imageResponse = new ImageResponse(
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: `${fontSize}px`,
            background,
            color,
            padding,
            borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
            margin: 0,
          }}
        >
          {formattedDate}
        </div>
        ,
        {
          // 根据内容自动计算尺寸
          width: fontSize * formattedDate.length + (typeof padding === 'number' ? padding * 2 : fontSize * 2),
          height: fontSize * 2 + (typeof padding === 'number' ? padding * 2 : fontSize * 2),
        }
      )

      // 设置响应头
      const headers = new Headers(imageResponse.headers)
      headers.set('Content-Type', contentType)
      headers.set('Cache-Control', `public, max-age=${maxAge}`)
      headers.set('Access-Control-Allow-Origin', '*')
      headers.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS')
      headers.set('Access-Control-Max-Age', '86400')
      headers.set('Vary', 'Accept')

      response = new Response(imageResponse.body, {
        status: imageResponse.status,
        statusText: imageResponse.statusText,
        headers
      })
    }

    return response
  } catch (e) {
    console.error(e)
    return new Response(`Failed to generate image`, {
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
        'Access-Control-Max-Age': '86400'
      }
    })
  }
}

// OPTIONS 请求处理
export async function OPTIONS(req: NextRequest) {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
      'Access-Control-Max-Age': '86400'
    }
  })
} 