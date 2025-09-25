import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowLeft, Save, Edit } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import styled from 'styled-components';
import * as Yup from "yup";

import {
	useAppDispatch,
	useAppSelector,
} from "../../hooks/useDispatchSelector";
import { addNote, setLoading, updateNote } from "../../redux/features/Notes";
import type { NoteFormData } from "../interfaces/Note";
import { useCallback, useEffect, useMemo } from "react";

const Container = styled.div`
  padding: 1.5rem;
  max-width: 56rem;
  margin: 0 auto;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Header = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const BackButton = styled.button`
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${props => props.theme.mode === 'dark' ? '#374151' : '#f3f4f6'};
  }
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.mode === 'dark' ? '#ffffff' : '#1f2937'};
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SaveStatus = styled.span`
  color: #059669;
  font-size: 0.875rem;
  font-weight: 500;
`;

const ActionButton = styled.button<{ variant: 'save' | 'edit' }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  color: white;
  background-color: ${props => props.variant === 'save' ? '#2563eb' : '#ea580c'};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => props.variant === 'save' ? '#1d4ed8' : '#c2410c'};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const FormSection = styled.div`
  background-color: ${props => props.theme.mode === 'dark' ? '#1f2937' : '#ffffff'};
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border: 1px solid ${props => props.theme.mode === 'dark' ? '#374151' : '#e5e7eb'};
  padding: 1.5rem;
`;

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${props => props.theme.mode === 'dark' ? '#d1d5db' : '#374151'};
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid ${props => props.theme.mode === 'dark' ? '#4b5563' : '#d1d5db'};
  border-radius: 0.5rem;
  background-color: ${props => props.theme.mode === 'dark' ? '#374151' : '#ffffff'};
  color: ${props => props.theme.mode === 'dark' ? '#ffffff' : '#111827'};
  
  &:focus {
    outline: none;
    border-color: transparent;
    box-shadow: 0 0 0 2px #3b82f6;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid ${props => props.theme.mode === 'dark' ? '#4b5563' : '#d1d5db'};
  border-radius: 0.5rem;
  background-color: ${props => props.theme.mode === 'dark' ? '#374151' : '#ffffff'};
  color: ${props => props.theme.mode === 'dark' ? '#ffffff' : '#111827'};
  
  &:focus {
    outline: none;
    border-color: transparent;
    box-shadow: 0 0 0 2px #3b82f6;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid ${props => props.theme.mode === 'dark' ? '#4b5563' : '#d1d5db'};
  border-radius: 0.5rem;
  background-color: ${props => props.theme.mode === 'dark' ? '#374151' : '#ffffff'};
  color: ${props => props.theme.mode === 'dark' ? '#ffffff' : '#111827'};
  resize: none;
  
  &:focus {
    outline: none;
    border-color: transparent;
    box-shadow: 0 0 0 2px #3b82f6;
  }
`;

const ErrorMessage = styled.p<{ visible?: boolean }>`
  color: #dc2626;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  visibility: ${props => props.visible ? 'visible' : 'hidden'};
`;

export default function NoteForm() {
	const { categories } = useAppSelector((state) => state.categorieState);
	const { new_note, edit_note, loading, notes } = useAppSelector(
		(state) => state.noteState
	);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();

	const noteToEdit = useCallback(() => {
		return notes.find((n) => n.id === id);
	}, [notes, id]);

	const getSchema = (categories: string[]) =>
		Yup.object({
			title: Yup.string().required("El título es obligatorio"),
			category: Yup.string()
				.oneOf(categories, "Categoría inválida")
				.required("La categoría es obligatoria"),
			content: Yup.string().required("El contenido es obligatorio"),
		}).required();

	const schema = useMemo(
		() => getSchema(categories.map((cat) => cat.value)),
		[categories]
	);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<NoteFormData>({
		defaultValues: { title: "", category: "", content: "" },
		resolver: yupResolver(schema),
	});

	useEffect(() => {
		const note = noteToEdit();
		if (note) {
			reset(note);
		}
	}, [edit_note, noteToEdit, reset]);

	useEffect(() => {
		dispatch(setLoading(false));
		reset();
	}, [dispatch, new_note, reset]);

	const handleOnSubmit: SubmitHandler<NoteFormData> = (data) => {
		dispatch(setLoading(true));

		if (new_note) {
			setTimeout(() => {
				dispatch(setLoading(false));
				reset();
				dispatch(addNote(data));
				navigate("/mis_notas");
			}, 4000);
		}

		if (edit_note && id) {
			setTimeout(() => {
				dispatch(setLoading(false));
				reset();
				dispatch(updateNote({ id, ...data }));
				navigate("/mis_notas");
			}, 4000);
		}
	};

	return (
		<Container>
			<FormContainer onSubmit={handleSubmit(handleOnSubmit)}>
				<Header>
					<HeaderLeft>
						<BackButton
							onClick={(e) => {
								e.stopPropagation();
								navigate("/mis_notas")
							}}
						>
							<ArrowLeft size={20} />
						</BackButton>
						<Title>
							{new_note && "Nueva Nota"}
							{edit_note && "Editar Nota"}
						</Title>
					</HeaderLeft>
					<HeaderRight>
						{loading && (
							<SaveStatus>✓ Guardado</SaveStatus>
						)}

						{new_note && (
							<ActionButton variant="save" type="submit">
								<Save size={16} />
								<span>Guardar</span>
							</ActionButton>
						)}

						{edit_note && (
							<ActionButton variant="edit" type="submit">
								<Edit size={16} />
								<span>Editar</span>
							</ActionButton>
						)}
					</HeaderRight>
				</Header>

				<FormSection>
					<FormContent>
						<FormGroup>
							<Label htmlFor="title">Título</Label>
							<Input
								id="title"
								{...register("title")}
								type="text"
								placeholder="Escribe el título de tu nota..."
								autoFocus
							/>
							<ErrorMessage visible={!!errors.title}>
								{errors.title?.message || "Error message"}
							</ErrorMessage>
						</FormGroup>

						<FormGroup>
							<Label htmlFor="category">Categoría</Label>
							<Select
								id="category"
								{...register("category")}
							>
								<option value="">-- Selecciona una categoria --</option>
								{categories.map((cat) => (
									<option key={cat.value} value={cat.value}>
										{cat.label}
									</option>
								))}
							</Select>
							<ErrorMessage visible={!!errors.category}>
								{errors.category?.message || "Error message"}
							</ErrorMessage>
						</FormGroup>

						<FormGroup>
							<Label htmlFor="content">Contenido</Label>
							<TextArea
								id="content"
								{...register("content")}
								placeholder="Escribe el contenido de tu nota..."
								rows={12}
							/>
							<ErrorMessage visible={!!errors.content}>
								{errors.content?.message || "Error message"}
							</ErrorMessage>
						</FormGroup>
					</FormContent>
				</FormSection>
			</FormContainer>
		</Container>
	);
}
