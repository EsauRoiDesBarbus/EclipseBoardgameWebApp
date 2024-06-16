import React from 'react'
import ReactDOM from 'react-dom/client'

import { I18nProvider } from 'src/features/i18n/I18nProvider.tsx'

import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <I18nProvider>
      <App />
    </I18nProvider>
  </React.StrictMode>
)
