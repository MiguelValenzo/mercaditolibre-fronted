import React, { useState } from 'react';
import { apiService } from '../../../services/apiService';
import { Save, ArrowLeft, FolderTree } from 'lucide-react';

const CategoriaCrear = ({ navegar }) => {
    const [nombre, setNombre] = useState('');
    const [error, setError] = useState('');
    const [exito, setExito] = useState(false);
    const [carga, setCarga] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!nombre.trim()) {
            setError('El nombre es obligatorio');
            return;
        }

        setCarga(true);
        setError('');
        setExito(false);

        try {
            await apiService.crearCategoria({ nombre: nombre.trim() });
            setExito(true);
            setTimeout(() => {
                navegar('categorias', 'list');
            }, 1500);
        } catch (err) {
            setError('Error al crear la categoría: ' + err.message);
        } finally {
            setCarga(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={() => navegar('categorias', 'list')}
                    className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                    <ArrowLeft className="w-6 h-6 text-gray-600" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <FolderTree className="w-6 h-6 text-indigo-600" />
                        Nueva Categoría
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Agrega una nueva categoría</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                        {error}
                    </div>
                )}

                {exito && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
                        ¡Categoría creada exitosamente! Redirigiendo...
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de la categoría *</label>
                        <input
                            type="text"
                            required
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            placeholder="Ej: Electrónicos, Ropa, Hogar..."
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={() => navegar('categorias', 'list')}
                            className="px-6 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors font-medium"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={carga}
                            className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors shadow-sm hover:shadow-md font-medium disabled:opacity-50"
                        >
                            <Save className="w-4 h-4" />
                            {carga ? 'Guardando...' : 'Guardar Categoría'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CategoriaCrear;