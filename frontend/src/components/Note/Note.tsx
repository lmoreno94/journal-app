import { Archive, Edit3, Star, Trash2 } from "lucide-react";
import { useCategoryUtils } from "../../hooks/useCategoryUtils";
import { useAppSelector } from "../../hooks/useDispatchSelector";
import type { Note } from "../interfaces/Note";

export default function NoteCard(props: { note: Note }) {
	const { note } = props;

	const { categories } = useAppSelector((state) => state.categorieState);

	const { getCategoryInfo, getColorClasses, getRandomHeight } =
		useCategoryUtils(categories, note.id);

	const category = getCategoryInfo(note.category);
	const colors = getColorClasses(category.color);
	const height = getRandomHeight();

	return (
		<div
			className={`
      bg-white dark:bg-gray-800 rounded-lg shadow-sm border-2 transition-all duration-200 p-4 
      hover:shadow-lg hover:scale-[1.02] cursor-pointer group relative overflow-hidden
      ${colors.border} ${height}
    `}
		>
			{/* Accent bar en la parte superior */}
			<div
				className={`absolute top-0 left-0 right-0 h-1 ${
					colors.bg.split(" ")[0]
				}`}
			/>

			<div className="flex flex-col h-full">
				<div className="flex items-start justify-between mb-3">
					<div className="flex-1">
						<h3 className="font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2 group-hover:text-gray-900 dark:group-hover:text-gray-100">
							{note.title}
						</h3>
						<span
							className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}
						>
							{category.label}
						</span>
					</div>
					<div className="flex items-center space-x-1 opacity-70 group-hover:opacity-100 transition-opacity">
						<button
							onClick={(e) => {
								e.stopPropagation();
								// toggleFavorite(note.id);
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
								// toggleArchive(note.id);
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
								// navigate(`/edit/${note.id}`);
							}}
							className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded transition-colors"
						>
							<Edit3 size={16} />
						</button>
						<button
							onClick={(e) => {
								e.stopPropagation();
								// deleteNote(note.id);
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
}
