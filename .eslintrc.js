module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  env: {
    jest: true,
    browser: true,
    node: true,
  },
  plugins: ['@typescript-eslint'],
  extends: ['airbnb-typescript', 'prettier', 'prettier/@typescript-eslint'],
  rules: {
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '*.js',
          'bin/**/*',
          '**/*.test.js',
          '**/*.test.ts',
          '**/*.test.tsx',
          'src/test-utils.tsx',
          'jest-setup.ts',
        ],
      },
    ],
    'no-case-declarations': 'off',
    'react/require-default-props': 'off',
  },
};
