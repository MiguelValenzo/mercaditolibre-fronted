import React, { useState, useEffect } from 'react';
import { apiService } from '../../../services/apiService';
import { Search, Eye, CheckCircle, XCircle, Clock, ShoppingBag, DollarSign, Loader2, ShieldCheck, User, Calendar } from 'lucide-react';

const VentasList = ({ navegar }) => {
    const [ventas, setVentas] = useState([]);
    const [carga, setCarga] = useState(true);
    const [busqueda, setBusqueda] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        cargarVentas();
    }, []);

    const cargarVentas = async () => {
        setCarga(true);
        setError('');
        try {
            const data = await apiService.getVentas();
            setVentas(data || []);
        } catch (err) {
            setError('Error al cargar el historial de ventas: ' + (err.message || 'Intente de nuevo.'));
        } finally {
            setCarga(false);
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

    const ventasFiltradas = ventas.filter(v =>
        v.cliente?.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
        v.cliente?.email?.toLowerCase().includes(busqueda.toLowerCase()) ||
        v.id?.toString().includes(busqueda)
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
                    Cargando historial de ventas...
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
                        <ShoppingBag style={{ width: '34px', height: '34px', color: 'white' }} />
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
                                Transacciones
                            </span>
                        </div>
                        <h1 style={{ fontSize: '30px', fontWeight: '800', margin: '0', letterSpacing: '-0.8px', color: '#ffffff' }}>
                            Historial de Ventas
                        </h1>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', zIndex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.08)', padding: '10px 16px', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                        <ShieldCheck style={{ width: '20px', height: '20px', color: '#34d399' }} />
                        <span style={{ fontSize: '12px', fontWeight: '600', color: '#e2e8f0' }}>Control Activo</span>
                    </div>
                    <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px', 
                        background: 'rgba(255, 255, 255, 0.08)', 
                        padding: '10px 16px', 
                        borderRadius: '14px', 
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                        <DollarSign style={{ width: '20px', height: '20px', color: '#fbbf24' }} />
                        <span style={{ fontSize: '12px', fontWeight: '600', color: '#e2e8f0' }}>
                            Total: ${ventas.reduce((sum, v) => sum + (v.total || 0), 0).toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>

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
                    marginBottom: '24px',
                    fontSize: '13px',
                    fontWeight: '600',
                    boxShadow: '0 4px 12px rgba(239, 68, 68, 0.1)'
                }}>
                    <div style={{ background: '#ef4444', color: 'white', padding: '8px', borderRadius: '10px', display: 'flex' }}>
                        <Clock style={{ width: '18px', height: '18px' }} />
                    </div>
                    <span>{error}</span>
                </div>
            )}

            {/* Buscador Refinado - Modo Oscuro */}
            <div style={{ 
                background: '#1e293b', 
                borderRadius: '24px', 
                padding: '20px 24px', 
                boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.3)', 
                border: '1px solid #334155',
                marginBottom: '24px' 
            }}>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <span style={{ position: 'absolute', left: '18px', color: '#818cf8', display: 'flex', pointerEvents: 'none' }}>
                        <Search style={{ width: '20px', height: '20px' }} />
                    </span>
                    <input
                        type="text"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        placeholder="Buscar por cliente, correo o ID de venta..."
                        style={{
                            width: '100%',
                            padding: '16px 18px 16px 52px',
                            borderRadius: '16px',
                            border: '1.5px solid #334155',
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
                            e.target.style.borderColor = '#334155';
                            e.target.style.background = '#0f172a';
                            e.target.style.boxShadow = 'none';
                        }}
                    />
                </div>
            </div>

            {/* Tabla Principal Contenedora - Modo Oscuro */}
            <div style={{ 
                background: '#1e293b', 
                borderRadius: '28px', 
                boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.3)', 
                border: '1px solid #334155',
                overflow: 'hidden' 
            }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: '#0f172a', borderBottom: '1px solid #334155', color: '#94a3b8' }}>
                                <th style={{ padding: '20px 24px', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.8px' }}>ID</th>
                                <th style={{ padding: '20px 24px', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Cliente</th>
                                <th style={{ padding: '20px 24px', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Fecha</th>
                                <th style={{ padding: '20px 24px', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Total</th>
                                <th style={{ padding: '20px 24px', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Estado</th>
                                <th style={{ padding: '20px 24px', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.8px', textAlign: 'right' }}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ventasFiltradas.map((venta) => (
                                <tr key={venta.id} style={{ borderBottom: '1px solid #334155', transition: 'background 0.2s ease' }} 
                                    onMouseEnter={(e) => e.currentTarget.style.background = '#0f172a'} 
                                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                                    <td style={{ padding: '20px 24px' }}>
                                        <span style={{ 
                                            fontWeight: '800', 
                                            color: '#818cf8', 
                                            fontSize: '14px'
                                        }}>
                                            #{venta.id}
                                        </span>
                                    </td>
                                    <td style={{ padding: '20px 24px' }}>
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <User style={{ width: '14px', height: '14px', color: '#818cf8' }} />
                                                <p style={{ fontWeight: '700', color: '#f1f5f9', fontSize: '14px', margin: '0' }}>
                                                    {venta.cliente?.nombre || 'N/A'}
                                                </p>
                                            </div>
                                            <p style={{ fontSize: '12px', color: '#94a3b8', margin: '2px 0 0 22px' }}>
                                                {venta.cliente?.email || 'Sin correo registrado'}
                                            </p>
                                        </div>
                                    </td>
                                    <td style={{ padding: '20px 24px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <Calendar style={{ width: '14px', height: '14px', color: '#818cf8' }} />
                                            <span style={{ fontSize: '13px', fontWeight: '500', color: '#94a3b8' }}>
                                                {new Date(venta.fecha).toLocaleDateString('es-MX', {
                                                    day: '2-digit',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '20px 24px' }}>
                                        <span style={{ 
                                            fontWeight: '800', 
                                            color: '#f1f5f9', 
                                            fontSize: '15px'
                                        }}>
                                            ${venta.total?.toFixed(2) || '0.00'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '20px 24px' }}>
                                        {getEstadoBadge(venta.estadoPago)}
                                    </td>
                                    <td style={{ padding: '20px 24px', textAlign: 'right' }}>
                                        <button
                                            onClick={() => navegar('ventas', 'ver', venta.id)}
                                            style={{
                                                background: 'rgba(79, 70, 229, 0.15)',
                                                border: '1px solid rgba(79, 70, 229, 0.2)',
                                                color: '#818cf8',
                                                padding: '10px',
                                                borderRadius: '12px',
                                                cursor: 'pointer',
                                                display: 'inline-flex',
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
                                            title="Ver detalles"
                                        >
                                            <Eye style={{ width: '16px', height: '16px' }} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {ventasFiltradas.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                        <div style={{ width: '64px', height: '64px', background: '#0f172a', borderRadius: '20px', border: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', margin: '0 auto 16px auto' }}>
                            <ShoppingBag style={{ width: '32px', height: '32px' }} />
                        </div>
                        <p style={{ fontSize: '14px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', color: '#94a3b8', margin: '0 0 6px 0' }}>No hay ventas registradas</p>
                        <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Prueba con otra búsqueda o realiza una nueva venta.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VentasList;