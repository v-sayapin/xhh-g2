type Awaitable<T> = Promise<T> | PromiseLike<T>;
type AsyncTask<T> = Awaitable<T> | (() => Awaitable<T>) | null | undefined;

export const runTask = async <T>(task: AsyncTask<T>) => {
	if (task === null || task === undefined) {
		return null;
	}
	return typeof task === 'function' ? await task() : await task;
};

export const gatherList = async <T>(...tasks: Array<AsyncTask<T>>) => Promise.all(tasks.map(runTask));

export const gatherDict = async <T extends Record<string, unknown>>(taskMap: {
	[K in keyof T]: AsyncTask<T[K]>;
}) => {
	const entries = Object.entries(taskMap) as Array<[keyof T, AsyncTask<T[keyof T]>]>;
	const results = await gatherList(...entries.map(([, v]) => v));
	return Object.fromEntries(entries.map(([key], index) => [key, results[index]])) as { [K in keyof T]: T[K] | null };
};
