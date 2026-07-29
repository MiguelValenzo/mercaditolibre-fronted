import React, { useState, useEffect } from 'react';
import { apiService } from '../../../services/apiService';
import { Plus, Pencil, Trash2, FolderTree, Loader2, Layers, Search, Sparkles, ShieldCheck } from 'lucide-react';

const CategoriasList = ({ navegar }) => {
    const [categorias, setCategorias] = useState([]);
    const [carga, setCarga] = useState(true);
    const [eliminandoId, setEliminandoId] = useState(null);
    const [busqueda, setBusqueda] = useState('');

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
        if (window.confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
            setEliminandoId(id);
            try {
                await apiService.eliminarCategoria(id);
                await cargarCategorias();
            } catch (error) {
                alert('Error al eliminar la categoría: ' + (error.message || 'Intente de nuevo.'));
            } finally {
                setEliminandoId(null);
            }
        }
    };

    const categoriasFiltradas = categorias.filter(cat => 
        cat.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        String(cat.id).includes(busqueda)
    );

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
                    Cargando categorías del sistema...
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
            maxWidth: '1200px', 
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
            {/* Header */}
            <div style={{ 
                background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)', 
                borderRadius: '24px', 
                padding: '28px 32px', 
                color: 'white', 
                boxShadow: '0 20px 35px -10px rgba(0, 0, 0, 0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '24px',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid rgba(99, 102, 241, 0.2)',
                flexWrap: 'wrap',
                gap: '20px'
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

                <div style={{ display: 'flex', alignItems: 'center', gap: '18px', zIndex: 1 }}>
                    <div style={{
                        width: '58px',
                        height: '58px',
                        background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2px solid rgba(255, 255, 255, 0.2)',
                        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)'
                    }}>
                        <FolderTree style={{ width: '28px', height: '28px', color: 'white' }} />
                    </div>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <span style={{
                                background: 'rgba(251, 191, 36, 0.15)',
                                color: '#fbbf24',
                                border: '1px solid rgba(251, 191, 36, 0.3)',
                                padding: '2px 8px',
                                borderRadius: '20px',
                                fontSize: '9px',
                                fontWeight: '800',
                                textTransform: 'uppercase',
                                letterSpacing: '1px'
                            }}>
                                Inventario General
                            </span>
                        </div>
                        <h1 style={{ fontSize: '24px', fontWeight: '800', margin: '0 0 2px 0', letterSpacing: '-0.5px', color: '#ffffff' }}>
                            Categorías
                        </h1>
                        <p style={{ fontSize: '11px', fontWeight: '700', color: '#cbd5e1', margin: 0, textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                            Administra y organiza las categorías de tus productos
                        </p>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', zIndex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.08)', padding: '8px 14px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                        <ShieldCheck style={{ width: '18px', height: '18px', color: '#34d399' }} />
                        <span style={{ fontSize: '11px', fontWeight: '600', color: '#e2e8f0' }}>Control Activo</span>
                    </div>
                    {/* ✅ BOTÓN CORREGIDO - Ahora navega a 'categorias' */}
                    <button
                        onClick={() => navegar('categorias', 'crear')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '12px 20px',
                            borderRadius: '14px',
                            background: '#1e293b',
                            border: '1px solid #334155',
                            color: '#f1f5f9',
                            fontSize: '13px',
                            fontWeight: '700',
                            cursor: 'pointer',
                            boxShadow: '0 10px 20px -5px rgba(0, 0, 0, 0.3)',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#2d3748';
                            e.currentTarget.style.borderColor = '#4f46e5';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = '#1e293b';
                            e.currentTarget.style.borderColor = '#334155';
                        }}
                    >
                        <Plus style={{ width: '16px', height: '16px', strokeWidth: 3 }} />
                        Nueva Categoría
                    </button>
                </div>
            </div>

            {/* Buscador */}
            <div style={{ 
                background: '#1e293b', 
                borderRadius: '20px', 
                padding: '16px 20px', 
                boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.3)', 
                border: '1px solid #334155',
                marginBottom: '20px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px'
            }}>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%', maxWidth: '380px' }}>
                    <span style={{ position: 'absolute', left: '16px', color: '#818cf8', display: 'flex', pointerEvents: 'none' }}>
                        <Search style={{ width: '18px', height: '18px' }} />
                    </span>
                    <input
                        type="text"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        placeholder="Buscar por nombre o ID..."
                        style={{
                            width: '100%',
                            padding: '12px 16px 12px 46px',
                            borderRadius: '14px',
                            border: '1.5px solid #334155',
                            background: '#0f172a',
                            fontSize: '13px',
                            fontWeight: '500',
                            color: '#f1f5f9',
                            outline: 'none',
                            transition: 'all 0.2s ease',
                            boxSizing: 'border-box'
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = '#6366f1';
                            e.target.style.background = '#1a1a2e';
                            e.target.style.boxShadow = '0 0 0 4px rgba(99, 102, 241, 0.15)';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = '#334155';
                            e.target.style.background = '#0f172a';
                            e.target.style.boxShadow = 'none';
                        }}
                    />
                </div>
                <div style={{ fontSize: '12px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                    Total: <span style={{ color: '#818cf8', fontWeight: '900' }}>{categoriasFiltradas.length}</span> registros
                </div>
            </div>

            {/* Listado */}
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
                gap: '16px' 
            }}>
                {categoriasFiltradas.map((cat) => {
                    const isDeleting = eliminandoId === cat.id;

                    return (
                        <div 
                            key={cat.id} 
                            style={{
                                background: '#1e293b',
                                borderRadius: '20px',
                                boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.3)',
                                border: '1px solid #334155',
                                padding: '20px',
                                transition: 'all 0.2s ease',
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: '12px'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(79, 70, 229, 0.2)';
                                e.currentTarget.style.borderColor = '#4f46e5';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 20px -2px rgba(0, 0, 0, 0.3)';
                                e.currentTarget.style.borderColor = '#334155';
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0, flex: 1 }}>
                                <div style={{
                                    width: '44px',
                                    height: '44px',
                                    background: 'rgba(79, 70, 229, 0.15)',
                                    border: '1px solid rgba(79, 70, 229, 0.2)',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#818cf8',
                                    flexShrink: 0
                                }}>
                                    <FolderTree style={{ width: '20px', height: '20px' }} />
                                </div>
                                <div style={{ minWidth: 0, flex: 1 }}>
                                    <span style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.8px', color: '#64748b', display: 'block', marginBottom: '2px' }}>
                                        ID: {cat.id}
                                    </span>
                                    <h2 style={{ fontSize: '14px', fontWeight: '800', color: '#f1f5f9', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={cat.nombre}>
                                        {cat.nombre}
                                    </h2>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                                <button 
                                    onClick={() => navegar('categorias', 'editar', cat.id)} 
                                    style={{
                                        background: 'rgba(79, 70, 229, 0.15)',
                                        border: '1px solid rgba(79, 70, 229, 0.2)',
                                        color: '#818cf8',
                                        padding: '8px',
                                        borderRadius: '10px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.2s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = '#4f46e5';
                                        e.currentTarget.style.color = '#ffffff';
                                        e.currentTarget.style.borderColor = '#4f46e5';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'rgba(79, 70, 229, 0.15)';
                                        e.currentTarget.style.color = '#818cf8';
                                        e.currentTarget.style.borderColor = 'rgba(79, 70, 229, 0.2)';
                                    }}
                                    title="Editar categoría"
                                >
                                    <Pencil style={{ width: '14px', height: '14px' }} />
                                </button>
                                <button 
                                    onClick={() => eliminar(cat.id)} 
                                    disabled={isDeleting}
                                    style={{
                                        background: 'rgba(239, 68, 68, 0.15)',
                                        border: '1px solid rgba(239, 68, 68, 0.2)',
                                        color: '#f87171',
                                        padding: '8px',
                                        borderRadius: '10px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.2s ease',
                                        opacity: isDeleting ? 0.5 : 1
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isDeleting) {
                                            e.currentTarget.style.background = '#ef4444';
                                            e.currentTarget.style.color = '#ffffff';
                                            e.currentTarget.style.borderColor = '#ef4444';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isDeleting) {
                                            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)';
                                            e.currentTarget.style.color = '#f87171';
                                            e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.2)';
                                        }
                                    }}
                                    title="Eliminar categoría"
                                >
                                    {isDeleting ? (
                                        <Loader2 style={{ width: '14px', height: '14px', animation: 'spin 1s linear infinite' }} />
                                    ) : (
                                        <Trash2 style={{ width: '14px', height: '14px' }} />
                                    )}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {categoriasFiltradas.length === 0 && (
                <div style={{ 
                    background: '#1e293b', 
                    borderRadius: '20px', 
                    border: '1px solid #334155', 
                    padding: '50px 20px', 
                    textAlign: 'center', 
                    boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.3)', 
                    marginTop: '20px' 
                }}>
                    <div style={{ 
                        width: '56px', 
                        height: '56px', 
                        background: '#0f172a', 
                        borderRadius: '16px', 
                        border: '1px solid #334155', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        color: '#64748b', 
                        margin: '0 auto 14px auto' 
                    }}>
                        <Layers style={{ width: '28px', height: '28px' }} />
                    </div>
                    <h3 style={{ 
                        fontSize: '14px', 
                        fontWeight: '800', 
                        color: '#f1f5f9', 
                        margin: '0 0 6px 0', 
                        textTransform: 'uppercase', 
                        letterSpacing: '0.8px' 
                    }}>
                        {categorias.length === 0 ? 'No hay categorías registradas' : 'No se encontraron resultados'}
                    </h3>
                    <p style={{ 
                        fontSize: '12px', 
                        color: '#94a3b8', 
                        margin: '0 0 18px 0', 
                        maxWidth: '360px', 
                        marginLeft: 'auto', 
                        marginRight: 'auto', 
                        fontWeight: '500', 
                        textTransform: 'uppercase', 
                        letterSpacing: '0.5px' 
                    }}>
                        {categorias.length === 0 
                            ? 'Comienza agregando una nueva categoría para organizar de forma correcta tus productos.' 
                            : 'Intenta buscando con otro término o limpia el filtro de búsqueda.'}
                    </p>
                    {categorias.length === 0 && (
                        <button
                            onClick={() => navegar('categorias', 'crear')}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '12px 22px',
                                borderRadius: '14px',
                                background: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)',
                                border: 'none',
                                color: '#ffffff',
                                fontSize: '12px',
                                fontWeight: '800',
                                textTransform: 'uppercase',
                                letterSpacing: '0.8px',
                                cursor: 'pointer',
                                boxShadow: '0 10px 20px -5px rgba(79, 70, 229, 0.4)',
                                transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 16px 30px -8px rgba(79, 70, 229, 0.5)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 10px 20px -5px rgba(79, 70, 229, 0.4)';
                            }}
                        >
                            <Plus style={{ width: '16px', height: '16px', strokeWidth: 3 }} />
                            <span>Crear Primera Categoría</span>
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default CategoriasList;