import globals from 'globals';
import tsEslint, { type InfiniteDepthConfigWithExtends } from 'typescript-eslint';

export const nodePlugin: InfiniteDepthConfigWithExtends = {
	name: 'node',
	languageOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		globals: globals.node,
		parser: tsEslint.parser,
	},
};
