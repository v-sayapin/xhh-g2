import * as console from 'node:console';

import type { FastifyInstance } from 'fastify';

import { isProduction } from 'src/server/utils/env';

export const get = async (handler: FastifyInstance) => {
	console.log(isProduction);
	handler.putState({
		pageMetaData: {
			title: 'Search page',
		},
	});
};
