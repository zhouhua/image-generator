'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { HomeIcon } from '@radix-ui/react-icons'
import { cn } from 'lib/utils'
import { translations, Language } from 'lib/i18n/translations'

// 示例数据
const basicExamples = [
  { title: 'default', url: '/api/date-image' },
  { title: 'customColor', url: '/api/date-image?color=purple&background=pink' },
  { title: 'customSize', url: '/api/date-image?fontSize=72&padding=32' },
  { title: 'rounded', url: '/api/date-image?radius=16&background=%23f0f0f0' },
  { title: 'fullDateTime', url: '/api/date-image?format=YYYY-MM-DD%20HH:mm:ss&fontSize=56&padding=24' }
]

const timezoneExamples = [
  { title: 'beijing', url: '/api/date-image?utc=+08:00' },
  { title: 'newYork', url: '/api/date-image?utc=-04:00' },
  { title: 'london', url: '/api/date-image?utc=+00:00' },
  { title: 'tokyo', url: '/api/date-image?utc=+09:00' },
  { title: 'sydney', url: '/api/date-image?utc=+10:00' }
]

const formatExamples = [
  { title: 'default', url: '/api/date-image' },
  { title: 'fullDateTime', url: '/api/date-image?format=YYYY-MM-DD%20HH:mm:ss' },
  { title: 'chinese', url: '/api/date-image?format=YYYY年MM月DD日' },
  { title: 'us', url: '/api/date-image?format=MM/DD/YYYY' },
  { title: 'eu', url: '/api/date-image?format=DD/MM/YYYY' },
  { title: 'monthOnly', url: '/api/date-image?format=YYYY-MM' },
  { title: 'yearOnly', url: '/api/date-image?format=YYYY' }
]

const imageTypeExamples = [
  { title: 'svg', url: '/api/date-image?type=svg' },
  { title: 'png', url: '/api/date-image?type=png' },
  { title: 'jpeg', url: '/api/date-image?type=jpg&background=white' },
  { title: 'webp', url: '/api/date-image?type=webp' }
]

const combinedExamples = [
  { title: 'blogDate', url: '/api/date-image?format=YYYY-MM-DD&fontSize=36&padding=16&radius=8&color=%23666666&background=%23f5f5f5' },
  { title: 'clock', url: '/api/date-image?format=HH:mm:ss&fontSize=64&padding=32&color=white&background=%23000000&radius=12' },
  { title: 'multilingual', url: '/api/date-image?format=YYYY年MM月DD日&fontSize=48&padding=24&color=%23333333&radius=8' },
  { title: 'timezoneTime', url: '/api/date-image?format=MM/DD%20HH:mm%20[UTC]Z&utc=-04:00&fontSize=40&padding=20&color=%23444444' }
]

const NAV_ITEMS = [
  { id: 'examples', label: { zh: '示例', en: 'Examples' } },
  { id: 'params', label: { zh: '参数说明', en: 'Parameters' } },
  { id: 'quickstart', label: { zh: '快速开始', en: 'Quick Start' } },
  { id: 'format', label: { zh: '格式化参考', en: 'Format Reference' } },
  { id: 'cache', label: { zh: '缓存说明', en: 'Caching' } }
] as const

type DocsPageProps = {
  lang: Language
  t: typeof translations[Language]['docs']
}

