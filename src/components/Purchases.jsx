import React, { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';
import { 
    ShoppingBag, Package, CheckCircle, Clock, XCircle, Loader2, 
    ShieldCheck, Calendar, DollarSign, ArrowRight, CreditCard, 
    AlertCircle, Zap, RefreshCw
} from 'lucide-react';

const Purchases = ({ setVistaActual, setVentaActiva }) => {
    const [compras, setCompras] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [pagandoId, setPagandoId] = useState(null);
    const [mensaje, setMensaje] = useState(null);

    useEffect(() => {
        cargarCompras();
    }, []);

    const cargarCompras = async () => {
        try {
            const data = await apiService.getMisCompras();
            setCompras(data || []);
        } catch (err) {
            setError(err.message || 'Error al cargar tus compras');
        } finally {
            setLoading(false);
        }
    };

    const mostrarMensaje = (texto, tipo = 'success') => {
        setMensaje({ texto, tipo });
        setTimeout(() => setMensaje(null), 5000);
    };

    const handlePagar = async (venta) => {
        if (!venta || !venta.id) {
            mostrarMensaje('Venta inválida para procesar el pago.', 'error');
            return;
        }

        setPagandoId(venta.id);
        try {
            // ✅ Crear una nueva intención de pago
            console.log('💰 Procesando pago para venta:', venta.id);
            
            // Verificar que la venta tiene detalles
            if (!venta.detalles || venta.detalles.length === 0) {
                mostrarMensaje('Esta venta no tiene productos para pagar.', 'error');
                setPagandoId(null);
                return;
            }

            // ✅ Pasar la venta activa al checkout
            if (setVentaActiva) {
                setVentaActiva(venta);
            }
            
            // ✅ Redirigir al checkout
            if (setVistaActual) {
                setVistaActual('checkout');
            }
            
        } catch (err) {
            console.error('❌ Error al procesar pago:', err);
            mostrarMensaje(err.message || 'Error al procesar el pago. Inténtalo de nuevo.', 'error');
        } finally {
            setPagandoId(null);
        }
    };

    const handleReintentar = async (venta) => {
        setPagandoId(venta.id);
        try {
            // Intentar crear una nueva venta con los mismos productos
            const detalles = venta.detalles.map(det => ({
                producto: { id: det.producto.id },
                cantidad: det.cantidad
            }));

            const nuevaVenta = await apiService.procesarVenta({ detalles });
            mostrarMensaje('Nueva orden creada. Redirigiendo al pago...', 'success');
            
            // Redirigir al checkout con la nueva venta
            if (setVentaActiva) {
                setVentaActiva(nuevaVenta);
            }
            if (setVistaActual) {
                setVistaActual('checkout');
            }
        } catch (err) {
            console.error('❌ Error al reintentar:', err);
            mostrarMensaje(err.message || 'Error al crear una nueva orden.', 'error');
        } finally {
            setPagandoId(null);
        }
    };

    const getEstadoBadge = (estado) => {
        const estados = {
            'PENDIENTE': { color: 'rgba(245, 158, 11, 0.15)', textColor: '#fbbf24', borderColor: 'rgba(245, 158, 11, 0.2)', icon: Clock },
            'PAGADO': { color: 'rgba(16, 185, 129, 0.15)', textColor: '#6ee7b7', borderColor: 'rgba(16, 185, 129, 0.2)', icon: CheckCircle },
            'CANCELADO': { color: 'rgba(239, 68, 68, 0.15)', textColor: '#f87171', borderColor: 'rgba(239, 68, 68, 0.2)', icon: XCircle }
        };
        const e = estados[estado] || estados['PENDIENTE'];
        const Icon = e.icon;
        return (
            <span style={{
                padding: '6px 14px',
                borderRadius: '12px',
                fontSize: '11px',
                fontWeight: '700',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: e.color,
                color: e.textColor,
                border: `1px solid ${e.borderColor}`
            }}>
                <Icon style={{ width: '14px', height: '14px' }} />
                {estado}
            </span>
        );
    };

    if (loading) {
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
                    Cargando historial de compras...
                </p>
                <style>{`
                    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                `}</style>
            </div>
        );
    }

    return (
        <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '32px 24px',
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            background: '#0f172a',
            minHeight: '100vh'
        }}>
            {/* Mensaje de notificación */}
            {mensaje && (
                <div style={{
                    position: 'fixed',
                    bottom: '24px',
                    right: '24px',
                    zIndex: 9999,
                    padding: '16px 24px',
                    borderRadius: '16px',
                    background: mensaje.tipo === 'success' ? '#065f46' : '#7f1d1d',
                    color: mensaje.tipo === 'success' ? '#6ee7b7' : '#fca5a5',
                    border: `1px solid ${mensaje.tipo === 'success' ? '#10b981' : '#ef4444'}`,
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                    fontSize: '14px',
                    fontWeight: '600',
                    maxWidth: '400px',
                    animation: 'slideUp 0.3s ease-out'
                }}>
                    {mensaje.texto}
                </div>
            )}

            {/* Header */}
            <div style={{
                background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)',
                borderRadius: '28px',
                padding: '36px 40px',
                color: 'white',
                boxShadow: '0 20px 35px -10px rgba(0, 0, 0, 0.6)',
                marginBottom: '30px',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid rgba(99, 102, 241, 0.2)'
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

                <div style={{ position: 'relative', zIndex: 2 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
                        <div style={{
                            width: '56px',
                            height: '56px',
                            background: 'rgba(255, 255, 255, 0.15)',
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid rgba(255, 255, 255, 0.2)'
                        }}>
                            <ShoppingBag style={{ width: '28px', height: '28px', color: 'white' }} />
                        </div>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                                <span style={{
                                    background: 'rgba(251, 191, 36, 0.15)',
                                    color: '#fbbf24',
                                    border: '1px solid rgba(251, 191, 36, 0.3)',
                                    padding: '2px 10px',
                                    borderRadius: '20px',
                                    fontSize: '9px',
                                    fontWeight: '800',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px'
                                }}>
                                    Historial de Compras
                                </span>
                            </div>
                            <h1 style={{
                                fontSize: '28px',
                                fontWeight: '900',
                                margin: 0,
                                letterSpacing: '-0.02em',
                                color: '#ffffff'
                            }}>
                                Mis Compras
                            </h1>
                        </div>
                    </div>
                    <p style={{
                        fontSize: '13px',
                        color: '#a5b4fc',
                        margin: '4px 0 0 72px',
                        fontWeight: '500'
                    }}>
                        Historial de todas tus compras realizadas.
                        {compras.filter(v => v.estadoPago === 'PENDIENTE').length > 0 && (
                            <span style={{ color: '#fbbf24', marginLeft: '8px' }}>
                                • {compras.filter(v => v.estadoPago === 'PENDIENTE').length} pendiente(s) de pago
                            </span>
                        )}
                    </p>
                </div>

                <div style={{
                    position: 'absolute',
                    right: '20px',
                    bottom: '20px',
                    opacity: 0.06,
                    pointerEvents: 'none'
                }}>
                    <Package style={{ width: '180px', height: '180px', color: 'white' }} />
                </div>
            </div>

            {/* Alerta de Error */}
            {error && (
                <div style={{
                    background: 'rgba(239, 68, 68, 0.15)',
                    border: '1px solid #7f1d1d',
                    padding: '14px 18px',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    color: '#fca5a5',
                    marginBottom: '24px',
                    fontSize: '13px',
                    fontWeight: '600'
                }}>
                    <AlertCircle style={{ width: '18px', height: '18px', color: '#f87171' }} />
                    <span>Error: {error}</span>
                </div>
            )}

            {compras.length === 0 ? (
                <div style={{
                    background: '#1e293b',
                    borderRadius: '28px',
                    border: '1px solid #334155',
                    padding: '60px 32px',
                    textAlign: 'center',
                    boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.3)'
                }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        background: '#0f172a',
                        borderRadius: '24px',
                        border: '1px solid #334155',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 16px auto',
                        color: '#64748b'
                    }}>
                        <Package style={{ width: '40px', height: '40px' }} />
                    </div>
                    <h3 style={{
                        fontSize: '18px',
                        fontWeight: '900',
                        color: '#f1f5f9',
                        margin: '0 0 8px 0'
                    }}>
                        No tienes compras realizadas
                    </h3>
                    <p style={{
                        fontSize: '13px',
                        color: '#94a3b8',
                        margin: '0 0 24px 0',
                        maxWidth: '400px',
                        marginLeft: 'auto',
                        marginRight: 'auto'
                    }}>
                        Comienza a comprar productos en el catálogo.
                    </p>
                    <button
                        onClick={() => setVistaActual('catalogo')}
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
                        <span>Ir al Catálogo</span>
                        <ArrowRight style={{ width: '18px', height: '18px' }} />
                    </button>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {compras.map((venta) => {
                        const esPendiente = venta.estadoPago === 'PENDIENTE';
                        
                        return (
                            <div 
                                key={venta.id} 
                                style={{
                                    background: '#1e293b',
                                    borderRadius: '22px',
                                    border: esPendiente ? '1px solid rgba(245, 158, 11, 0.3)' : '1px solid #334155',
                                    boxShadow: esPendiente ? '0 4px 16px rgba(245, 158, 11, 0.1)' : '0 4px 16px rgba(0, 0, 0, 0.3)',
                                    overflow: 'hidden',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = '#4f46e5';
                                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(79, 70, 229, 0.15)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = esPendiente ? 'rgba(245, 158, 11, 0.3)' : '#334155';
                                    e.currentTarget.style.boxShadow = esPendiente ? '0 4px 16px rgba(245, 158, 11, 0.1)' : '0 4px 16px rgba(0, 0, 0, 0.3)';
                                }}
                            >
                                <div style={{ padding: '24px' }}>
                                    {/* Encabezado de la orden */}
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-start',
                                        gap: '16px'
                                    }}>
                                        <div>
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px'
                                            }}>
                                                <span style={{
                                                    fontSize: '16px',
                                                    fontWeight: '900',
                                                    color: '#f1f5f9'
                                                }}>
                                                    Orden #{venta.id}
                                                </span>
                                                <span style={{
                                                    background: 'rgba(79, 70, 229, 0.15)',
                                                    color: '#818cf8',
                                                    padding: '2px 10px',
                                                    borderRadius: '8px',
                                                    fontSize: '9px',
                                                    fontWeight: '800',
                                                    textTransform: 'uppercase',
                                                    border: '1px solid rgba(79, 70, 229, 0.2)'
                                                }}>
                                                    ID: {venta.id}
                                                </span>
                                            </div>
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px',
                                                marginTop: '4px'
                                            }}>
                                                <Calendar style={{ width: '14px', height: '14px', color: '#64748b' }} />
                                                <p style={{
                                                    fontSize: '12px',
                                                    color: '#94a3b8',
                                                    margin: 0
                                                }}>
                                                    {new Date(venta.fecha).toLocaleDateString('es-MX', {
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
                                            gap: '12px',
                                            flexWrap: 'wrap'
                                        }}>
                                            {getEstadoBadge(venta.estadoPago)}
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '6px',
                                                padding: '6px 14px',
                                                background: 'rgba(79, 70, 229, 0.15)',
                                                borderRadius: '12px',
                                                border: '1px solid rgba(79, 70, 229, 0.2)'
                                            }}>
                                                <DollarSign style={{ width: '14px', height: '14px', color: '#818cf8' }} />
                                                <span style={{
                                                    fontWeight: '900',
                                                    fontSize: '16px',
                                                    color: '#818cf8'
                                                }}>
                                                    ${venta.total?.toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Detalle de productos */}
                                    <div style={{
                                        marginTop: '16px',
                                        paddingTop: '16px',
                                        borderTop: '1px solid #334155'
                                    }}>
                                        <h4 style={{
                                            fontSize: '11px',
                                            fontWeight: '800',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.5px',
                                            color: '#64748b',
                                            margin: '0 0 12px 0'
                                        }}>
                                            Productos:
                                        </h4>
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '8px'
                                        }}>
                                            {venta.detalles && venta.detalles.map((det, idx) => (
                                                <div 
                                                    key={idx} 
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        padding: '8px 12px',
                                                        background: '#0f172a',
                                                        borderRadius: '12px',
                                                        border: '1px solid #334155'
                                                    }}
                                                >
                                                    <div style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '10px'
                                                    }}>
                                                        <span style={{
                                                            width: '24px',
                                                            height: '24px',
                                                            background: 'rgba(79, 70, 229, 0.15)',
                                                            color: '#818cf8',
                                                            borderRadius: '6px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            fontSize: '10px',
                                                            fontWeight: '800',
                                                            border: '1px solid rgba(79, 70, 229, 0.2)'
                                                        }}>
                                                            {idx + 1}
                                                        </span>
                                                        <span style={{
                                                            fontSize: '13px',
                                                            fontWeight: '600',
                                                            color: '#f1f5f9'
                                                        }}>
                                                            {det.producto?.nombre || `Producto #${det.producto?.id}`}
                                                        </span>
                                                    </div>
                                                    <span style={{
                                                        fontSize: '12px',
                                                        fontWeight: '700',
                                                        color: '#94a3b8'
                                                    }}>
                                                        {det.cantidad} × ${det.precioUnitario} = <span style={{ color: '#818cf8' }}>${det.subtotal}</span>
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* ✅ BOTONES DE ACCIÓN PARA PENDIENTES */}
                                    {esPendiente && (
                                        <div style={{
                                            marginTop: '16px',
                                            paddingTop: '16px',
                                            borderTop: '1px solid rgba(245, 158, 11, 0.2)',
                                            display: 'flex',
                                            gap: '12px',
                                            flexWrap: 'wrap'
                                        }}>
                                            {/* Botón Pagar */}
                                            <button
                                                onClick={() => handlePagar(venta)}
                                                disabled={pagandoId === venta.id}
                                                style={{
                                                    flex: 1,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: '8px',
                                                    padding: '12px 20px',
                                                    borderRadius: '14px',
                                                    background: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)',
                                                    color: '#ffffff',
                                                    border: 'none',
                                                    fontWeight: '700',
                                                    fontSize: '13px',
                                                    cursor: pagandoId === venta.id ? 'not-allowed' : 'pointer',
                                                    opacity: pagandoId === venta.id ? 0.7 : 1,
                                                    boxShadow: '0 8px 16px -4px rgba(79, 70, 229, 0.3)',
                                                    transition: 'all 0.2s ease'
                                                }}
                                                onMouseEnter={(e) => {
                                                    if (pagandoId !== venta.id) {
                                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                                        e.currentTarget.style.boxShadow = '0 12px 24px -4px rgba(79, 70, 229, 0.4)';
                                                    }
                                                }}
                                                onMouseLeave={(e) => {
                                                    if (pagandoId !== venta.id) {
                                                        e.currentTarget.style.transform = 'translateY(0)';
                                                        e.currentTarget.style.boxShadow = '0 8px 16px -4px rgba(79, 70, 229, 0.3)';
                                                    }
                                                }}
                                            >
                                                {pagandoId === venta.id ? (
                                                    <>
                                                        <Loader2 style={{ width: '16px', height: '16px', animation: 'spin 1s linear infinite' }} />
                                                        Procesando...
                                                    </>
                                                ) : (
                                                    <>
                                                        <CreditCard style={{ width: '16px', height: '16px' }} />
                                                        Pagar Ahora (${venta.total?.toFixed(2)} MXN)
                                                    </>
                                                )}
                                            </button>

                                            {/* Botón Reintentar */}
                                            <button
                                                onClick={() => handleReintentar(venta)}
                                                disabled={pagandoId === venta.id}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: '8px',
                                                    padding: '12px 16px',
                                                    borderRadius: '14px',
                                                    background: 'rgba(245, 158, 11, 0.15)',
                                                    color: '#fbbf24',
                                                    border: '1px solid rgba(245, 158, 11, 0.2)',
                                                    fontWeight: '700',
                                                    fontSize: '12px',
                                                    cursor: pagandoId === venta.id ? 'not-allowed' : 'pointer',
                                                    opacity: pagandoId === venta.id ? 0.5 : 1,
                                                    transition: 'all 0.2s ease'
                                                }}
                                                onMouseEnter={(e) => {
                                                    if (pagandoId !== venta.id) {
                                                        e.currentTarget.style.background = 'rgba(245, 158, 11, 0.25)';
                                                    }
                                                }}
                                                onMouseLeave={(e) => {
                                                    if (pagandoId !== venta.id) {
                                                        e.currentTarget.style.background = 'rgba(245, 158, 11, 0.15)';
                                                    }
                                                }}
                                                title="Reintentar con una nueva orden"
                                            >
                                                <RefreshCw style={{ width: '16px', height: '16px' }} />
                                                Reintentar
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            <style>{`
                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
};

export default Purchases;