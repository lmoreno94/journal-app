import { Moon, Sun } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../../hooks/useDispatchSelector";
import { setTheme } from "../../../redux/features/Theme";

export default function ThemeSwitch() {
	const dispatch = useAppDispatch();
	const { theme } = useAppSelector((state) => state.themeState);

	const toggleTheme = () => {
		const newTheme = theme === 'dark' ? 'light' : 'dark';
		dispatch(setTheme({ theme: newTheme }));
	}

	return (
		<div className="flex items-center space-x-3">
			<Sun
				size={16}
				className={`transition-colors ${
					theme === 'dark' ? "text-gray-400" : "text-yellow-500"
				}`}
			/>
			<button
				onClick={() =>toggleTheme()}
				className={`
          relative inline-flex h-6 w-11 items-center rounded-full transition-colors
          ${theme === 'dark' ? "bg-blue-600" : "bg-gray-300"}
        `}
				role="switch"
				aria-checked={theme === 'dark' ? true : false}
				aria-label="Toggle dark mode"
			>
				<span
					className={`
            inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform
            ${theme === 'dark' ? "translate-x-6" : "translate-x-1"}
          `}
				/>
			</button>
			<Moon
				size={16}
				className={`transition-colors ${
					theme === 'dark' ? "text-blue-400" : "text-gray-400"
				}`}
			/>
		</div>
	);
}
