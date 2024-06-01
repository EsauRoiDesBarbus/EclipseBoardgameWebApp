import { useLingui } from '@lingui/react'

export const LocaleSelect = () => {
  const { i18n } = useLingui()

  const dynamicActivate = async (locale: string) => {
    const { messages } = (await import(`./locales/${locale}.ts`)) as {
      messages: Record<string, string>
    }

    i18n.load(locale, messages)
    i18n.activate(locale)
  }

  return (
    <select
      value={i18n.locale}
      onChange={(e) => dynamicActivate(e.target.value)}
      style={{ padding: 8 }}>
      <option value="en">English</option>
      <option value="fr">Français</option>
    </select>
  )
}
