import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig([
  {
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
    },
  },
  tseslint.configs.recommended,
]);
