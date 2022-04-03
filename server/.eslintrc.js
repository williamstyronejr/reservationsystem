module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
    jest: true,
  },
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['airbnb-base', 'airbnb-typescript/base', 'prettier'],
  rules: {
    'consistent-return': 0,
    'no-unused-vars': 1,
    '@typescript-eslint/no-unused-vars': 1,
    'import/prefer-default-export': 0,
  },
};
