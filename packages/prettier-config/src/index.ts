import type { Config } from 'prettier';

const config: Config = {
	useTabs: true,
	tabWidth: 4,

	printWidth: 120,
	proseWrap: 'preserve',
	endOfLine: 'lf',

	singleQuote: true,
	jsxSingleQuote: true,

	bracketSpacing: true,
	bracketSameLine: true,
	arrowParens: 'always',
	trailingComma: 'es5',
	semi: true,

	overrides: [
		{
			files: ['*.html', '*.json', '*.yaml', '*.yml'],
			options: {
				useTabs: true,
				tabWidth: 2,
			},
		},
		{
			files: '*.md',
			options: {
				proseWrap: 'always',
			},
		},
	],
};

export default config;
