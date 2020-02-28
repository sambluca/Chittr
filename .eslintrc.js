module.exports = {
  root: true,
  extends: ['airbnb'],
  plugins: [
    'react-native',
    'react',
    'import',
    'jsx-a11y',
    'react-hooks',
    'jest',
  ],
  rules: {
    'react/jsx-filename-extension': [1, {extensions: ['.js', '.jsx']}],
    'react/prop-types': 'off',
    'max-len': 'off'
  },
  env: {
    jest: true,
  },
  ignorePatterns: [
    'metro.config.js',
    'node_modules/',
    'babel.config.js',
    '.prettierrc.js',
    '.eslint.js',
  ],
  globals: {
    fetch: false
  }
};
