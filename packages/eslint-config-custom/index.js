module.exports = {
  extends: [
    'next',
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'eslint-config-turbo',
    'plugin:tailwindcss/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'eslint-plugin-import-helpers', 'eslint-plugin-import'],
  rules: {
    quotes: ['error', 'single', { avoidEscape: true }],
    '@next/next/no-html-link-for-pages': 'off',
    'no-console': 'error',
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        next: 'export',
        prev: '*',
      },
      {
        blankLine: 'always',
        next: 'return',
        prev: '*',
      },
    ],
    'import/no-duplicates': 'error',
    'import-helpers/order-imports': [
      'error',
      {
        alphabetize: {
          ignoreCase: true,
          order: 'asc',
        },
        groups: [
          'module',
          ['/^ui/', '/^services/'],
          ['/^@domain/'],
          ['parent', 'sibling', 'index'],
        ],
        newlinesBetween: 'always',
      },
    ],
    'object-shorthand': ['error', 'always'],
  },
}
