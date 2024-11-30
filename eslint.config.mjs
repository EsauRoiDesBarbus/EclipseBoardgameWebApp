// @ts-check
import eslint from '@eslint/js'
import tsParser from '@typescript-eslint/parser'
import lingui from 'eslint-plugin-lingui'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import tsEslint from 'typescript-eslint'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default [
  ...tsEslint.config(
    eslint.configs.recommended,
    tsEslint.configs.strict,
    tsEslint.configs.stylistic
  ),
  {
    files: ['**/**/*.{js,ts,jsx,tsx}'],
    plugins: {
      react,
      'react-hooks': reactHooks,
      reactJsxRuntime: react.configs['jsx-runtime'],
    },
    rules: {
      ...react.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      ...reactHooks.configs.recommended.rules,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    ignores: ['**/dist', '**/lingui.config.ts'],
    plugins: {
      lingui,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
      },

      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        project: ['./tsconfig.json', './tsconfig.node.json'],
        tsconfigRootDir: __dirname,
      },
    },

    rules: {
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          // https://github.com/orgs/react-hook-form/discussions/8622#discussioncomment-4060570
          checksVoidReturn: {
            attributes: false,
          },
        },
      ],

      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    },
  },
]

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const compat = new FlatCompat({
//     baseDirectory: __dirname,
//     recommendedConfig: js.configs.recommended,
//     allConfig: js.configs.all
// });

// export default [
//     ...fixupConfigRules(compat.extends("eslint:recommended")),
//     {
//         ...fixupConfigRules(compat.extends(
//             "plugin:@typescript-eslint/recommended-type-checked",
//             "plugin:@typescript-eslint/stylistic-type-checked",
//             "plugin:react-hooks/recommended",
//             "plugin:react/recommended",
//             "plugin:react/jsx-runtime"
//         )).map(config => ({
//             ...config,
//             files: ['**/*.ts(x)?'],
//         })),
//     },
//     {
//         files: ['**/*.ts(x)?'],
//         ignores: ["**/dist", "**/lingui.config.ts"],
//         plugins: {
//             "react-refresh": reactRefresh,
//             lingui,
//         },

//         languageOptions: {
//             globals: {
//                 ...globals.browser,
//             },

//             parser: tsParser,
//             ecmaVersion: "latest",
//             sourceType: "module",

//             parserOptions: {
//                 project: ["./tsconfig.json", "./tsconfig.node.json"],
//                 tsconfigRootDir: __dirname,
//             },
//         },

//         settings: {
//             react: {
//                 version: "detect",
//             },
//         },

//         rules: {
//             "react-refresh/only-export-components": ["warn", {
//                 allowConstantExport: true,
//             }],

//             "@typescript-eslint/no-misused-promises": ["error", {
//                 // https://github.com/orgs/react-hook-form/discussions/8622#discussioncomment-4060570
//                 checksVoidReturn: {
//                     attributes: false,
//                 },
//             }],

//             "@typescript-eslint/consistent-type-definitions": ["error", "type"],
//         },
//     }
// ];
