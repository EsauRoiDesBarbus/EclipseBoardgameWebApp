import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { I18nProvider } from '@lingui/react'
import { i18n } from '@lingui/core'

const defaultLocale = navigator.language.split('-')[0]

const I18nApp = () => {
  useEffect(() => {
    const dynamicActivate = async (locale: string) => {
      const { messages } = (await import(`./locales/${locale}`)) as {
        messages: Record<string, string>
      }

      i18n.load(locale, messages)
      i18n.activate(locale)
    }

    // With this method we dynamically load the catalogs
    void dynamicActivate(defaultLocale)
  }, [])

  return (
    <I18nProvider i18n={i18n}>
      <App />
    </I18nProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <I18nApp />
  </React.StrictMode>
)
