import { FileText, PlusCircle } from "lucide-react";
import Note from "../../components/Note";
import { useAppSelector } from "../../hooks/useDispatchSelector";
import { useCategoryTitle } from "../../hooks/useCategoryTitle";
import { useNavigate } from "react-router-dom";

export default function Inicio() {
	const { notes } = useAppSelector((state) => state.noteState);
	const title = useCategoryTitle();
	const navigate = useNavigate();

	return (
		<>
			<div className="p-6">
				<div className="mb-6">
					<h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
						{title}
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
								<Note note={note} />
							</div>
						))}
					</div>
				)}
			</div>
		</>
	);
}
