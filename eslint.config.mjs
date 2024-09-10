import repoEslintConfig from '@repo/eslint-config';
import { resolve } from 'node:path';

/** @type {import("eslint").Linter.Config} */
const config = [
  ...repoEslintConfig,
  {
    languageOptions: {
      parserOptions: {
        project: resolve(process.cwd(), 'tsconfig.lint.json'),
      },
    },
  }
]

export default config;