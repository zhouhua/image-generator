import { DocsPage } from 'components/docs-page'
import { translations } from 'lib/i18n/translations'

export default function Page() {
  return <DocsPage lang="zh" t={translations.zh.docs} />
} 