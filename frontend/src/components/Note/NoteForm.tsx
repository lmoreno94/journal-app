import { ArrowLeft, Save, Edit } from "lucide-react";
import { useAppSelector } from "../../hooks/useDispatchSelector";

export default function NoteForm() {
    const { categories } = useAppSelector((state) => state.categorieState);
    const { new_note, edit_note } = useAppSelector((state) => state.noteState);

	return (
		<div className="p-6 max-w-4xl mx-auto">
			<div className="mb-6 flex items-center justify-between">
				<div className="flex items-center space-x-4">
					<button
						// onClick={() => navigate("/")}
						className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
					>
						<ArrowLeft size={20} className="text-gray-600 dark:text-gray-300" />
					</button>
					<h1 className="text-2xl font-bold text-gray-800 dark:text-white">
						{new_note && "Nueva Nota"}
                        {edit_note && "Editar Nota"}
					</h1>
				</div>
				<div className="flex items-center space-x-4">
					{/* {saved && (
						<span className="text-green-600 text-sm font-medium">
							✓ Guardado
						</span>
					)} */}
					
                    {
                        new_note && <button
						// onClick={handleSave}
						// disabled={!title.trim()}
						className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
					>
						<Save size={16} />
						<span>Guardar</span>
					</button>
                    }
                    
                    { edit_note && <button
						// onClick={handleSave}
						// disabled={!title.trim()}
						className="flex items-center space-x-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
					>
						<Edit size={16} />
						<span>Editar</span>
					</button> }
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
							// value={title}
							// onChange={(e) => setTitle(e.target.value)}
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
							// value={category}
							// onChange={(e) => setCategory(e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
						>
							{categories.map((cat) => (
								<option key={cat.value} value={cat.label}>
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
							// value={content}
							// onChange={(e) => setContent(e.target.value)}
							placeholder="Escribe el contenido de tu nota..."
							rows={12}
							className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
