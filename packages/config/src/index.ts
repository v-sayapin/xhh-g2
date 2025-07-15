export const port = {
	api: 1000,
	xhh: 2000,
} as const;

export type port = (typeof port)[keyof typeof port];

export const host = {
	api: `http://localhost:${port.api}`,
	xhh: `http://localhost:${port.xhh}`,
} as const;

export type host = (typeof host)[keyof typeof host];
