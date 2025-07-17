import { readdir } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { pathToFileURL } from 'node:url';

import type { FastifyInstance, onSendAsyncHookHandler } from 'fastify';

const FILE_REGEXP = /((?<!\.d)\.ts)|\.js$/i;
const FILE_EXT_REGEXP = /\.[^.]+$/;

const HTTP_METHODS = ['get', 'post', 'put', 'delete'];

const flatDirectoryTree = async (rootDir: string): Promise<Array<string>> => {
	const entries = await readdir(rootDir, { withFileTypes: true });

	const tasks = entries.map(async (entry) => {
		const fullPath = join(rootDir, entry.name);

		if (entry.isDirectory()) {
			return flatDirectoryTree(fullPath);
		}

		return FILE_REGEXP.test(entry.name) ? [fullPath] : [];
	});

	return (await Promise.all(tasks)).flat();
};

const toRoutePath = (rootDir: string, file: string) =>
	`/${relative(rootDir, file)
		.replace(FILE_EXT_REGEXP, '')
		.split(sep)
		.filter((section) => section && section !== 'index')
		.join('/')}`;

type Options = {
	rootDir: string;
	globalPostProcessor?: onSendAsyncHookHandler;
};

type RegisterFileBasedRoutesFunction = (instance: FastifyInstance, opts: Options) => Promise<void>;

export const registerFileBasedRoutes: RegisterFileBasedRoutesFunction = async (instance, opts) => {
	const { rootDir, globalPostProcessor } = opts;

	const files = await flatDirectoryTree(rootDir);

	await Promise.all(
		files.map(async (file) => {
			const route = toRoutePath(rootDir, file);
			const module = await import(pathToFileURL(file).href);

			HTTP_METHODS.filter((method) => typeof module[method] === 'function').forEach((method) =>
				instance.route({
					method,
					url: route,
					handler: async (...args) => module[method](instance, ...args),
					onSend: globalPostProcessor,
				})
			);
		})
	);
};
