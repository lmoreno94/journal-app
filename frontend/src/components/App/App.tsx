import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useRouterNavigator } from "../../router/browser";

export default function App() {
	const router = createBrowserRouter(useRouterNavigator());
	return (
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
	);
}
