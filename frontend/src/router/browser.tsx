import type { RouteObject } from "react-router-dom";
import { lazy } from "react";

const BasicLayout = lazy(() => import("../components/BasicLayout"));
const Inicio = lazy(() => import("../pages/Inicio"));

export const routerNavigator: RouteObject[] = [
	{
		path: "",
		children: [
			{
				path: "",
				element: <h1>Home App Screen</h1>,
			},
			{
				path: "mis_notas",
				element: <BasicLayout />,
				children: [
					{
						path: "",
						element: <Inicio />,
					},
					{
						path: "favorites",
						element: <h1>Favorites Screen</h1>,
					},
					{
						path: "archived",
						element: <h1>Archived Screen</h1>,
					},
					{
						path: "settings",
						element: <h1>configuration Screen</h1>,
					},
				],
			},
		],
	},
];

//https://stackoverflow.com/questions/72198467/config-route-in-react-router-dom-v6
