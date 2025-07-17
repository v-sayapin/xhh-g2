import { fileURLToPath, URL } from 'node:url';

import { includeIgnoreFile } from '@eslint/compat';
import jsEslint from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier/recommended';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';
import solidPlugin from 'eslint-plugin-solid/configs/typescript';
import globals from 'globals';
import tsEslint from 'typescript-eslint';

const prettierIgnorePath = fileURLToPath(new URL('.prettierignore', import.meta.url));

const config = tsEslint.config(
	includeIgnoreFile(prettierIgnorePath, 'Imported .prettierignore patterns'),
	jsEslint.configs.recommended,
	tsEslint.configs.recommended,
	{
		name: 'xhh-client',
		files: ['apps/xhh/src/*.{js,ts,jsx,tsx,d.ts}', 'apps/xhh/src/client/**/*.{js,ts,jsx,tsx,d.ts}'],
		...solidPlugin,
		languageOptions: {
			ecmaVersion: 2022,
			sourceType: 'module',
			globals: globals.browser,
			parser: tsEslint.parser,
		},
	},
	{
		name: 'node',
		files: ['**/*.{js,ts}'],
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
			'simple-import-sort': simpleImportSortPlugin,
			import: importPlugin,
		},
		rules: {
			'simple-import-sort/imports': [
				'error',
				{
					groups: [['^node:'], ['^'], ['^src/.*'], ['^\\.\\/.*'], ['^.+\\.css$']],
				},
			],
			'simple-import-sort/exports': 'error',
			'import/first': 'error',
			'import/newline-after-import': 'error',
			'import/no-duplicates': 'error',
		},
	},
	prettierPlugin
);

export default config;
