import { join } from 'node:path';
import * as process from 'node:process';

type Mode = 'development' | 'production';

export const mode: Mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';

export const isProduction = mode === 'production';
export const isDevelopment = mode === 'development';

export const rootDir = join(import.meta.dirname, '../../..');
export const srcDir = join(rootDir, 'src');
export const clientDistDir = join(rootDir, 'dist/client');
export const serverDistDir = join(rootDir, 'dist/server');
