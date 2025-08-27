import React, { useState } from 'react';
import { 
  PlusCircle, 
  FileText, 
  Search, 
  Menu, 
  X, 
  Edit3, 
  Trash2, 
  Save,
  Home,
  Star,
  Archive,
  Settings,
  ArrowLeft
} from 'lucide-react';
import BasicLayout from './components/BasicLayout';

// Sistema de enrutado simple personalizado
const useRouter = () => {
  const [currentPath, setCurrentPath] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.hash.replace('#', '') || '/';
    }
    return '/';
  });

  const navigate = (path) => {
    setCurrentPath(path);
    if (typeof window !== 'undefined') {
      window.location.hash = path;
    }
  };

  React.useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash.replace('#', '') || '/');
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return { currentPath, navigate };
};

// Store de Zustand para manejar el estado de las notas
const useNotesStore = (() => {
  let store = {
    notes: [
      {
        id: '1',
        title: 'Bienvenido a tu Dashboard',
        content: 'Esta es tu primera nota. Puedes editarla, eliminarla o crear nuevas notas. Usa el menú lateral para navegar entre diferentes secciones.',
        category: 'personal',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isFavorite: false,
        isArchived: false
      },
      {
        id: '2',
        title: 'Ideas para el proyecto',
        content: 'Implementar sistema de etiquetas, agregar búsqueda avanzada, crear modo oscuro.',
        category: 'trabajo',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        updatedAt: new Date(Date.now() - 86400000).toISOString(),
        isFavorite: true,
        isArchived: false
      }
    ],
    searchTerm: '',
    selectedCategory: 'all',
    listeners: new Set()
  };

  // Cargar desde localStorage
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('notes-storage');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        store = { ...store, ...parsed, listeners: new Set() };
      } catch (e) {
        console.warn('Error loading notes from storage:', e);
      }
    }
  }

  const notify = () => {
    store.listeners.forEach(listener => listener());
    // Guardar en localStorage
    if (typeof window !== 'undefined') {
      const { listeners, ...dataToSave } = store;
      localStorage.setItem('notes-storage', JSON.stringify(dataToSave));
    }
  };

  const actions = {
    subscribe: (listener) => {
      store.listeners.add(listener);
      return () => store.listeners.delete(listener);
    },

    getState: () => store,

    addNote: (note) => {
      store.notes.push({
        ...note,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isFavorite: false,
        isArchived: false
      });
      notify();
    },

    updateNote: (id, updatedNote) => {
      store.notes = store.notes.map(note => 
        note.id === id 
          ? { ...note, ...updatedNote, updatedAt: new Date().toISOString() }
          : note
      );
      notify();
    },

    deleteNote: (id) => {
      store.notes = store.notes.filter(note => note.id !== id);
      notify();
    },

    toggleFavorite: (id) => {
      store.notes = store.notes.map(note =>
        note.id === id ? { ...note, isFavorite: !note.isFavorite } : note
      );
      notify();
    },

    toggleArchive: (id) => {
      store.notes = store.notes.map(note =>
        note.id === id ? { ...note, isArchived: !note.isArchived } : note
      );
      notify();
    },

    setSearchTerm: (term) => {
      store.searchTerm = term;
      notify();
    },

    setSelectedCategory: (category) => {
      store.selectedCategory = category;
      notify();
    },

    getFilteredNotes: () => {
      return store.notes.filter(note => {
        const matchesSearch = note.title.toLowerCase().includes(store.searchTerm.toLowerCase()) ||
                             note.content.toLowerCase().includes(store.searchTerm.toLowerCase());
        
        const matchesCategory = store.selectedCategory === 'all' ||
                               store.selectedCategory === 'favorites' && note.isFavorite ||
                               store.selectedCategory === 'archived' && note.isArchived ||
                               store.selectedCategory === note.category;
        
        return matchesSearch && matchesCategory;
      });
    }
  };

  return () => {
    const [, forceUpdate] = React.useReducer(x => x + 1, 0);
    
    React.useEffect(() => {
      return actions.subscribe(forceUpdate);
    }, []);

    return {
      ...store,
      ...actions
    };
  };
})();

