module.exports = {
  parser: '@typescript-eslint/parser',
  rules: {
    'import/prefer-default-export': 'off',
    'import/no-default-export': 2,
    'prettier/prettier': 'error',
    'implicit-arrow-linebreak': 'off',
    'operator-linebreak': ['off'],
    'no-confusing-arrow': ['off'],
    'function-paren-newline': ['off'],
    'object-curly-newline': ['off'],
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['**/*.test.tsx'] },
    ],
    'jsx-a11y/no-autofocus': ['off'],
    'react/require-default-props': ['off'],
    'react/prop-types': 'off',
    'no-shadow': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    '@typescript-eslint/explicit-module-boundary-types': ['error'],
    '@typescript-eslint/explicit-function-return-type': ['error'],
    '@typescript-eslint/no-explicit-any': ['error'],
    /** interfaces should start with I */
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: true,
        },
      },
    ],
    '@typescript-eslint/typedef': [
      'error',
      {
        arrayDestructuring: true,
        arrowCallSignature: true,
        arrowParameter: true,
        callSignature: true,
        memberVariableDeclaration: true,
        parameter: true,
        propertyDeclaration: true,
        objectDestructuring: true,
        variableDeclaration: true,
        variableDeclarationIgnoreFunction: true,
      },
    ],
    '@typescript-eslint/no-inferrable-types': 0,
  },
  plugins: ['prettier', '@typescript-eslint'],
  extends: [
    'plugin:import/errors',
    'plugin:@typescript-eslint/recommended',
  ],
  globals: {
    window: true,
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
  ignorePatterns: ['*.snap', '*.svg'],
  overrides: [
    {
      files: ['webpack.*'],
      rules: {
        'import/no-extraneous-dependencies': 0,
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/explicit-function-return-type': 0,
        'import/namespace': 0,
        '@typescript-eslint/no-var-requires': 0,
      },
    },
  ],
};
