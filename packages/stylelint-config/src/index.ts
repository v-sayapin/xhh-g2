import type { Config } from 'stylelint';

const kebabCase = '[a-z]+(?:-[a-z]+)*';
const bemCase = `${kebabCase}(__${kebabCase})?(_${kebabCase}){0,2}`;

const config: Config = {
	extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],
	rules: {
		'selector-class-pattern': [
			`^(${bemCase})$`,
			{
				resolveNestedSelectors: true,
				message: 'Expected class selector in kebab-case or BEM-case format',
			},
		],
		'selector-max-id': [0, { message: 'Id selector are not allowed' }],
	},
};

export default config;
