import { renderToStream } from 'solid-js/web';

import { App, type AppProps } from 'src/client/app/App';

export const render = (props: Required<AppProps>) => renderToStream(() => <App {...props} />);
