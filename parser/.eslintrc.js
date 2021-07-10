module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'prettier'
  ],
  // rules: {
  //   'semi': ['warn', 'never'],
  //   'quotes': ['warn', 'single'],
  //   'indent': ['error', 2],
  // },
  parserOptions: {
    "ecmaVersion": 2015,
    "sourceType": "module"
  },
}
