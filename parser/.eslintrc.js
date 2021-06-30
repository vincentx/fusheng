module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
  ],
  rules: {
    'semi': ['warn', 'never'],
    'quotes': ['warn', 'single'],
    'indent': ['error', 2],
  },
  parserOptions: {
    "ecmaVersion": 2015,
    "sourceType": "module"
  },
}
