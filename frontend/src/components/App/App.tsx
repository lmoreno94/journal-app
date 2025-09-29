import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { dark } from "../../theme/dark";
import { light } from "../../theme/light";
import { GlobalStyles } from "../../theme/reset";
import { useRouterNavigator } from "../../router/browser";
import { useAppSelector } from "../../hooks/useDispatchSelector";

export default function App() {
	const router = createBrowserRouter(useRouterNavigator());
	const { theme } = useAppSelector((state) => state.themeState);

	return (
		<ThemeProvider theme={theme === 'light' ? light : dark}>
			<GlobalStyles />
			<Suspense
				fallback={
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							height: "100%",
						}}
					>
						Loading...
					</div>
				}
			>
				<RouterProvider router={router} />
			</Suspense>
		</ThemeProvider>
	);
}
