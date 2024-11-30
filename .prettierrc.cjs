/* eslint-disable no-undef */
module.exports = {
  trailingComma: 'es5',
  semi: false,
  singleQuote: true,
  printWidth: 100,
  tabWidth: 2,
  bracketSameLine: true,
  plugins: [require.resolve('@trivago/prettier-plugin-sort-imports')],
  importOrder: ['^src/(.*)$', '^[./]'],
  importOrderSeparation: true,
}
