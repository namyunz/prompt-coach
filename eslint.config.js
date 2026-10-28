import js from '@eslint/js'
import { defineConfig, globalIgnores } from 'eslint/config'
import tseslint from 'typescript-eslint'

export default defineConfig(
  // Types the engine writes on load, and dependencies.
  globalIgnores(['.claude-plugin/types/', 'node_modules/']),
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    files: ['hooks/**/*.{ts,tsx}', 'tests/**/*.{ts,tsx}', 'types/**/*.ts'],
    languageOptions: {
      // JSX compiles against the engine's global `h` and `Fragment`.
      globals: { h: 'readonly', Fragment: 'readonly' },
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
    },
  },
)