export function DocsPage({ lang, t }: DocsPageProps) {
  const [baseUrl, setBaseUrl] = useState('')
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    setBaseUrl(window.location.origin)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.5 }
    )

    NAV_ITEMS.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const ExampleSection = ({ title, examples }: { title: string, examples: { title: string, url: string }[] }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {examples.map((example) => (
        <Card key={example.title} className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <CardContent className="p-6">
            <div className="overflow-hidden rounded-lg mb-4 bg-muted/50 p-4">
              <img
                src={baseUrl + example.url}
                alt={example.title}
                className="max-w-full h-auto mx-auto transform transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-muted opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
              <div className="relative z-10 flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <code className="text-sm font-mono break-all text-muted-foreground">
                  {example.url}
                </code>
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-2 h-6 px-2 text-xs"
                  onClick={() => {
                    navigator.clipboard.writeText(baseUrl + example.url)
                  }}
                >
                  {t.copyButton}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Button variant="ghost" size="sm" className="mr-6 group" asChild>
            <Link href={lang === 'en' ? '/en' : '/'}>
              <HomeIcon className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
              <span className="relative">
                {t.backToHome}
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-violet-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform" />
              </span>
            </Link>
          </Button>
          <nav className="flex items-center space-x-6">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={cn(
                  "text-sm transition-colors relative whitespace-nowrap",
                  activeSection === item.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label[lang]}
                {activeSection === item.id && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-violet-500 to-purple-500" />
                )}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="container py-10">
          {/* 标题部分 */}
          <div className="mb-12 max-w-2xl space-y-4">
            <div className="relative">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-violet-500 to-purple-500 opacity-20 blur" />
              <div className="relative space-y-4">
                <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-violet-500 to-purple-500 bg-clip-text text-transparent">
                  {t.title}
                </h1>
                <p className="text-muted-foreground">
                  {t.description}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* 示例部分 */}
            <div id="examples">
              <div className="relative">
                <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-violet-500 to-purple-500 opacity-20 blur" />
                <div className="relative">
                  <h2 className="text-2xl font-semibold tracking-tight bg-gradient-to-r from-violet-500 to-purple-500 bg-clip-text text-transparent">
                    {t.examples.title}
                  </h2>
                  <p className="mt-2 text-muted-foreground">
                    {t.examples.description}
                  </p>
                </div>
              </div>
              <Card className="backdrop-blur-sm bg-background/95">
                <CardContent className="p-6">
                  <Tabs defaultValue="basic" className="space-y-8">
                    <TabsList className="w-full justify-start">
                      <TabsTrigger value="basic">{t.examples.tabs.basic.label}</TabsTrigger>
                      <TabsTrigger value="timezone">{t.examples.tabs.timezone.label}</TabsTrigger>
                      <TabsTrigger value="format">{t.examples.tabs.format.label}</TabsTrigger>
                      <TabsTrigger value="type">{t.examples.tabs.type.label}</TabsTrigger>
                      <TabsTrigger value="combined">{t.examples.tabs.combined.label}</TabsTrigger>
                    </TabsList>
                    <TabsContent value="basic" className="space-y-4">
                      <div className="max-w-2xl">
                        <h3 className="text-lg font-medium mb-2">{t.examples.tabs.basic.title}</h3>
                        <p className="text-muted-foreground mb-6">{t.examples.tabs.basic.description}</p>
                      </div>
                      <ExampleSection title="basic" examples={basicExamples} />
                    </TabsContent>
                    <TabsContent value="timezone" className="space-y-4">
                      <div className="max-w-2xl">
                        <h3 className="text-lg font-medium mb-2">{t.examples.tabs.timezone.title}</h3>
                        <p className="text-muted-foreground mb-6">{t.examples.tabs.timezone.description}</p>
                      </div>
                      <ExampleSection title="timezone" examples={timezoneExamples} />
                    </TabsContent>
                    <TabsContent value="format" className="space-y-4">
                      <div className="max-w-2xl">
                        <h3 className="text-lg font-medium mb-2">{t.examples.tabs.format.title}</h3>
                        <p className="text-muted-foreground mb-6">{t.examples.tabs.format.description}</p>
                      </div>
                      <ExampleSection title="format" examples={formatExamples} />
                    </TabsContent>
                    <TabsContent value="type" className="space-y-4">
                      <div className="max-w-2xl">
                        <h3 className="text-lg font-medium mb-2">{t.examples.tabs.type.title}</h3>
                        <p className="text-muted-foreground mb-6">{t.examples.tabs.type.description}</p>
                      </div>
                      <ExampleSection title="type" examples={imageTypeExamples} />
                    </TabsContent>
                    <TabsContent value="combined" className="space-y-4">
                      <div className="max-w-2xl">
                        <h3 className="text-lg font-medium mb-2">{t.examples.tabs.combined.title}</h3>
                        <p className="text-muted-foreground mb-6">{t.examples.tabs.combined.description}</p>
                      </div>
                      <ExampleSection title="combined" examples={combinedExamples} />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* 参数说明部分 */}
            <div id="params">
              <div className="relative">
                <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-violet-500 to-purple-500 opacity-20 blur" />
                <div className="relative">
                  <h2 className="text-2xl font-semibold tracking-tight bg-gradient-to-r from-violet-500 to-purple-500 bg-clip-text text-transparent">
                    {t.params.title}
                  </h2>
                </div>
              </div>
              <Card className="backdrop-blur-sm bg-background/95">
                <CardContent className="p-6">
                  <div className="grid gap-4">
                    {t.parameters.map((param) => (
                      <Card key={param.name} className="group overflow-hidden">
                        <div className="p-4 border-b bg-muted/50">
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <code className="text-sm font-mono bg-muted px-2 py-1 rounded transition-colors duration-200 group-hover:text-violet-500">
                                {param.name}
                              </code>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span className="font-medium">{param.type}</span>
                                <span>•</span>
                                <span>{t.params.default}: {param.default}</span>
                              </div>
                            </div>
                            <code className="text-xs font-mono text-muted-foreground bg-muted/50 px-2 py-1 rounded">
                              {param.example}
                            </code>
                          </div>
                        </div>
                        <div className="p-4">
                          <p className="text-sm text-muted-foreground">
                            {param.description}
                          </p>
                        </div>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 快速开始部分 */}
            <div id="quickstart">
              <div className="relative">
                <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-violet-500 to-purple-500 opacity-20 blur" />
                <div className="relative">
                  <h2 className="text-2xl font-semibold tracking-tight bg-gradient-to-r from-violet-500 to-purple-500 bg-clip-text text-transparent">
                    {t.quickstart.title}
                  </h2>
                </div>
              </div>
              <div className="grid gap-4">
                <Card className="overflow-hidden">
                  <div className="p-4 border-b bg-muted/50">
                    <h4 className="text-sm font-medium">{t.quickstart.html.title}</h4>
                  </div>
                  <div className="p-4">
                    <pre className="text-sm font-mono overflow-x-auto">
                      <code>{t.quickstart.html.code.replace('{baseUrl}', baseUrl)}</code>
                    </pre>
                  </div>
                </Card>
                <Card className="overflow-hidden">
                  <div className="p-4 border-b bg-muted/50">
                    <h4 className="text-sm font-medium">{t.quickstart.markdown.title}</h4>
                  </div>
                  <div className="p-4">
                    <pre className="text-sm font-mono overflow-x-auto">
                      <code>{t.quickstart.markdown.code.replace('{baseUrl}', baseUrl)}</code>
                    </pre>
                  </div>
                </Card>
              </div>
            </div>

            {/* 格式化参考部分 */}
            <div id="format">
              <div className="relative">
                <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-violet-500 to-purple-500 opacity-20 blur" />
                <div className="relative">
                  <h2 className="text-2xl font-semibold tracking-tight bg-gradient-to-r from-violet-500 to-purple-500 bg-clip-text text-transparent">
                    {t.format.title}
                  </h2>
                  <p className="mt-2 text-muted-foreground">
                    {t.format.description}
                  </p>
                </div>
              </div>
              <Card className="mt-4">
                <CardContent className="p-6">
                  <div className="grid gap-2">
                    {t.format.tokens.map((item) => (
                      <div key={item.token} className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                        <code className="text-sm font-mono bg-muted px-2 py-1 rounded min-w-[80px] text-center">
                          {item.token}
                        </code>
                        <span className="text-sm text-muted-foreground flex-1">{item.desc}</span>
                        <code className="text-xs font-mono text-muted-foreground bg-muted/50 px-2 py-1 rounded">
                          {item.example}
                        </code>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    {t.format.moreInfo}{' '}
                    <a
                      href="https://day.js.org/docs/en/display/format"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-violet-500 hover:underline"
                    >
                      {t.format.dayjs}
                    </a>
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* 缓存说明部分 */}
            <div id="cache">
              <div className="relative">
                <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-violet-500 to-purple-500 opacity-20 blur" />
                <div className="relative">
                  <h2 className="text-2xl font-semibold tracking-tight bg-gradient-to-r from-violet-500 to-purple-500 bg-clip-text text-transparent">
                    {t.cache.title}
                  </h2>
                </div>
              </div>
              <Card>
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground mb-4">
                    {t.cache.description}
                  </p>
                  <div className="grid gap-2">
                    {t.cache.levels.map((item) => (
                      <div key={item.format} className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                        <span className="text-sm font-medium min-w-[100px]">{item.format}</span>
                        <span className="text-sm text-muted-foreground flex-1">{item.duration}</span>
                        <code className="text-xs font-mono text-muted-foreground bg-muted/50 px-2 py-1 rounded">
                          {item.example}
                        </code>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    {t.cache.note}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t glass">
        <div className="container py-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href={lang === 'en' ? '/en' : '/'} className="hover:text-foreground transition-colors">
                {t.footer.home}
              </Link>
              <span>•</span>
              <Link href={lang === 'en' ? '/en/docs' : '/docs'} className="hover:text-foreground transition-colors">
                {t.footer.docs}
              </Link>
              <span>•</span>
              <a
                href="https://github.com/zhouhua/image-generator"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                {t.footer.github}
              </a>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <span>{t.footer.poweredBy}</span>
              <a
                href="https://claude.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-violet-500 transition-colors"
              >
                Claude-3.5
              </a>
              <span>{t.footer.generate}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
} 