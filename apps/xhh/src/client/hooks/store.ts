import { useContext } from 'solid-js';

import { StoreContext } from 'src/client/app/store/Provider';

export const useRawState = () => {
	const context = useContext(StoreContext);
	if (!context) {
		throw new Error('[store] missing provider');
	}
	return context;
};

export const useState = () => useRawState().state;

export const useDispatch = () => useRawState().dispatch;
