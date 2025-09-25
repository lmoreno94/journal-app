import { useAppSelector } from "../../hooks/useDispatchSelector";
import { useCategoryTitle } from "../../hooks/useCategoryTitle";
import styled from 'styled-components';
import Note from "../../components/Note";
import NoteEmpty from "../../components/Note/NoteEmpty";
import { useMemo } from "react";
import type { Note as INote } from "../../components/interfaces/Note";
import { useLocation } from "react-router-dom";

const Container = styled.div`
    padding: 1.5rem;
`;

const Header = styled.div`
    margin-bottom: 1.5rem;
`;

const Title = styled.h1`
    font-size: 1.5rem;
    font-weight: 700;
    color: ${props => props.theme.mode === 'dark' ? '#ffffff' : '#1f2937'};
    margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
    color: ${props => props.theme.mode === 'dark' ? '#d1d5db' : '#4b5563'};
`;

const NoteGrid = styled.div`
    columns: 1;
    gap: 1.5rem;
    
    & > * {
        margin-bottom: 1.5rem;
        break-inside: avoid;
    }

    @media (min-width: 768px) {
        columns: 2;
    }

    @media (min-width: 1024px) {
        columns: 3;
    }

    @media (min-width: 1280px) {
        columns: 4;
    }
`;

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
		console.log('[ notesByCategory ]', notesByCategory)
		if (notesByCategory.length > 0) {
			return notesByCategory;
		}

		// Caso 3: fallback → todas
		return notes;
	}, [notes, lastSegment]);

	return (
		<Container>
			<Header>
				<Title>{title}</Title>
				<Subtitle>
					{filteredNotes.length} {filteredNotes.length === 1 ? "nota" : "notas"}
				</Subtitle>
			</Header>

			{filteredNotes.length === 0 ? (
				<NoteEmpty />
			) : (
				<NoteGrid>
					{filteredNotes.map((note) => (
						<div key={note.id}>
							<Note note={note} />
						</div>
					))}
				</NoteGrid>
			)}
		</Container>
	);
}

