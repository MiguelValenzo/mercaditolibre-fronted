import React, { useState } from 'react';
import { apiService } from '../services/apiService';
import { Mail, Lock, Eye, EyeOff, LogIn, AlertCircle, CheckCircle, ShieldCheck, ArrowRight, UserPlus, Sparkles, Store, User } from 'lucide-react';

const Login = ({ onLoginSuccess, onGoToRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [mostrarPassword, setMostrarPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const data = await apiService.login(email, password);
            setSuccess('¡Inicio de sesión exitoso! Redirigiendo...');
            
            setTimeout(() => {
                onLoginSuccess(data);
            }, 1500);
        } catch (err) {
            setError(err.message || 'Credenciales inválidas. Verifica tu correo o contraseña.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            width: '100%',
            minHeight: '80vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            boxSizing: 'border-box',
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            background: '#0f172a'
        }}>
            
            {/* Tarjeta Principal - Modo Oscuro */}
            <div style={{
                width: '100%',
                maxWidth: '920px',
                backgroundColor: '#1e293b',
                borderRadius: '28px',
                boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.5)',
                border: '1px solid rgba(51, 65, 85, 0.5)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap'
            }}>
                
                {/* Lado Izquierdo - Ilustración & Marca */}
                <div style={{
                    background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)',
                    color: '#ffffff',
                    padding: '44px 36px',
                    width: '42%',
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
                            <ShieldCheck style={{ width: '14px', height: '14px' }} />
                            <span>Acceso Seguro SSL</span>
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
                            Gestiona tus pedidos, explora el catálogo completo y sincroniza tus compras en un solo lugar.
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
                                <User style={{ width: '18px', height: '18px', color: '#c7d2fe' }} />
                            </div>
                            <div>
                                <p style={{ fontSize: '12px', fontWeight: '700', color: '#ffffff', margin: 0 }}>Portal Clientes</p>
                                <p style={{ fontSize: '10px', color: '#a5b4fc', margin: 0, fontWeight: '500' }}>v2.4 Autenticación</p>
                            </div>
                        </div>
                    </div>

                    {/* Icono de fondo decorativo */}
                    <LogIn style={{ 
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
                    padding: '44px 40px',
                    width: '58%',
                    flex: '1',
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}>
                    
                    <div style={{ marginBottom: '28px' }}>
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
                                ¡Hola de nuevo!
                            </h3>
                        </div>
                        <p style={{ fontSize: '13px', color: '#94a3b8', margin: '4px 0 0 26px' }}>
                            Ingresa con tus credenciales de correo electrónico.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                        
                        {/* Banner de Error - Modo Oscuro */}
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

                        {/* Banner de Éxito - Modo Oscuro */}
                        {success && (
                            <div style={{
                                background: 'rgba(16, 185, 129, 0.15)',
                                border: '1px solid #065f46',
                                padding: '14px 18px',
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

                        {/* Campo Correo - Modo Oscuro */}
                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '11px',
                                fontWeight: '700',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                                color: '#94a3b8',
                                marginBottom: '8px'
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
                                    placeholder="nombre@correo.com"
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '14px 18px 14px 48px',
                                        borderRadius: '14px',
                                        border: '1.5px solid #334155',
                                        background: 'rgba(51, 65, 85, 0.3)',
                                        fontSize: '14px',
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

                        {/* Campo Contraseña - Modo Oscuro */}
                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '11px',
                                fontWeight: '700',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                                color: '#94a3b8',
                                marginBottom: '8px'
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
                                    placeholder="••••••••"
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '14px 48px 14px 48px',
                                        borderRadius: '14px',
                                        border: '1.5px solid #334155',
                                        background: 'rgba(51, 65, 85, 0.3)',
                                        fontSize: '14px',
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

                        {/* Botón Principal */}
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
                                    <span>Iniciando sesión...</span>
                                </>
                            ) : (
                                <>
                                    <span>Iniciar Sesión</span>
                                    <ArrowRight style={{ width: '18px', height: '18px' }} />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Separador y Link de Registro - Modo Oscuro */}
                    <div style={{
                        marginTop: '28px',
                        paddingTop: '24px',
                        borderTop: '1px solid rgba(51, 65, 85, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        flexWrap: 'wrap'
                    }}>
                        <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: '500' }}>
                            ¿No tienes una cuenta?
                        </span>
                        <button
                            onClick={onGoToRegister}
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
                            <UserPlus style={{ width: '16px', height: '16px' }} />
                            <span>Regístrate aquí</span>
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

export default Login;