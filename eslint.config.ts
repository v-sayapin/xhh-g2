import { fileURLToPath, URL } from 'node:url';

import { includeIgnoreFile } from '@eslint/compat';
import { baseConfig, clientPlugin, nodePlugin } from 'eslint-config';
import tsEslint from 'typescript-eslint';

const prettierIgnorePath = fileURLToPath(new URL('.prettierignore', import.meta.url));

const config = tsEslint.config(
	includeIgnoreFile(prettierIgnorePath, 'Imported .prettierignore patterns'),
	...baseConfig,
	{
		name: 'xhh-client',
		extends: [clientPlugin],
		files: ['apps/xhh/src/client/**/*.{ts,tsx}', 'src/hydrate.tsx', 'src/render.tsx'],
	},
	{
		name: 'node',
		extends: [nodePlugin],
		files: ['{*,apps/*/*}.{js,ts}'],
	}
);

export default config;
