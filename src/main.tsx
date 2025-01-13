import React from 'react'
import ReactDOM from 'react-dom/client'

import { I18nProvider } from 'src/features/i18n/I18nProvider.tsx'

import App from './App.tsx'
import './index.css'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Root element not found')

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <I18nProvider>
      <App />
    </I18nProvider>
  </React.StrictMode>
)
