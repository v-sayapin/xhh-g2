import { type Component, lazy } from 'solid-js';

type Route = {
	path: Array<string> | string;
	component: Component;
};

type RouteList = Array<Route>;

export const routes: RouteList = [
	{ path: '/', component: lazy(() => import('src/client/pages/Index')) },
	{ path: '/search', component: lazy(() => import('src/client/pages/Search')) },
];
