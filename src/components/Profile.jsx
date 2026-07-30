import React, { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';
import { 
    User, Mail, Phone, MapPin, Save, Loader2, CheckCircle2, 
    AlertCircle, UserCircle, Edit3, Lock, Eye, EyeOff, KeyRound
} from 'lucide-react';

const Profile = ({ user, onUpdateUser }) => {
    const [loading, setLoading] = useState(true);
    const [guardando, setGuardando] = useState(false);
    const [error, setError] = useState('');
    const [exito, setExito] = useState(false);
    const [editando, setEditando] = useState(false);
    const [cambiandoPassword, setCambiandoPassword] = useState(false);
    const [mostrarPassword, setMostrarPassword] = useState(false);
    const [mostrarConfirmPassword, setMostrarConfirmPassword] = useState(false);
    
    const [perfil, setPerfil] = useState({
        id: '',
        nombre: '',
        email: '',
        telefono: '',
        direccion: '',
        username: ''
    });

    const [passwordData, setPasswordData] = useState({
        nuevaPassword: '',
        confirmarPassword: ''
    });

    useEffect(() => {
        cargarPerfil();
    }, []);

    const cargarPerfil = async () => {
        setLoading(true);
        setError('');
        try {
            const username = localStorage.getItem('username');
            const email = localStorage.getItem('email');
            const nombre = localStorage.getItem('nombre');
            
            // Intentar obtener el usuario completo
            let usuarioData = null;
            try {
                usuarioData = await apiService.getUsuarioByEmail(email);
            } catch (err) {
                console.log('No se encontró usuario, usando datos básicos');
            }

            if (usuarioData) {
                setPerfil({
                    id: usuarioData.id || '',
                    nombre: usuarioData.nombre || nombre,
                    email: usuarioData.email || email,
                    telefono: usuarioData.telefono || '',
                    direccion: usuarioData.direccion || '',
                    username: usuarioData.username || username
                });
            } else {
                setPerfil({
                    id: user?.id || '',
                    nombre: nombre || '',
                    email: email || '',
                    telefono: user?.telefono || '',
                    direccion: user?.direccion || '',
                    username: username || ''
                });
            }
        } catch (err) {
            console.error('Error cargando perfil:', err);
            setError('Error al cargar los datos del perfil');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setPerfil({ ...perfil, [e.target.name]: e.target.value });
        if (error) setError('');
        if (exito) setExito(false);
    };

    const handlePasswordChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setGuardando(true);
        setError('');
        setExito(false);

        try {
            if (!perfil.nombre.trim()) {
                setError('El nombre es obligatorio');
                setGuardando(false);
                return;
            }

            // Actualizar usuario
            if (perfil.id) {
                const usuarioData = {
                    nombre: perfil.nombre.trim(),
                    email: perfil.email.trim(),
                    direccion: perfil.direccion.trim(),
                    telefono: perfil.telefono.trim(),
                    username: perfil.username
                };

                // Si está cambiando contraseña
                if (cambiandoPassword) {
                    if (!passwordData.nuevaPassword || passwordData.nuevaPassword.length < 6) {
                        setError('La contraseña debe tener al menos 6 caracteres');
                        setGuardando(false);
                        return;
                    }
                    if (passwordData.nuevaPassword !== passwordData.confirmarPassword) {
                        setError('Las contraseñas no coinciden');
                        setGuardando(false);
                        return;
                    }
                    usuarioData.password = passwordData.nuevaPassword;
                }

                await apiService.actualizarUsuario(perfil.id, usuarioData);
                
                // Actualizar también el cliente si existe
                try {
                    await apiService.actualizarCliente(perfil.id, {
                        nombre: perfil.nombre.trim(),
                        email: perfil.email.trim(),
                        direccion: perfil.direccion.trim(),
                        telefono: perfil.telefono.trim()
                    });
                } catch (err) {
                    console.log('No se pudo actualizar cliente:', err);
                }
            }

            // Actualizar localStorage
            localStorage.setItem('nombre', perfil.nombre.trim());
            localStorage.setItem('email', perfil.email.trim());
            
            if (onUpdateUser) {
                onUpdateUser({
                    ...user,
                    nombre: perfil.nombre.trim(),
                    email: perfil.email.trim(),
                    telefono: perfil.telefono.trim(),
                    direccion: perfil.direccion.trim()
                });
            }

            setExito(true);
            setEditando(false);
            setCambiandoPassword(false);
            setPasswordData({ nuevaPassword: '', confirmarPassword: '' });
            setTimeout(() => setExito(false), 3000);
        } catch (err) {
            console.error('Error actualizando perfil:', err);
            setError(err.message || 'Error al actualizar el perfil. Intente de nuevo.');
        } finally {
            setGuardando(false);
        }
    };

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '60vh',
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
                <p style={{ color: '#94a3b8', marginTop: '20px', fontWeight: '700', fontSize: '16px' }}>
                    Cargando tu perfil...
                </p>
                <style>{`
                    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                `}</style>
            </div>
        );
    }

    return (
        <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '32px 24px 64px 24px',
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            background: '#0f172a',
            minHeight: '100vh'
        }}>
            {/* Header */}
            <div style={{
                background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)',
                borderRadius: '28px',
                padding: '36px 40px',
                marginBottom: '32px',
                color: '#ffffff',
                boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.6)',
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

                <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{
                        width: '72px',
                        height: '72px',
                        background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2px solid rgba(255, 255, 255, 0.2)',
                        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)'
                    }}>
                        <UserCircle style={{ width: '40px', height: '40px', color: 'white' }} />
                    </div>
                    <div>
                        <h1 style={{
                            fontSize: '28px',
                            fontWeight: '900',
                            margin: 0,
                            letterSpacing: '-0.02em'
                        }}>
                            Mi Perfil
                        </h1>
                        <p style={{
                            color: '#a5b4fc',
                            margin: '4px 0 0 0',
                            fontSize: '14px'
                        }}>
                            Gestiona tu información personal y contraseña
                        </p>
                    </div>
                </div>
            </div>

            {/* Tarjeta del Perfil */}
            <div style={{
                background: '#1e293b',
                borderRadius: '24px',
                border: '1px solid #334155',
                padding: '32px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
            }}>
                {error && (
                    <div style={{
                        background: 'rgba(239, 68, 68, 0.15)',
                        border: '1px solid #7f1d1d',
                        padding: '14px 18px',
                        borderRadius: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        color: '#fca5a5',
                        marginBottom: '20px',
                        fontSize: '13px',
                        fontWeight: '600'
                    }}>
                        <AlertCircle style={{ width: '18px', height: '18px', color: '#f87171' }} />
                        <span>{error}</span>
                    </div>
                )}

                {exito && (
                    <div style={{
                        background: 'rgba(16, 185, 129, 0.15)',
                        border: '1px solid #065f46',
                        padding: '14px 18px',
                        borderRadius: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        color: '#6ee7b7',
                        marginBottom: '20px',
                        fontSize: '13px',
                        fontWeight: '600'
                    }}>
                        <CheckCircle2 style={{ width: '18px', height: '18px', color: '#6ee7b7' }} />
                        <span>¡Perfil actualizado exitosamente!</span>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        {/* Username (solo lectura) */}
                        <div style={{ gridColumn: '1 / -1' }}>
                            <label style={{
                                display: 'block',
                                fontSize: '12px',
                                fontWeight: '700',
                                textTransform: 'uppercase',
                                color: '#94a3b8',
                                marginBottom: '6px',
                                letterSpacing: '0.5px'
                            }}>
                                Usuario
                            </label>
                            <div style={{
                                padding: '14px 18px',
                                background: '#0f172a',
                                borderRadius: '12px',
                                border: '1px solid #334155',
                                color: '#94a3b8',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px'
                            }}>
                                <User style={{ width: '18px', height: '18px', color: '#64748b' }} />
                                <span>{perfil.username || 'No disponible'}</span>
                                <span style={{
                                    fontSize: '10px',
                                    color: '#64748b',
                                    marginLeft: 'auto'
                                }}>
                                    No editable
                                </span>
                            </div>
                        </div>

                        {/* Nombre */}
                        <div style={{ gridColumn: '1 / -1' }}>
                            <label style={{
                                display: 'block',
                                fontSize: '12px',
                                fontWeight: '700',
                                textTransform: 'uppercase',
                                color: '#94a3b8',
                                marginBottom: '6px',
                                letterSpacing: '0.5px'
                            }}>
                                Nombre Completo <span style={{ color: '#ef4444' }}>*</span>
                            </label>
                            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                <span style={{
                                    position: 'absolute',
                                    left: '16px',
                                    color: '#818cf8',
                                    pointerEvents: 'none'
                                }}>
                                    <User style={{ width: '18px', height: '18px' }} />
                                </span>
                                <input
                                    type="text"
                                    name="nombre"
                                    value={perfil.nombre}
                                    onChange={handleChange}
                                    disabled={!editando}
                                    style={{
                                        width: '100%',
                                        padding: '14px 18px 14px 48px',
                                        borderRadius: '12px',
                                        border: '1.5px solid #334155',
                                        background: editando ? '#0f172a' : 'rgba(51, 65, 85, 0.2)',
                                        fontSize: '14px',
                                        color: editando ? '#f1f5f9' : '#94a3b8',
                                        outline: 'none',
                                        transition: 'all 0.2s ease',
                                        boxSizing: 'border-box'
                                    }}
                                    onFocus={(e) => {
                                        if (editando) {
                                            e.target.style.borderColor = '#4f46e5';
                                            e.target.style.background = '#1a1a2e';
                                            e.target.style.boxShadow = '0 0 0 4px rgba(79, 70, 229, 0.15)';
                                        }
                                    }}
                                    onBlur={(e) => {
                                        if (editando) {
                                            e.target.style.borderColor = '#334155';
                                            e.target.style.background = '#0f172a';
                                            e.target.style.boxShadow = 'none';
                                        }
                                    }}
                                />
                            </div>
                        </div>

                        {/* Email (solo lectura) */}
                        <div style={{ gridColumn: '1 / -1' }}>
                            <label style={{
                                display: 'block',
                                fontSize: '12px',
                                fontWeight: '700',
                                textTransform: 'uppercase',
                                color: '#94a3b8',
                                marginBottom: '6px',
                                letterSpacing: '0.5px'
                            }}>
                                Correo Electrónico
                            </label>
                            <div style={{
                                padding: '14px 18px',
                                background: 'rgba(51, 65, 85, 0.2)',
                                borderRadius: '12px',
                                border: '1px solid #334155',
                                color: '#94a3b8',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px'
                            }}>
                                <Mail style={{ width: '18px', height: '18px', color: '#64748b' }} />
                                <span>{perfil.email || 'No disponible'}</span>
                                <span style={{
                                    fontSize: '10px',
                                    color: '#64748b',
                                    marginLeft: 'auto'
                                }}>
                                    No editable
                                </span>
                            </div>
                        </div>

                        {/* Teléfono */}
                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '12px',
                                fontWeight: '700',
                                textTransform: 'uppercase',
                                color: '#94a3b8',
                                marginBottom: '6px',
                                letterSpacing: '0.5px'
                            }}>
                                Teléfono
                            </label>
                            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                <span style={{
                                    position: 'absolute',
                                    left: '16px',
                                    color: '#818cf8',
                                    pointerEvents: 'none'
                                }}>
                                    <Phone style={{ width: '18px', height: '18px' }} />
                                </span>
                                <input
                                    type="text"
                                    name="telefono"
                                    value={perfil.telefono}
                                    onChange={handleChange}
                                    disabled={!editando}
                                    placeholder="55 1234 5678"
                                    style={{
                                        width: '100%',
                                        padding: '14px 18px 14px 48px',
                                        borderRadius: '12px',
                                        border: '1.5px solid #334155',
                                        background: editando ? '#0f172a' : 'rgba(51, 65, 85, 0.2)',
                                        fontSize: '14px',
                                        color: editando ? '#f1f5f9' : '#94a3b8',
                                        outline: 'none',
                                        transition: 'all 0.2s ease',
                                        boxSizing: 'border-box'
                                    }}
                                    onFocus={(e) => {
                                        if (editando) {
                                            e.target.style.borderColor = '#4f46e5';
                                            e.target.style.background = '#1a1a2e';
                                            e.target.style.boxShadow = '0 0 0 4px rgba(79, 70, 229, 0.15)';
                                        }
                                    }}
                                    onBlur={(e) => {
                                        if (editando) {
                                            e.target.style.borderColor = '#334155';
                                            e.target.style.background = '#0f172a';
                                            e.target.style.boxShadow = 'none';
                                        }
                                    }}
                                />
                            </div>
                        </div>

                        {/* Dirección */}
                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '12px',
                                fontWeight: '700',
                                textTransform: 'uppercase',
                                color: '#94a3b8',
                                marginBottom: '6px',
                                letterSpacing: '0.5px'
                            }}>
                                Dirección
                            </label>
                            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                <span style={{
                                    position: 'absolute',
                                    left: '16px',
                                    color: '#818cf8',
                                    pointerEvents: 'none'
                                }}>
                                    <MapPin style={{ width: '18px', height: '18px' }} />
                                </span>
                                <input
                                    type="text"
                                    name="direccion"
                                    value={perfil.direccion}
                                    onChange={handleChange}
                                    disabled={!editando}
                                    placeholder="Calle 123, Colonia, Ciudad"
                                    style={{
                                        width: '100%',
                                        padding: '14px 18px 14px 48px',
                                        borderRadius: '12px',
                                        border: '1.5px solid #334155',
                                        background: editando ? '#0f172a' : 'rgba(51, 65, 85, 0.2)',
                                        fontSize: '14px',
                                        color: editando ? '#f1f5f9' : '#94a3b8',
                                        outline: 'none',
                                        transition: 'all 0.2s ease',
                                        boxSizing: 'border-box'
                                    }}
                                    onFocus={(e) => {
                                        if (editando) {
                                            e.target.style.borderColor = '#4f46e5';
                                            e.target.style.background = '#1a1a2e';
                                            e.target.style.boxShadow = '0 0 0 4px rgba(79, 70, 229, 0.15)';
                                        }
                                    }}
                                    onBlur={(e) => {
                                        if (editando) {
                                            e.target.style.borderColor = '#334155';
                                            e.target.style.background = '#0f172a';
                                            e.target.style.boxShadow = 'none';
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Sección de Cambio de Contraseña */}
                    {editando && (
                        <div style={{
                            marginTop: '24px',
                            paddingTop: '20px',
                            borderTop: '1px solid #334155'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                marginBottom: '16px'
                            }}>
                                <KeyRound style={{ width: '20px', height: '20px', color: '#818cf8' }} />
                                <h3 style={{
                                    fontSize: '14px',
                                    fontWeight: '800',
                                    color: '#f1f5f9',
                                    margin: 0
                                }}>
                                    Cambiar Contraseña
                                </h3>
                                <span style={{
                                    fontSize: '11px',
                                    color: '#64748b',
                                    marginLeft: 'auto'
                                }}>
                                    {cambiandoPassword ? 'Editando...' : 'Opcional'}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => setCambiandoPassword(!cambiandoPassword)}
                                    style={{
                                        padding: '6px 14px',
                                        borderRadius: '8px',
                                        background: cambiandoPassword ? 'rgba(239, 68, 68, 0.15)' : 'rgba(79, 70, 229, 0.15)',
                                        border: `1px solid ${cambiandoPassword ? 'rgba(239, 68, 68, 0.2)' : 'rgba(79, 70, 229, 0.2)'}`,
                                        color: cambiandoPassword ? '#f87171' : '#818cf8',
                                        fontSize: '11px',
                                        fontWeight: '700',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    {cambiandoPassword ? 'Cancelar' : 'Cambiar'}
                                </button>
                            </div>

                            {cambiandoPassword && (
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: '16px'
                                }}>
                                    <div>
                                        <label style={{
                                            display: 'block',
                                            fontSize: '11px',
                                            fontWeight: '700',
                                            textTransform: 'uppercase',
                                            color: '#94a3b8',
                                            marginBottom: '6px',
                                            letterSpacing: '0.5px'
                                        }}>
                                            Nueva Contraseña <span style={{ color: '#ef4444' }}>*</span>
                                        </label>
                                        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                            <span style={{
                                                position: 'absolute',
                                                left: '14px',
                                                color: '#818cf8',
                                                pointerEvents: 'none'
                                            }}>
                                                <Lock style={{ width: '16px', height: '16px' }} />
                                            </span>
                                            <input
                                                type={mostrarPassword ? 'text' : 'password'}
                                                name="nuevaPassword"
                                                value={passwordData.nuevaPassword}
                                                onChange={handlePasswordChange}
                                                placeholder="Mínimo 6 caracteres"
                                                style={{
                                                    width: '100%',
                                                    padding: '12px 18px 12px 44px',
                                                    borderRadius: '10px',
                                                    border: '1.5px solid #334155',
                                                    background: '#0f172a',
                                                    fontSize: '13px',
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
                                            <button
                                                type="button"
                                                onClick={() => setMostrarPassword(!mostrarPassword)}
                                                style={{
                                                    position: 'absolute',
                                                    right: '12px',
                                                    background: 'none',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    color: '#64748b',
                                                    padding: '4px'
                                                }}
                                            >
                                                {mostrarPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <label style={{
                                            display: 'block',
                                            fontSize: '11px',
                                            fontWeight: '700',
                                            textTransform: 'uppercase',
                                            color: '#94a3b8',
                                            marginBottom: '6px',
                                            letterSpacing: '0.5px'
                                        }}>
                                            Confirmar Contraseña <span style={{ color: '#ef4444' }}>*</span>
                                        </label>
                                        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                            <span style={{
                                                position: 'absolute',
                                                left: '14px',
                                                color: '#818cf8',
                                                pointerEvents: 'none'
                                            }}>
                                                <Lock style={{ width: '16px', height: '16px' }} />
                                            </span>
                                            <input
                                                type={mostrarConfirmPassword ? 'text' : 'password'}
                                                name="confirmarPassword"
                                                value={passwordData.confirmarPassword}
                                                onChange={handlePasswordChange}
                                                placeholder="Repite la contraseña"
                                                style={{
                                                    width: '100%',
                                                    padding: '12px 18px 12px 44px',
                                                    borderRadius: '10px',
                                                    border: '1.5px solid #334155',
                                                    background: '#0f172a',
                                                    fontSize: '13px',
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
                                            <button
                                                type="button"
                                                onClick={() => setMostrarConfirmPassword(!mostrarConfirmPassword)}
                                                style={{
                                                    position: 'absolute',
                                                    right: '12px',
                                                    background: 'none',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    color: '#64748b',
                                                    padding: '4px'
                                                }}
                                            >
                                                {mostrarConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Botones */}
                    <div style={{
                        marginTop: '28px',
                        paddingTop: '24px',
                        borderTop: '1px solid #334155',
                        display: 'flex',
                        gap: '12px',
                        justifyContent: 'flex-end'
                    }}>
                        {!editando ? (
                            <button
                                type="button"
                                onClick={() => setEditando(true)}
                                style={{
                                    padding: '14px 32px',
                                    background: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)',
                                    color: '#ffffff',
                                    border: 'none',
                                    borderRadius: '14px',
                                    fontWeight: '700',
                                    fontSize: '13px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
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
                                <Edit3 style={{ width: '18px', height: '18px' }} />
                                Editar Perfil
                            </button>
                        ) : (
                            <>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditando(false);
                                        setCambiandoPassword(false);
                                        setPasswordData({ nuevaPassword: '', confirmarPassword: '' });
                                        cargarPerfil();
                                    }}
                                    style={{
                                        padding: '14px 32px',
                                        background: 'rgba(51, 65, 85, 0.3)',
                                        color: '#94a3b8',
                                        border: '1px solid #334155',
                                        borderRadius: '14px',
                                        fontWeight: '700',
                                        fontSize: '13px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'rgba(51, 65, 85, 0.5)';
                                        e.currentTarget.style.color = '#f1f5f9';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'rgba(51, 65, 85, 0.3)';
                                        e.currentTarget.style.color = '#94a3b8';
                                    }}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={guardando}
                                    style={{
                                        padding: '14px 32px',
                                        background: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)',
                                        color: '#ffffff',
                                        border: 'none',
                                        borderRadius: '14px',
                                        fontWeight: '700',
                                        fontSize: '13px',
                                        cursor: guardando ? 'not-allowed' : 'pointer',
                                        opacity: guardando ? 0.7 : 1,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        boxShadow: '0 10px 20px -5px rgba(79, 70, 229, 0.4)',
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
                                            Guardando...
                                        </>
                                    ) : (
                                        <>
                                            <Save style={{ width: '18px', height: '18px' }} />
                                            Guardar Cambios
                                        </>
                                    )}
                                </button>
                            </>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;