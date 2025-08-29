import { FileText, PlusCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function NoteEmpty() {
    const navigate = useNavigate();

    return (
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
    )
}
