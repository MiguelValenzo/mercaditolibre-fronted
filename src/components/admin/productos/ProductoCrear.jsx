import React, { useState, useEffect } from 'react';
import { apiService } from '../../../services/apiService';
import { Save, X, ArrowLeft, Image, Package } from 'lucide-react';

const ProductoCrear = ({ navegar }) => {
    const [categorias, setCategorias] = useState([]);
    const [proveedores, setProveedores] = useState([]);
    const [carga, setCarga] = useState(true);
    const [error, setError] = useState('');
    const [exito, setExito] = useState(false);
    const [imagenPreview, setImagenPreview] = useState('');
    
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        stock: '',
        imagenUrl: '',
        categoria: { id: '' },
        proveedor: { id: '' }
    });

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const [cat, prov] = await Promise.all([
                    apiService.getCategorias(),
                    apiService.getProveedores()
                ]);
                console.log('📌 Categorías cargadas:', cat);
                console.log('📌 Proveedores cargados:', prov);
                setCategorias(cat || []);
                setProveedores(prov || []);
            } catch (err) {
                setError('Error cargando datos: ' + err.message);
            } finally {
                setCarga(false);
            }
        };
        cargarDatos();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const url = e.target.value;
        setFormData({ ...formData, imagenUrl: url });
        setImagenPreview(url);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setExito(false);

        try {
            const categoriaId = parseInt(formData.categoria.id);
            const proveedorId = parseInt(formData.proveedor.id);

            if (!categoriaId || isNaN(categoriaId)) {
                setError('Debes seleccionar una categoría');
                return;
            }

            if (!proveedorId || isNaN(proveedorId)) {
                setError('Debes seleccionar un proveedor');
                return;
            }

            const productoData = {
                nombre: formData.nombre,
                descripcion: formData.descripcion,
                precio: parseFloat(formData.precio),
                stock: parseInt(formData.stock),
                imagenUrl: formData.imagenUrl || '',
                categoriaId: categoriaId,
                proveedorId: proveedorId
            };

            console.log('📦 Enviando producto:', productoData);
            
            const response = await apiService.crearProducto(productoData);
            console.log('✅ Producto creado:', response);
            
            setExito(true);
            setTimeout(() => {
                navegar('productos', 'list');
            }, 1500);
        } catch (err) {
            console.error('❌ Error al crear producto:', err);
            setError('Error al crear el producto: ' + err.message);
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
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={() => navegar('productos', 'list')}
                    className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                    <ArrowLeft className="w-6 h-6 text-gray-600" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <Package className="w-6 h-6 text-indigo-600" />
                        Nuevo Producto
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Completa los datos para agregar un nuevo producto</p>
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
                        ¡Producto creado exitosamente! Redirigiendo...
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
                            <input
                                type="text"
                                name="nombre"
                                required
                                value={formData.nombre}
                                onChange={handleChange}
                                placeholder="Nombre del producto"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                            <textarea
                                name="descripcion"
                                rows="4"
                                value={formData.descripcion}
                                onChange={handleChange}
                                placeholder="Descripción del producto"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Precio *</label>
                            <input
                                type="number"
                                name="precio"
                                required
                                step="0.01"
                                value={formData.precio}
                                onChange={handleChange}
                                placeholder="0.00"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Stock *</label>
                            <input
                                type="number"
                                name="stock"
                                required
                                value={formData.stock}
                                onChange={handleChange}
                                placeholder="0"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">URL de Imagen</label>
                            <div className="relative">
                                <Image className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    name="imagenUrl"
                                    value={formData.imagenUrl}
                                    onChange={handleImageChange}
                                    placeholder="https://ejemplo.com/imagen.jpg"
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                            </div>
                            {imagenPreview && (
                                <div className="mt-3">
                                    <p className="text-sm text-gray-500 mb-1">Vista previa:</p>
                                    <img src={imagenPreview} alt="Preview" className="w-24 h-24 object-cover rounded-lg border border-gray-200" />
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Categoría *</label>
                            <select
                                required
                                value={formData.categoria.id || ''}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    console.log('📌 Categoría seleccionada:', value);
                                    setFormData({
                                        ...formData,
                                        categoria: { id: value }
                                    });
                                }}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
                            >
                                <option value="">Seleccionar categoría</option>
                                {categorias.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Proveedor *</label>
                            <select
                                required
                                value={formData.proveedor.id || ''}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    console.log('📌 Proveedor seleccionado:', value);
                                    setFormData({
                                        ...formData,
                                        proveedor: { id: value }
                                    });
                                }}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
                            >
                                <option value="">Seleccionar proveedor</option>
                                {proveedores.map(prov => (
                                    <option key={prov.id} value={prov.id}>{prov.nombre}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={() => navegar('productos', 'list')}
                            className="px-6 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors font-medium"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors shadow-sm hover:shadow-md font-medium"
                        >
                            <Save className="w-4 h-4" />
                            Guardar Producto
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// ✅ AGREGAR EL EXPORT DEFAULT AL FINAL
export default ProductoCrear;