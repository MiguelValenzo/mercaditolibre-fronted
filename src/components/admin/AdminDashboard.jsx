import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { apiService } from '../../services/apiService';
import { 
    Layers, 
    Tags, 
    Store, 
    Receipt, 
    Wallet, 
    LineChart, 
    AlertCircle, 
    RotateCw, 
    ArrowUpRight,
    ShieldCheck,
    Sparkles,
    Package,
    DollarSign,
    Loader2
} from 'lucide-react';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        productos: 0,
        categorias: 0,
        proveedores: 0,
        ventas: 0,
        ingresos: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const cargarStats = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const results = await Promise.allSettled([
                apiService.getProductos(),
                apiService.getCategorias(),
                apiService.getProveedores(),
                apiService.getVentas()
            ]);

            const [productosRes, categoriasRes, proveedoresRes, ventasRes] = results;

            const productos = productosRes.status === 'fulfilled' ? productosRes.value : [];
            const categorias = categoriasRes.status === 'fulfilled' ? categoriasRes.value : [];
            const proveedores = proveedoresRes.status === 'fulfilled' ? proveedoresRes.value : [];
            const ventas = ventasRes.status === 'fulfilled' ? ventasRes.value : [];

            if (results.every(res => res.status === 'rejected')) {
                throw new Error('No se pudo conectar con el servidor para cargar las estadísticas.');
            }

            const totalIngresos = Array.isArray(ventas) 
                ? ventas.reduce((sum, v) => sum + (Number(v.total) || 0), 0) 
                : 0;

            setStats({
                productos: Array.isArray(productos) ? productos.length : 0,
                categorias: Array.isArray(categorias) ? categorias.length : 0,
                proveedores: Array.isArray(proveedores) ? proveedores.length : 0,
                ventas: Array.isArray(ventas) ? ventas.length : 0,
                ingresos: totalIngresos
            });
        } catch (err) {
            console.error('Error cargando estadísticas:', err);
            setError(err.message || 'Ocurrió un error al cargar el panel.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        cargarStats();
    }, [cargarStats]);

    const cards = useMemo(() => [
        { 
            titulo: 'Productos Registrados', 
            valor: stats.productos, 
            icono: Layers, 
            color: '#818cf8',
            bgColor: 'rgba(79, 70, 229, 0.15)',
            borderColor: 'rgba(79, 70, 229, 0.2)'
        },
        { 
            titulo: 'Categorías Activas', 
            valor: stats.categorias, 
            icono: Tags, 
            color: '#34d399',
            bgColor: 'rgba(16, 185, 129, 0.15)',
            borderColor: 'rgba(16, 185, 129, 0.2)'
        },
        { 
            titulo: 'Proveedores', 
            valor: stats.proveedores, 
            icono: Store, 
            color: '#a78bfa',
            bgColor: 'rgba(139, 92, 246, 0.15)',
            borderColor: 'rgba(139, 92, 246, 0.2)'
        },
        { 
            titulo: 'Ventas Totales', 
            valor: stats.ventas, 
            icono: Receipt, 
            color: '#fbbf24',
            bgColor: 'rgba(251, 191, 36, 0.15)',
            borderColor: 'rgba(251, 191, 36, 0.2)'
        },
        { 
            titulo: 'Ingresos Netos', 
            valor: `$${stats.ingresos.toLocaleString()}`, 
            icono: Wallet, 
            color: '#818cf8',
            bgColor: 'rgba(79, 70, 229, 0.15)',
            borderColor: 'rgba(79, 70, 229, 0.2)'
        },
    ], [stats]);

    if (loading) {
        return (
            <div style={{
                padding: '32px',
                fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                background: '#0f172a',
                minHeight: '100vh'
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '384px',
                    gap: '16px'
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
                    <p style={{
                        fontSize: '12px',
                        fontWeight: '800',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        color: '#64748b',
                        margin: 0
                    }}>
                        Cargando panel de control...
                    </p>
                </div>
                <style>{`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{
                padding: '32px',
                fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                background: '#0f172a',
                minHeight: '100vh'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}>
                    <div style={{
                        background: '#1e293b',
                        borderRadius: '28px',
                        border: '1px solid #7f1d1d',
                        padding: '60px 40px',
                        textAlign: 'center',
                        boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.3)'
                    }}>
                        <div style={{
                            width: '64px',
                            height: '64px',
                            background: 'rgba(239, 68, 68, 0.15)',
                            borderRadius: '20px',
                            border: '1px solid #7f1d1d',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#f87171',
                            margin: '0 auto 16px auto'
                        }}>
                            <AlertCircle style={{ width: '32px', height: '32px' }} />
                        </div>
                        <h3 style={{
                            fontSize: '18px',
                            fontWeight: '800',
                            color: '#f1f5f9',
                            margin: '0 0 8px 0'
                        }}>
                            Error al sincronizar datos
                        </h3>
                        <p style={{
                            fontSize: '14px',
                            color: '#94a3b8',
                            margin: '0 0 24px 0',
                            maxWidth: '400px',
                            marginLeft: 'auto',
                            marginRight: 'auto'
                        }}>
                            {error}
                        </p>
                        <button
                            onClick={cargarStats}
                            style={{
                                padding: '14px 32px',
                                background: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)',
                                color: '#ffffff',
                                border: 'none',
                                borderRadius: '16px',
                                fontWeight: '700',
                                fontSize: '13px',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                                cursor: 'pointer',
                                boxShadow: '0 10px 20px -5px rgba(79, 70, 229, 0.4)',
                                transition: 'all 0.2s ease',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '10px'
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
                            <RotateCw style={{ width: '18px', height: '18px' }} />
                            <span>Reintentar Conexión</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            padding: '32px',
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            background: '#0f172a',
            minHeight: '100vh'
        }}>
            <div style={{
                maxWidth: '1320px',
                margin: '0 auto'
            }}>
                {/* Header Superior Estilizado - Modo Oscuro */}
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

                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', zIndex: 1 }}>
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
                            <LineChart style={{ width: '34px', height: '34px', color: 'white' }} />
                        </div>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                <span style={{
                                    background: 'rgba(251, 191, 36, 0.15)',
                                    color: '#fbbf24',
                                    border: '1px solid rgba(251, 191, 36, 0.3)',
                                    padding: '3px 10px',
                                    borderRadius: '20px',
                                    fontSize: '10px',
                                    fontWeight: '800',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px'
                                }}>
                                    Administración
                                </span>
                            </div>
                            <h1 style={{ fontSize: '30px', fontWeight: '800', margin: '0', letterSpacing: '-0.8px', color: '#ffffff' }}>
                                Panel de Control General
                            </h1>
                            <p style={{ fontSize: '13px', color: '#a5b4fc', margin: '2px 0 0 0', fontWeight: '500' }}>
                                Métricas en tiempo real de MercaditoLibre
                            </p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', zIndex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.08)', padding: '10px 16px', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                            <ShieldCheck style={{ width: '20px', height: '20px', color: '#34d399' }} />
                            <span style={{ fontSize: '12px', fontWeight: '600', color: '#e2e8f0' }}>Control Activo</span>
                        </div>
                        <button
                            onClick={cargarStats}
                            title="Actualizar métricas"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '12px 22px',
                                borderRadius: '16px',
                                background: '#1e293b',
                                border: '1px solid #334155',
                                color: '#94a3b8',
                                fontSize: '12px',
                                fontWeight: '700',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                                cursor: 'pointer',
                                boxShadow: '0 10px 20px -5px rgba(0, 0, 0, 0.3)',
                                transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.background = '#2d3748';
                                e.currentTarget.style.borderColor = '#4f46e5';
                                e.currentTarget.style.color = '#f1f5f9';
                                e.currentTarget.style.boxShadow = '0 16px 30px -8px rgba(0, 0, 0, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.background = '#1e293b';
                                e.currentTarget.style.borderColor = '#334155';
                                e.currentTarget.style.color = '#94a3b8';
                                e.currentTarget.style.boxShadow = '0 10px 20px -5px rgba(0, 0, 0, 0.3)';
                            }}
                        >
                            <RotateCw style={{ width: '16px', height: '16px' }} />
                            <span>Actualizar</span>
                        </button>
                    </div>
                </div>

                {/* Tarjetas de Estadísticas - Modo Oscuro */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '24px'
                }}>
                    {cards.map((card, index) => {
                        const Icon = card.icono;
                        return (
                            <div 
                                key={index} 
                                style={{
                                    background: '#1e293b',
                                    borderRadius: '22px',
                                    border: `1px solid ${card.borderColor}`,
                                    borderLeft: `4px solid ${card.color}`,
                                    padding: '24px',
                                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-4px)';
                                    e.currentTarget.style.boxShadow = '0 20px 40px -12px rgba(79, 70, 229, 0.3)';
                                    e.currentTarget.style.borderColor = '#4f46e5';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.3)';
                                    e.currentTarget.style.borderColor = card.borderColor;
                                }}
                            >
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    justifyContent: 'space-between'
                                }}>
                                    <div>
                                        <p style={{
                                            fontSize: '10px',
                                            fontWeight: '800',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.5px',
                                            color: '#94a3b8',
                                            margin: '0 0 8px 0'
                                        }}>
                                            {card.titulo}
                                        </p>
                                        <p style={{
                                            fontSize: '28px',
                                            fontWeight: '900',
                                            color: '#f1f5f9',
                                            margin: 0,
                                            letterSpacing: '-0.02em'
                                        }}>
                                            {card.valor}
                                        </p>
                                    </div>
                                    <div style={{
                                        width: '48px',
                                        height: '48px',
                                        borderRadius: '14px',
                                        background: card.bgColor,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                        color: card.color,
                                        border: `1px solid ${card.borderColor}`
                                    }}>
                                        <Icon style={{ width: '24px', height: '24px' }} />
                                    </div>
                                </div>

                                <div style={{
                                    marginTop: '16px',
                                    paddingTop: '12px',
                                    borderTop: `1px solid ${card.borderColor}`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}>
                                    <span style={{
                                        fontSize: '10px',
                                        fontWeight: '800',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                        color: card.color,
                                        transition: 'all 0.2s ease'
                                    }}>
                                        Ver reporte
                                    </span>
                                    <ArrowUpRight style={{
                                        width: '16px',
                                        height: '16px',
                                        color: card.color,
                                        transition: 'all 0.2s ease'
                                    }} />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Pie de página informativo - Modo Oscuro */}
                <div style={{
                    marginTop: '32px',
                    padding: '20px 24px',
                    background: '#1e293b',
                    borderRadius: '18px',
                    border: '1px solid #334155',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '16px'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                            width: '32px',
                            height: '32px',
                            background: 'rgba(79, 70, 229, 0.15)',
                            borderRadius: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#818cf8',
                            border: '1px solid rgba(79, 70, 229, 0.2)'
                        }}>
                            <Sparkles style={{ width: '16px', height: '16px' }} />
                        </div>
                        <div>
                            <p style={{
                                fontSize: '12px',
                                fontWeight: '800',
                                color: '#f1f5f9',
                                margin: 0
                            }}>
                                Datos actualizados en tiempo real
                            </p>
                            <p style={{
                                fontSize: '11px',
                                color: '#64748b',
                                margin: '2px 0 0 0'
                            }}>
                                {new Date().toLocaleString('es-MX', {
                                    day: '2-digit',
                                    month: 'long',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </p>
                        </div>
                    </div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 16px',
                        background: '#0f172a',
                        borderRadius: '12px',
                        border: '1px solid #334155'
                    }}>
                        <Package style={{ width: '16px', height: '16px', color: '#818cf8' }} />
                        <span style={{
                            fontSize: '11px',
                            fontWeight: '700',
                            color: '#94a3b8'
                        }}>
                            MercaditoLibre v2.4
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;