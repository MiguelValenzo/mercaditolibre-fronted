import React, { useState, useEffect } from 'react';
import { apiService } from '../../../services/apiService';
import { Plus, Pencil, Trash2, Search, Eye, Package } from 'lucide-react';

const ProductosList = ({ navegar }) => {
    const [productos, setProductos] = useState([]);
    const [carga, setCarga] = useState(true);
    const [busqueda, setBusqueda] = useState('');

    useEffect(() => {
        cargarProductos();
    }, []);

    const cargarProductos = async () => {
        setCarga(true);
        try {
            const data = await apiService.getProductos();
            setProductos(data || []);
        } catch (error) {
            console.error('Error cargando productos:', error);
        } finally {
            setCarga(false);
        }
    };

    const eliminarProducto = async (id) => {
        if (confirm('¿Estás seguro de eliminar este producto?')) {
            try {
                await apiService.eliminarProducto(id);
                cargarProductos();
            } catch (error) {
                alert('Error al eliminar el producto');
            }
        }
    };

    const productosFiltrados = productos.filter(p =>
        p.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
        p.descripcion?.toLowerCase().includes(busqueda.toLowerCase())
    );

    if (carga) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <Package className="w-6 h-6 text-indigo-600" />
                        Productos
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Gestiona el catálogo de productos</p>
                </div>
                <button
                    onClick={() => navegar('productos', 'crear')}
                    className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors shadow-sm hover:shadow-md"
                >
                    <Plus className="w-4 h-4" />
                    Nuevo Producto
                </button>
            </div>

            {/* Buscador */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        placeholder="Buscar productos..."
                        className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-gray-50 hover:bg-white transition-colors"
                    />
                </div>
            </div>

            {/* Tabla */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Producto</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">Categoría</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase hidden lg:table-cell">Precio</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase hidden lg:table-cell">Stock</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {productosFiltrados.map((producto) => (
                                <tr key={producto.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={producto.imagenUrl || 'https://via.placeholder.com/48/4f46e5/ffffff?text=P'}
                                                alt={producto.nombre}
                                                className="w-12 h-12 rounded-xl object-cover bg-gray-100 border border-gray-200"
                                                onError={(e) => e.target.src = 'https://via.placeholder.com/48/4f46e5/ffffff?text=P'}
                                            />
                                            <div>
                                                <p className="font-semibold text-gray-800">{producto.nombre}</p>
                                                <p className="text-xs text-gray-500 truncate max-w-xs">{producto.descripcion || 'Sin descripción'}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 hidden md:table-cell">
                                        <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium">
                                            {producto.categoria?.nombre || 'Sin categoría'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 hidden lg:table-cell font-semibold text-gray-800">
                                        ${producto.precio?.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 hidden lg:table-cell">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                            producto.stock > 10 ? 'bg-green-50 text-green-700' :
                                            producto.stock > 0 ? 'bg-yellow-50 text-yellow-700' :
                                            'bg-red-50 text-red-700'
                                        }`}>
                                            {producto.stock} unidades
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <button
                                                onClick={() => navegar('productos', 'editar', producto.id)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                title="Editar"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => eliminarProducto(producto.id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Eliminar"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {productosFiltrados.length === 0 && (
                    <div className="text-center py-12">
                        <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">No hay productos disponibles</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductosList;