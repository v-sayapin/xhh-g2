import { fileURLToPath, URL } from 'node:url';

import { includeIgnoreFile } from '@eslint/compat';
import eslint from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier/recommended';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import solid from 'eslint-plugin-solid/configs/typescript';
import globals from 'globals';
import tsEslint from 'typescript-eslint';

const prettierIgnorePath = fileURLToPath(new URL('.prettierignore', import.meta.url));

const config = tsEslint.config(
	includeIgnoreFile(prettierIgnorePath, 'Imported .prettierignore patterns'),
	eslint.configs.recommended,
	tsEslint.configs.recommended,
	{
		name: 'client',
		files: ['apps/xhh/src/client/**/*.{ts,tsx,d.ts}', 'apps/xhh/src/*.{tsx}'],
		...solid,
		languageOptions: {
			ecmaVersion: 2022,
			sourceType: 'module',
			globals: globals.browser,
			parser: tsEslint.parser,
		},
	},
	{
		name: 'node',
		files: ['{*,apps/*/*}.{js,ts}'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: globals.node,
			parser: tsEslint.parser,
		},
	},
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
