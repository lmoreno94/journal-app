import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowLeft, Save, Edit } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";

import {
	useAppDispatch,
	useAppSelector,
} from "../../hooks/useDispatchSelector";
import { addNote, setLoading } from "../../redux/features/Notes";
import type { NoteFormData } from "../interfaces/Note";
import { useCallback, useEffect, useMemo } from "react";

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

		if (edit_note) {
			// dispatch(updateNote({ id: edit_note.id, ...data }));
		}
	};

	return (
		<div className="p-6 max-w-4xl mx-auto">
			<form onSubmit={handleSubmit(handleOnSubmit)} className="space-y-6">
				<div className="mb-6 flex items-center justify-between">
					<div className="flex items-center space-x-4">
						<button
							onClick={(e) => {
								e.stopPropagation();
								navigate("/mis_notas")
							}}
							className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
						>
							<ArrowLeft
								size={20}
								className="text-gray-600 dark:text-gray-300"
							/>
						</button>
						<h1 className="text-2xl font-bold text-gray-800 dark:text-white">
							{new_note && "Nueva Nota"}
							{edit_note && "Editar Nota"}
						</h1>
					</div>
					<div className="flex items-center space-x-4">
						{loading && (
							<span className="text-green-600 text-sm font-medium">
								✓ Guardado
							</span>
						)}

						{new_note && (
							<button
								// disabled={!title.trim()}
								type="submit"
								className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
							>
								<Save size={16} />
								<span>Guardar</span>
							</button>
						)}

						{edit_note && (
							<button
								// disabled={!title.trim()}
								// type="submit"
								className="flex items-center space-x-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
							>
								<Edit size={16} />
								<span>Editar</span>
							</button>
						)}
					</div>
				</div>

				<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
					<div className="space-y-6">
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Título
							</label>
							<input
								id="title"
								{...register("title")}
								type="text"
								// value={title}
								// onChange={(e) => setTitle(e.target.value)}
								placeholder="Escribe el título de tu nota..."
								className="title w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
								autoFocus
							/>
							{errors.title ? (
								<p className="text-red-600 text-sm mt-1">
									{errors.title.message}
								</p>
							) : (
								<p className="invisible text-sm mt-1">Error message</p>
							)}
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Categoría
							</label>
							<select
								id="category"
								{...register("category")}
								// value={category}
								// onChange={(e) => setCategory(e.target.value)}
								className="category w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
							>
								<option value="">-- Selecciona una categoria --</option>
								{categories.map((cat) => (
									<option key={cat.value} value={cat.value}>
										{cat.label}
									</option>
								))}
							</select>
							{errors.category ? (
								<p className="text-red-600 text-sm mt-1">
									{errors.category.message}
								</p>
							) : (
								<p className="invisible text-sm mt-1">Error message</p>
							)}
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Contenido
							</label>
							<textarea
								id="content"
								{...register("content")}
								// value={content}
								// onChange={(e) => setContent(e.target.value)}
								placeholder="Escribe el contenido de tu nota..."
								rows={12}
								className="content w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
							/>
							{errors.content ? (
								<p className="text-red-600 text-sm mt-1">
									{errors.content.message}
								</p>
							) : (
								<p className="invisible text-sm mt-1">Error message</p>
							)}
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}
