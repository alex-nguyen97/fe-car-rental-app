import config from 'eslint-config-standard';

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...[].concat(config),
  {
    rules: {
      // Add custom rules here
      'no-console': 'warn',
      semi: ['error', 'always'],
      indent: ['error', 4], // Enforce 4 spaces for indentation
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          semi: true,
          trailingComma: 'es5',
          bracketSpacing: true,
          arrowParens: 'always',
          printWidth: 80,
          tabWidth: 4,
          singleAttributePerLine: false,
        },
      ],
    },
    plugins: [
      // Add custom plugins here
      'react',
    ],
    extends: [
      // Add additional configurations here
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:prettier/recommended',
    ],
  },
];
