'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { translations, Language } from 'lib/i18n/translations'
import { GlobeIcon } from '@radix-ui/react-icons'

export function LanguageSwitch() {
  const router = useRouter()
  const pathname = usePathname()
  const currentLang = pathname.startsWith('/en') ? 'en' : 'zh'

  const switchLanguage = (lang: Language) => {
    if (lang === currentLang) return

    const newPath = lang === 'en'
      ? `/en${pathname === '/' ? '' : pathname}`
      : pathname.replace('/en', '') || '/'

    router.push(newPath)
  }

  return (
    <div className="flex items-center gap-1.5 p-1.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-full shadow-sm border dark:border-slate-800">
      <GlobeIcon className="w-4 h-4 ml-1 text-muted-foreground" />
      <div className="flex">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => switchLanguage('zh')}
          className={`
            px-2.5 h-7 text-sm rounded-l-full
            ${currentLang === 'zh'
              ? 'bg-foreground text-background hover:bg-foreground/90 hover:text-background'
              : 'text-muted-foreground hover:text-foreground hover:bg-foreground/10'
            }
          `}
        >
          中文
        </Button>
        <div className="w-px h-4 my-auto bg-border" />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => switchLanguage('en')}
          className={`
            px-2.5 h-7 text-sm rounded-r-full
            ${currentLang === 'en'
              ? 'bg-foreground text-background hover:bg-foreground/90 hover:text-background'
              : 'text-muted-foreground hover:text-foreground hover:bg-foreground/10'
            }
          `}
        >
          English
        </Button>
      </div>
    </div>
  )
} 