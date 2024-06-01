import { PropsWithChildren, useEffect } from 'react'
import { i18n } from '@lingui/core'
import { I18nProvider as LinguiProvider } from '@lingui/react'
import { updateLocale } from './updateLocale'

const defaultLocale = navigator.language.split('-')[0]

export const I18nProvider = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    void updateLocale(defaultLocale)
  }, [])

  return <LinguiProvider i18n={i18n}>{children}</LinguiProvider>
}
