import { useAppSelector } from "../../hooks/useDispatchSelector";
import { useCategoryTitle } from "../../hooks/useCategoryTitle";

import Note from "../../components/Note";
import NoteEmpty from "../../components/Note/NoteEmpty";
import { useEffect, useState } from "react";
import type { Note as INote } from "../../components/interfaces/Note";

export default function Inicio() {
	const { notes } = useAppSelector((state) => state.noteState);
	const [notesTemp, setNotesTemp] = useState<INote[]>();
	const title = useCategoryTitle();

	useEffect(() => {

		if(title === 'archived'){
			const archivedNotes = notes.filter(note => note.isArchived);
			setNotesTemp(archivedNotes);
		}
	}, [])
	

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
					<NoteEmpty />
				) : (
					<div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
						{notesTemp?.map((note) => (
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

