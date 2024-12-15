'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup } from '@/components/ui/select'
import { translations, Language } from 'lib/i18n/translations'
import {
  GitHubLogoIcon,
  ExternalLinkIcon,
  ClockIcon,
  GlobeIcon,
  MixIcon,
  LightningBoltIcon,
  CodeIcon,
  HeartIcon,
  SunIcon,
  MoonIcon,
  CopyIcon,
  CheckIcon
} from '@radix-ui/react-icons'
import { cn } from 'lib/utils'

const DEFAULT_PARAMS = {
  format: 'YYYY-MM-DD',
  type: 'svg',
  color: '#000000',
  background: 'transparent',
  fontSize: '48',
  padding: '20',
  radius: '0',
  utc: '+08:00'
} as const

const TYPE_OPTIONS = [
  { value: 'svg', label: { zh: 'SVG 格式', en: 'SVG Format' } },
  { value: 'png', label: { zh: 'PNG 格式', en: 'PNG Format' } },
  { value: 'jpg', label: { zh: 'JPEG 格式', en: 'JPEG Format' } },
  { value: 'webp', label: { zh: 'WebP 格式', en: 'WebP Format' } }
] as const

const UTC_OPTIONS = [
  { value: '-12:00', label: { zh: 'UTC-12', en: 'UTC-12' } },
  { value: '-11:00', label: { zh: 'UTC-11', en: 'UTC-11' } },
  { value: '-10:00', label: { zh: 'UTC-10', en: 'UTC-10' } },
  { value: '-09:00', label: { zh: 'UTC-9', en: 'UTC-9' } },
  { value: '-08:00', label: { zh: 'UTC-8', en: 'UTC-8' } },
  { value: '-07:00', label: { zh: 'UTC-7 (洛杉矶)', en: 'UTC-7 (Los Angeles)' } },
  { value: '-06:00', label: { zh: 'UTC-6', en: 'UTC-6' } },
  { value: '-05:00', label: { zh: 'UTC-5', en: 'UTC-5' } },
  { value: '-04:00', label: { zh: 'UTC-4 (纽约)', en: 'UTC-4 (New York)' } },
  { value: '-03:00', label: { zh: 'UTC-3', en: 'UTC-3' } },
  { value: '-02:00', label: { zh: 'UTC-2', en: 'UTC-2' } },
  { value: '-01:00', label: { zh: 'UTC-1', en: 'UTC-1' } },
  { value: '+00:00', label: { zh: 'UTC+0 (伦敦)', en: 'UTC+0 (London)' } },
  { value: '+01:00', label: { zh: 'UTC+1 (巴黎)', en: 'UTC+1 (Paris)' } },
  { value: '+02:00', label: { zh: 'UTC+2', en: 'UTC+2' } },
  { value: '+03:00', label: { zh: 'UTC+3', en: 'UTC+3' } },
  { value: '+04:00', label: { zh: 'UTC+4', en: 'UTC+4' } },
  { value: '+05:00', label: { zh: 'UTC+5', en: 'UTC+5' } },
  { value: '+06:00', label: { zh: 'UTC+6', en: 'UTC+6' } },
  { value: '+07:00', label: { zh: 'UTC+7', en: 'UTC+7' } },
  { value: '+08:00', label: { zh: 'UTC+8 (北京)', en: 'UTC+8 (Beijing)' } },
  { value: '+09:00', label: { zh: 'UTC+9 (东京)', en: 'UTC+9 (Tokyo)' } },
  { value: '+10:00', label: { zh: 'UTC+10', en: 'UTC+10' } },
  { value: '+11:00', label: { zh: 'UTC+11', en: 'UTC+11' } },
  { value: '+12:00', label: { zh: 'UTC+12', en: 'UTC+12' } }
] as const

