import React, { useState, useEffect } from 'react';
import { apiService } from '../../../services/apiService';
import { 
    Save, ArrowLeft, User, Mail, Phone, MapPin, 
    Loader2, AlertCircle, CheckCircle2, ShieldCheck, 
    Users, Lock, Eye, EyeOff, KeyRound
} from 'lucide-react';

const ClienteEditar = ({ id, navegar }) => {
    const [carga, setCarga] = useState(true);
    const [guardando, setGuardando] = useState(false);
    const [error, setError] = useState('');
    const [exito, setExito] = useState(false);
    const [mostrarPassword, setMostrarPassword] = useState(false);
    const [cambiandoPassword, setCambiandoPassword] = useState(false);
    
    // Datos del cliente
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        direccion: '',
        username: ''
    });

    // Datos del usuario (para contraseña)
    const [usuarioData, setUsuarioData] = useState({
        id: '',
        password: ''
    });

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                // Cargar cliente
                const cliente = await apiService.getCliente(id);
                console.log('👤 Cliente cargado:', cliente);
                
                setFormData({
                    nombre: cliente.nombre || '',
                    email: cliente.email || '',
                    telefono: cliente.telefono || '',
                    direccion: cliente.direccion || '',
                    username: ''
                });

                // Intentar obtener el usuario asociado
                try {
                    const usuario = await apiService.getUsuarioByEmail(cliente.email);
                    if (usuario) {
                        setUsuarioData({
                            id: usuario.id || '',
                            password: ''
                        });
                        setFormData(prev => ({
                            ...prev,
                            username: usuario.username || ''
                        }));
                    }
                } catch (err) {
                    console.log('No se encontró usuario asociado');
                }
            } catch (err) {
                console.error('❌ Error cargando cliente:', err);
                setError('Error cargando los datos para la edición: ' + (err.message || 'Intente de nuevo.'));
            } finally {
                setCarga(false);
            }
        };

        if (id) {
            cargarDatos();
        } else {
            setError('No se proporcionó un ID de cliente válido para editar.');
            setCarga(false);
        }
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError('');
    };

    const handlePasswordChange = (e) => {
        setUsuarioData({ ...usuarioData, [e.target.name]: e.target.value });
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setExito(false);

        if (!formData.nombre.trim()) {
            setError('El nombre es obligatorio.');
            return;
        }

        if (!formData.email.trim()) {
            setError('El correo electrónico es obligatorio.');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setError('Ingresa un correo electrónico válido.');
            return;
        }

        if (cambiandoPassword && (!usuarioData.password || usuarioData.password.length < 6)) {
            setError('La contraseña debe tener al menos 6 caracteres.');
            return;
        }

        setGuardando(true);

        try {
            // 1. Actualizar cliente
            const clienteData = {
                nombre: formData.nombre.trim(),
                email: formData.email.trim(),
                telefono: formData.telefono.trim(),
                direccion: formData.direccion.trim()
            };
            
            console.log('👤 Actualizando cliente:', id, clienteData);
            await apiService.actualizarCliente(id, clienteData);

            // 2. Si hay usuario, actualizarlo
            if (usuarioData.id) {
                const usuarioUpdate = {
                    nombre: formData.nombre.trim(),
                    email: formData.email.trim(),
                    username: formData.username,
                    direccion: formData.direccion.trim(),
                    telefono: formData.telefono.trim()
                };

                if (cambiandoPassword && usuarioData.password) {
                    usuarioUpdate.password = usuarioData.password;
                }

                console.log('👤 Actualizando usuario:', usuarioData.id, usuarioUpdate);
                await apiService.actualizarUsuario(usuarioData.id, usuarioUpdate);
            }

            setExito(true);
            setTimeout(() => {
                navegar('clientes', 'list');
            }, 1400);
        } catch (err) {
            console.error('❌ Error al actualizar cliente:', err);
            setError('Error al actualizar el cliente: ' + (err.message || 'Intente de nuevo.'));
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
                    Cargando información del cliente...
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
                        onClick={() => navegar('clientes', 'list')}
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
                            <Users style={{ width: '34px', height: '34px', color: 'white' }} />
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
                                Editar Cliente
                            </h1>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', zIndex: 1, alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.08)', padding: '10px 16px', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <ShieldCheck style={{ width: '20px', height: '20px', color: '#38bdf8' }} />
                    <span style={{ fontSize: '12px', fontWeight: '600', color: '#e2e8f0' }}>Modificación Activa</span>
                </div>
            </div>

            {/* Formulario */}
            <div style={{ 
                background: '#0f172a', 
                borderRadius: '28px', 
                padding: '40px', 
                boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.3)', 
                border: '1px solid #1e293b' 
            }}>
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
                        fontWeight: '600'
                    }}>
                        <div style={{ background: '#ef4444', color: 'white', padding: '8px', borderRadius: '10px', display: 'flex' }}>
                            <AlertCircle style={{ width: '18px', height: '18px' }} />
                        </div>
                        <span>{error}</span>
                    </div>
                )}

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
                        fontWeight: '600'
                    }}>
                        <div style={{ background: '#10b981', color: 'white', padding: '8px', borderRadius: '10px', display: 'flex' }}>
                            <CheckCircle2 style={{ width: '18px', height: '18px' }} />
                        </div>
                        <span>¡Cliente actualizado exitosamente! Redirigiendo al panel...</span>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '28px', marginBottom: '35px' }}>
                        
                        {/* Username (solo lectura) */}
                        <div>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '10px', letterSpacing: '0.5px' }}>
                                Usuario
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
                                <User style={{ width: '18px', height: '18px', color: '#64748b' }} />
                                <span>{formData.username || 'No disponible'}</span>
                                <span style={{
                                    fontSize: '10px',
                                    color: '#64748b',
                                    marginLeft: 'auto'
                                }}>
                                    No editable
                                </span>
                            </div>
                        </div>

                        {/* Email (solo lectura) */}
                        <div>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '10px', letterSpacing: '0.5px' }}>
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
                                <span>{formData.email || 'No disponible'}</span>
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
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '10px', letterSpacing: '0.5px' }}>
                                Nombre Completo <span style={{ color: '#ef4444' }}>*</span>
                            </label>
                            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                <span style={{ position: 'absolute', left: '18px', color: '#818cf8', display: 'flex', pointerEvents: 'none' }}>
                                    <User style={{ width: '20px', height: '20px' }} />
                                </span>
                                <input
                                    type="text"
                                    name="nombre"
                                    required
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    placeholder="Nombre completo del cliente"
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

                        {/* Teléfono */}
                        <div>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '10px', letterSpacing: '0.5px' }}>
                                Teléfono
                            </label>
                            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                <span style={{ position: 'absolute', left: '18px', color: '#818cf8', display: 'flex', pointerEvents: 'none' }}>
                                    <Phone style={{ width: '20px', height: '20px' }} />
                                </span>
                                <input
                                    type="text"
                                    name="telefono"
                                    value={formData.telefono}
                                    onChange={handleChange}
                                    placeholder="55 1234 5678"
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

                        {/* Dirección */}
                        <div>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '10px', letterSpacing: '0.5px' }}>
                                Dirección
                            </label>
                            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                <span style={{ position: 'absolute', left: '18px', color: '#818cf8', display: 'flex', pointerEvents: 'none' }}>
                                    <MapPin style={{ width: '20px', height: '20px' }} />
                                </span>
                                <input
                                    type="text"
                                    name="direccion"
                                    value={formData.direccion}
                                    onChange={handleChange}
                                    placeholder="Calle Principal #123, Colonia Centro, Ciudad"
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

                        {/* Cambio de Contraseña */}
                        <div style={{ gridColumn: '1 / -1' }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                marginBottom: '10px'
                            }}>
                                <KeyRound style={{ width: '18px', height: '18px', color: '#818cf8' }} />
                                <span style={{
                                    fontSize: '12px',
                                    fontWeight: '700',
                                    textTransform: 'uppercase',
                                    color: '#94a3b8',
                                    letterSpacing: '0.5px'
                                }}>
                                    Cambiar Contraseña
                                </span>
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
                                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                    <span style={{ position: 'absolute', left: '18px', color: '#818cf8', display: 'flex', pointerEvents: 'none' }}>
                                        <Lock style={{ width: '20px', height: '20px' }} />
                                    </span>
                                    <input
                                        type={mostrarPassword ? 'text' : 'password'}
                                        name="password"
                                        minLength="6"
                                        value={usuarioData.password}
                                        onChange={handlePasswordChange}
                                        placeholder="Nueva contraseña (mínimo 6 caracteres)"
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
                                    <button
                                        type="button"
                                        onClick={() => setMostrarPassword(!mostrarPassword)}
                                        style={{
                                            position: 'absolute',
                                            right: '14px',
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            color: '#94a3b8',
                                            padding: '4px'
                                        }}
                                    >
                                        {mostrarPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            )}
                        </div>

                    </div>

                    {/* Botones */}
                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'flex-end', 
                        alignItems: 'center', 
                        gap: '16px', 
                        paddingTop: '30px', 
                        borderTop: '1px solid #1e293b' 
                    }}>
                        <button
                            type="button"
                            onClick={() => navegar('clientes', 'list')}
                            style={{
                                padding: '15px 28px',
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
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={guardando}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px',
                                padding: '15px 36px',
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
                                    <span>Actualizando Registro...</span>
                                </>
                            ) : (
                                <>
                                    <Save style={{ width: '18px', height: '18px', strokeWidth: 2.5 }} />
                                    <span>Actualizar Cliente</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ClienteEditar;