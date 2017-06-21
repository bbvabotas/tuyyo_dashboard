// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
      'indent': [0, 4, {
            'SwitchCase': 1
        }],
        'key-spacing': [0, {
            'beforeColon': false,
            'afterColon': false
        }],
        'space-before-function-paren': [0, 'always'],
        'no-multiple-empty-lines': [2, {
            'max': 2
        }],
      'no-trailing-spaces': [0, 'always'],
      'no-multiple-empty-lines': [0, 'always'],
      'no-unused-vars': [0, 'always'],
      'spaced-comment': [0, 'always']
  }
}
