import { Suspense, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../../theme/theme";
import { useRouterNavigator } from "../../router/browser";

export default function App() {
	const router = createBrowserRouter(useRouterNavigator());
	const [isDarkMode] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches);

	return (
		<ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
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
