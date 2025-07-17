import { useNavigate } from '@solidjs/router';
import type { Component } from 'solid-js';

import { useState } from 'src/client/hooks/store';

import styles from './styles.module.css';

export const Nav: Component = () => {
	const { title } = useState().pageMetaData;
	const navigate = useNavigate();

	return (
		<>
			<div>title state from bff: {title}</div>
			<nav class={styles.nav}>
				<a href='/'>Go to Index page</a>
				<a href='/search'>Go to Search page</a>
				<button onClick={() => navigate('/', { replace: true })}>Go to Index page</button>
				<button onClick={() => navigate('/search', { replace: true })}>Go to Search page</button>
			</nav>
		</>
	);
};
