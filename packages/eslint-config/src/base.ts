import jsEslint from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier/recommended';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';
import tsEslint from 'typescript-eslint';

export const baseConfig = [
	jsEslint.configs.recommended,
	tsEslint.configs.recommended,
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
	prettierPlugin,
];
