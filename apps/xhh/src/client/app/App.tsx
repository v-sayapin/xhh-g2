import type { Component } from 'solid-js';
import { For } from 'solid-js';
import { HydrationScript } from 'solid-js/web';

import { AppRouter } from 'src/client/app/Router';
import type { AppState } from 'src/client/app/store';
import { StoreProvider } from 'src/client/app/store/Provider';

import './reset.css';

export type AppProps = {
	url?: string;
	initialState?: Partial<AppState>;
	entry?: string;
	styles?: Array<string>;
	preloads?: Array<string>;
	production?: boolean;
};

export const App: Component<AppProps> = (props) => {
	return (
		<html lang='en'>
			<head>
				<title>xhh-g2</title>
				<meta charset='UTF-8' />
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />

				{props.production && (
					<>
						{<For each={props.styles}>{(href) => <link rel='stylesheet' href={href} />}</For>}
						{<For each={props.preloads}>{(href) => <link rel='modulepreload' href={href} />}</For>}
					</>
				)}
				{props.entry && <script type='module' src={props.entry} defer />}

				<HydrationScript />
			</head>
			<body>
				<StoreProvider initialState={props.initialState}>
					<AppRouter url={props.url} />
				</StoreProvider>
			</body>
		</html>
	);
};
