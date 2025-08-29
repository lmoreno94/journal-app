import { type RouteObject } from "react-router-dom";
import Inicio from "../pages/Inicio";

import { useAppSelector } from "../hooks/useDispatchSelector";

export const routesDynamics = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { categories } = useAppSelector((state) => state.categorieState);

    const dynamicRoutes: RouteObject[] = categories.map((cat) => ({
        path: `${cat.value}`,
        element: <Inicio />,
    }));

    console.log('[ MSG ]', dynamicRoutes)

    return dynamicRoutes
}

