module.exports = {
  rules: {
    /**
     * Disallow await inside of loops.
     *
     * 🚫 Not fixable - https://eslint.org/docs/rules/no-await-in-loop
     */
    'no-await-in-loop': 'error',
    /**
     * Disallow the use of console.
     *
     * 🚫 Not fixable - https://eslint.org/docs/rules/no-console
     */
    'no-console': 'error',
    /**
     * Disallow expressions where the operation doesn't affect the value.
     *
     * 🚫 Not fixable - https://eslint.org/docs/rules/no-console
     */
    'no-constant-binary-expression': 'error',
    /**
     * Disallow returning values from Promise executor functions.
     *
     * 🚫 Not fixable - https://eslint.org/docs/rules/no-promise-executor-return
     */
    'no-promise-executor-return': 'error',
    /**
     * Disallow template literal placeholder syntax in regular strings, as
     * these are likely errors.
     *
     * 🚫 Not fixable - https://eslint.org/docs/rules/no-template-curly-in-string
     */
    'no-template-curly-in-string': 'error',
    /**
     *  Disallow loops with a body that allows only one iteration.
     *
     * 🚫 Not fixable - https://eslint.org/docs/rules/no-unreachable-loop
     */
    'no-unreachable-loop': 'error',

    //newly added
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true,
        enforceForJSX: true,
      },
    ],
    'require-yield': 'error',
    'no-cond-assign': ['error', 'always'],
    'no-const-assign': 'error',
    'no-delete-var': 'error',
    'no-dupe-args': 'error',
    'no-dupe-keys': 'error',
    'no-duplicate-case': 'error',
    'no-invalid-regexp': ['error', { allowConstructorFlags: ['a', 'z'] }],
    'no-mixed-operators': [
      'error',
      {
        groups: [
          ['+', '-', '*', '/', '%', '**'],
          ['&', '|', '^', '~', '<<', '>>', '>>>'],
          ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
          ['&&', '||'],
          ['in', 'instanceof'],
        ],
        allowSamePrecedence: true,
      },
    ],
  },
};

//    "no-unreachable": "warn",
// "no-unsafe-optional-chaining": "warn",
// "no-restricted-syntax": [
//   "warn",
//   "WithStatement",
//   {
//     message: "substr() is deprecated, use slice() or substring() instead",
//     selector: "MemberExpression > Identifier[name='substr']",
//   },
// ],
// "no-unescaped-entities": ["error", { forbid: [">", "}"] }],
// "promise/always-return": "error",
