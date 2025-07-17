import type { FastifyInstance } from 'fastify';

export const get = async (handler: FastifyInstance) => {
	handler.putState({
		pageMetaData: {
			title: 'Search page',
		},
	});
};
