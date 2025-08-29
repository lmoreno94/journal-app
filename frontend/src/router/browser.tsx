import type { RouteObject } from "react-router-dom";
import { lazy } from "react";

const BasicLayout = lazy(() => import("../components/BasicLayout"));
const Inicio = lazy(() => import("../pages/Inicio"));
const Setting = lazy(() => import("../pages/Setting"));

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
						element: <Inicio />,
					},
					{
						path: "archived",
						element: <Inicio />,
					},
					{
						path: "settings",
						element: <Setting />,
					},
				],
			},
		],
	},
];

//https://stackoverflow.com/questions/72198467/config-route-in-react-router-dom-v6
