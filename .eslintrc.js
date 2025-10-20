module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    'vitest-globals/env': true,
  },
  extends: [
    'eslint:recommended',
    '@vitejs/eslint-config-react',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['vitest-globals'],
  rules: {
    // Desactivar verificación de tipos para JavaScript
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
  globals: {
    // Variables globales de Vitest
    describe: 'readonly',
    it: 'readonly',
    expect: 'readonly',
    beforeEach: 'readonly',
    afterEach: 'readonly',
    beforeAll: 'readonly',
    afterAll: 'readonly',
  },
};