const FORMAT_PRESETS = [
  { value: 'YYYY-MM-DD HH:mm:ss', label: { zh: '完整日期时间', en: 'Full DateTime' } },
  { value: 'YYYY-MM-DD', label: { zh: '日期', en: 'Date' } },
  { value: 'HH:mm:ss', label: { zh: '时间', en: 'Time' } },
  { value: 'YYYY年MM月DD日', label: { zh: '中文日期', en: 'Chinese Date' } },
  { value: 'MM/DD/YYYY', label: { zh: '美式日期', en: 'US Date' } },
  { value: 'DD/MM/YYYY', label: { zh: '欧式日期', en: 'EU Date' } }
] as const

const FEATURES = [
  {
    icon: <ClockIcon className="w-8 h-8" />,
    title: { zh: '多格式支持', en: 'Multiple Formats' },
    description: {
      zh: '支持 SVG、PNG、JPEG 和 WebP 格式，满足不同场景需求',
      en: 'Support SVG, PNG, JPEG and WebP formats for different scenarios'
    },
    gradient: 'from-pink-500 to-rose-500'
  },
  {
    icon: <GlobeIcon className="w-8 h-8" />,
    title: { zh: '时区适配', en: 'Timezone Support' },
    description: {
      zh: '支持全部时区，轻松处理国际化需求',
      en: 'Support global timezones for internationalization'
    },
    gradient: 'from-violet-500 to-purple-500'
  },
  {
    icon: <MixIcon className="w-8 h-8" />,
    title: { zh: '自定义样式', en: 'Custom Styles' },
    description: {
      zh: '可自定义颜色、尺寸、内边距等样式，完美融入您的设计',
      en: 'Customize colors, sizes, padding and other styles to perfectly match your design'
    },
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    icon: <LightningBoltIcon className="w-8 h-8" />,
    title: { zh: '智能缓存', en: 'Smart Caching' },
    description: {
      zh: '基于日期格式的智能缓存策略，优化性能和源使用',
      en: 'Smart caching strategy based on date format to optimize performance'
    },
    gradient: 'from-emerald-500 to-green-500'
  },
  {
    icon: <CodeIcon className="w-8 h-8" />,
    title: { zh: 'Edge Runtime', en: 'Edge Runtime' },
    description: {
      zh: '使用 Vercel Edge Functions，快速响应全球请求',
      en: 'Using Vercel Edge Functions for fast global response'
    },
    gradient: 'from-amber-500 to-yellow-500'
  },
  {
    icon: <HeartIcon className="w-8 h-8" />,
    title: { zh: '开源免费', en: 'Open Source' },
    description: {
      zh: '基于 MIT 协议开源，可自由使用和修改',
      en: 'Open sourced under MIT license, free to use and modify'
    },
    gradient: 'from-red-500 to-orange-500'
  }
] as const

type HomePageProps = {
  lang: Language
  t: typeof translations[Language]
}

