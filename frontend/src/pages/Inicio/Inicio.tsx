import { useAppSelector } from "../../hooks/useDispatchSelector";
import { useCategoryTitle } from "../../hooks/useCategoryTitle";

import Note from "../../components/Note";
import NoteEmpty from "../../components/Note/NoteEmpty";
import { useMemo } from "react";
import type { Note as INote } from "../../components/interfaces/Note";
import { useLocation } from "react-router-dom";

export default function Inicio() {
	const location = useLocation();
	const segments = location.pathname.split("/").filter(Boolean);
    const lastSegment = segments[segments.length - 1] || "";

	const { notes } = useAppSelector((state) => state.noteState);
	const title = useCategoryTitle();

	const filteredNotes: INote[] = useMemo(() => {
		const filters: Record<string, (note: INote) => boolean> = {
			archived: (note) => note.isArchived,
			favorites: (note) => note.isFavorite,
		};

		// Caso 1: filtros fijos
		if (filters[lastSegment]) {
			return notes.filter(filters[lastSegment]);
		}

		// Caso 2: categoría
		const notesByCategory = notes.filter(
			(note) =>
				note.category?.toLowerCase() === lastSegment.toLowerCase()
		);
		if (notesByCategory.length > 0) {
			return notesByCategory;
		}

		// Caso 3: fallback → todas
		return notes;
	}, [notes, lastSegment]);

	return (
		<>
			<div className="p-6">
				<div className="mb-6">
					<h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
						{title}
					</h1>
					<p className="text-gray-600 dark:text-gray-300">
						{filteredNotes.length} {filteredNotes.length === 1 ? "nota" : "notas"}
					</p>
				</div>

				{filteredNotes.length === 0 ? (
					<NoteEmpty />
				) : (
					<div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
						{filteredNotes.map((note) => (
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

