import { type Component, createSignal } from 'solid-js';

import { Nav } from 'src/client/components/Nav';

import styles from './styles.module.css';

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
			<input class={styles.input} />
		</div>
	);
};

export default SearchPage;
