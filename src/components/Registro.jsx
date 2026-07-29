import React, { useState } from 'react';
import { apiService } from '../services/apiService';
import { User, Mail, Lock, Phone, MapPin, Shield, UserPlus, Eye, EyeOff, AlertCircle, CheckCircle, ArrowRight, LogIn, Sparkles, Store } from 'lucide-react';

const Registro = ({ onRegistroSuccess, onGoToLogin }) => {
    const [nombre, setNombre] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rol, setRol] = useState('ROLE_CLIENTE');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [mostrarPassword, setMostrarPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        if (!username || username.trim() === '') {
            setError('El nombre de usuario es obligatorio');
            setLoading(false);
            return;
        }

        if (!email || email.trim() === '') {
            setError('El correo electrónico es obligatorio');
            setLoading(false);
            return;
        }

        if (!password || password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            setLoading(false);
            return;
        }

        if (!nombre || nombre.trim() === '') {
            setError('El nombre completo es obligatorio');
            setLoading(false);
            return;
        }

        if (!direccion || direccion.trim() === '') {
            setError('La dirección es obligatoria');
            setLoading(false);
            return;
        }

        if (!telefono || telefono.trim() === '') {
            setError('El teléfono es obligatorio');
            setLoading(false);
            return;
        }

        const payload = {
            username: username.trim(),
            password,
            nombre: nombre.trim(),
            rol,
            direccion: direccion.trim(),
            telefono: telefono.trim(),
            email: email.trim()
        };

        try {
            const response = await apiService.registro(payload);
            console.log('Respuesta del servidor:', response);
            
            setSuccess('¡Registro completado con éxito! Redirigiéndote al inicio de sesión...');
            setTimeout(() => {
                if (onRegistroSuccess) {
                    onRegistroSuccess();
                }
            }, 2000);
        } catch (err) {
            console.error('Error al registrar el usuario:', err);
            setError(err.message || 'Error al completar el registro. Intenta con otro correo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            width: '100%',
            minHeight: '85vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            boxSizing: 'border-box',
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            background: '#0f172a'
        }}>
            
            {/* Tarjeta Contenedora Principal - Modo Oscuro */}
            <div style={{
                width: '100%',
                maxWidth: '1000px',
                backgroundColor: '#1e293b',
                borderRadius: '28px',
                boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.5)',
                border: '1px solid rgba(51, 65, 85, 0.5)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap'
            }}>
                
                {/* Lateral Izquierdo - Ilustración & Marca */}
                <div style={{
                    background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)',
                    color: '#ffffff',
                    padding: '44px 36px',
                    width: '38%',
                    minWidth: '280px',
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    {/* Elementos decorativos */}
                    <div style={{
                        position: 'absolute',
                        top: '-60px',
                        right: '-60px',
                        width: '200px',
                        height: '200px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, rgba(255,255,255,0) 70%)',
                        pointerEvents: 'none'
                    }} />

                    <div style={{
                        position: 'absolute',
                        bottom: '-80px',
                        left: '-80px',
                        width: '250px',
                        height: '250px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, rgba(255,255,255,0) 70%)',
                        pointerEvents: 'none'
                    }} />

                    <div style={{ zIndex: 2 }}>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            background: 'rgba(255, 255, 255, 0.12)',
                            backdropFilter: 'blur(8px)',
                            color: '#ffffff',
                            padding: '6px 14px',
                            borderRadius: '30px',
                            fontSize: '10px',
                            fontWeight: '800',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            marginBottom: '32px',
                            border: '1px solid rgba(255, 255, 255, 0.15)'
                        }}>
                            <UserPlus style={{ width: '14px', height: '14px' }} />
                            <span>Nueva Cuenta</span>
                        </div>
                        
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '14px',
                            marginBottom: '12px'
                        }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                background: 'rgba(255, 255, 255, 0.15)',
                                borderRadius: '14px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '1px solid rgba(255, 255, 255, 0.2)'
                            }}>
                                <Store style={{ width: '28px', height: '28px', color: 'white' }} />
                            </div>
                            <h2 style={{
                                fontSize: '26px',
                                fontWeight: '900',
                                color: '#ffffff',
                                margin: 0,
                                lineHeight: '1.2',
                                letterSpacing: '-0.02em'
                            }}>
                                MercaditoLibre
                            </h2>
                        </div>
                        
                        <p style={{
                            fontSize: '14px',
                            color: '#c7d2fe',
                            margin: 0,
                            lineHeight: '1.6',
                            maxWidth: '280px'
                        }}>
                            Crea tu usuario para empezar a comprar productos, guardar direcciones de entrega y gestionar tus órdenes.
                        </p>
                    </div>

                    <div style={{ zIndex: 2, marginTop: '40px' }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '14px 16px',
                            borderRadius: '16px',
                            background: 'rgba(255, 255, 255, 0.08)',
                            backdropFilter: 'blur(8px)',
                            border: '1px solid rgba(255, 255, 255, 0.08)'
                        }}>
                            <div style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '10px',
                                background: 'rgba(255, 255, 255, 0.15)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Shield style={{ width: '18px', height: '18px', color: '#c7d2fe' }} />
                            </div>
                            <div>
                                <p style={{ fontSize: '12px', fontWeight: '700', color: '#ffffff', margin: 0 }}>Protección de Datos</p>
                                <p style={{ fontSize: '10px', color: '#a5b4fc', margin: 0, fontWeight: '500' }}>Tus datos están protegidos</p>
                            </div>
                        </div>
                    </div>

                    {/* Icono de fondo decorativo */}
                    <UserPlus style={{ 
                        position: 'absolute', 
                        right: '-40px', 
                        bottom: '-40px', 
                        width: '200px', 
                        height: '200px', 
                        opacity: 0.06, 
                        pointerEvents: 'none' 
                    }} />
                </div>

                {/* Lado Derecho - Formulario - Modo Oscuro */}
                <div style={{
                    backgroundColor: '#1e293b',
                    padding: '36px 36px',
                    width: '62%',
                    flex: '1',
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}>
                    
                    <div style={{ marginBottom: '24px' }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            marginBottom: '4px'
                        }}>
                            <Sparkles style={{ width: '18px', height: '18px', color: '#818cf8' }} />
                            <h3 style={{
                                fontSize: '22px',
                                fontWeight: '800',
                                color: '#f1f5f9',
                                margin: 0,
                                letterSpacing: '-0.01em'
                            }}>
                                Crear una Cuenta
                            </h3>
                        </div>
                        <p style={{ fontSize: '13px', color: '#94a3b8', margin: '4px 0 0 26px' }}>
                            Completa los campos obligatorios para registrarte
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        
                        {/* Mensaje de Error - Modo Oscuro */}
                        {error && (
                            <div style={{
                                background: 'rgba(239, 68, 68, 0.15)',
                                border: '1px solid #7f1d1d',
                                padding: '12px 16px',
                                borderRadius: '14px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                color: '#fca5a5',
                                fontSize: '13px',
                                fontWeight: '600'
                            }}>
                                <div style={{
                                    background: '#ef4444',
                                    color: 'white',
                                    padding: '6px',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    flexShrink: 0
                                }}>
                                    <AlertCircle style={{ width: '16px', height: '16px' }} />
                                </div>
                                <span>{error}</span>
                            </div>
                        )}

                        {/* Mensaje de Éxito - Modo Oscuro */}
                        {success && (
                            <div style={{
                                background: 'rgba(16, 185, 129, 0.15)',
                                border: '1px solid #065f46',
                                padding: '12px 16px',
                                borderRadius: '14px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                color: '#6ee7b7',
                                fontSize: '13px',
                                fontWeight: '600'
                            }}>
                                <div style={{
                                    background: '#10b981',
                                    color: 'white',
                                    padding: '6px',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    flexShrink: 0
                                }}>
                                    <CheckCircle style={{ width: '16px', height: '16px' }} />
                                </div>
                                <span>{success}</span>
                            </div>
                        )}

                        {/* Rol Selector - Modo Oscuro */}
                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '11px',
                                fontWeight: '700',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                                color: '#94a3b8',
                                marginBottom: '6px'
                            }}>
                                Rol de Usuario
                            </label>
                            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                <span style={{
                                    position: 'absolute',
                                    left: '16px',
                                    color: '#818cf8',
                                    display: 'flex',
                                    pointerEvents: 'none',
                                    zIndex: 1
                                }}>
                                    <Shield style={{ width: '18px', height: '18px' }} />
                                </span>
                                <select
                                    value={rol}
                                    onChange={(e) => setRol(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px 12px 46px',
                                        borderRadius: '14px',
                                        border: '1.5px solid #334155',
                                        background: 'rgba(51, 65, 85, 0.3)',
                                        color: '#f1f5f9',
                                        fontSize: '13px',
                                        fontWeight: '500',
                                        outline: 'none',
                                        boxSizing: 'border-box',
                                        transition: 'all 0.2s ease',
                                        cursor: 'pointer',
                                        appearance: 'none'
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = '#6366f1';
                                        e.target.style.background = 'rgba(51, 65, 85, 0.5)';
                                        e.target.style.boxShadow = '0 0 0 4px rgba(99, 102, 241, 0.15)';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = '#334155';
                                        e.target.style.background = 'rgba(51, 65, 85, 0.3)';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                >
                                    <option value="ROLE_CLIENTE">Cliente (Comprador)</option>
                                    <option value="ROLE_ADMIN">Administrador</option>
                                </select>
                            </div>
                            <p style={{
                                fontSize: '11px',
                                color: '#94a3b8',
                                margin: '6px 0 0 4px',
                                fontWeight: '500'
                            }}>
                                {rol === 'ROLE_CLIENTE' 
                                    ? 'Podrás comprar productos y gestionar tu perfil.' 
                                    : 'Tendrás acceso completo al panel de administración.'}
                            </p>
                        </div>

                        {/* Fila Doble: Nombre Completo y Usuario - Modo Oscuro */}
                        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                            {/* Nombre Completo */}
                            <div style={{ flex: '1', minWidth: '200px' }}>
                                <label style={{
                                    display: 'block',
                                    fontSize: '11px',
                                    fontWeight: '700',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px',
                                    color: '#94a3b8',
                                    marginBottom: '6px'
                                }}>
                                    Nombre Completo
                                </label>
                                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                    <span style={{
                                        position: 'absolute',
                                        left: '16px',
                                        color: '#818cf8',
                                        display: 'flex',
                                        pointerEvents: 'none'
                                    }}>
                                        <User style={{ width: '18px', height: '18px' }} />
                                    </span>
                                    <input
                                        type="text"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                        placeholder="Tu nombre completo"
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px 12px 46px',
                                            borderRadius: '14px',
                                            border: '1.5px solid #334155',
                                            background: 'rgba(51, 65, 85, 0.3)',
                                            fontSize: '13px',
                                            fontWeight: '500',
                                            color: '#f1f5f9',
                                            outline: 'none',
                                            boxSizing: 'border-box',
                                            transition: 'all 0.2s ease'
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = '#6366f1';
                                            e.target.style.background = 'rgba(51, 65, 85, 0.5)';
                                            e.target.style.boxShadow = '0 0 0 4px rgba(99, 102, 241, 0.15)';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = '#334155';
                                            e.target.style.background = 'rgba(51, 65, 85, 0.3)';
                                            e.target.style.boxShadow = 'none';
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Username */}
                            <div style={{ flex: '1', minWidth: '200px' }}>
                                <label style={{
                                    display: 'block',
                                    fontSize: '11px',
                                    fontWeight: '700',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px',
                                    color: '#94a3b8',
                                    marginBottom: '6px'
                                }}>
                                    Nombre de Usuario
                                </label>
                                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                    <span style={{
                                        position: 'absolute',
                                        left: '16px',
                                        color: '#818cf8',
                                        display: 'flex',
                                        pointerEvents: 'none'
                                    }}>
                                        <User style={{ width: '18px', height: '18px' }} />
                                    </span>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="usuario123"
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px 12px 46px',
                                            borderRadius: '14px',
                                            border: '1.5px solid #334155',
                                            background: 'rgba(51, 65, 85, 0.3)',
                                            fontSize: '13px',
                                            fontWeight: '500',
                                            color: '#f1f5f9',
                                            outline: 'none',
                                            boxSizing: 'border-box',
                                            transition: 'all 0.2s ease'
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = '#6366f1';
                                            e.target.style.background = 'rgba(51, 65, 85, 0.5)';
                                            e.target.style.boxShadow = '0 0 0 4px rgba(99, 102, 241, 0.15)';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = '#334155';
                                            e.target.style.background = 'rgba(51, 65, 85, 0.3)';
                                            e.target.style.boxShadow = 'none';
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Fila Doble: Email y Contraseña - Modo Oscuro */}
                        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                            {/* Email */}
                            <div style={{ flex: '1', minWidth: '200px' }}>
                                <label style={{
                                    display: 'block',
                                    fontSize: '11px',
                                    fontWeight: '700',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px',
                                    color: '#94a3b8',
                                    marginBottom: '6px'
                                }}>
                                    Correo Electrónico
                                </label>
                                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                    <span style={{
                                        position: 'absolute',
                                        left: '16px',
                                        color: '#818cf8',
                                        display: 'flex',
                                        pointerEvents: 'none'
                                    }}>
                                        <Mail style={{ width: '18px', height: '18px' }} />
                                    </span>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="tucorreo@ejemplo.com"
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px 12px 46px',
                                            borderRadius: '14px',
                                            border: '1.5px solid #334155',
                                            background: 'rgba(51, 65, 85, 0.3)',
                                            fontSize: '13px',
                                            fontWeight: '500',
                                            color: '#f1f5f9',
                                            outline: 'none',
                                            boxSizing: 'border-box',
                                            transition: 'all 0.2s ease'
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = '#6366f1';
                                            e.target.style.background = 'rgba(51, 65, 85, 0.5)';
                                            e.target.style.boxShadow = '0 0 0 4px rgba(99, 102, 241, 0.15)';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = '#334155';
                                            e.target.style.background = 'rgba(51, 65, 85, 0.3)';
                                            e.target.style.boxShadow = 'none';
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Contraseña */}
                            <div style={{ flex: '1', minWidth: '200px' }}>
                                <label style={{
                                    display: 'block',
                                    fontSize: '11px',
                                    fontWeight: '700',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px',
                                    color: '#94a3b8',
                                    marginBottom: '6px'
                                }}>
                                    Contraseña
                                </label>
                                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                    <span style={{
                                        position: 'absolute',
                                        left: '16px',
                                        color: '#818cf8',
                                        display: 'flex',
                                        pointerEvents: 'none'
                                    }}>
                                        <Lock style={{ width: '18px', height: '18px' }} />
                                    </span>
                                    <input
                                        type={mostrarPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Mínimo 6 caracteres"
                                        required
                                        minLength="6"
                                        style={{
                                            width: '100%',
                                            padding: '12px 46px 12px 46px',
                                            borderRadius: '14px',
                                            border: '1.5px solid #334155',
                                            background: 'rgba(51, 65, 85, 0.3)',
                                            fontSize: '13px',
                                            fontWeight: '500',
                                            color: '#f1f5f9',
                                            outline: 'none',
                                            boxSizing: 'border-box',
                                            transition: 'all 0.2s ease'
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = '#6366f1';
                                            e.target.style.background = 'rgba(51, 65, 85, 0.5)';
                                            e.target.style.boxShadow = '0 0 0 4px rgba(99, 102, 241, 0.15)';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = '#334155';
                                            e.target.style.background = 'rgba(51, 65, 85, 0.3)';
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
                                            padding: '4px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            color: '#94a3b8',
                                            borderRadius: '8px',
                                            transition: 'all 0.2s ease'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(51, 65, 85, 0.3)'}
                                        onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
                                    >
                                        {mostrarPassword ? 
                                            <EyeOff style={{ width: '18px', height: '18px' }} /> : 
                                            <Eye style={{ width: '18px', height: '18px' }} />
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Fila Doble: Teléfono y Dirección - Modo Oscuro */}
                        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                            {/* Teléfono */}
                            <div style={{ flex: '1', minWidth: '200px' }}>
                                <label style={{
                                    display: 'block',
                                    fontSize: '11px',
                                    fontWeight: '700',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px',
                                    color: '#94a3b8',
                                    marginBottom: '6px'
                                }}>
                                    Teléfono
                                </label>
                                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                    <span style={{
                                        position: 'absolute',
                                        left: '16px',
                                        color: '#818cf8',
                                        display: 'flex',
                                        pointerEvents: 'none'
                                    }}>
                                        <Phone style={{ width: '18px', height: '18px' }} />
                                    </span>
                                    <input
                                        type="tel"
                                        value={telefono}
                                        onChange={(e) => setTelefono(e.target.value)}
                                        placeholder="55 1234 5678"
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px 12px 46px',
                                            borderRadius: '14px',
                                            border: '1.5px solid #334155',
                                            background: 'rgba(51, 65, 85, 0.3)',
                                            fontSize: '13px',
                                            fontWeight: '500',
                                            color: '#f1f5f9',
                                            outline: 'none',
                                            boxSizing: 'border-box',
                                            transition: 'all 0.2s ease'
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = '#6366f1';
                                            e.target.style.background = 'rgba(51, 65, 85, 0.5)';
                                            e.target.style.boxShadow = '0 0 0 4px rgba(99, 102, 241, 0.15)';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = '#334155';
                                            e.target.style.background = 'rgba(51, 65, 85, 0.3)';
                                            e.target.style.boxShadow = 'none';
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Dirección */}
                            <div style={{ flex: '1', minWidth: '200px' }}>
                                <label style={{
                                    display: 'block',
                                    fontSize: '11px',
                                    fontWeight: '700',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px',
                                    color: '#94a3b8',
                                    marginBottom: '6px'
                                }}>
                                    Dirección
                                </label>
                                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                    <span style={{
                                        position: 'absolute',
                                        left: '16px',
                                        color: '#818cf8',
                                        display: 'flex',
                                        pointerEvents: 'none'
                                    }}>
                                        <MapPin style={{ width: '18px', height: '18px' }} />
                                    </span>
                                    <input
                                        type="text"
                                        value={direccion}
                                        onChange={(e) => setDireccion(e.target.value)}
                                        placeholder="Calle, número, colonia"
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px 12px 46px',
                                            borderRadius: '14px',
                                            border: '1.5px solid #334155',
                                            background: 'rgba(51, 65, 85, 0.3)',
                                            fontSize: '13px',
                                            fontWeight: '500',
                                            color: '#f1f5f9',
                                            outline: 'none',
                                            boxSizing: 'border-box',
                                            transition: 'all 0.2s ease'
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = '#6366f1';
                                            e.target.style.background = 'rgba(51, 65, 85, 0.5)';
                                            e.target.style.boxShadow = '0 0 0 4px rgba(99, 102, 241, 0.15)';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = '#334155';
                                            e.target.style.background = 'rgba(51, 65, 85, 0.3)';
                                            e.target.style.boxShadow = 'none';
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Botón Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                width: '100%',
                                marginTop: '8px',
                                padding: '15px 20px',
                                borderRadius: '14px',
                                border: 'none',
                                background: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)',
                                color: '#ffffff',
                                fontSize: '13px',
                                fontWeight: '700',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                opacity: loading ? 0.7 : 1,
                                boxShadow: '0 10px 20px -5px rgba(79, 70, 229, 0.4)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px',
                                transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                                if (!loading) {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 16px 30px -8px rgba(79, 70, 229, 0.5)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!loading) {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 10px 20px -5px rgba(79, 70, 229, 0.4)';
                                }
                            }}
                        >
                            {loading ? (
                                <>
                                    <span style={{ 
                                        display: 'inline-block',
                                        width: '18px',
                                        height: '18px',
                                        border: '2px solid rgba(255,255,255,0.3)',
                                        borderTop: '2px solid #ffffff',
                                        borderRadius: '50%',
                                        animation: 'spin 0.8s linear infinite'
                                    }} />
                                    <span>Creando cuenta...</span>
                                </>
                            ) : (
                                <>
                                    <UserPlus style={{ width: '18px', height: '18px' }} />
                                    <span>Crear Cuenta</span>
                                    <ArrowRight style={{ width: '18px', height: '18px' }} />
                                </>
                            )}
                        </button>

                    </form>

                    {/* Enlace hacia Login - Modo Oscuro */}
                    <div style={{
                        marginTop: '24px',
                        paddingTop: '20px',
                        borderTop: '1px solid rgba(51, 65, 85, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        flexWrap: 'wrap'
                    }}>
                        <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: '500' }}>
                            ¿Ya tienes cuenta?
                        </span>
                        <button
                            onClick={onGoToLogin}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: '#818cf8',
                                fontWeight: '700',
                                cursor: 'pointer',
                                fontSize: '13px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '6px 12px',
                                borderRadius: '10px',
                                transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(79, 70, 229, 0.15)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'none';
                            }}
                        >
                            <LogIn style={{ width: '16px', height: '16px' }} />
                            <span>Inicia Sesión</span>
                        </button>
                    </div>

                </div>
            </div>

            {/* Estilo de animación para el spinner */}
            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default Registro;