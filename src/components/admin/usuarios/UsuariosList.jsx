import React, { useState, useEffect } from 'react';
import { apiService } from '../../../services/apiService';
import { 
    Plus, Pencil, Trash2, Users, Search, Loader2, 
    ShieldCheck, User, Mail, Phone, MapPin, 
    UserCog, UserCheck, UserX, Shield
} from 'lucide-react';

const UsuariosList = ({ navegar }) => {
    const [usuarios, setUsuarios] = useState([]);
    const [carga, setCarga] = useState(true);
    const [busqueda, setBusqueda] = useState('');
    const [eliminandoId, setEliminandoId] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        cargarUsuarios();
    }, []);

    const cargarUsuarios = async () => {
        setCarga(true);
        setError('');
        try {
            const data = await apiService.getUsuarios();
            console.log('👤 Usuarios cargados:', data);
            setUsuarios(data || []);
        } catch (err) {
            console.error('❌ Error cargando usuarios:', err);
            setError('Error al cargar la lista de usuarios: ' + (err.message || 'Intente de nuevo.'));
        } finally {
            setCarga(false);
        }
    };

    const eliminarUsuario = async (id) => {
        if (confirm('¿Estás seguro de eliminar este usuario?')) {
            setEliminandoId(id);
            try {
                await apiService.eliminarUsuario(id);
                cargarUsuarios();
            } catch (err) {
                alert('Error al eliminar el usuario: ' + (err.message || 'Intente de nuevo.'));
            } finally {
                setEliminandoId(null);
            }
        }
    };

    const cambiarRol = async (id, nuevoRol) => {
        if (confirm(`¿Cambiar el rol de este usuario a ${nuevoRol}?`)) {
            try {
                await apiService.cambiarRol(id, nuevoRol);
                cargarUsuarios();
            } catch (err) {
                alert('Error al cambiar el rol: ' + (err.message || 'Intente de nuevo.'));
            }
        }
    };

    const getRolBadge = (rol) => {
        const roles = {
            'ROLE_ADMIN': { color: 'rgba(239, 68, 68, 0.15)', textColor: '#f87171', icon: Shield },
            'ROLE_CLIENTE': { color: 'rgba(16, 185, 129, 0.15)', textColor: '#6ee7b7', icon: UserCheck },
        };
        const r = roles[rol] || roles['ROLE_CLIENTE'];
        const Icon = r.icon;
        return (
            <span style={{
                padding: '4px 12px',
                borderRadius: '8px',
                fontSize: '11px',
                fontWeight: '700',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                background: r.color,
                color: r.textColor,
                border: `1px solid ${r.color}`
            }}>
                <Icon style={{ width: '12px', height: '12px' }} />
                {rol === 'ROLE_ADMIN' ? 'Admin' : 'Cliente'}
            </span>
        );
    };

    const usuariosFiltrados = usuarios.filter(u =>
        u.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
        u.email?.toLowerCase().includes(busqueda.toLowerCase()) ||
        u.username?.toLowerCase().includes(busqueda.toLowerCase()) ||
        u.telefono?.toLowerCase().includes(busqueda.toLowerCase())
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
                    Cargando usuarios...
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
                        <UserCog style={{ width: '34px', height: '34px', color: 'white' }} />
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
                            Usuarios del Sistema
                        </h1>
                        <p style={{ fontSize: '13px', color: '#a5b4fc', margin: '2px 0 0 0', fontWeight: '500' }}>
                            {usuarios.length} usuarios registrados en el sistema
                        </p>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', zIndex: 1 }}>
                    <button
                        onClick={() => navegar('usuarios', 'crear')}
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
                        Nuevo Usuario
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
                    fontWeight: '600'
                }}>
                    <ShieldCheck style={{ width: '18px', height: '18px', color: '#f87171' }} />
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
                        placeholder="Buscar por nombre, correo, usuario o teléfono..."
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
                                <th style={{ padding: '20px 24px', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Usuario</th>
                                <th style={{ padding: '20px 24px', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Email</th>
                                <th style={{ padding: '20px 24px', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Teléfono</th>
                                <th style={{ padding: '20px 24px', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Rol</th>
                                <th style={{ padding: '20px 24px', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.8px', textAlign: 'right' }}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuariosFiltrados.map((usuario) => {
                                const isDeleting = eliminandoId === usuario.id;
                                return (
                                    <tr key={usuario.id} style={{ borderBottom: '1px solid #334155', transition: 'background 0.2s ease' }} 
                                        onMouseEnter={(e) => e.currentTarget.style.background = '#0f172a'} 
                                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                                        <td style={{ padding: '20px 24px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                                <div style={{
                                                    width: '44px',
                                                    height: '44px',
                                                    borderRadius: '50%',
                                                    background: usuario.rol === 'ROLE_ADMIN' 
                                                        ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' 
                                                        : 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: 'white',
                                                    fontWeight: '800',
                                                    fontSize: '14px',
                                                    flexShrink: 0
                                                }}>
                                                    {usuario.nombre?.charAt(0).toUpperCase() || 'U'}
                                                </div>
                                                <div>
                                                    <p style={{ fontWeight: '700', color: '#f1f5f9', fontSize: '14px', margin: '0 0 4px 0' }}>
                                                        {usuario.nombre}
                                                    </p>
                                                    <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>
                                                        @{usuario.username} • ID: #{usuario.id}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td style={{ padding: '20px 24px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <Mail style={{ width: '14px', height: '14px', color: '#818cf8' }} />
                                                <span style={{ fontSize: '13px', fontWeight: '500', color: '#94a3b8' }}>
                                                    {usuario.email || 'No registrado'}
                                                </span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '20px 24px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <Phone style={{ width: '14px', height: '14px', color: '#818cf8' }} />
                                                <span style={{ fontSize: '13px', fontWeight: '500', color: '#94a3b8' }}>
                                                    {usuario.telefono || 'No registrado'}
                                                </span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '20px 24px' }}>
                                            {getRolBadge(usuario.rol)}
                                        </td>
                                        <td style={{ padding: '20px 24px', textAlign: 'right' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                                                {/* Cambiar Rol */}
                                                {usuario.rol === 'ROLE_ADMIN' ? (
                                                    <button
                                                        onClick={() => cambiarRol(usuario.id, 'ROLE_CLIENTE')}
                                                        style={{
                                                            background: 'rgba(16, 185, 129, 0.15)',
                                                            border: '1px solid rgba(16, 185, 129, 0.2)',
                                                            color: '#6ee7b7',
                                                            padding: '8px',
                                                            borderRadius: '8px',
                                                            cursor: 'pointer',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            fontSize: '10px',
                                                            fontWeight: '700',
                                                            transition: 'all 0.2s ease'
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            e.currentTarget.style.background = 'rgba(16, 185, 129, 0.25)';
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.currentTarget.style.background = 'rgba(16, 185, 129, 0.15)';
                                                        }}
                                                        title="Cambiar a Cliente"
                                                    >
                                                        <UserX style={{ width: '14px', height: '14px' }} />
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => cambiarRol(usuario.id, 'ROLE_ADMIN')}
                                                        style={{
                                                            background: 'rgba(239, 68, 68, 0.15)',
                                                            border: '1px solid rgba(239, 68, 68, 0.2)',
                                                            color: '#f87171',
                                                            padding: '8px',
                                                            borderRadius: '8px',
                                                            cursor: 'pointer',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            fontSize: '10px',
                                                            fontWeight: '700',
                                                            transition: 'all 0.2s ease'
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.25)';
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)';
                                                        }}
                                                        title="Cambiar a Admin"
                                                    >
                                                        <Shield style={{ width: '14px', height: '14px' }} />
                                                    </button>
                                                )}
                                                {/* Editar */}
                                                <button
                                                    onClick={() => navegar('usuarios', 'editar', usuario.id)}
                                                    style={{
                                                        background: 'rgba(79, 70, 229, 0.15)',
                                                        border: '1px solid rgba(79, 70, 229, 0.2)',
                                                        color: '#818cf8',
                                                        padding: '8px',
                                                        borderRadius: '8px',
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
                                                    <Pencil style={{ width: '14px', height: '14px' }} />
                                                </button>
                                                {/* Eliminar */}
                                                <button
                                                    onClick={() => eliminarUsuario(usuario.id)}
                                                    disabled={isDeleting}
                                                    style={{
                                                        background: 'rgba(239, 68, 68, 0.15)',
                                                        border: '1px solid rgba(239, 68, 68, 0.2)',
                                                        color: '#f87171',
                                                        padding: '8px',
                                                        borderRadius: '8px',
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
                                                        <Loader2 style={{ width: '14px', height: '14px', animation: 'spin 1s linear infinite' }} />
                                                    ) : (
                                                        <Trash2 style={{ width: '14px', height: '14px' }} />
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

                {usuariosFiltrados.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                        <div style={{ width: '64px', height: '64px', background: '#0f172a', borderRadius: '20px', border: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', margin: '0 auto 16px auto' }}>
                            <Users style={{ width: '32px', height: '32px' }} />
                        </div>
                        <p style={{ fontSize: '14px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', color: '#94a3b8', margin: '0 0 6px 0' }}>No hay usuarios registrados</p>
                        <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Prueba con otra búsqueda o agrega un nuevo usuario.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UsuariosList;