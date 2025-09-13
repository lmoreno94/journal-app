import { type RouteObject } from "react-router-dom";
import { lazy } from "react";
import { useAppSelector } from "../hooks/useDispatchSelector";
import type { Category } from "../components/interfaces/Category";

const BasicLayout = lazy(() => import("../components/BasicLayout"));
const Inicio = lazy(() => import("../pages/Inicio"));
const Setting = lazy(() => import("../pages/Setting"));
const NoteForm = lazy(() => import("../components/Note/NoteForm"));
const NotFound = lazy(() => import("../pages/NotFound"));


function routesDynamics(categories: Category[]): RouteObject[] {

	const dynamicRoutes = categories.map((cat) => ({
		path: `${cat.value}`,
		element: <Inicio />,
	}));


	return dynamicRoutes;
}

export function useRouterNavigator(): RouteObject[] {
	const { categories } = useAppSelector((state) => state.categorieState);

	return [
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
						...routesDynamics(categories),
						{
							path: "nueva_nota",
							element: <NoteForm />,
						},
						{
							path: "editar_nota/:id",
							element: <NoteForm />,
						},
					],
				},
			],
		},
		{
			path: "*", // Catch-all route for 404
			element: <NotFound />,
		},
	];
}

//https://stackoverflow.com/questions/72198467/config-route-in-react-router-dom-v6
