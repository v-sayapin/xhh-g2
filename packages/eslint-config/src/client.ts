import solidPlugin from 'eslint-plugin-solid/configs/typescript';
import globals from 'globals';
import tsEslint, { type InfiniteDepthConfigWithExtends } from 'typescript-eslint';

export const clientPlugin: InfiniteDepthConfigWithExtends = {
	name: 'browser',
	...solidPlugin,
	languageOptions: {
		ecmaVersion: 2022,
		sourceType: 'module',
		globals: globals.browser,
		parser: tsEslint.parser,
	},
};
