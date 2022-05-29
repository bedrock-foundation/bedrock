module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    mocha: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    // 'plugin:@typescript-eslint/eslint-recommended',
    // 'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    // 0 = turned off, 1 = throw warning, 2 = throw error
    'class-methods-use-this': 0,
    'import/prefer-default-export': 0,
    'no-nested-ternary': 0,
    'react/jsx-filename-extension': [2, { extensions: ['.jsx', '.tsx'] }],
    'import/extensions': 0,
    'prefer-destructuring': 0,
    'no-underscore-dangle': 0,
    'max-len': 0,
    'import/first': 0, // env vars break if this is turned on and auto fixed
    'react/prop-types': 0,
    'func-names': 0,
    'react/no-array-index-key': 0,
    'no-return-await': 0,
    'no-use-before-define': 0,
    'no-shadow': 0,
    'react/jsx-props-no-spreading': 0,
    'no-param-reassign': 0,
    'arrow-body-style': 0,
    'no-await-in-loop': 0,
    'no-plusplus': 0,
    'linebreak-style': 0,
    semi: 0,

    // should fix these ones
    'no-console': 0,

    // better rules for eslint with typescript
    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': [2, { argsIgnorePattern: '^_' }],
    // temp solution to annoying issue that Kev-bot and I had that requires optional props to have a defaultProps declaration???
    'react/require-default-props': 0,
    'react/no-unused-prop-types': 0,
    'react/destructuring-assignment': 0,
  },
};