export function HomePage({ lang, t }: HomePageProps) {
  const [params, setParams] = useState(DEFAULT_PARAMS)
  const [previewBg, setPreviewBg] = useState('light')
  const [copied, setCopied] = useState(false)
  const [baseUrl, setBaseUrl] = useState('')

  useEffect(() => {
    setBaseUrl(window.location.origin)
  }, [])

  const updateParam = (key: string, value: string) => {
    setParams(prev => ({ ...prev, [key]: value }))
  }

  const previewUrl = `${baseUrl}/api/date-image?${new URLSearchParams(
    Object.entries(params).reduce((acc, [key, value]) => {
      if (value !== DEFAULT_PARAMS[key]) {
        acc[key] = value
      }
      return acc
    }, {} as Record<string, string>)
  ).toString()}`

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(previewUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative border-b overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-purple-500/10 animate-gradient" />
        <div className="container relative py-24 md:py-32">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="relative animate-float">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-violet-500 to-purple-500 opacity-20 blur animate-pulse-slow" />
              <div className="relative space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight gradient-text bg-gradient-to-r from-violet-500 to-purple-500">
                  {t.title}
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  {t.description}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Button size="lg" className="button-3d group relative overflow-hidden shine" asChild>
                <Link href={lang === 'en' ? '/en/docs' : '/docs'}>
                  <span className="relative z-10">{t.viewDocs}</span>
                  <ExternalLinkIcon className="relative z-10 ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="button-3d group relative overflow-hidden flowing-border" asChild>
                <a href="https://github.com/zhouhua/image-generator" target="_blank" rel="noopener noreferrer">
                  <span className="relative z-10 flex items-center">
                    <GitHubLogoIcon className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                    GitHub
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-16 md:py-24">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tight gradient-text bg-gradient-to-r from-violet-500 to-purple-500">
            {t.features.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t.features.subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, index) => (
            <Card key={index} className="hover-card group relative overflow-hidden glass">
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              <CardHeader>
                <div className={`mb-2 bg-gradient-to-br ${feature.gradient} bg-clip-text text-transparent transition-transform duration-300 group-hover:scale-110 animate-float`}>
                  {feature.icon}
                </div>
                <CardTitle className={`text-xl group-hover:text-transparent bg-gradient-to-br bg-clip-text transition-colors duration-300 ${feature.gradient}`}>
                  {feature.title[lang]}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description[lang]}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Editor Section */}
      <section className="border-y relative overflow-hidden">
        <div className="container relative py-16 md:py-24">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold tracking-tight gradient-text bg-gradient-to-r from-violet-500 to-purple-500">
              {t.editor.title}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t.editor.subtitle}
            </p>
          </div>
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="glass">
                <CardContent className="p-4 sm:p-6">
                  <div className="grid gap-6">
                    {/* 格式选择 */}
                    <div className="space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <label className="text-sm font-medium shrink-0">{t.editor.format}</label>
                      </div>
                      <Input
                        value={params.format}
                        onChange={e => updateParam('format', e.target.value)}
                        className="font-mono text-sm transition-all duration-200 focus:ring-2 focus:ring-violet-500/20"
                      />
                    </div>

                    {/* 类型和时区 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">{t.editor.type}</label>
                        <Select
                          value={params.type}
                          onValueChange={(value) => updateParam('type', value)}
                        >
                          <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-violet-500/20">
                            <SelectValue placeholder={lang === 'zh' ? '选择图片格式' : 'Select Type'} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {TYPE_OPTIONS.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label[lang]}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">{t.editor.timezone}</label>
                        <Select
                          value={params.utc}
                          onValueChange={(value) => updateParam('utc', value)}
                        >
                          <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-violet-500/20">
                            <SelectValue placeholder={lang === 'zh' ? '选择时区' : 'Select Timezone'} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {UTC_OPTIONS.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label[lang]}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* 尺寸设置 */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium whitespace-nowrap">{t.editor.fontSize}</label>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            value={params.fontSize}
                            onChange={e => updateParam('fontSize', e.target.value)}
                            min="1"
                            className="transition-all duration-200 focus:ring-2 focus:ring-violet-500/20"
                          />
                          <span className="text-sm text-muted-foreground">px</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium whitespace-nowrap">{t.editor.padding}</label>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            value={params.padding}
                            onChange={e => updateParam('padding', e.target.value)}
                            min="0"
                            className="transition-all duration-200 focus:ring-2 focus:ring-violet-500/20"
                          />
                          <span className="text-sm text-muted-foreground">px</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium whitespace-nowrap">{t.editor.radius}</label>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            value={params.radius}
                            onChange={e => updateParam('radius', e.target.value)}
                            min="0"
                            className="transition-all duration-200 focus:ring-2 focus:ring-violet-500/20"
                          />
                          <span className="text-sm text-muted-foreground">px</span>
                        </div>
                      </div>
                    </div>

                    {/* 颜色设置 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">{t.editor.color}</label>
                        <div className="flex gap-2">
                          <Input
                            type="color"
                            value={params.color}
                            onChange={e => updateParam('color', e.target.value)}
                            className="w-10 p-0.5 transition-all duration-200 focus:ring-2 focus:ring-violet-500/20"
                          />
                          <Input
                            value={params.color}
                            onChange={e => updateParam('color', e.target.value)}
                            className="flex-1 font-mono text-sm transition-all duration-200 focus:ring-2 focus:ring-violet-500/20"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium">{t.editor.background}</label>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
                            onClick={() => updateParam('background', 'transparent')}
                          >
                            {t.editor.setTransparent}
                          </Button>
                        </div>
                        <div className="flex gap-2">
                          <Input
                            type="color"
                            value={params.background === 'transparent' ? '#ffffff' : params.background}
                            onChange={e => updateParam('background', e.target.value)}
                            className="w-10 p-0.5 transition-all duration-200 focus:ring-2 focus:ring-violet-500/20"
                          />
                          <Input
                            value={params.background}
                            onChange={e => updateParam('background', e.target.value)}
                            placeholder="transparent"
                            className="flex-1 font-mono text-sm transition-all duration-200 focus:ring-2 focus:ring-violet-500/20"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 预览部分 */}
              <div className="space-y-4">
                <div className="flex justify-end gap-2">
                  <Button
                    variant={previewBg === 'light' ? 'default' : 'outline'}
                    onClick={() => setPreviewBg('light')}
                    className="button-3d group relative overflow-hidden shine"
                    size="sm"
                  >
                    <span className="relative z-10 flex items-center">
                      <SunIcon className="mr-1.5 h-3.5 w-3.5 transition-transform group-hover:scale-110" />
                      {lang === 'zh' ? '浅色' : 'Light'}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Button>
                  <Button
                    variant={previewBg === 'dark' ? 'default' : 'outline'}
                    onClick={() => setPreviewBg('dark')}
                    className="button-3d group relative overflow-hidden shine"
                    size="sm"
                  >
                    <span className="relative z-10 flex items-center">
                      <MoonIcon className="mr-1.5 h-3.5 w-3.5 transition-transform group-hover:scale-110" />
                      {lang === 'zh' ? '深色' : 'Dark'}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Button>
                </div>
                <div className={cn(
                  "rounded-lg border transition-colors overflow-hidden",
                  previewBg === 'dark'
                    ? 'bg-slate-900 border-slate-800'
                    : 'bg-white border-slate-200'
                )}>
                  <div className="aspect-[2/1] p-8 flex items-center justify-center">
                    <img
                      src={previewUrl}
                      alt={lang === 'zh' ? '预览' : 'Preview'}
                      className="max-w-full h-auto mx-auto transition-all duration-300"
                      style={{
                        filter: previewBg === 'dark'
                          ? 'drop-shadow(0 0 8px rgba(255,255,255,0.1))'
                          : 'drop-shadow(0 0 8px rgba(0,0,0,0.1))'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* URL 复制部分 */}
            <Card className="glass">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">
                    {lang === 'zh' ? '生成的 URL' : 'Generated URL'}
                  </label>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2 text-muted-foreground hover:text-foreground"
                    onClick={copyUrl}
                  >
                    {copied ? (
                      <>
                        <CheckIcon className="h-3.5 w-3.5 text-green-500" />
                        <span className="ml-1.5 text-sm text-green-500">
                          {t.editor.copied}
                        </span>
                      </>
                    ) : (
                      <>
                        <CopyIcon className="h-3.5 w-3.5" />
                        <span className="ml-1.5 text-sm">
                          {t.editor.copyUrl}
                        </span>
                      </>
                    )}
                  </Button>
                </div>
                <pre className="p-3 bg-muted rounded-lg overflow-x-auto relative group">
                  <code className="text-sm text-muted-foreground break-all font-mono">
                    {previewUrl}
                  </code>
                  <div className="absolute inset-0 bg-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
                </pre>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
} 