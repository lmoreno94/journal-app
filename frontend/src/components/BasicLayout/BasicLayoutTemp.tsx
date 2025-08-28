import React, { useState } from "react";
import {
	PlusCircle,
	FileText,
	Search,
	Menu,
	X,
	Edit3,
	Trash2,
	Save,
	Home,
	Star,
	Archive,
	Settings,
	ArrowLeft,
	Sun,
	Moon,
} from "lucide-react";

// Sistema de enrutado simple personalizado
const useRouter = () => {
	const [currentPath, setCurrentPath] = useState(() => {
		if (typeof window !== "undefined") {
			return window.location.hash.replace("#", "") || "/";
		}
		return "/";
	});

	const navigate = (path) => {
		setCurrentPath(path);
		if (typeof window !== "undefined") {
			window.location.hash = path;
		}
	};

	React.useEffect(() => {
		const handleHashChange = () => {
			setCurrentPath(window.location.hash.replace("#", "") || "/");
		};

		window.addEventListener("hashchange", handleHashChange);
		return () => window.removeEventListener("hashchange", handleHashChange);
	}, []);

	return { currentPath, navigate };
};

// Store de Zustand para manejar el estado de las notas
const useNotesStore = (() => {
	let store = {
		notes: [
			{
				id: "1",
				title: "Bienvenido a tu Dashboard",
				content:
					"Esta es tu primera nota. Puedes editarla, eliminarla o crear nuevas notas. Usa el menú lateral para navegar entre diferentes secciones.",
				category: "personal",
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				isFavorite: false,
				isArchived: false,
			},
			{
				id: "2",
				title: "Ideas para el proyecto",
				content:
					"Implementar sistema de etiquetas, agregar búsqueda avanzada, crear modo oscuro.",
				category: "trabajo",
				createdAt: new Date(Date.now() - 86400000).toISOString(),
				updatedAt: new Date(Date.now() - 86400000).toISOString(),
				isFavorite: true,
				isArchived: false,
			},
		],
		categories: [
			{ id: "personal", label: "Personal", color: "blue" },
			{ id: "trabajo", label: "Trabajo", color: "green" },
			{ id: "ideas", label: "Ideas", color: "purple" },
			{ id: "recordatorios", label: "Recordatorios", color: "orange" },
		],
		searchTerm: "",
		selectedCategory: "all",
		darkMode: false,
		listeners: new Set(),
	};

	// Cargar desde localStorage
	if (typeof window !== "undefined") {
		const saved = localStorage.getItem("notes-storage");
		if (saved) {
			try {
				const parsed = JSON.parse(saved);
				store = { ...store, ...parsed, listeners: new Set() };
				// Aplicar tema guardado
				if (store.darkMode) {
					document.documentElement.classList.add("dark");
				}
			} catch (e) {
				console.warn("Error loading notes from storage:", e);
			}
		}
	}

	const notify = () => {
		store.listeners.forEach((listener) => listener());
		// Guardar en localStorage
		if (typeof window !== "undefined") {
			const { listeners, ...dataToSave } = store;
			localStorage.setItem("notes-storage", JSON.stringify(dataToSave));
		}
	};

	const actions = {
		subscribe: (listener) => {
			store.listeners.add(listener);
			return () => store.listeners.delete(listener);
		},

		getState: () => store,

		addNote: (note) => {
			store.notes.push({
				...note,
				id: Date.now().toString(),
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				isFavorite: false,
				isArchived: false,
			});
			notify();
		},

		updateNote: (id, updatedNote) => {
			store.notes = store.notes.map((note) =>
				note.id === id
					? { ...note, ...updatedNote, updatedAt: new Date().toISOString() }
					: note
			);
			notify();
		},

		deleteNote: (id) => {
			store.notes = store.notes.filter((note) => note.id !== id);
			notify();
		},

		toggleFavorite: (id) => {
			store.notes = store.notes.map((note) =>
				note.id === id ? { ...note, isFavorite: !note.isFavorite } : note
			);
			notify();
		},

		toggleArchive: (id) => {
			store.notes = store.notes.map((note) =>
				note.id === id ? { ...note, isArchived: !note.isArchived } : note
			);
			notify();
		},

		setSearchTerm: (term) => {
			store.searchTerm = term;
			notify();
		},

		setSelectedCategory: (category) => {
			store.selectedCategory = category;
			notify();
		},

		toggleDarkMode: () => {
			store.darkMode = !store.darkMode;
			// Aplicar clase dark al body
			if (typeof document !== "undefined") {
				document.documentElement.classList.toggle("dark", store.darkMode);
			}
			notify();
		},

		addCategory: (category) => {
			store.categories.push({
				...category,
				id: category.label.toLowerCase().replace(/\s+/g, "-"),
			});
			notify();
		},

		deleteCategory: (categoryId) => {
			// No permitir eliminar categorías que tienen notas
			const hasNotes = store.notes.some((note) => note.category === categoryId);
			if (!hasNotes) {
				store.categories = store.categories.filter(
					(cat) => cat.id !== categoryId
				);
				notify();
				return true;
			}
			return false;
		},

		getFilteredNotes: () => {
			return store.notes.filter((note) => {
				const matchesSearch =
					note.title.toLowerCase().includes(store.searchTerm.toLowerCase()) ||
					note.content.toLowerCase().includes(store.searchTerm.toLowerCase());

				const matchesCategory =
					store.selectedCategory === "all" ||
					(store.selectedCategory === "favorites" && note.isFavorite) ||
					(store.selectedCategory === "archived" && note.isArchived) ||
					store.selectedCategory === note.category;

				return matchesSearch && matchesCategory;
			});
		},
	};

	return () => {
		const [, forceUpdate] = React.useReducer((x) => x + 1, 0);

		React.useEffect(() => {
			return actions.subscribe(forceUpdate);
		}, []);

		return {
			...store,
			...actions,
		};
	};
})();

