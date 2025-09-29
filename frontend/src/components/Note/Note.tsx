import { Archive, Edit3, Star, Trash2 } from "lucide-react";
import styled from 'styled-components';
import { useCategoryUtils } from "../../hooks/useCategoryUtils";
import { useAppSelector, useAppDispatch } from "../../hooks/useDispatchSelector";
import type { Note } from "../interfaces/Note";
import { deleteNote, toggleArchived, toggleFavorite, setEditNote } from "../../redux/features/Notes";
import { useNavigate } from "react-router-dom";

const NoteContainer = styled.div<{ height: string; borderColor: string }>`
  background-color: ${props => props.theme.mode === 'dark' ? '#1f2937' : '#ffffff'};
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  border: 2px solid ${props => props.borderColor};
  transition: all 0.2s;
  padding: 1rem;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  height: ${props => props.height};

  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    transform: scale(1.02);
  }
`;

const AccentBar = styled.div<{ bgColor: string }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 0.25rem;
  background-color: ${props => props.bgColor};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 0.75rem;
`;

const TitleArea = styled.div`
  flex: 1;
`;

const Title = styled.h3<{ $hover?: boolean }>`
  font-weight: 600;
  color: ${props => props.theme.mode === 'dark' ? '#ffffff' : '#1f2937'};
  margin-bottom: 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  ${NoteContainer}:hover & {
    color: ${props => props.theme.mode === 'dark' ? '#f3f4f6' : '#111827'};
  }
`;

const CategoryTag = styled.span<{ bgColor: string; textColor: string }>`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: ${props => props.bgColor};
  color: ${props => props.textColor};
`;

const ButtonGroup = styled.div<{ $isControls?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${props => props.$isControls ? '0.5rem' : '0.25rem'};
  opacity: 0.7;
  transition: opacity 0.2s;

  ${NoteContainer}:hover & {
    opacity: 1;
  }
`;

const ActionButton = styled.button<{ $color?: string; $hoverBg?: string; $isActive?: boolean }>`
  padding: 0.25rem;
  border-radius: 0.25rem;
  color: ${props => props.$isActive ? props.$color : '#9ca3af'};
  
  &:hover {
    background-color: ${props => props.theme.mode === 'dark' 
      ? props.$hoverBg || '#374151'
      : props.$hoverBg || '#f3f4f6'
    };
    color: ${props => props.$color || 'inherit'};
  }
`;

const NoteText = styled.p`
  color: ${props => props.theme.mode === 'dark' ? '#d1d5db' : '#4b5563'};
  font-size: 0.875rem;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 1rem;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
`;

const DateSpan = styled.span`
  font-size: 0.75rem;
  color: #9ca3af;
`;

export default function NoteCard(props: { note: Note }) {
	const { note } = props;

	const { categories } = useAppSelector((state) => state.categorieState);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const { getCategoryInfo, getColorClasses, getRandomHeight } =
		useCategoryUtils(categories, note.id);

	const category = getCategoryInfo(note.category);
	const colors = getColorClasses(category.color);
	const height = getRandomHeight();

	const handleDeleteNote = (id: string) => {
		dispatch(deleteNote({id}))
	}

	const handleArchivedNote = (id: string) => {
		dispatch(toggleArchived({id}))
	}

	const handleFavoriteNote = (id: string) => {
		dispatch(toggleFavorite({id}))
	}

	return (
		<NoteContainer height={height} borderColor={category.color}>
			<AccentBar bgColor={colors.bg} />
			
			<Content>
				<Header>
					<TitleArea>
						<Title>
							{note.title}
						</Title>
						<CategoryTag bgColor={category.color} textColor={colors.text}>
							{category.label}
						</CategoryTag>
					</TitleArea>
					<ButtonGroup>
						<ActionButton
							onClick={(e) => {
								e.stopPropagation();
								handleFavoriteNote(note.id);
							}}
							$color="#eab308"
							$isActive={note.isFavorite}
						>
							<Star
								size={16}
								fill={note.isFavorite ? "currentColor" : "none"}
							/>
						</ActionButton>
						<ActionButton
							onClick={(e) => {
								e.stopPropagation();
								handleArchivedNote(note.id);
							}}
							$color="#3b82f6"
							$isActive={note.isArchived}
						>
							<Archive size={16} />
						</ActionButton>
					</ButtonGroup>
				</Header>

				<NoteText>
					{note.content}
				</NoteText>

				<Footer>
					<DateSpan>
						{new Date(note.updatedAt).toLocaleDateString()}
					</DateSpan>
					<ButtonGroup $isControls>
						<ActionButton
							onClick={(e) => {
								e.stopPropagation();
								dispatch(setEditNote());
								navigate(`/mis_notas/editar_nota/${note.id}`);
							}}
							$color="#2563eb"
							$hoverBg={theme => theme.mode === 'dark' ? '#1e3a8a' : '#dbeafe'}
						>
							<Edit3 size={16} />
						</ActionButton>
						<ActionButton
							onClick={(e) => {
								e.stopPropagation();
								handleDeleteNote(note.id);
							}}
							$color="#dc2626"
							$hoverBg={theme => theme.mode === 'dark' ? '#7f1d1d' : '#fee2e2'}
						>
							<Trash2 size={16} />
						</ActionButton>
					</ButtonGroup>
				</Footer>
			</Content>
		</NoteContainer>
	);
}
