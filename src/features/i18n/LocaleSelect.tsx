import { useLingui } from '@lingui/react'

import { updateLocale } from './updateLocale'

export const LocaleSelect = () => {
  const { i18n } = useLingui()

  return (
    <select
      value={i18n.locale}
      onChange={(e) => updateLocale(e.target.value)}
      style={{ padding: 8 }}>
      <option value="en">English</option>
      <option value="fr">Français</option>
    </select>
  )
}
