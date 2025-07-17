import { type Component, createSignal } from 'solid-js';

import { Nav } from 'src/client/components/Nav';

const IndexPage: Component = () => {
	const [count, setCount] = createSignal(0);

	return (
		<div>
			<Nav />
			Index page
			<button
				type='button'
				onClick={() => {
					setCount((prevState) => prevState + 1);
				}}>
				{count()}
			</button>
		</div>
	);
};

export default IndexPage;
