import { fileURLToPath, URL } from 'node:url';

import { includeIgnoreFile } from '@eslint/compat';
import eslint from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier/recommended';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tsEslint from 'typescript-eslint';

const prettierIgnorePath = fileURLToPath(new URL('.prettierignore', import.meta.url));

const config = tsEslint.config(
	includeIgnoreFile(prettierIgnorePath, 'Imported .prettierignore patterns'),
	eslint.configs.recommended,
	tsEslint.configs.recommended,
	{
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
		},
		plugins: {
			'simple-import-sort': simpleImportSort,
			import: importPlugin,
		},
		rules: {
			'simple-import-sort/imports': [
				'error',
				{
					groups: [['^node:'], ['^'], ['^src/.*'], ['^'], ['^.+\\.css$']],
				},
			],
			'simple-import-sort/exports': 'error',
			'import/first': 'error',
			'import/newline-after-import': 'error',
			'import/no-duplicates': 'error',
		},
	},
	prettier
);

export default config;
