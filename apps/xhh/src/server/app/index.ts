import { join, resolve } from 'node:path';

import { port } from 'env-config';
import Fastify from 'fastify';

import { registerFileBasedRoutes } from 'src/server/app/fileBasedRoutes';
import { statePlugin } from 'src/server/app/plugins/state';
import { vitePlugin } from 'src/server/app/plugins/vite';
import { getSsrPostProcessor } from 'src/server/app/ssr';
import { gatherList } from 'src/server/utils/asyncio';
import { isProduction, rootDir } from 'src/server/utils/env';

const main = async () => {
	const app = Fastify({ logger: true });

	const tasks = [app.register(statePlugin)];

	if (isProduction) {
		tasks.push(
			app.register(import('@fastify/compress'), {
				global: true,
				encodings: ['gzip'],
			})
		);
		tasks.push(
			app.register(import('@fastify/static'), {
				root: join(import.meta.dirname, '../..', 'client'),
				prefix: '/',
				maxAge: 60 * 60 * 24 * 365,
				index: false,
			})
		);
	} else {
		tasks.push(
			app.register(vitePlugin, {
				root: rootDir,
				cacheDir: resolve(rootDir, 'node_modules/.vite-temp'),
				configLoader: 'runner',
				logLevel: 'info',
				appType: 'custom',
				server: {
					middlewareMode: true,
					fs: { allow: [rootDir] },
				},
			})
		);
	}

	await gatherList(...tasks);

	const ssrPostProcessor = await getSsrPostProcessor(app);

	await registerFileBasedRoutes(app, {
		rootDir: join(import.meta.dirname, '..', 'pages'),
		globalPostProcessor: ssrPostProcessor,
	});

	app.setNotFoundHandler((_, reply) => reply.code(404).type('text/plain').send('Not found'));

	await app.listen({ host: 'localhost', port: port.xhh });
};

void main();
