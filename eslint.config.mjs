import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig([
  {
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
    },
  },
  tseslint.configs.recommended,
  {
    ignores: ['**/node_modules/**', '**/.next/**', '**/dist/**', '**/build/**', '**/public/**'],
  },
  {
    files: ['**/*.{js,ts,jsx,tsx}'],
  },
]);
