import { createContext, type ParentComponent } from 'solid-js';

import { slices } from 'src/client/app/store';
import { createStore, type Dispatch, type State } from 'src/client/app/store/internal';

type AppStore<SM extends typeof slices = typeof slices> = {
	state: State<SM>;
	dispatch: Dispatch<SM>;
};

export const StoreContext = createContext<AppStore>();

export const StoreProvider: ParentComponent<{ initialState?: Partial<State<typeof slices>> }> = (props) => {
	const store = createStore(slices, props.initialState);

	return <StoreContext.Provider value={store}>{props.children}</StoreContext.Provider>;
};
