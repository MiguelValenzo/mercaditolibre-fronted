import React, { useState, useEffect } from 'react';
import { apiService } from '../../../services/apiService';
import { Save, ArrowLeft, Image, Package, AlertCircle, CheckCircle2, Loader2, Sparkles, DollarSign, Layers, Truck, ShieldCheck } from 'lucide-react';

const ProductoEditar = ({ productoId, navegar }) => {
    const [categorias, setCategorias] = useState([]);
    const [proveedores, setProveedores] = useState([]);
    const [carga, setCarga] = useState(true);
    const [guardando, setGuardando] = useState(false);
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
        const cargarDatosIniciales = async () => {
            try {
                const [cat, prov, productoData] = await Promise.all([
                    apiService.getCategorias(),
                    apiService.getProveedores(),
                    apiService.getProducto(productoId)  // ✅ CORREGIDO: usar getProducto
                ]);
                
                setCategorias(cat || []);
                setProveedores(prov || []);

                if (productoData) {
                    setFormData({
                        nombre: productoData.nombre || '',
                        descripcion: productoData.descripcion || '',
                        precio: productoData.precio !== undefined ? productoData.precio : '',
                        stock: productoData.stock !== undefined ? productoData.stock : '',
                        imagenUrl: productoData.imagenUrl || '',
                        categoria: { id: productoData.categoria?.id || '' },
                        proveedor: { id: productoData.proveedor?.id || '' }
                    });
                    if (productoData.imagenUrl) {
                        setImagenPreview(productoData.imagenUrl);
                    }
                }
            } catch (err) {
                console.error('❌ Error cargando datos:', err);
                setError('Error cargando los datos para la edición: ' + (err.message || 'Intente de nuevo.'));
            } finally {
                setCarga(false);
            }
        };

        if (productoId) {
            cargarDatosIniciales();
        } else {
            setError('No se proporcionó un ID de producto válido para editar.');
            setCarga(false);
        }
    }, [productoId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError('');
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

        const categoriaId = parseInt(formData.categoria.id);
        const proveedorId = parseInt(formData.proveedor.id);

        if (!formData.nombre.trim()) {
            setError('El nombre del producto es obligatorio.');
            return;
        }

        if (!categoriaId || isNaN(categoriaId)) {
            setError('Debes seleccionar una categoría válida.');
            return;
        }

        if (!proveedorId || isNaN(proveedorId)) {
            setError('Debes seleccionar un proveedor válido.');
            return;
        }

        if (!formData.precio || parseFloat(formData.precio) < 0) {
            setError('Ingresa un precio válido para el producto.');
            return;
        }

        if (!formData.stock || parseInt(formData.stock) < 0) {
            setError('Ingresa una cantidad de stock válida.');
            return;
        }

        setGuardando(true);

        try {
            const productoData = {
                nombre: formData.nombre.trim(),
                descripcion: formData.descripcion.trim(),
                precio: parseFloat(formData.precio),
                stock: parseInt(formData.stock),
                imagenUrl: formData.imagenUrl.trim() || '',
                categoriaId: categoriaId,
                proveedorId: proveedorId
            };
            
            await apiService.actualizarProducto(productoId, productoData);
            
            setExito(true);
            setTimeout(() => {
                navegar('productos', 'list');
            }, 1400);
        } catch (err) {
            setError('Error al actualizar el producto: ' + (err.message || 'Intente de nuevo.'));
        } finally {
            setGuardando(false);
        }
    };

    if (carga) {
        return (
            <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                height: '384px', 
                gap: '16px', 
                fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                background: '#0f172a'
            }}>
                <div style={{ 
                    width: '64px', 
                    height: '64px', 
                    borderRadius: '24px', 
                    background: '#1e293b', 
                    border: '1px solid #334155', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    color: '#818cf8', 
                    boxShadow: '0 10px 25px -5px rgba(79, 70, 229, 0.3)' 
                }}>
                    <Loader2 style={{ width: '32px', height: '32px', animation: 'spin 1s linear infinite' }} />
                </div>
                <p style={{ fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', color: '#64748b', margin: 0 }}>
                    Cargando información del producto...
                </p>
                <style>{`
                    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                `}</style>
            </div>
        );
    }

    return (
        <div style={{ 
            width: '100%', 
            maxWidth: '1000px', 
            margin: '0 auto', 
            paddingBottom: '50px', 
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            background: '#0f172a',
            minHeight: '100vh',
            paddingTop: '24px',
            paddingLeft: '24px',
            paddingRight: '24px',
            boxSizing: 'border-box'
        }}>
            {/* Header Superior Estilizado */}
            <div style={{ 
                background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)', 
                borderRadius: '28px', 
                padding: '36px 40px', 
                color: 'white', 
                boxShadow: '0 20px 35px -10px rgba(0, 0, 0, 0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '30px',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid rgba(99, 102, 241, 0.2)',
                flexWrap: 'wrap',
                gap: '16px'
            }}>
                <div style={{
                    position: 'absolute',
                    right: '-30px',
                    top: '-30px',
                    width: '200px',
                    height: '200px',
                    background: 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, rgba(255,255,255,0) 70%)',
                    borderRadius: '50%',
                    pointerEvents: 'none'
                }}></div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '24px', zIndex: 1 }}>
                    <button
                        type="button"
                        onClick={() => navegar('productos', 'list')}
                        style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: '16px',
                            padding: '14px',
                            cursor: 'pointer',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s ease',
                            backdropFilter: 'blur(8px)'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                        title="Regresar al listado"
                    >
                        <ArrowLeft style={{ width: '22px', height: '22px', strokeWidth: 2.5 }} />
                    </button>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <div style={{
                            width: '68px',
                            height: '68px',
                            background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                            borderRadius: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '2px solid rgba(255, 255, 255, 0.2)',
                            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)'
                        }}>
                            <Package style={{ width: '34px', height: '34px', color: 'white' }} />
                        </div>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                <span style={{
                                    background: 'rgba(56, 189, 248, 0.15)',
                                    color: '#38bdf8',
                                    border: '1px solid rgba(56, 189, 248, 0.3)',
                                    padding: '3px 10px',
                                    borderRadius: '20px',
                                    fontSize: '10px',
                                    fontWeight: '800',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px'
                                }}>
                                    Edición de Registros
                                </span>
                            </div>
                            <h1 style={{ fontSize: '30px', fontWeight: '800', margin: '0', letterSpacing: '-0.8px', color: '#ffffff' }}>
                                Editar Producto
                            </h1>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', zIndex: 1, alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.08)', padding: '10px 16px', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <ShieldCheck style={{ width: '20px', height: '20px', color: '#38bdf8' }} />
                    <span style={{ fontSize: '12px', fontWeight: '600', color: '#e2e8f0' }}>Modificación Activa</span>
                </div>
            </div>

            {/* Tarjeta Contenedora del Formulario - Modo Oscuro */}
            <div style={{ 
                background: '#0f172a', 
                borderRadius: '28px', 
                padding: '40px', 
                boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.3)', 
                border: '1px solid #1e293b' 
            }}>
                {/* Alerta de Error - Modo Oscuro */}
                {error && (
                    <div style={{ 
                        background: 'rgba(239, 68, 68, 0.15)', 
                        border: '1px solid #7f1d1d', 
                        padding: '16px 20px', 
                        borderRadius: '16px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '14px', 
                        color: '#fca5a5', 
                        marginBottom: '30px',
                        fontSize: '13px',
                        fontWeight: '600',
                        boxShadow: '0 4px 12px rgba(239, 68, 68, 0.1)'
                    }}>
                        <div style={{ background: '#ef4444', color: 'white', padding: '8px', borderRadius: '10px', display: 'flex' }}>
                            <AlertCircle style={{ width: '18px', height: '18px' }} />
                        </div>
                        <span>{error}</span>
                    </div>
                )}

                {/* Alerta de Éxito - Modo Oscuro */}
                {exito && (
                    <div style={{ 
                        background: 'rgba(16, 185, 129, 0.15)', 
                        border: '1px solid #065f46', 
                        padding: '16px 20px', 
                        borderRadius: '16px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '14px', 
                        color: '#6ee7b7', 
                        marginBottom: '30px',
                        fontSize: '13px',
                        fontWeight: '600',
                        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.1)'
                    }}>
                        <div style={{ background: '#10b981', color: 'white', padding: '8px', borderRadius: '10px', display: 'flex' }}>
                            <CheckCircle2 style={{ width: '18px', height: '18px' }} />
                        </div>
                        <span>¡Producto actualizado exitosamente! Redirigiendo al panel...</span>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '28px', marginBottom: '35px' }}>
                        
                        {/* Nombre del Producto - Modo Oscuro */}
                        <div style={{ gridColumn: '1 / -1' }}>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '10px', letterSpacing: '0.5px' }}>
                                Nombre del Producto <span style={{ color: '#ef4444' }}>*</span>
                            </label>
                            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                <span style={{ position: 'absolute', left: '18px', color: '#818cf8', display: 'flex', pointerEvents: 'none' }}>
                                    <Sparkles style={{ width: '20px', height: '20px' }} />
                                </span>
                                <input
                                    type="text"
                                    name="nombre"
                                    required
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    placeholder="Ej: Laptop Gamer Pro, Silla Ergonómica..."
                                    style={{
                                        width: '100%',
                                        padding: '16px 18px 16px 52px',
                                        borderRadius: '16px',
                                        border: '1.5px solid #1e293b',
                                        background: '#0f172a',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        color: '#f1f5f9',
                                        outline: 'none',
                                        transition: 'all 0.2s ease',
                                        boxSizing: 'border-box'
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = '#4f46e5';
                                        e.target.style.background = '#1a1a2e';
                                        e.target.style.boxShadow = '0 0 0 4px rgba(79, 70, 229, 0.15)';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = '#1e293b';
                                        e.target.style.background = '#0f172a';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                />
                            </div>
                        </div>

                        {/* Descripción del Producto - Modo Oscuro */}
                        <div style={{ gridColumn: '1 / -1' }}>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '10px', letterSpacing: '0.5px' }}>
                                Descripción del Producto
                            </label>
                            <textarea
                                name="descripcion"
                                rows="3"
                                value={formData.descripcion}
                                onChange={handleChange}
                                placeholder="Detalles generales, especificaciones o características..."
                                style={{
                                    width: '100%',
                                    padding: '16px 18px',
                                    borderRadius: '16px',
                                    border: '1.5px solid #1e293b',
                                    background: '#0f172a',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    color: '#f1f5f9',
                                    outline: 'none',
                                    transition: 'all 0.2s ease',
                                    boxSizing: 'border-box',
                                    resize: 'none',
                                    fontFamily: 'inherit'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = '#4f46e5';
                                    e.target.style.background = '#1a1a2e';
                                    e.target.style.boxShadow = '0 0 0 4px rgba(79, 70, 229, 0.15)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = '#1e293b';
                                    e.target.style.background = '#0f172a';
                                    e.target.style.boxShadow = 'none';
                                }}
                            />
                        </div>

                        {/* Precio Unitario - Modo Oscuro */}
                        <div>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '10px', letterSpacing: '0.5px' }}>
                                Precio Unitario <span style={{ color: '#ef4444' }}>*</span>
                            </label>
                            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                <span style={{ position: 'absolute', left: '18px', color: '#818cf8', display: 'flex', pointerEvents: 'none' }}>
                                    <DollarSign style={{ width: '20px', height: '20px' }} />
                                </span>
                                <input
                                    type="number"
                                    name="precio"
                                    required
                                    step="0.01"
                                    min="0"
                                    value={formData.precio}
                                    onChange={handleChange}
                                    placeholder="0.00"
                                    style={{
                                        width: '100%',
                                        padding: '16px 18px 16px 52px',
                                        borderRadius: '16px',
                                        border: '1.5px solid #1e293b',
                                        background: '#0f172a',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        color: '#f1f5f9',
                                        outline: 'none',
                                        transition: 'all 0.2s ease',
                                        boxSizing: 'border-box'
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = '#4f46e5';
                                        e.target.style.background = '#1a1a2e';
                                        e.target.style.boxShadow = '0 0 0 4px rgba(79, 70, 229, 0.15)';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = '#1e293b';
                                        e.target.style.background = '#0f172a';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                />
                            </div>
                        </div>

                        {/* Inventario (Stock) - Modo Oscuro */}
                        <div>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '10px', letterSpacing: '0.5px' }}>
                                Inventario (Stock) <span style={{ color: '#ef4444' }}>*</span>
                            </label>
                            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                <span style={{ position: 'absolute', left: '18px', color: '#818cf8', display: 'flex', pointerEvents: 'none' }}>
                                    <Package style={{ width: '20px', height: '20px' }} />
                                </span>
                                <input
                                    type="number"
                                    name="stock"
                                    required
                                    min="0"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    placeholder="0"
                                    style={{
                                        width: '100%',
                                        padding: '16px 18px 16px 52px',
                                        borderRadius: '16px',
                                        border: '1.5px solid #1e293b',
                                        background: '#0f172a',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        color: '#f1f5f9',
                                        outline: 'none',
                                        transition: 'all 0.2s ease',
                                        boxSizing: 'border-box'
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = '#4f46e5';
                                        e.target.style.background = '#1a1a2e';
                                        e.target.style.boxShadow = '0 0 0 4px rgba(79, 70, 229, 0.15)';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = '#1e293b';
                                        e.target.style.background = '#0f172a';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                />
                            </div>
                        </div>

                        {/* URL de la Imagen - Modo Oscuro */}
                        <div style={{ gridColumn: '1 / -1' }}>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '10px', letterSpacing: '0.5px' }}>
                                URL de la Imagen
                            </label>
                            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                <span style={{ position: 'absolute', left: '18px', color: '#818cf8', display: 'flex', pointerEvents: 'none' }}>
                                    <Image style={{ width: '20px', height: '20px' }} />
                                </span>
                                <input
                                    type="text"
                                    name="imagenUrl"
                                    value={formData.imagenUrl}
                                    onChange={handleImageChange}
                                    placeholder="https://ejemplo.com/imagen.jpg"
                                    style={{
                                        width: '100%',
                                        padding: '16px 18px 16px 52px',
                                        borderRadius: '16px',
                                        border: '1.5px solid #1e293b',
                                        background: '#0f172a',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        color: '#f1f5f9',
                                        outline: 'none',
                                        transition: 'all 0.2s ease',
                                        boxSizing: 'border-box'
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = '#4f46e5';
                                        e.target.style.background = '#1a1a2e';
                                        e.target.style.boxShadow = '0 0 0 4px rgba(79, 70, 229, 0.15)';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = '#1e293b';
                                        e.target.style.background = '#0f172a';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                />
                            </div>
                            {imagenPreview && (
                                <div style={{ marginTop: '12px', padding: '12px 16px', background: '#0f172a', borderRadius: '16px', border: '1.5px solid #1e293b', display: 'inline-flex', alignItems: 'center', gap: '16px' }}>
                                    <img 
                                        src={imagenPreview} 
                                        alt="Vista previa" 
                                        style={{ width: '56px', height: '56px', objectFit: 'cover', borderRadius: '12px', border: '1px solid #1e293b' }}
                                        onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=Error+Imagen'; }} 
                                    />
                                    <div>
                                        <span style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#818cf8', display: 'block', marginBottom: '2px' }}>Previsualización activa</span>
                                        <p style={{ fontSize: '12px', fontWeight: '600', color: '#94a3b8', margin: 0, maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{imagenPreview}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Categoría - Modo Oscuro */}
                        <div>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '10px', letterSpacing: '0.5px' }}>
                                Categoría <span style={{ color: '#ef4444' }}>*</span>
                            </label>
                            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                <span style={{ position: 'absolute', left: '18px', color: '#818cf8', display: 'flex', pointerEvents: 'none', zIndex: 2 }}>
                                    <Layers style={{ width: '20px', height: '20px' }} />
                                </span>
                                <select
                                    required
                                    value={formData.categoria.id || ''}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setFormData({
                                            ...formData,
                                            categoria: { id: value }
                                        });
                                    }}
                                    style={{
                                        width: '100%',
                                        padding: '16px 18px 16px 52px',
                                        borderRadius: '16px',
                                        border: '1.5px solid #1e293b',
                                        background: '#0f172a',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        color: '#f1f5f9',
                                        outline: 'none',
                                        transition: 'all 0.2s ease',
                                        boxSizing: 'border-box',
                                        appearance: 'none',
                                        cursor: 'pointer'
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = '#4f46e5';
                                        e.target.style.background = '#1a1a2e';
                                        e.target.style.boxShadow = '0 0 0 4px rgba(79, 70, 229, 0.15)';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = '#1e293b';
                                        e.target.style.background = '#0f172a';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                >
                                    <option value="" style={{ background: '#0f172a', color: '#94a3b8' }}>Seleccionar categoría</option>
                                    {categorias.map(cat => (
                                        <option key={cat.id} value={cat.id} style={{ background: '#0f172a', color: '#f1f5f9' }}>{cat.nombre}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Proveedor - Modo Oscuro */}
                        <div>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '10px', letterSpacing: '0.5px' }}>
                                Proveedor <span style={{ color: '#ef4444' }}>*</span>
                            </label>
                            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                <span style={{ position: 'absolute', left: '18px', color: '#818cf8', display: 'flex', pointerEvents: 'none', zIndex: 2 }}>
                                    <Truck style={{ width: '20px', height: '20px' }} />
                                </span>
                                <select
                                    required
                                    value={formData.proveedor.id || ''}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setFormData({
                                            ...formData,
                                            proveedor: { id: value }
                                        });
                                    }}
                                    style={{
                                        width: '100%',
                                        padding: '16px 18px 16px 52px',
                                        borderRadius: '16px',
                                        border: '1.5px solid #1e293b',
                                        background: '#0f172a',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        color: '#f1f5f9',
                                        outline: 'none',
                                        transition: 'all 0.2s ease',
                                        boxSizing: 'border-box',
                                        appearance: 'none',
                                        cursor: 'pointer'
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = '#4f46e5';
                                        e.target.style.background = '#1a1a2e';
                                        e.target.style.boxShadow = '0 0 0 4px rgba(79, 70, 229, 0.15)';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = '#1e293b';
                                        e.target.style.background = '#0f172a';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                >
                                    <option value="" style={{ background: '#0f172a', color: '#94a3b8' }}>Seleccionar proveedor</option>
                                    {proveedores.map(prov => (
                                        <option key={prov.id} value={prov.id} style={{ background: '#0f172a', color: '#f1f5f9' }}>{prov.nombre}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                    </div>

                    {/* Botones de Acción - Modo Oscuro */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '16px', borderTop: '1px solid #1e293b', paddingTop: '30px' }}>
                        <button
                            type="button"
                            onClick={() => navegar('productos', 'list')}
                            style={{
                                padding: '14px 24px',
                                borderRadius: '16px',
                                background: '#1e293b',
                                border: '1px solid #2d3748',
                                color: '#94a3b8',
                                fontSize: '14px',
                                fontWeight: '700',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = '#2d3748';
                                e.currentTarget.style.color = '#f1f5f9';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = '#1e293b';
                                e.currentTarget.style.color = '#94a3b8';
                            }}
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            disabled={guardando}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '14px 28px',
                                borderRadius: '16px',
                                background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                                border: 'none',
                                color: 'white',
                                fontSize: '14px',
                                fontWeight: '700',
                                cursor: guardando ? 'not-allowed' : 'pointer',
                                boxShadow: '0 10px 20px -5px rgba(79, 70, 229, 0.4)',
                                opacity: guardando ? 0.7 : 1,
                                transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                                if (!guardando) {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 16px 30px -8px rgba(79, 70, 229, 0.5)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!guardando) {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 10px 20px -5px rgba(79, 70, 229, 0.4)';
                                }
                            }}
                        >
                            {guardando ? (
                                <>
                                    <Loader2 style={{ width: '18px', height: '18px', animation: 'spin 1s linear infinite' }} />
                                    Actualizando...
                                </>
                            ) : (
                                <>
                                    <Save style={{ width: '18px', height: '18px' }} />
                                    Actualizar Producto
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductoEditar;