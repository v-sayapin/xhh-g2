import { resolve } from 'node:path';

import browserslistToEsbuild from 'browserslist-to-esbuild';
import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

const dirname = import.meta.dirname;

const config = defineConfig(({ isSsrBuild }) => ({
	resolve: {
		alias: {
			'src/client': resolve(import.meta.dirname, 'src/client'),
		},
	},
	plugins: [solid({ ssr: true, solid: { hydratable: true } })],
	build: {
		manifest: !isSsrBuild,
		rollupOptions: {
			input: resolve(dirname, isSsrBuild ? 'src/render.tsx' : 'src/hydrate.tsx'),
			output: [
				isSsrBuild
					? {
							dir: 'dist/server',
							entryFileNames: 'render.js',
							format: 'esm',
						}
					: {
							dir: 'dist/client',
							entryFileNames: '[name]-[hash].js',
							format: 'esm',
							assetFileNames: 'assets/[name]-[hash].[ext]',
						},
			],
		},
		target: browserslistToEsbuild(),
		minify: 'esbuild',
		cssMinify: 'esbuild',
		cssCodeSplit: true,
		emptyOutDir: false,
	},
	logLevel: 'info',
}));

export default config;
