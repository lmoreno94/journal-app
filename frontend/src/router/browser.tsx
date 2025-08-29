import { type RouteObject } from "react-router-dom";
import { lazy } from "react";
import { routesDynamics } from "./dynamicRoutes";

const BasicLayout = lazy(() => import("../components/BasicLayout"));
const Inicio = lazy(() => import("../pages/Inicio"));
const Setting = lazy(() => import("../pages/Setting"));
const NotFound = lazy(() => import("../pages/NotFound"));

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
					{
						path: "personal",
						element: <Inicio />,
					},
					// ...routesDynamics(),
				],
			},
		],
	},
	{
		path: "*", // Catch-all route for 404
		element: <NotFound />,
	},
];

//https://stackoverflow.com/questions/72198467/config-route-in-react-router-dom-v6
