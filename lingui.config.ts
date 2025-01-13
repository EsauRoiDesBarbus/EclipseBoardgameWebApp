import type { LinguiConfig } from '@lingui/conf'

const config: LinguiConfig = {
  locales: ['en', 'fr'],
  catalogs: [
    {
      path: '<rootDir>/src/locales/{locale}',
      include: ['src'],
    },
  ],
  compileNamespace: 'ts',
}

export default config
