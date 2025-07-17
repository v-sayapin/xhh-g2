/**
 * @filename: stylelint.config.js
 * @type {import('stylelint').Config}
 */
const config = {
	extends: ['stylelint-config'],
	ignoreFiles: ['**/*', '!**/*.css', '**/node_modules/**', '**/dist/**', '**/lib/**'],
};

export default config;
