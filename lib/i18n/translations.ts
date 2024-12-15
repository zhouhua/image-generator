export const translations = {
  zh: {
    title: '日期图片生成器',
    description: '一个简单而强大的工具，帮助你生成各种格式的日期图片。支持多区、格式和样式自定义。',
    viewDocs: '查看文档',
    features: {
      title: '功能特点',
      subtitle: '强大而灵活的功能，满足您的各种需求',
      list: {
        format: {
          title: '多格式支持',
          description: '支持 SVG、PNG、JPEG 和 WebP 格式，满足不同场景需求'
        },
        timezone: {
          title: '时区适配',
          description: '支持全球时区和 UTC 偏移，轻松处理国际化需求'
        },
        // ... 其他功能
      }
    },
    editor: {
      title: '在线编辑器',
      subtitle: '实时预览和编辑，快速生成需要的日期图片',
      format: '格式',
      type: '类型',
      timezone: '时区',
      fontSize: '字体大小',
      padding: '内边距',
      radius: '圆角',
      color: '文字颜色',
      background: '背景颜色',
      setTransparent: '设为透明',
      preview: '预览',
      copyUrl: '复制链接',
      copied: '已复制'
    },
    docs: {
      title: 'API 文档',
      description: '一个简单而强大的日期图片生成 API，支持多种格式和样式自定义。',
      baseUrl: {
        label: 'API 基础 URL',
        reset: '重置',
        placeholder: '例如：http://localhost:3000',
        description: '用于测试不同环境下的 API 调用，默认使用当前域名'
      },
      nav: {
        examples: '示例',
        params: '参数说明',
        quickstart: '快速开始',
        format: '格式化参考',
        cache: '缓存说明'
      },
      examples: {
        title: '在线示例',
        description: '通过以下示例了解 API 的各种用法和效果',
        tabs: {
          basic: {
            label: '基本示例',
            title: '基础用法',
            description: '最基本的使用方式，展示了默认效果和一些简单的自定义选项。'
          },
          timezone: {
            label: '时区示例',
            title: '时区支持',
            description: '支持世界各地的时区，可以通过时区名称或 UTC 偏移来指定。'
          },
          format: {
            label: '日期格式',
            title: '日期格式化',
            description: '使用 dayjs 的格式化字符串��支持多种日期时间格式。'
          },
          type: {
            label: '图片格式',
            title: '图片格式',
            description: '支持多种图片格式，包括 SVG、PNG、JPEG 和 WebP。'
          },
          combined: {
            label: '组合示例',
            title: '组合使用',
            description: '组合多个参数，创建更复杂的自定义效果。'
          }
        }
      },
      params: {
        title: '参数说明',
        type: '类型',
        default: '默认值',
        example: '示例',
        description: '描述'
      },
      quickstart: {
        title: '快速开始',
        html: {
          title: 'HTML 使用',
          code: '<img src="{baseUrl}/api/date-image" alt="当前日期" />'
        },
        markdown: {
          title: 'Markdown 使用',
          code: '![当前日期]({baseUrl}/api/date-image)'
        }
      },
      format: {
        title: '格式化参考',
        description: '支持所有 Day.js 的格式化字符串，以下是常用的格式化标记',
        moreInfo: '更多格式化选项请参考',
        dayjs: 'Day.js 文档',
        tokens: [
          { token: 'YYYY', desc: '四位数年份', example: '2024' },
          { token: 'MM', desc: '两位数月份', example: '03' },
          { token: 'DD', desc: '两位数日期', example: '09' },
          { token: 'HH', desc: '24小时制小时', example: '13' },
          { token: 'hh', desc: '12小时制小时', example: '01' },
          { token: 'mm', desc: '两位数分钟', example: '05' },
          { token: 'ss', desc: '两位数秒钟', example: '30' },
          { token: 'A', desc: '上午/下午', example: 'AM/PM' },
          { token: 'Z', desc: 'UTC偏移', example: '+08:00' },
          { token: '[文本]', desc: '转义文本', example: '[UTC]Z' }
        ]
      },
      cache: {
        title: '缓存说明',
        description: '所有图片都使用 HTTP 缓存机制，缓存时间根据日期格式动态计算：',
        note: '浏览器会根据 Cache-Control 头自动处理缓存，无需手动干预。',
        levels: [
          { format: '秒级格式', duration: '缓存 1 秒', example: 'HH:mm:ss' },
          { format: '分钟级格式', duration: '缓存到下一分钟', example: 'HH:mm' },
          { format: '小时级格式', duration: '缓存到下一小时', example: 'HH:00' },
          { format: '天级格式', duration: '缓存到明天 0 点', example: 'MM-DD' },
          { format: '月级格式', duration: '缓存到下月 1 日', example: 'YYYY-MM' },
          { format: '年级格式', duration: '缓存到明年 1 月 1 日', example: 'YYYY' }
        ]
      },
      footer: {
        home: '日期图片生成器',
        docs: 'API 文档',
        github: 'GitHub',
        poweredBy: '由',
        generate: '生成'
      },
      backToHome: '返回首页',
      copyButton: '复制',
      parameters: [
        {
          name: 'format',
          type: 'string',
          default: 'YYYY-MM-DD',
          description: '日期格式，支持 Day.js 的所有格式化选项',
          example: 'YYYY-MM-DD HH:mm:ss'
        },
        {
          name: 'type',
          type: 'string',
          default: 'svg',
          description: '图片格式，支持 svg/png/jpg/webp',
          example: 'png'
        },
        {
          name: 'fontSize',
          type: 'number',
          default: '48',
          description: '字体大小，单位像素',
          example: '64'
        },
        {
          name: 'padding',
          type: 'number',
          default: '20',
          description: '内边距，单位像素',
          example: '32'
        },
        {
          name: 'radius',
          type: 'number',
          default: '0',
          description: '圆角大小，单位像素',
          example: '8'
        },
        {
          name: 'color',
          type: 'string',
          default: '#000000',
          description: '文字颜色，支持任何有效的 CSS 颜色值',
          example: '#FF0000'
        },
        {
          name: 'background',
          type: 'string',
          default: 'transparent',
          description: '背景颜色，支持任何有效的 CSS 颜色值',
          example: '#FFFFFF'
        },
        {
          name: 'utc',
          type: 'string',
          default: '+08:00',
          description: 'UTC 偏移量，格式如 +08:00、-05:30',
          example: '-04:00'
        }
      ]
    }
  },
  en: {
    title: 'Date Image Generator',
    description: 'A simple yet powerful tool to generate date images in various formats. Supporting multiple timezones, formats and custom styles.',
    viewDocs: 'View Docs',
    features: {
      title: 'Features',
      subtitle: 'Powerful and flexible features to meet your needs',
      list: {
        format: {
          title: 'Multiple Formats',
          description: 'Support SVG, PNG, JPEG and WebP formats for different scenarios'
        },
        timezone: {
          title: 'Timezone Support',
          description: 'Support global timezones and UTC offsets for internationalization'
        },
        // ... other features
      }
    },
    editor: {
      title: 'Online Editor',
      subtitle: 'Real-time preview and editing to quickly generate the date images you need',
      format: 'Format',
      type: 'Type',
      timezone: 'Timezone',
      fontSize: 'Font Size',
      padding: 'Padding',
      radius: 'Border Radius',
      color: 'Text Color',
      background: 'Background',
      setTransparent: 'Set Transparent',
      preview: 'Preview',
      copyUrl: 'Copy URL',
      copied: 'Copied'
    },
    docs: {
      title: 'API Documentation',
      description: 'A simple yet powerful date image generation API with support for multiple formats and custom styles.',
      baseUrl: {
        label: 'API Base URL',
        reset: 'Reset',
        placeholder: 'e.g., http://localhost:3000',
        description: 'Used for testing API calls in different environments, defaults to current domain'
      },
      nav: {
        examples: 'Examples',
        params: 'Parameters',
        quickstart: 'Quick Start',
        format: 'Format Reference',
        cache: 'Caching'
      },
      examples: {
        title: 'Live Examples',
        description: 'Explore various use cases and effects through these examples',
        tabs: {
          basic: {
            label: 'Basic',
            title: 'Basic Usage',
            description: 'Basic usage examples showing default effects and simple customization options.'
          },
          timezone: {
            label: 'Timezone',
            title: 'Timezone Support',
            description: 'Support for global timezones through timezone names or UTC offsets.'
          },
          format: {
            label: 'Date Format',
            title: 'Date Formatting',
            description: 'Using dayjs format strings to support various date and time formats.'
          },
          type: {
            label: 'Image Format',
            title: 'Image Format',
            description: 'Support for multiple image formats including SVG, PNG, JPEG, and WebP.'
          },
          combined: {
            label: 'Combined',
            title: 'Combined Usage',
            description: 'Combining multiple parameters to create more complex custom effects.'
          }
        }
      },
      params: {
        title: 'Parameters',
        type: 'Type',
        default: 'Default',
        example: 'Example',
        description: 'Description'
      },
      quickstart: {
        title: 'Quick Start',
        html: {
          title: 'HTML Usage',
          code: '<img src="{baseUrl}/api/date-image" alt="Current Date" />'
        },
        markdown: {
          title: 'Markdown Usage',
          code: '![Current Date]({baseUrl}/api/date-image)'
        }
      },
      format: {
        title: 'Format Reference',
        description: 'Supports all Day.js format strings. Here are commonly used format tokens:',
        moreInfo: 'For more formatting options, please refer to',
        dayjs: 'Day.js Documentation',
        tokens: [
          { token: 'YYYY', desc: 'Four-digit year', example: '2024' },
          { token: 'MM', desc: 'Two-digit month', example: '03' },
          { token: 'DD', desc: 'Two-digit date', example: '09' },
          { token: 'HH', desc: '24-hour format', example: '13' },
          { token: 'hh', desc: '12-hour format', example: '01' },
          { token: 'mm', desc: 'Two-digit minutes', example: '05' },
          { token: 'ss', desc: 'Two-digit seconds', example: '30' },
          { token: 'A', desc: 'AM/PM', example: 'AM/PM' },
          { token: 'Z', desc: 'UTC offset', example: '+08:00' },
          { token: '[text]', desc: 'Escaped text', example: '[UTC]Z' }
        ]
      },
      cache: {
        title: 'Caching',
        description: 'All images use HTTP caching mechanism. Cache duration is calculated based on the date format:',
        note: 'Browsers will handle caching automatically based on Cache-Control headers, no manual intervention needed.',
        levels: [
          { format: 'Second format', duration: 'Cache for 1 second', example: 'HH:mm:ss' },
          { format: 'Minute format', duration: 'Cache until next minute', example: 'HH:mm' },
          { format: 'Hour format', duration: 'Cache until next hour', example: 'HH:00' },
          { format: 'Day format', duration: 'Cache until tomorrow', example: 'MM-DD' },
          { format: 'Month format', duration: 'Cache until next month', example: 'YYYY-MM' },
          { format: 'Year format', duration: 'Cache until next year', example: 'YYYY' }
        ]
      },
      footer: {
        home: 'Date Image Generator',
        docs: 'API Documentation',
        github: 'GitHub',
        poweredBy: 'Powered by',
        generate: 'generate'
      },
      backToHome: 'Back to Home',
      copyButton: 'Copy',
      parameters: [
        {
          name: 'format',
          type: 'string',
          default: 'YYYY-MM-DD',
          description: 'Date format, supports all Day.js formatting options',
          example: 'YYYY-MM-DD HH:mm:ss'
        },
        {
          name: 'type',
          type: 'string',
          default: 'svg',
          description: 'Image format, supports svg/png/jpg/webp',
          example: 'png'
        },
        {
          name: 'fontSize',
          type: 'number',
          default: '48',
          description: 'Font size in pixels',
          example: '64'
        },
        {
          name: 'padding',
          type: 'number',
          default: '20',
          description: 'Padding in pixels',
          example: '32'
        },
        {
          name: 'radius',
          type: 'number',
          default: '0',
          description: 'Border radius in pixels',
          example: '8'
        },
        {
          name: 'color',
          type: 'string',
          default: '#000000',
          description: 'Text color, supports any valid CSS color value',
          example: '#FF0000'
        },
        {
          name: 'background',
          type: 'string',
          default: 'transparent',
          description: 'Background color, supports any valid CSS color value',
          example: '#FFFFFF'
        },
        {
          name: 'utc',
          type: 'string',
          default: '+08:00',
          description: 'UTC offset in format like +08:00, -05:30',
          example: '-04:00'
        }
      ]
    }
  }
} as const

export type Language = keyof typeof translations 