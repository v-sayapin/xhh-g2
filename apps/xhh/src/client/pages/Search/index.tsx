import { type Component, createSignal } from 'solid-js';

import { Nav } from 'src/client/components/Nav';

const SearchPage: Component = () => {
	const [count, setCount] = createSignal(10);

	return (
		<div>
			<Nav />
			Search page
			<button
				type='button'
				onClick={() => {
					setCount((prevState) => prevState + 10);
				}}>
				{count()}
			</button>
		</div>
	);
};

export default SearchPage;
