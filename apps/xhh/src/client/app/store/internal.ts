import { batch } from 'solid-js';
import { createStore as createStoreOriginal, type SetStoreFunction } from 'solid-js/store';

/* eslint-disable @typescript-eslint/no-explicit-any */

type PayloadMap<T> = Record<string, T>;
type AnyPayloadMap = PayloadMap<any>;

type Action<T extends string, P = any> = {
	type: T;
	payload: P;
};
type ActionCreator<T extends string, P = any> = (payload: P) => Action<T, P>;
type ActionCreatorMap<N extends string, P = AnyPayloadMap> = {
	[K in keyof P & string]: ActionCreator<`${N}/${K}`, P[K]>;
};

type Reducer<IS = any, P = void> = (state: IS, action: Action<any, P>) => IS | void;
type ReducerMap<IS = any, PM = AnyPayloadMap> = {
	[K in keyof PM]: Reducer<IS, PM[K]>;
};

type Slice<IS = any, PM = AnyPayloadMap, N extends string = string> = {
	name: N;
	initialState: IS;
	reducers: ReducerMap<IS, PM>;
	actions: ActionCreatorMap<N, PM>;
};
type StaticSlice<IS = any> = {
	initialState: IS;
	reducers: object;
	actions: object;
};
type SliceMap = Record<string, Slice | StaticSlice>;

export const createSlice = <IS, PM, N extends string = string>({
	name,
	initialState,
	reducers,
}: {
	name: N;
	initialState: IS;
	reducers: ReducerMap<IS, PM>;
}): Slice<IS, PM, N> => {
	const actions = {} as ActionCreatorMap<N, PM>;
	for (const reducerKey in reducers) {
		actions[reducerKey] = (payload) => ({ type: `${name}/${reducerKey}`, payload });
	}

	return { name, initialState, reducers, actions };
};

export const createStaticSlice = <IS>(initialState: IS): StaticSlice<IS> => ({
	initialState,
	reducers: {},
	actions: {},
});

export type State<SM extends SliceMap> = {
	[K in keyof SM]: SM[K]['initialState'];
};

type ExtractStateAction<SM extends SliceMap> = {
	[K in keyof SM]: SM[K]['actions'] extends Record<string, (...args: Array<any>) => any>
		? SM[K]['actions'][keyof SM[K]['actions']]
		: never;
}[keyof SM];

type AnyStateAction<SM extends SliceMap> = ReturnType<ExtractStateAction<SM>>;

export type Dispatch<SM extends SliceMap> = (
	action: ReturnType<ExtractStateAction<SM>> | Array<ReturnType<ExtractStateAction<SM>>>
) => void;

const buildReducerIndex = <SM extends SliceMap>(
	slices: SM,
	state: State<SM>,
	setState: SetStoreFunction<State<SM>>
) => {
	const index: Record<string, (action: AnyStateAction<SM>) => void> = {};

	for (const sliceKey in slices) {
		const slice = slices[sliceKey];
		if (!('name' in slice)) {
			continue;
		}

		const { name, reducers } = slice;
		for (const reducerKey in reducers) {
			const type = `${name}/${reducerKey}` as const;
			if (index[type]) {
				throw new Error(`[store] duplicate reducer for action «${type}»`);
			}

			index[type] = (action) => {
				const prev = state[sliceKey];
				const next = reducers[reducerKey](prev, action) ?? prev;
				if (next === prev) {
					return;
				}
				setState(sliceKey as any, next);
			};
		}
	}

	return index;
};

export const createStore = <SM extends SliceMap>(
	slices: SM,
	preloaded?: Partial<State<SM>>
): {
	state: State<SM>;
	dispatch: Dispatch<SM>;
} => {
	const combinedInitialState = {} as State<SM>;
	for (const sliceKey in slices) {
		combinedInitialState[sliceKey] = slices[sliceKey].initialState;
	}

	const [state, setState] = createStoreOriginal({ ...combinedInitialState, ...preloaded });

	const reducerIndex = buildReducerIndex(slices, state, setState);

	const dispatch: Dispatch<SM> = (oneOrManyActions) => {
		const actions = Array.isArray(oneOrManyActions) ? oneOrManyActions : [oneOrManyActions];
		batch(() => {
			actions.forEach((action) => reducerIndex[action.type]?.(action));
		});
	};

	return { state, dispatch };
};