// Componente para crear nuevas categorías
const CategoryManager = ({ isOpen, onClose }) => {
	const { categories, addCategory, deleteCategory } = useNotesStore();
	const [newCategory, setNewCategory] = useState({ label: "", color: "blue" });

	const colorOptions = [
		{ name: "blue", bg: "bg-blue-500", text: "text-blue-500", label: "Azul" },
		{
			name: "green",
			bg: "bg-green-500",
			text: "text-green-500",
			label: "Verde",
		},
		{
			name: "purple",
			bg: "bg-purple-500",
			text: "text-purple-500",
			label: "Morado",
		},
		{
			name: "orange",
			bg: "bg-orange-500",
			text: "text-orange-500",
			label: "Naranja",
		},
		{ name: "red", bg: "bg-red-500", text: "text-red-500", label: "Rojo" },
		{ name: "pink", bg: "bg-pink-500", text: "text-pink-500", label: "Rosa" },
		{
			name: "yellow",
			bg: "bg-yellow-500",
			text: "text-yellow-500",
			label: "Amarillo",
		},
		{
			name: "indigo",
			bg: "bg-indigo-500",
			text: "text-indigo-500",
			label: "Índigo",
		},
		{
			name: "teal",
			bg: "bg-teal-500",
			text: "text-teal-500",
			label: "Verde azulado",
		},
		{ name: "cyan", bg: "bg-cyan-500", text: "text-cyan-500", label: "Cian" },
	];

	const handleSubmit = (e) => {
		e.preventDefault();
		if (newCategory.label.trim()) {
			addCategory(newCategory);
			setNewCategory({ label: "", color: "blue" });
		}
	};

	const handleDelete = (categoryId) => {
		const success = deleteCategory(categoryId);
		if (!success) {
			alert("No se puede eliminar una categoría que tiene notas asociadas");
		}
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
			<div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
				<div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
					<h3 className="text-lg font-semibold text-gray-800 dark:text-white">
						Gestionar Categorías
					</h3>
					<button
						onClick={onClose}
						className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
					>
						<X size={20} className="text-gray-600 dark:text-gray-300" />
					</button>
				</div>

				<div className="p-4">
					{/* Formulario para nueva categoría */}
					<form onSubmit={handleSubmit} className="mb-6">
						<div className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
									Nombre de la categoría
								</label>
								<input
									type="text"
									value={newCategory.label}
									onChange={(e) =>
										setNewCategory({ ...newCategory, label: e.target.value })
									}
									placeholder="Ej: Proyectos, Hobbies..."
									className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
									Color
								</label>
								<div className="grid grid-cols-5 gap-2">
									{colorOptions.map((color) => (
										<button
											key={color.name}
											type="button"
											onClick={() =>
												setNewCategory({ ...newCategory, color: color.name })
											}
											className={`
                        w-8 h-8 rounded-full ${color.bg} border-2 transition-all
                        ${
													newCategory.color === color.name
														? "border-gray-800 dark:border-white scale-110"
														: "border-gray-300 dark:border-gray-600 hover:scale-105"
												}
                      `}
											title={color.label}
										/>
									))}
								</div>
							</div>

							<button
								type="submit"
								disabled={!newCategory.label.trim()}
								className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
							>
								Agregar Categoría
							</button>
						</div>
					</form>

					{/* Lista de categorías existentes */}
					<div>
						<h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
							Categorías existentes
						</h4>
						<div className="space-y-2 max-h-60 overflow-y-auto">
							{categories.map((category) => {
								const colorOption =
									colorOptions.find((c) => c.name === category.color) ||
									colorOptions[0];
								return (
									<div
										key={category.id}
										className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-lg"
									>
										<div className="flex items-center space-x-2">
											<div
												className={`w-4 h-4 rounded-full ${colorOption.bg}`}
											/>
											<span className="text-sm text-gray-800 dark:text-gray-200">
												{category.label}
											</span>
										</div>
										<button
											onClick={() => handleDelete(category.id)}
											className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded transition-colors"
										>
											<Trash2 size={14} />
										</button>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

// Componente ThemeSwitch
const ThemeSwitch = () => {
	const { darkMode, toggleDarkMode } = useNotesStore();

	return (
		<div className="flex items-center space-x-3">
			<Sun
				size={16}
				className={`transition-colors ${
					darkMode ? "text-gray-400" : "text-yellow-500"
				}`}
			/>
			<button
				onClick={toggleDarkMode}
				className={`
          relative inline-flex h-6 w-11 items-center rounded-full transition-colors
          ${darkMode ? "bg-blue-600" : "bg-gray-300"}
        `}
				role="switch"
				aria-checked={darkMode}
				aria-label="Toggle dark mode"
			>
				<span
					className={`
            inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform
            ${darkMode ? "translate-x-6" : "translate-x-1"}
          `}
				/>
			</button>
			<Moon
				size={16}
				className={`transition-colors ${
					darkMode ? "text-blue-400" : "text-gray-400"
				}`}
			/>
		</div>
	);
};

// Componente Sidebar
const Sidebar = ({ isOpen, setIsOpen }) => {
	const { navigate, currentPath } = useRouter();
	const { setSelectedCategory, notes, categories } = useNotesStore();
	const [showCategoryManager, setShowCategoryManager] = useState(false);

	const menuItems = [
		{ path: "/", icon: Home, label: "Inicio", category: "all" },
		{
			path: "/favorites",
			icon: Star,
			label: "Favoritas",
			category: "favorites",
		},
		{
			path: "/archived",
			icon: Archive,
			label: "Archivadas",
			category: "archived",
		},
		{
			path: "/settings",
			icon: Settings,
			label: "Configuración",
			category: "settings",
		},
	];

	const getColorClasses = (colorName) => {
		const colorMap = {
			blue: "bg-blue-500",
			green: "bg-green-500",
			purple: "bg-purple-500",
			orange: "bg-orange-500",
			red: "bg-red-500",
			pink: "bg-pink-500",
			yellow: "bg-yellow-500",
			indigo: "bg-indigo-500",
			teal: "bg-teal-500",
			cyan: "bg-cyan-500",
		};
		return colorMap[colorName] || "bg-gray-500";
	};

	const handleNavigation = (path, category) => {
		navigate(path);
		setSelectedCategory(category);
		setIsOpen(false);
	};

	return (
		<>
			{/* Overlay para móvil */}
			{isOpen && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
					onClick={() => setIsOpen(false)}
				/>
			)}

			{/* Sidebar */}
			<div
				className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
			>
				<div className="flex flex-col h-full">
					{/* Header */}
					<div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
						<h1 className="text-xl font-bold text-gray-800 dark:text-white">
							Mis Notas
						</h1>
						<button
							onClick={() => setIsOpen(false)}
							className="lg:hidden p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
						>
							<X size={20} className="text-gray-600 dark:text-gray-300" />
						</button>
					</div>

					{/* Navigation */}
					<nav className="flex-1 p-4">
						<div className="space-y-2">
							{menuItems.map((item) => (
								<button
									key={item.path}
									onClick={() => handleNavigation(item.path, item.category)}
									className={`
                    flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors w-full text-left
                    ${
											currentPath === item.path
												? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
												: "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
										}
                  `}
								>
									<item.icon size={18} />
									<span>{item.label}</span>
								</button>
							))}
						</div>

						{/* Categories */}
						<div className="mt-8">
							<div className="flex items-center justify-between mb-3">
								<h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
									Categorías
								</h3>
								<button
									onClick={() => setShowCategoryManager(true)}
									className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
								>
									Gestionar
								</button>
							</div>
							<div className="space-y-2">
								{categories.map((category) => {
									const categoryNotes = notes.filter(
										(note) => note.category === category.id
									);
									return (
										<button
											key={category.id}
											onClick={() => handleNavigation("/", category.id)}
											className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
										>
											<div className="flex items-center space-x-2">
												<div
													className={`w-3 h-3 rounded-full ${getColorClasses(
														category.color
													)}`}
												/>
												<span className="text-sm text-gray-600 dark:text-gray-300">
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

						{/* Theme Switch */}
						<div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
							<div className="flex items-center justify-between mb-2">
								<span className="text-sm font-medium text-gray-500 dark:text-gray-400">
									Tema
								</span>
							</div>
							<ThemeSwitch />
						</div>
					</nav>
				</div>

				{/* Category Manager Modal */}
				<CategoryManager
					isOpen={showCategoryManager}
					onClose={() => setShowCategoryManager(false)}
				/>
			</div>
		</>
	);
};

// Componente Header
const Header = ({ setIsOpen }) => {
	const { navigate } = useRouter();
	const { searchTerm, setSearchTerm } = useNotesStore();

	return (
		<header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
			<div className="flex items-center justify-between">
				<div className="flex items-center space-x-4">
					<button
						onClick={() => setIsOpen(true)}
						className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
					>
						<Menu size={20} className="text-gray-600 dark:text-gray-300" />
					</button>
					<h2 className="text-lg font-semibold text-gray-800 dark:text-white">
						Dashboard
					</h2>
				</div>

				<div className="flex items-center space-x-4">
					<div className="relative">
						<Search
							className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
							size={16}
						/>
						<input
							type="text"
							placeholder="Buscar notas..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
						/>
					</div>
					<button
						onClick={() => navigate("/new-note")}
						className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
					>
						<PlusCircle size={16} />
						<span>Nueva Nota</span>
					</button>
				</div>
			</div>
		</header>
	);
};

// Componente NoteCard
const NoteCard = ({ note }) => {
	const { navigate } = useRouter();
	const { deleteNote, toggleFavorite, toggleArchive, categories } =
		useNotesStore();

	const getCategoryInfo = (categoryId) => {
		const category = categories.find((cat) => cat.id === categoryId);
		return category || { label: categoryId, color: "gray" };
	};

	const getColorClasses = (colorName) => {
		const colorMap = {
			blue: {
				bg: "bg-blue-100 dark:bg-blue-900",
				text: "text-blue-800 dark:text-blue-200",
				border: "border-blue-200 dark:border-blue-700",
			},
			green: {
				bg: "bg-green-100 dark:bg-green-900",
				text: "text-green-800 dark:text-green-200",
				border: "border-green-200 dark:border-green-700",
			},
			purple: {
				bg: "bg-purple-100 dark:bg-purple-900",
				text: "text-purple-800 dark:text-purple-200",
				border: "border-purple-200 dark:border-purple-700",
			},
			orange: {
				bg: "bg-orange-100 dark:bg-orange-900",
				text: "text-orange-800 dark:text-orange-200",
				border: "border-orange-200 dark:border-orange-700",
			},
			red: {
				bg: "bg-red-100 dark:bg-red-900",
				text: "text-red-800 dark:text-red-200",
				border: "border-red-200 dark:border-red-700",
			},
			pink: {
				bg: "bg-pink-100 dark:bg-pink-900",
				text: "text-pink-800 dark:text-pink-200",
				border: "border-pink-200 dark:border-pink-700",
			},
			yellow: {
				bg: "bg-yellow-100 dark:bg-yellow-900",
				text: "text-yellow-800 dark:text-yellow-200",
				border: "border-yellow-200 dark:border-yellow-700",
			},
			indigo: {
				bg: "bg-indigo-100 dark:bg-indigo-900",
				text: "text-indigo-800 dark:text-indigo-200",
				border: "border-indigo-200 dark:border-indigo-700",
			},
			teal: {
				bg: "bg-teal-100 dark:bg-teal-900",
				text: "text-teal-800 dark:text-teal-200",
				border: "border-teal-200 dark:border-teal-700",
			},
			cyan: {
				bg: "bg-cyan-100 dark:bg-cyan-900",
				text: "text-cyan-800 dark:text-cyan-200",
				border: "border-cyan-200 dark:border-cyan-700",
			},
			gray: {
				bg: "bg-gray-100 dark:bg-gray-700",
				text: "text-gray-800 dark:text-gray-200",
				border: "border-gray-200 dark:border-gray-600",
			},
		};
		return colorMap[colorName] || colorMap.gray;
	};

	// Generar altura variable basada en el ID de la nota
	const getRandomHeight = () => {
		const heights = ["h-48", "h-52", "h-56", "h-60", "h-64"];
		const index = parseInt(note.id) % heights.length;
		return heights[index];
	};

	const categoryInfo = getCategoryInfo(note.category);
	const colorClasses = getColorClasses(categoryInfo.color);
	const cardHeight = getRandomHeight();

	return (
		<div
			className={`
      bg-white dark:bg-gray-800 rounded-lg shadow-sm border-2 transition-all duration-200 p-4 
      hover:shadow-lg hover:scale-[1.02] cursor-pointer group relative overflow-hidden
      ${colorClasses.border} ${cardHeight}
    `}
		>
			{/* Accent bar en la parte superior */}
			<div
				className={`absolute top-0 left-0 right-0 h-1 ${
					getColorClasses(categoryInfo.color).bg.split(" ")[0]
				}`}
			/>

			<div className="flex flex-col h-full">
				<div className="flex items-start justify-between mb-3">
					<div className="flex-1">
						<h3 className="font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2 group-hover:text-gray-900 dark:group-hover:text-gray-100">
							{note.title}
						</h3>
						<span
							className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${colorClasses.bg} ${colorClasses.text}`}
						>
							{categoryInfo.label}
						</span>
					</div>
					<div className="flex items-center space-x-1 opacity-70 group-hover:opacity-100 transition-opacity">
						<button
							onClick={(e) => {
								e.stopPropagation();
								toggleFavorite(note.id);
							}}
							className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
								note.isFavorite ? "text-yellow-500" : "text-gray-400"
							}`}
						>
							<Star
								size={16}
								fill={note.isFavorite ? "currentColor" : "none"}
							/>
						</button>
						<button
							onClick={(e) => {
								e.stopPropagation();
								toggleArchive(note.id);
							}}
							className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
								note.isArchived ? "text-blue-500" : "text-gray-400"
							}`}
						>
							<Archive size={16} />
						</button>
					</div>
				</div>

				<div className="flex-1 overflow-hidden">
					<p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-6 mb-4">
						{note.content}
					</p>
				</div>

				<div className="flex items-center justify-between mt-auto">
					<span className="text-xs text-gray-400">
						{new Date(note.updatedAt).toLocaleDateString()}
					</span>
					<div className="flex items-center space-x-2 opacity-70 group-hover:opacity-100 transition-opacity">
						<button
							onClick={(e) => {
								e.stopPropagation();
								navigate(`/edit/${note.id}`);
							}}
							className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded transition-colors"
						>
							<Edit3 size={16} />
						</button>
						<button
							onClick={(e) => {
								e.stopPropagation();
								deleteNote(note.id);
							}}
							className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded transition-colors"
						>
							<Trash2 size={16} />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

// Página de Inicio
const HomePage = () => {
	const { getFilteredNotes, selectedCategory } = useNotesStore();
	const { navigate } = useRouter();
	const notes = getFilteredNotes();

	const getCategoryTitle = () => {
		switch (selectedCategory) {
			case "favorites":
				return "Notas Favoritas";
			case "archived":
				return "Notas Archivadas";
			case "personal":
				return "Notas Personales";
			case "trabajo":
				return "Notas de Trabajo";
			case "ideas":
				return "Ideas";
			case "recordatorios":
				return "Recordatorios";
			default:
				return "Todas las Notas";
		}
	};

	return (
		<div className="p-6">
			<div className="mb-6">
				<h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
					{getCategoryTitle()}
				</h1>
				<p className="text-gray-600 dark:text-gray-300">
					{notes.length} {notes.length === 1 ? "nota" : "notas"}
				</p>
			</div>

			{notes.length === 0 ? (
				<div className="text-center py-12">
					<FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
					<h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
						No hay notas
					</h3>
					<p className="text-gray-600 dark:text-gray-300 mb-4">
						Comienza creando tu primera nota
					</p>
					<button
						onClick={() => navigate("/new-note")}
						className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
					>
						<PlusCircle size={16} />
						<span>Crear Nota</span>
					</button>
				</div>
			) : (
				<div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
					{notes.map((note) => (
						<div key={note.id} className="break-inside-avoid">
							<NoteCard note={note} />
						</div>
					))}
				</div>
			)}
		</div>
	);
};

// Página de Nueva Nota / Editar
const NoteFormPage = () => {
	const { currentPath, navigate } = useRouter();
	const isEditing = currentPath.includes("/edit/");
	const noteId = isEditing ? currentPath.split("/").pop() : null;

	const { notes, addNote, updateNote, categories } = useNotesStore();
	const existingNote = isEditing ? notes.find((n) => n.id === noteId) : null;

	const [title, setTitle] = useState(existingNote?.title || "");
	const [content, setContent] = useState(existingNote?.content || "");
	const [category, setCategory] = useState(
		existingNote?.category || categories[0]?.id || "personal"
	);
	const [saved, setSaved] = useState(false);

	React.useEffect(() => {
		if (isEditing && existingNote) {
			setTitle(existingNote.title);
			setContent(existingNote.content);
			setCategory(existingNote.category);
		}
	}, [isEditing, existingNote]);

	const handleSave = () => {
		if (!title.trim()) return;

		if (isEditing) {
			updateNote(noteId, { title, content, category });
		} else {
			addNote({ title, content, category });
		}

		setSaved(true);
		setTimeout(() => setSaved(false), 2000);
		setTimeout(() => navigate("/"), 500);
	};

	return (
		<div className="p-6 max-w-4xl mx-auto">
			<div className="mb-6 flex items-center justify-between">
				<div className="flex items-center space-x-4">
					<button
						onClick={() => navigate("/")}
						className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
					>
						<ArrowLeft size={20} className="text-gray-600 dark:text-gray-300" />
					</button>
					<h1 className="text-2xl font-bold text-gray-800 dark:text-white">
						{isEditing ? "Editar Nota" : "Nueva Nota"}
					</h1>
				</div>
				<div className="flex items-center space-x-4">
					{saved && (
						<span className="text-green-600 text-sm font-medium">
							✓ Guardado
						</span>
					)}
					<button
						onClick={handleSave}
						disabled={!title.trim()}
						className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
					>
						<Save size={16} />
						<span>Guardar</span>
					</button>
				</div>
			</div>

			<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
				<div className="space-y-6">
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							Título
						</label>
						<input
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder="Escribe el título de tu nota..."
							className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
							autoFocus
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							Categoría
						</label>
						<select
							value={category}
							onChange={(e) => setCategory(e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
						>
							{categories.map((cat) => (
								<option key={cat.id} value={cat.id}>
									{cat.label}
								</option>
							))}
						</select>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							Contenido
						</label>
						<textarea
							value={content}
							onChange={(e) => setContent(e.target.value)}
							placeholder="Escribe el contenido de tu nota..."
							rows={12}
							className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

// Página de Configuración
const SettingsPage = () => {
	const { notes, categories } = useNotesStore();

	const stats = {
		total: notes.length,
		favorites: notes.filter((n) => n.isFavorite).length,
		archived: notes.filter((n) => n.isArchived).length,
		byCategory: categories.reduce((acc, cat) => {
			acc[cat.id] = notes.filter((n) => n.category === cat.id).length;
			return acc;
		}, {}),
	};

	return (
		<div className="p-6 max-w-4xl mx-auto">
			<h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
				Configuración
			</h1>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
					<h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
						Estadísticas
					</h3>
					<div className="space-y-3">
						<div className="flex justify-between">
							<span className="text-gray-600 dark:text-gray-300">
								Total de notas:
							</span>
							<span className="font-medium text-gray-800 dark:text-white">
								{stats.total}
							</span>
						</div>
						<div className="flex justify-between">
							<span className="text-gray-600 dark:text-gray-300">
								Favoritas:
							</span>
							<span className="font-medium text-gray-800 dark:text-white">
								{stats.favorites}
							</span>
						</div>
						<div className="flex justify-between">
							<span className="text-gray-600 dark:text-gray-300">
								Archivadas:
							</span>
							<span className="font-medium text-gray-800 dark:text-white">
								{stats.archived}
							</span>
						</div>
					</div>
				</div>

				<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
					<h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
						Por Categoría
					</h3>
					<div className="space-y-3">
						{categories.map((category) => (
							<div key={category.id} className="flex justify-between">
								<span className="text-gray-600 dark:text-gray-300">
									{category.label}:
								</span>
								<span className="font-medium text-gray-800 dark:text-white">
									{stats.byCategory[category.id] || 0}
								</span>
							</div>
						))}
					</div>
				</div>

				<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 md:col-span-2">
					<h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
						Información de la App
					</h3>
					<div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
						<p>• Todas las notas se guardan localmente en tu navegador</p>
						<p>• Usa el buscador para encontrar notas rápidamente</p>
						<p>• Organiza tus notas por categorías personalizadas</p>
						<p>• Marca notas como favoritas o archívalas</p>
						<p>• La aplicación es completamente funcional offline</p>
						<p>• El tema oscuro se guarda automáticamente</p>
						<p>• Crea categorías personalizadas con colores únicos</p>
					</div>
				</div>
			</div>
		</div>
	);
};

// Router Component
const AppRouter = () => {
	const { currentPath } = useRouter();

	// Determinar qué componente renderizar basado en la ruta
	if (currentPath.startsWith("/edit/")) {
		return <NoteFormPage />;
	}

	switch (currentPath) {
		case "/":
		case "/favorites":
		case "/archived":
			return <HomePage />;
		case "/new-note":
			return <NoteFormPage />;
		case "/settings":
			return <SettingsPage />;
		default:
			return <HomePage />;
	}
};

// Componente Principal de la App
const App = () => {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<div className="flex h-screen bg-gray-50 dark:bg-gray-900">
			<Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

			<div className="flex-1 flex flex-col overflow-hidden">
				<Header setIsOpen={setSidebarOpen} />

				<main className="flex-1 overflow-y-auto">
					<AppRouter />
				</main>
			</div>
		</div>
	);
};

export default function BasicLayoutTemp() {
	return (
		<App />
	);
}
