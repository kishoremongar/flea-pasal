const disabledRules = {
  'react/prop-types': 'off',
  'react/react-in-jsx-scope': 'off',
  'no-use-before-define': 'off',
  'jsx-a11y/no-onchange': 'off',
  'import/prefer-default-export': 'off',
  'react/require-extension': 'off',
  'react/jsx-curly-newline': 'off',
  'implicit-arrow-linebreak': 'off',
  'function-paren-newline': 'off',
  'valid-typeof': 'off',
  'import/no-unresolved': 'off',
  '@next/next/no-img-element': 'off',
};

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'next/core-web-vitals',
    'plugin:@next/next/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended',
    './eslint/node',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  // plugins: ['simple-import-sort', 'import'],
  overrides: [
    {
      files: ['eslint/rules/**'],
      rules: {
        ...disabledRules,
        // 'sort-keys': 'error',
        // 'simple-import-sort/imports': 'error',
        // 'simple-import-sort/exports': 'error',
        // 'import/no-duplicates': 'error',
      },
    },
  ],
};
