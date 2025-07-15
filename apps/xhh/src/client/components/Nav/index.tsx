import type { Component } from 'solid-js';

import { useState } from 'src/client/hooks/store';

import './styles.css';

export const Nav: Component = () => {
	const { title } = useState().pageMetaData;

	return (
		<>
			<div>title state from bff: {title}</div>
			<nav class='nav'>
				<a href='/'>Go to Index page</a>
				<a href='/search'>Go to Search page</a>
			</nav>
		</>
	);
};
