import React, { useState, useEffect } from 'react';
import { apiService } from '../../../services/apiService';
import { Plus, Pencil, Trash2, Users, Search, Loader2, Mail, Phone, MapPin, ShieldCheck, User } from 'lucide-react';

const ClientesList = ({ navegar }) => {
    const [clientes, setClientes] = useState([]);
    const [carga, setCarga] = useState(true);
    const [busqueda, setBusqueda] = useState('');
    const [eliminandoId, setEliminandoId] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        cargarClientes();
    }, []);

    const cargarClientes = async () => {
        setCarga(true);
        setError('');
        try {
            const data = await apiService.getClientes();
            console.log('👤 Clientes cargados:', data);
            setClientes(data || []);
        } catch (err) {
            console.error('❌ Error cargando clientes:', err);
            setError('Error al cargar la lista de clientes: ' + (err.message || 'Intente de nuevo.'));
        } finally {
            setCarga(false);
        }
    };

    const eliminarCliente = async (id) => {
        if (confirm('¿Estás seguro de eliminar este cliente?')) {
            setEliminandoId(id);
            try {
                await apiService.eliminarCliente(id);
                cargarClientes();
            } catch (err) {
                alert('Error al eliminar el cliente: ' + (err.message || 'Intente de nuevo.'));
            } finally {
                setEliminandoId(null);
            }
        }
    };

    const clientesFiltrados = clientes.filter(c =>
        c.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
        c.email?.toLowerCase().includes(busqueda.toLowerCase()) ||
        c.telefono?.toLowerCase().includes(busqueda.toLowerCase()) ||
        c.direccion?.toLowerCase().includes(busqueda.toLowerCase())
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
                    Cargando clientes...
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
                        <Users style={{ width: '34px', height: '34px', color: 'white' }} />
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
                                Gestión de Usuarios
                            </span>
                        </div>
                        <h1 style={{ fontSize: '30px', fontWeight: '800', margin: '0', letterSpacing: '-0.8px', color: '#ffffff' }}>
                            Clientes
                        </h1>
                        <p style={{ fontSize: '13px', color: '#a5b4fc', margin: '2px 0 0 0', fontWeight: '500' }}>
                            {clientes.length} clientes registrados en el sistema
                        </p>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', zIndex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.08)', padding: '10px 16px', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                        <ShieldCheck style={{ width: '20px', height: '20px', color: '#34d399' }} />
                        <span style={{ fontSize: '12px', fontWeight: '600', color: '#e2e8f0' }}>Control Activo</span>
                    </div>
                    <button
                        onClick={() => navegar('clientes', 'crear')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '14px 24px',
                            borderRadius: '16px',
                            background: '#1e293b',
                            border: '1px solid #334155',
                            color: '#f1f5f9',
                            fontSize: '14px',
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
                        <Plus style={{ width: '18px', height: '18px', strokeWidth: 3 }} />
                        Nuevo Cliente
                    </button>
                </div>
            </div>

            {/* Alerta de Error */}
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
                        <AlertCircle style={{ width: '18px', height: '18px' }} />
                    </div>
                    <span>{error}</span>
                </div>
            )}

            {/* Buscador */}
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
                        placeholder="Buscar por nombre, correo, teléfono o dirección..."
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

            {/* Tabla */}
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
                                <th style={{ padding: '20px 24px', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Cliente</th>
                                <th style={{ padding: '20px 24px', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Contacto</th>
                                <th style={{ padding: '20px 24px', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Teléfono</th>
                                <th style={{ padding: '20px 24px', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Dirección</th>
                                <th style={{ padding: '20px 24px', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.8px', textAlign: 'right' }}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientesFiltrados.map((cliente) => {
                                const isDeleting = eliminandoId === cliente.id;
                                return (
                                    <tr key={cliente.id} style={{ borderBottom: '1px solid #334155', transition: 'background 0.2s ease' }} 
                                        onMouseEnter={(e) => e.currentTarget.style.background = '#0f172a'} 
                                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                                        <td style={{ padding: '20px 24px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                                <div style={{
                                                    width: '50px',
                                                    height: '50px',
                                                    borderRadius: '14px',
                                                    background: 'rgba(79, 70, 229, 0.15)',
                                                    border: '1px solid rgba(79, 70, 229, 0.2)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: '#818cf8',
                                                    flexShrink: 0
                                                }}>
                                                    <User style={{ width: '24px', height: '24px' }} />
                                                </div>
                                                <div>
                                                    <p style={{ fontWeight: '700', color: '#f1f5f9', fontSize: '14px', margin: '0 0 4px 0' }}>
                                                        {cliente.nombre}
                                                    </p>
                                                    <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>
                                                        ID: #{cliente.id}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td style={{ padding: '20px 24px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <Mail style={{ width: '14px', height: '14px', color: '#818cf8' }} />
                                                <span style={{ fontSize: '13px', fontWeight: '500', color: '#94a3b8' }}>
                                                    {cliente.email || 'No registrado'}
                                                </span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '20px 24px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <Phone style={{ width: '14px', height: '14px', color: '#818cf8' }} />
                                                <span style={{ fontSize: '13px', fontWeight: '500', color: '#94a3b8' }}>
                                                    {cliente.telefono || 'No registrado'}
                                                </span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '20px 24px' }}>
                                            <span style={{ 
                                                padding: '6px 12px', 
                                                background: '#0f172a', 
                                                color: '#94a3b8', 
                                                border: '1px solid #334155', 
                                                borderRadius: '10px', 
                                                fontSize: '12px', 
                                                fontWeight: '600',
                                                display: 'inline-block',
                                                maxWidth: '200px',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis'
                                            }}>
                                                {cliente.direccion || 'Sin dirección registrada'}
                                            </span>
                                        </td>
                                        <td style={{ padding: '20px 24px', textAlign: 'right' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                                                <button
                                                    onClick={() => navegar('clientes', 'editar', cliente.id)}
                                                    style={{
                                                        background: 'rgba(79, 70, 229, 0.15)',
                                                        border: '1px solid rgba(79, 70, 229, 0.2)',
                                                        color: '#818cf8',
                                                        padding: '10px',
                                                        borderRadius: '12px',
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
                                                    title="Editar"
                                                >
                                                    <Pencil style={{ width: '16px', height: '16px' }} />
                                                </button>
                                                <button
                                                    onClick={() => eliminarCliente(cliente.id)}
                                                    disabled={isDeleting}
                                                    style={{
                                                        background: 'rgba(239, 68, 68, 0.15)',
                                                        border: '1px solid rgba(239, 68, 68, 0.2)',
                                                        color: '#f87171',
                                                        padding: '10px',
                                                        borderRadius: '12px',
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
                                                    title="Eliminar"
                                                >
                                                    {isDeleting ? (
                                                        <Loader2 style={{ width: '16px', height: '16px', animation: 'spin 1s linear infinite' }} />
                                                    ) : (
                                                        <Trash2 style={{ width: '16px', height: '16px' }} />
                                                    )}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {clientesFiltrados.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                        <div style={{ width: '64px', height: '64px', background: '#0f172a', borderRadius: '20px', border: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', margin: '0 auto 16px auto' }}>
                            <Users style={{ width: '32px', height: '32px' }} />
                        </div>
                        <p style={{ fontSize: '14px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', color: '#94a3b8', margin: '0 0 6px 0' }}>No hay clientes registrados</p>
                        <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Prueba con otra búsqueda o agrega un nuevo cliente.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClientesList;