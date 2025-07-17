/* @refresh reload */

import { hydrate } from 'solid-js/web';

import { App } from 'src/client/app/App';

if (import.meta.env.DEV) {
	await import('solid-devtools');
}

hydrate(() => <App />, document);
