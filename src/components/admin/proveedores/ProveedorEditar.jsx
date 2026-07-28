import React, { useState, useEffect } from 'react';
import { apiService } from '../../../services/apiService';  // ← CORREGIDO
import { Save, ArrowLeft, Truck, Mail, Phone, MapPin } from 'lucide-react';

const ProveedorEditar = ({ id, navegar }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        direccion: ''
    });
    const [error, setError] = useState('');
    const [exito, setExito] = useState(false);
    const [carga, setCarga] = useState(true);

    useEffect(() => {
        const cargarProveedor = async () => {
            try {
                const data = await apiService.getProveedor(id);
                setFormData({
                    nombre: data.nombre || '',
                    email: data.email || '',
                    telefono: data.telefono || '',
                    direccion: data.direccion || ''
                });
            } catch (err) {
                setError('Error cargando el proveedor');
            } finally {
                setCarga(false);
            }
        };
        cargarProveedor();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.nombre.trim()) {
            setError('El nombre es obligatorio');
            return;
        }

        setCarga(true);
        setError('');
        setExito(false);

        try {
            await apiService.actualizarProveedor(id, formData);
            setExito(true);
            setTimeout(() => {
                navegar('proveedores', 'list');
            }, 1500);
        } catch (err) {
            setError('Error al actualizar el proveedor: ' + err.message);
        } finally {
            setCarga(false);
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
        <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={() => navegar('proveedores', 'list')}
                    className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                    <ArrowLeft className="w-6 h-6 text-gray-600" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <Truck className="w-6 h-6 text-indigo-600" />
                        Editar Proveedor
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Modifica los datos del proveedor</p>
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
                        ¡Proveedor actualizado exitosamente! Redirigiendo...
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
                        <div className="relative">
                            <Truck className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                name="nombre"
                                required
                                value={formData.nombre}
                                onChange={handleChange}
                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleChange}
                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                name="direccion"
                                value={formData.direccion}
                                onChange={handleChange}
                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={() => navegar('proveedores', 'list')}
                            className="px-6 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={carga}
                            className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors shadow-sm hover:shadow-md font-medium disabled:opacity-50"
                        >
                            <Save className="w-4 h-4" />
                            {carga ? 'Actualizando...' : 'Actualizar Proveedor'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProveedorEditar;