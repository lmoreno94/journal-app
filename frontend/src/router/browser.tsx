import type { RouteObject } from "react-router-dom";
import { lazy } from "react";

const BasicLayout = lazy(() => import('../components/BasicLayout'));

export const routerNavigator: RouteObject[] = [
	{
		path: "",
		children: [
			{
				path: "",
				element: <h1>Home App Screen</h1>
			},
			{
				path: "mis_notas",
				element: <BasicLayout />
			},
		],
		
	}
];

//https://stackoverflow.com/questions/72198467/config-route-in-react-router-dom-v6