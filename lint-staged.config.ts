import type { Configuration } from 'lint-staged';

const config: Configuration = {
	'*.{js,ts}': ['yarn eslint --fix'],
	'*.{ts,tsx,d.ts}': () => 'yarn tsc --noEmit',
	'*.css': ['yarn stylelint --fix'],
	'*.{md,json,yaml,yml}': ['yarn prettier --write'],
};

export default config;
