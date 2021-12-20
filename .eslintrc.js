module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'indent': 0,
    'semi': [0, 'never'],
    'space-before-function-paren': [2, "never"],
    'no-multi-spaces': 0,
    'prefer-const': 0,
    'quotes': 0,
    'keyword-spacing': 0,
    'eqeqeq': 0,
    'space-before-function-paren': 0
  }
}
