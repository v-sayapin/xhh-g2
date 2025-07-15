import { join } from 'node:path';
import type { PipelineSource } from 'node:stream';
import { pipeline } from 'node:stream/promises';

import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

import { clientDistDir, isProduction, serverDistDir, srcDir } from 'src/server/utils/env';
import { collectAssets, loadManifest } from 'src/server/utils/manifest';

const HYDRATE_ENTRY = 'src/hydrate.tsx';
const RENDER_ENTRY = join(srcDir, 'render.tsx');
const RENDER_ENTRY_PRODUCTION = join(serverDistDir, 'render.js');

type RenderProps = {
	url: string;
	initialState: Record<string, unknown>;
	entry: string;
	styles: Array<string>;
	preloads: Array<string>;
	production: boolean;
};
type RenderFunction = (props: RenderProps) => PipelineSource<unknown>;

const getRenderFunction = async (app: FastifyInstance): Promise<Record<'render', RenderFunction>> =>
	isProduction ? import(RENDER_ENTRY_PRODUCTION) : app.vite.ssrLoadModule(RENDER_ENTRY);

const getHydrateAssets = async () => {
	if (!isProduction) {
		return { entry: `/${HYDRATE_ENTRY}`, styles: [], preloads: [] };
	}

	const manifest = await loadManifest(clientDistDir);

	const entry = `/${manifest[HYDRATE_ENTRY].file}`;
	const { styles, preloads } = collectAssets(manifest, HYDRATE_ENTRY);

	return { entry, styles, preloads };
};

export const getSsrPostProcessor = async (app: FastifyInstance) => {
	const { render } = await getRenderFunction(app);
	const hydrateAssets = await getHydrateAssets();

	return async (request: FastifyRequest, reply: FastifyReply) => {
		reply.raw.write('<!DOCTYPE html>');

		const stream = render({
			...hydrateAssets,
			url: request.raw.url ?? '/',
			initialState: request.server.state,
			production: isProduction,
		});
		await pipeline(stream, reply.raw);

		return stream;
	};
};
