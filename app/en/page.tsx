import { HomePage } from 'components/home-page'
import { translations } from 'lib/i18n/translations'

export default function Page() {
  return <HomePage lang="en" t={translations.en} />
} 