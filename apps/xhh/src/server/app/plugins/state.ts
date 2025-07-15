import type { FastifyPluginAsync } from 'fastify';
import plugin from 'fastify-plugin';

declare module 'fastify' {
	interface FastifyInstance {
		state: Record<string, unknown>;
		putState: (patch: Record<string, unknown>) => void;
	}
}

const statePluginDecorator: FastifyPluginAsync = async (fastify) => {
	fastify.decorate('state', {});
	fastify.decorate('putState', (patch: Record<string, unknown>) => Object.assign(fastify.state, patch));
};

export const statePlugin = plugin(statePluginDecorator, { name: 'state' });
