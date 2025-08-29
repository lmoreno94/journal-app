import { useAppSelector } from "../../hooks/useDispatchSelector";

export default function Setting() {

    const { notes } = useAppSelector((state) => state.noteState);
    const { categories } = useAppSelector((state) => state.categorieState);

    const stats = {
		total: notes.length,
		favorites: notes.filter((n) => n.isFavorite).length,
		archived: notes.filter((n) => n.isArchived).length,
		byCategory: categories.reduce<Record<string, number>>((acc, cat) => {
			acc[cat.value] = notes.filter((n) => n.category === cat.value).length;
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
							<div key={category.value} className="flex justify-between">
								<span className="text-gray-600 dark:text-gray-300">
									{category.label}:
								</span>
								<span className="font-medium text-gray-800 dark:text-white">
									{stats.byCategory[category.value] || 0}
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
}
