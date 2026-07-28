import React, { useState, useEffect } from 'react';
import { apiService } from '../../../services/apiService';
import { Plus, Pencil, Trash2, Truck, Mail, Phone, MapPin } from 'lucide-react';

const ProveedoresList = ({ navegar }) => {
    const [proveedores, setProveedores] = useState([]);
    const [carga, setCarga] = useState(true);

    useEffect(() => {
        cargarProveedores();
    }, []);

    const cargarProveedores = async () => {
        setCarga(true);
        try {
            const data = await apiService.getProveedores();
            setProveedores(data || []);
        } catch (error) {
            console.error('Error cargando proveedores:', error);
        } finally {
            setCarga(false);
        }
    };

    const eliminar = async (id) => {
        if (confirm('¿Eliminar este proveedor?')) {
            try {
                await apiService.eliminarProveedor(id);
                cargarProveedores();
            } catch (error) {
                alert('Error al eliminar el proveedor');
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
                        <Truck className="w-6 h-6 text-indigo-600" />
                        Proveedores
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Administra los proveedores</p>
                </div>
                <button
                    onClick={() => navegar('proveedores', 'crear')}
                    className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors shadow-sm hover:shadow-md"
                >
                    <Plus className="w-4 h-4" />
                    Nuevo Proveedor
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Nombre</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">Email</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase hidden lg:table-cell">Teléfono</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {proveedores.map(prov => (
                                <tr key={prov.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-800">{prov.nombre}</td>
                                    <td className="px-6 py-4 hidden md:table-cell text-gray-600">{prov.email}</td>
                                    <td className="px-6 py-4 hidden lg:table-cell text-gray-600">{prov.telefono}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <button 
                                                onClick={() => navegar('proveedores', 'editar', prov.id)} 
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button 
                                                onClick={() => eliminar(prov.id)} 
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
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
                {proveedores.length === 0 && (
                    <div className="text-center py-12">
                        <Truck className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">No hay proveedores disponibles</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProveedoresList;