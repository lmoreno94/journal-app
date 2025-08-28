import {
	useAppSelector,
	useAppDispatch,
} from "../../../hooks/useDispatchSelector";
import { setShow } from "../../../redux/features/Sidebar";
import { X, type LucideProps } from "lucide-react";
import * as Icons from "lucide-react";
import { Link, useNavigation } from "react-router-dom";

type LucideCmp = React.ComponentType<LucideProps>;

const DynamicIcon = ({ name, ...props }: { name: string } & LucideProps) => {
	const Icon = (Icons as unknown as Record<string, LucideCmp>)[name];
	if (!Icon) {
		console.warn(`⚠️ Icon "${name}" no existe en lucide-react`);
		return <Icons.HelpCircle {...props} />;
	}
	return <Icon {...props} />;
};

export default function Sidebar() {
	const { show, menu } = useAppSelector((state) => state.sidebarState );
	const { categories } = useAppSelector((state) => state.categorieState );

	const dispatch = useAppDispatch();
	const navigation = useNavigation();
	const currentPath = navigation.location
		? navigation.location.pathname
		: window.location.pathname;

	const handleShowSidebar = () => {
		dispatch(setShow());
	};

	return (
		<>
			{/* Overlay para móvil */}
			{show && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
					onClick={() => handleShowSidebar()}
				/>
			)}

			{/* Sidebar */}
			<div
				className={` fixed lg:static inset-y-0 left-0 z-50
                w-64 bg-white border-r border-gray-200
                transform transition-transform duration-300 ease-in-out
                ${
									show ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
								} `}
			>
				<div className="flex flex-col h-full">
					{/* Header */}
					<div className="flex items-center justify-between p-4 border-b border-gray-200">
						<h1 className="text-xl font-bold text-gray-800">Mis Notas</h1>
						<button
							onClick={() => handleShowSidebar()}
							className="lg:hidden p-1 hover:bg-gray-100 rounded"
						>
							<X size={20} />
						</button>
					</div>

					{/* Navigation */}
					<nav className="flex-1 p-4">
						<div className="space-y-2">
							{menu.map((item) => (
								<Link
									key={item.path}
									to={item.path}
									className={`
                    flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors w-full text-left
                    ${
											currentPath === item.path
												? "bg-blue-100 text-blue-700"
												: "text-gray-600 hover:bg-gray-100"
										}
                  `}
								>
									<DynamicIcon name={item.icon} size={18} />
									<span>{item.label}</span>
								</Link>
							))}
						</div>

						{/* Categories */}
						<div className="mt-8">
							<h3 className="text-sm font-medium text-gray-500 mb-3">
								Categorías
							</h3>
							<div className="space-y-2">
								{categories.map((category) => {
									// const categoryNotes = notes.filter(
									// 	(note) => note.category === category.value
									// );
									const categoryNotes = []; // Placeholder for actual notes filtering
									return (
										<button
											key={category.value}
											// onClick={() => handleNavigation("/", category.value)}
											className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-left hover:bg-gray-50 transition-colors"
										>
											<div className="flex items-center space-x-2">
												<div
													className={`w-3 h-3 rounded-full ${category.bgColor} flex-shrink-0`}
												/>
												<span className="text-sm text-gray-600">
													{category.label}
												</span>
											</div>
											<span className="text-xs text-gray-400">
												{categoryNotes.length}
											</span>
										</button>
									);
								})}
							</div>
						</div>
					</nav>
				</div>
			</div>
		</>
	);
}
