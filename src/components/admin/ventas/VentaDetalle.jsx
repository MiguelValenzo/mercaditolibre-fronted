import React, { useState, useEffect } from 'react';
import { apiService } from '../../../services/apiService';
import { ArrowLeft, CheckCircle, XCircle, Clock, ShoppingBag, DollarSign, Loader2, ShieldCheck, CreditCard, User, Calendar, Package } from 'lucide-react';

const VentaDetalle = ({ id, navegar }) => {
    const [venta, setVenta] = useState(null);
    const [carga, setCarga] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const cargarVenta = async () => {
            try {
                const data = await apiService.getVenta(id);
                setVenta(data);
            } catch (err) {
                setError('Error cargando los detalles de la venta: ' + (err.message || 'Intente de nuevo.'));
            } finally {
                setCarga(false);
            }
        };
        if (id) {
            cargarVenta();
        } else {
            setError('No se proporcionó un ID de venta válido.');
            setCarga(false);
        }
    }, [id]);

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
                fontSize: '12px',
                fontWeight: '700',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: e.color,
                color: e.textColor,
                border: `1px solid ${e.borderColor}`
            }}>
                <Icon style={{ width: '14px', height: '14px' }} />
                {estado}
            </span>
        );
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
                    Cargando información de la venta...
                </p>
                <style>{`
                    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                `}</style>
            </div>
        );
    }

    if (error || !venta) {
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
                <div style={{ 
                    background: '#1e293b', 
                    borderRadius: '28px', 
                    padding: '60px 40px', 
                    textAlign: 'center',
                    boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.3)', 
                    border: '1px solid #334155' 
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
                        <ShoppingBag style={{ width: '32px', height: '32px' }} />
                    </div>
                    <p style={{ fontSize: '14px', fontWeight: '700', color: '#fca5a5', margin: '0 0 8px 0' }}>
                        {error || 'Venta no encontrada'}
                    </p>
                    <p style={{ fontSize: '13px', color: '#94a3b8', margin: '0 0 24px 0' }}>
                        El registro que buscas no está disponible o ha sido eliminado.
                    </p>
                    <button
                        onClick={() => navegar('ventas', 'list')}
                        style={{
                            padding: '14px 32px',
                            background: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '16px',
                            fontWeight: '700',
                            fontSize: '13px',
                            textTransform: 'uppercase',
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
                        Volver a Ventas
                    </button>
                </div>
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
                        onClick={() => navegar('ventas', 'list')}
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
                            <ShoppingBag style={{ width: '34px', height: '34px', color: 'white' }} />
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
                                    Transacción #{venta.id}
                                </span>
                            </div>
                            <h1 style={{ fontSize: '30px', fontWeight: '800', margin: '0', letterSpacing: '-0.8px', color: '#ffffff' }}>
                                Detalle de Venta
                            </h1>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', zIndex: 1, alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.08)', padding: '10px 16px', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <ShieldCheck style={{ width: '20px', height: '20px', color: '#34d399' }} />
                    <span style={{ fontSize: '12px', fontWeight: '600', color: '#e2e8f0' }}>Información Detallada</span>
                </div>
            </div>

            {/* Tarjeta Contenedora del Detalle - Modo Oscuro */}
            <div style={{ 
                background: '#1e293b', 
                borderRadius: '28px', 
                padding: '40px', 
                boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.3)', 
                border: '1px solid #334155' 
            }}>
                {/* Resumen - Tarjeta de Información - Modo Oscuro */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '20px',
                    padding: '24px',
                    background: '#0f172a',
                    borderRadius: '20px',
                    border: '1px solid #334155',
                    marginBottom: '30px'
                }}>
                    {/* Cliente */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                            <User style={{ width: '16px', height: '16px', color: '#818cf8' }} />
                            <p style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#94a3b8', margin: 0 }}>
                                Cliente
                            </p>
                        </div>
                        <p style={{ fontWeight: '700', color: '#f1f5f9', fontSize: '15px', margin: '0 0 2px 0' }}>
                            {venta.cliente?.nombre || 'N/A'}
                        </p>
                        <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>
                            {venta.cliente?.email || 'Sin correo registrado'}
                        </p>
                    </div>

                    {/* Fecha */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                            <Calendar style={{ width: '16px', height: '16px', color: '#818cf8' }} />
                            <p style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#94a3b8', margin: 0 }}>
                                Fecha
                            </p>
                        </div>
                        <p style={{ fontWeight: '700', color: '#f1f5f9', fontSize: '14px', margin: 0 }}>
                            {new Date(venta.fecha).toLocaleDateString('es-MX', {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric'
                            })}
                        </p>
                        <p style={{ fontSize: '12px', color: '#94a3b8', margin: '2px 0 0 0' }}>
                            {new Date(venta.fecha).toLocaleTimeString('es-MX', {
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </p>
                    </div>

                    {/* Estado */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                            <CreditCard style={{ width: '16px', height: '16px', color: '#818cf8' }} />
                            <p style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#94a3b8', margin: 0 }}>
                                Estado
                            </p>
                        </div>
                        <div>{getEstadoBadge(venta.estadoPago)}</div>
                    </div>
                </div>

                {/* Productos - Modo Oscuro */}
                <div style={{ marginBottom: '30px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                        <Package style={{ width: '20px', height: '20px', color: '#818cf8' }} />
                        <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#f1f5f9', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            Productos
                        </h3>
                        <span style={{ 
                            background: 'rgba(79, 70, 229, 0.15)', 
                            color: '#818cf8', 
                            padding: '2px 10px', 
                            borderRadius: '10px', 
                            fontSize: '11px', 
                            fontWeight: '700',
                            border: '1px solid rgba(79, 70, 229, 0.2)'
                        }}>
                            {venta.detalles?.length || 0} items
                        </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {venta.detalles?.map((detalle, index) => (
                            <div 
                                key={index} 
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '16px 20px',
                                    background: '#0f172a',
                                    borderRadius: '16px',
                                    border: '1px solid #334155',
                                    transition: 'all 0.2s ease'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = '#1a1a2e'}
                                onMouseLeave={(e) => e.currentTarget.style.background = '#0f172a'}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                    <div style={{
                                        width: '32px',
                                        height: '32px',
                                        background: 'rgba(79, 70, 229, 0.15)',
                                        color: '#818cf8',
                                        borderRadius: '10px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: '800',
                                        fontSize: '12px',
                                        border: '1px solid rgba(79, 70, 229, 0.2)'
                                    }}>
                                        {index + 1}
                                    </div>
                                    <div>
                                        <p style={{ fontWeight: '700', color: '#f1f5f9', fontSize: '14px', margin: '0 0 2px 0' }}>
                                            {detalle.producto?.nombre || 'Producto sin nombre'}
                                        </p>
                                        <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>
                                            {detalle.cantidad} unidades × ${detalle.precioUnitario?.toFixed(2) || '0.00'}
                                        </p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <span style={{ 
                                        padding: '4px 10px', 
                                        background: 'rgba(79, 70, 229, 0.15)', 
                                        color: '#818cf8',
                                        borderRadius: '8px',
                                        fontSize: '11px',
                                        fontWeight: '700',
                                        border: '1px solid rgba(79, 70, 229, 0.2)'
                                    }}>
                                        {detalle.cantidad} un.
                                    </span>
                                    <span style={{ fontWeight: '800', color: '#f1f5f9', fontSize: '15px' }}>
                                        ${detalle.subtotal?.toFixed(2) || '0.00'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Total - Modo Oscuro */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    paddingTop: '24px',
                    borderTop: '2px solid #334155'
                }}>
                    <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#94a3b8', margin: '0 0 4px 0' }}>
                            Total de la Venta
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <DollarSign style={{ width: '28px', height: '28px', color: '#818cf8' }} />
                            <span style={{ fontSize: '32px', fontWeight: '900', color: '#818cf8' }}>
                                ${venta.total?.toFixed(2) || '0.00'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Botón Volver - Modo Oscuro */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    paddingTop: '30px',
                    borderTop: '1px solid #334155',
                    marginTop: '30px'
                }}>
                    <button
                        onClick={() => navegar('ventas', 'list')}
                        style={{
                            padding: '14px 32px',
                            background: '#1e293b',
                            color: '#94a3b8',
                            border: '1px solid #2d3748',
                            borderRadius: '16px',
                            fontWeight: '700',
                            fontSize: '13px',
                            textTransform: 'uppercase',
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
                        Volver al listado de ventas
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VentaDetalle;