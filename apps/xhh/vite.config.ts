import { resolve } from 'node:path';

import browserslistToEsbuild from 'browserslist-to-esbuild';
import devtools from 'solid-devtools/vite';
import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

const dirname = import.meta.dirname;

const config = defineConfig(({ isSsrBuild }) => ({
	resolve: {
		alias: {
			'src/client': resolve(dirname, 'src/client'),
		},
	},
	plugins: [devtools({ autoname: true }), solid({ ssr: true, solid: { hydratable: true } })],
	build: {
		manifest: !isSsrBuild,
		outDir: isSsrBuild ? 'dist/server' : 'dist/client',
		rollupOptions: {
			input: resolve(dirname, isSsrBuild ? 'src/render.tsx' : 'src/hydrate.tsx'),
		},
		target: browserslistToEsbuild(),
		minify: 'esbuild',
		cssMinify: 'esbuild',
		cssCodeSplit: true,
		emptyOutDir: false,
	},
	css: {
		modules: {
			localsConvention: 'camelCaseOnly',
		},
	},
	logLevel: 'info',
}));

export default config;