// Componente Sidebar
const Sidebar = ({ isOpen, setIsOpen }) => {
  const { navigate, currentPath } = useRouter();
  const { setSelectedCategory, notes } = useNotesStore();
  
  const menuItems = [
    { path: '/', icon: Home, label: 'Inicio', category: 'all' },
    { path: '/favorites', icon: Star, label: 'Favoritas', category: 'favorites' },
    { path: '/archived', icon: Archive, label: 'Archivadas', category: 'archived' },
    { path: '/settings', icon: Settings, label: 'Configuración', category: 'settings' }
  ];

  const categories = [
    { value: 'personal', label: 'Personal', color: 'bg-blue-500' },
    { value: 'trabajo', label: 'Trabajo', color: 'bg-green-500' },
    { value: 'ideas', label: 'Ideas', color: 'bg-purple-500' },
    { value: 'recordatorios', label: 'Recordatorios', color: 'bg-orange-500' }
  ];

  const handleNavigation = (path, category) => {
    navigate(path);
    setSelectedCategory(category);
    setIsOpen(false);
  };

  return (
    <>
      {/* Overlay para móvil */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-white border-r border-gray-200
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-800">Mis Notas</h1>
            <button 
              onClick={() => setIsOpen(false)}
              className="lg:hidden p-1 hover:bg-gray-100 rounded"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path, item.category)}
                  className={`
                    flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors w-full text-left
                    ${currentPath === item.path 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'text-gray-600 hover:bg-gray-100'
                    }
                  `}
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
            
            {/* Categories */}
            <div className="mt-8">
              <h3 className="text-sm font-medium text-gray-500 mb-3">Categorías</h3>
              <div className="space-y-2">
                {categories.map((category) => {
                  const categoryNotes = notes.filter(note => note.category === category.value);
                  return (
                    <button
                      key={category.value}
                      onClick={() => handleNavigation('/', category.value)}
                      className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-left hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${category.color}`} />
                        <span className="text-sm text-gray-600">{category.label}</span>
                      </div>
                      <span className="text-xs text-gray-400">{categoryNotes.length}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

// Componente Header
const Header = ({ setIsOpen }) => {
  const { navigate } = useRouter();
  const { searchTerm, setSearchTerm } = useNotesStore();
  
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setIsOpen(true)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu size={20} />
          </button>
          <h2 className="text-lg font-semibold text-gray-800">Dashboard</h2>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Buscar notas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => navigate('/new-note')}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <PlusCircle size={16} />
            <span>Nueva Nota</span>
          </button>
        </div>
      </div>
    </header>
  );
};

// Componente NoteCard
const NoteCard = ({ note }) => {
  const { navigate } = useRouter();
  const { deleteNote, toggleFavorite, toggleArchive } = useNotesStore();
  
  const categoryColors = {
    personal: 'bg-blue-100 text-blue-800',
    trabajo: 'bg-green-100 text-green-800',
    ideas: 'bg-purple-100 text-purple-800',
    recordatorios: 'bg-orange-100 text-orange-800'
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800 mb-1 line-clamp-1">{note.title}</h3>
          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${categoryColors[note.category] || 'bg-gray-100 text-gray-800'}`}>
            {note.category}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={() => toggleFavorite(note.id)}
            className={`p-1 rounded hover:bg-gray-100 ${note.isFavorite ? 'text-yellow-500' : 'text-gray-400'}`}
          >
            <Star size={16} fill={note.isFavorite ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={() => toggleArchive(note.id)}
            className={`p-1 rounded hover:bg-gray-100 ${note.isArchived ? 'text-blue-500' : 'text-gray-400'}`}
          >
            <Archive size={16} />
          </button>
        </div>
      </div>
      
      <p className="text-gray-600 text-sm mb-3 line-clamp-3">{note.content}</p>
      
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">
          {new Date(note.updatedAt).toLocaleDateString()}
        </span>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigate(`/edit/${note.id}`)}
            className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
          >
            <Edit3 size={16} />
          </button>
          <button
            onClick={() => deleteNote(note.id)}
            className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

// Página de Inicio
const HomePage = () => {
  const { getFilteredNotes, selectedCategory } = useNotesStore();
  const { navigate } = useRouter();
  const notes = getFilteredNotes();
  
  const getCategoryTitle = () => {
    switch (selectedCategory) {
      case 'favorites': return 'Notas Favoritas';
      case 'archived': return 'Notas Archivadas';
      case 'personal': return 'Notas Personales';
      case 'trabajo': return 'Notas de Trabajo';
      case 'ideas': return 'Ideas';
      case 'recordatorios': return 'Recordatorios';
      default: return 'Todas las Notas';
    }
  };
  
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{getCategoryTitle()}</h1>
        <p className="text-gray-600">{notes.length} {notes.length === 1 ? 'nota' : 'notas'}</p>
      </div>
      
      {notes.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-800 mb-2">No hay notas</h3>
          <p className="text-gray-600 mb-4">Comienza creando tu primera nota</p>
          <button
            onClick={() => navigate('/new-note')}
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <PlusCircle size={16} />
            <span>Crear Nota</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map(note => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      )}
    </div>
  );
};

// Página de Nueva Nota / Editar
const NoteFormPage = () => {
  const { currentPath, navigate } = useRouter();
  const isEditing = currentPath.includes('/edit/');
  const noteId = isEditing ? currentPath.split('/').pop() : null;
  
  const { notes, addNote, updateNote } = useNotesStore();
  const existingNote = isEditing ? notes.find(n => n.id === noteId) : null;
  
  const [title, setTitle] = useState(existingNote?.title || '');
  const [content, setContent] = useState(existingNote?.content || '');
  const [category, setCategory] = useState(existingNote?.category || 'personal');
  const [saved, setSaved] = useState(false);
  
  React.useEffect(() => {
    if (isEditing && existingNote) {
      setTitle(existingNote.title);
      setContent(existingNote.content);
      setCategory(existingNote.category);
    }
  }, [isEditing, existingNote]);
  
  const handleSave = () => {
    if (!title.trim()) return;
    
    if (isEditing) {
      updateNote(noteId, { title, content, category });
    } else {
      addNote({ title, content, category });
    }
    
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    setTimeout(() => navigate('/'), 500);
  };
  
  const categories = [
    { value: 'personal', label: 'Personal' },
    { value: 'trabajo', label: 'Trabajo' },
    { value: 'ideas', label: 'Ideas' },
    { value: 'recordatorios', label: 'Recordatorios' }
  ];
  
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">
            {isEditing ? 'Editar Nota' : 'Nueva Nota'}
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          {saved && (
            <span className="text-green-600 text-sm font-medium">✓ Guardado</span>
          )}
          <button
            onClick={handleSave}
            disabled={!title.trim()}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Save size={16} />
            <span>Guardar</span>
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Escribe el título de tu nota..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categoría
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contenido
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Escribe el contenido de tu nota..."
              rows={12}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Página de Configuración
const SettingsPage = () => {
  const { notes } = useNotesStore();
  
  const stats = {
    total: notes.length,
    favorites: notes.filter(n => n.isFavorite).length,
    archived: notes.filter(n => n.isArchived).length,
    byCategory: {
      personal: notes.filter(n => n.category === 'personal').length,
      trabajo: notes.filter(n => n.category === 'trabajo').length,
      ideas: notes.filter(n => n.category === 'ideas').length,
      recordatorios: notes.filter(n => n.category === 'recordatorios').length
    }
  };
  
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Configuración</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Estadísticas</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Total de notas:</span>
              <span className="font-medium">{stats.total}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Favoritas:</span>
              <span className="font-medium">{stats.favorites}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Archivadas:</span>
              <span className="font-medium">{stats.archived}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Por Categoría</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Personal:</span>
              <span className="font-medium">{stats.byCategory.personal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Trabajo:</span>
              <span className="font-medium">{stats.byCategory.trabajo}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Ideas:</span>
              <span className="font-medium">{stats.byCategory.ideas}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Recordatorios:</span>
              <span className="font-medium">{stats.byCategory.recordatorios}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:col-span-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Información de la App</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• Todas las notas se guardan localmente en tu navegador</p>
            <p>• Usa el buscador para encontrar notas rápidamente</p>
            <p>• Organiza tus notas por categorías</p>
            <p>• Marca notas como favoritas o archívalas</p>
            <p>• La aplicación es completamente funcional offline</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Router Component
const AppRouter = () => {
  const { currentPath } = useRouter();
  
  // Determinar qué componente renderizar basado en la ruta
  if (currentPath.startsWith('/edit/')) {
    return <NoteFormPage />;
  }
  
  switch (currentPath) {
    case '/':
    case '/favorites':
    case '/archived':
      return <HomePage />;
    case '/new-note':
      return <NoteFormPage />;
    case '/settings':
      return <SettingsPage />;
    default:
      return <HomePage />;
  }
};

// Componente Principal de la App
const App = () => {
  // const [sidebarOpen, setSidebarOpen] = useState(false);
  
  return (
    <BasicLayout />
    // <div className="flex h-screen bg-gray-50">
    //   <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
    //   <div className="flex-1 flex flex-col overflow-hidden">
    //     <Header setIsOpen={setSidebarOpen} />
        
    //     <main className="flex-1 overflow-y-auto">
    //       <AppRouter />
    //     </main>
    //   </div>
    // </div>
  );
};

export default App;