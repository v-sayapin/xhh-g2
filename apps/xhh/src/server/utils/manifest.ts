import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import type { Manifest, ManifestChunk } from 'vite';

export const loadManifest = async (root: string) =>
	JSON.parse(await readFile(join(root, '.vite', 'manifest.json'), 'utf-8')) as Manifest;

export type Assets = {
	styles: Array<string>;
	preloads: Array<string>;
};

export const collectAssets = (manifest: Manifest, entry: string): Assets => {
	const visited = new Set<string>();
	const css = new Set<string>();
	const imports = new Set<string>();

	const walk = (name: string) => {
		if (visited.has(name)) {
			return;
		}
		visited.add(name);

		const chunk = manifest[name] as ManifestChunk | undefined;
		if (!chunk) {
			return;
		}

		chunk.css?.forEach((path) => css.add(`/${path}`));

		chunk.imports?.forEach((path) => {
			const chunk = manifest[path] as ManifestChunk | undefined;
			if (chunk?.file) {
				imports.add(`/${chunk.file}`);
			}
			walk(path);
		});
	};

	walk(entry);

	return { styles: Array.from(css).sort(), preloads: Array.from(imports).sort() };
};
