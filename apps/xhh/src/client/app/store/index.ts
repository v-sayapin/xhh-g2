import { createStaticSlice, type State } from 'src/client/app/store/internal';

export const slices = {
	pageMetaData: createStaticSlice({ title: '' }),
};

export type AppState = State<typeof slices>;
