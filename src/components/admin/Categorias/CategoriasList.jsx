import React, { useState, useEffect } from 'react';
import { apiService } from '../../../services/apiService';
import { Plus, Pencil, Trash2, FolderTree } from 'lucide-react';

const CategoriasList = ({ navegar }) => {
    const [categorias, setCategorias] = useState([]);
    const [carga, setCarga] = useState(true);

    useEffect(() => {
        cargarCategorias();
    }, []);

    const cargarCategorias = async () => {
        setCarga(true);
        try {
            const data = await apiService.getCategorias();
            setCategorias(data || []);
        } catch (error) {
            console.error('Error cargando categorías:', error);
        } finally {
            setCarga(false);
        }
    };

    const eliminar = async (id) => {
        if (confirm('¿Eliminar esta categoría?')) {
            try {
                await apiService.eliminarCategoria(id);
                cargarCategorias();
            } catch (error) {
                alert('Error al eliminar la categoría');
            }
        }
    };

    if (carga) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <FolderTree className="w-6 h-6 text-indigo-600" />
                        Categorías
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Administra las categorías de productos</p>
                </div>
                <button
                    onClick={() => navegar('categorias', 'crear')}
                    className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors shadow-sm hover:shadow-md"
                >
                    <Plus className="w-4 h-4" />
                    Nueva Categoría
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categorias.map(cat => (
                    <div key={cat.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                                    <FolderTree className="w-5 h-5 text-indigo-600" />
                                </div>
                                <span className="font-medium text-gray-800">{cat.nombre}</span>
                            </div>
                            <div className="flex gap-1">
                                <button 
                                    onClick={() => navegar('categorias', 'editar', cat.id)} 
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                >
                                    <Pencil className="w-4 h-4" />
                                </button>
                                <button 
                                    onClick={() => eliminar(cat.id)} 
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {categorias.length === 0 && (
                <div className="text-center py-12">
                    <FolderTree className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No hay categorías disponibles</p>
                </div>
            )}
        </div>
    );
};

export default CategoriasList;