import { lingui } from '@lingui/vite-plugin'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ['macros'],
      },
    }),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    lingui(),
  ],
  resolve: {
    alias: {
      src: '/src',
    },
  },
})
