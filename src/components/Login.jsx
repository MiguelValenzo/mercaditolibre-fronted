import React, { useState } from 'react';
import { apiService } from '../services/apiService';
import { Mail, Lock, Eye, EyeOff, LogIn, AlertCircle, CheckCircle, ShieldCheck, ArrowRight, UserPlus } from 'lucide-react';

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
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
            
            {/* Tarjeta Principal */}
            <div style={{
                width: '100%',
                maxWidth: '900px',
                backgroundColor: '#ffffff',
                borderRadius: '24px',
                boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.08), 0 0 1px 1px rgba(0, 0, 0, 0.05)',
                border: '1px solid #e2e8f0',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap'
            }}>
                
                {/* Lado Izquierdo - Ilustración & Marca */}
                <div style={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 50%, #1e40af 100%)',
                    color: '#ffffff',
                    padding: '40px 32px',
                    width: '40%',
                    minWidth: '280px',
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    {/* Círculos de luz decorativos */}
                    <div style={{
                        position: 'absolute',
                        top: '-50px',
                        left: '-50px',
                        width: '200px',
                        height: '200px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        filter: 'blur(30px)',
                        pointerEvents: 'none'
                    }} />

                    <div style={{ zIndex: 2 }}>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            backdropFilter: 'blur(8px)',
                            color: '#ffffff',
                            padding: '6px 14px',
                            borderRadius: '30px',
                            fontSize: '12px',
                            fontWeight: '600',
                            marginBottom: '28px',
                            border: '1px solid rgba(255, 255, 255, 0.3)'
                        }}>
                            <ShieldCheck size={16} color="#ffffff" />
                            <span>Acceso Seguro SSL</span>
                        </div>
                        
                        <h2 style={{
                            fontSize: '28px',
                            fontWeight: '800',
                            color: '#ffffff',
                            margin: '0 0 12px 0',
                            lineHeight: '1.2',
                            letterSpacing: '-0.02em'
                        }}>
                            MercaditoLibre
                        </h2>
                        
                        <p style={{
                            fontSize: '14px',
                            color: '#dbeafe',
                            margin: 0,
                            lineHeight: '1.6'
                        }}>
                            Gestiona tus pedidos, explora el catálogo completo y sincroniza tus compras en un solo lugar.
                        </p>
                    </div>

                    <div style={{ zIndex: 2, marginTop: '40px' }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '12px',
                            borderRadius: '16px',
                            backgroundColor: 'rgba(255, 255, 255, 0.12)',
                            backdropFilter: 'blur(8px)'
                        }}>
                            <LogIn size={20} color="#ffffff" />
                            <div>
                                <p style={{ fontSize: '12px', fontWeight: '700', color: '#ffffff', margin: 0 }}>Portal Clientes</p>
                                <p style={{ fontSize: '11px', color: '#bfdbfe', margin: 0 }}>v2.4 Autenticación</p>
                            </div>
                        </div>
                    </div>

                    {/* Watermark de fondo */}
                    <LogIn size={260} color="#ffffff" style={{ position: 'absolute', right: '-60px', bottom: '-60px', opacity: 0.08, pointerEvents: 'none' }} />
                </div>

                {/* Lado Derecho - Formulario */}
                <div style={{
                    backgroundColor: '#ffffff',
                    padding: '40px 36px',
                    width: '60%',
                    flex: '1',
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}>
                    
                    <div style={{ marginBottom: '28px' }}>
                        <h3 style={{
                            fontSize: '22px',
                            fontWeight: '800',
                            color: '#0f172a',
                            margin: '0 0 6px 0',
                            letterSpacing: '-0.01em'
                        }}>
                            ¡Hola de nuevo!
                        </h3>
                        <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
                            Ingresa con tus credenciales de correo electrónico.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                        
                        {/* Banner de Error */}
                        {error && (
                            <div style={{
                                backgroundColor: '#fef2f2',
                                border: '1px solid #fee2e2',
                                color: '#991b1b',
                                padding: '12px 16px',
                                borderRadius: '12px',
                                fontSize: '13px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px'
                            }}>
                                <AlertCircle size={18} color="#ef4444" style={{ flexShrink: 0 }} />
                                <span style={{ color: '#991b1b', fontWeight: '500' }}>{error}</span>
                            </div>
                        )}

                        {/* Banner de Éxito */}
                        {success && (
                            <div style={{
                                backgroundColor: '#f0fdf4',
                                border: '1px solid #dcfce7',
                                color: '#166534',
                                padding: '12px 16px',
                                borderRadius: '12px',
                                fontSize: '13px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px'
                            }}>
                                <CheckCircle size={18} color="#22c55e" style={{ flexShrink: 0 }} />
                                <span style={{ color: '#166534', fontWeight: '500' }}>{success}</span>
                            </div>
                        )}

                        {/* Campo Correo */}
                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '12px',
                                fontWeight: '700',
                                color: '#334155',
                                marginBottom: '6px'
                            }}>
                                Correo Electrónico
                            </label>
                            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                <Mail size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', pointerEvents: 'none', zIndex: 1 }} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="nombre@correo.com"
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '12px 14px 12px 42px',
                                        borderRadius: '12px',
                                        border: '1.5px solid #cbd5e1',
                                        backgroundColor: '#f8fafc',
                                        color: '#0f172a',
                                        fontSize: '14px',
                                        outline: 'none',
                                        boxSizing: 'border-box',
                                        transition: 'all 0.2s ease'
                                    }}
                                />
                            </div>
                        </div>

                        {/* Campo Contraseña */}
                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '12px',
                                fontWeight: '700',
                                color: '#334155',
                                marginBottom: '6px'
                            }}>
                                Contraseña
                            </label>
                            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                <Lock size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', pointerEvents: 'none', zIndex: 1 }} />
                                <input
                                    type={mostrarPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '12px 42px 12px 42px',
                                        borderRadius: '12px',
                                        border: '1.5px solid #cbd5e1',
                                        backgroundColor: '#f8fafc',
                                        color: '#0f172a',
                                        fontSize: '14px',
                                        outline: 'none',
                                        boxSizing: 'border-box',
                                        transition: 'all 0.2s ease'
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
                                        padding: '4px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        color: '#64748b',
                                        borderRadius: '6px'
                                    }}
                                >
                                    {mostrarPassword ? <EyeOff size={18} color="#64748b" /> : <Eye size={18} color="#64748b" />}
                                </button>
                            </div>
                        </div>

                        {/* Botón Principal */}
                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                width: '100%',
                                marginTop: '10px',
                                padding: '14px 20px',
                                borderRadius: '12px',
                                border: 'none',
                                background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                                color: '#ffffff',
                                fontSize: '14px',
                                fontWeight: '700',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                opacity: loading ? 0.7 : 1,
                                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyCenter: 'center',
                                gap: '8px',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            {loading ? (
                                <span style={{ color: '#ffffff' }}>Iniciando sesión...</span>
                            ) : (
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%' }}>
                                    <span style={{ color: '#ffffff' }}>Iniciar Sesión</span>
                                    <ArrowRight size={18} color="#ffffff" />
                                </div>
                            )}
                        </button>
                    </form>

                    {/* Separador y Link de Registro */}
                    <div style={{
                        marginTop: '28px',
                        paddingTop: '20px',
                        borderTop: '1px solid #f1f5f9',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                    }}>
                        <span style={{ fontSize: '13px', color: '#64748b' }}>¿No tienes una cuenta?</span>
                        <button
                            onClick={onGoToRegister}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: '#2563eb',
                                fontWeight: '700',
                                cursor: 'pointer',
                                fontSize: '13px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                padding: '2px 6px',
                                borderRadius: '6px'
                            }}
                        >
                            <UserPlus size={15} color="#2563eb" />
                            <span>Regístrate aquí</span>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Login;