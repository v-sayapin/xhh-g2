import type { NextHandleFunction } from '@fastify/middie';
import middie from '@fastify/middie';
import type { FastifyPluginAsync } from 'fastify';
import plugin from 'fastify-plugin';
import type { InlineConfig, ViteDevServer } from 'vite';
import { createServer } from 'vite';

declare module 'fastify' {
	interface FastifyInstance {
		vite: ViteDevServer;
		use: (fn: NextHandleFunction) => this;
	}
}

const vitePluginDecorator: FastifyPluginAsync<InlineConfig> = async (fastify, opts) => {
	const vite = await createServer(opts);

	fastify.decorate('vite', vite);

	await fastify.register(middie);
	fastify.use(vite.middlewares);

	fastify.addHook('onClose', async () => await vite.close());
};

export const vitePlugin = plugin(vitePluginDecorator, { name: 'vite' });
