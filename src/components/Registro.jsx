import React, { useState } from 'react';
import { apiService } from '../services/apiService';
import { User, Mail, Lock, Phone, MapPin, Shield, UserPlus, Eye, EyeOff, AlertCircle, CheckCircle, ArrowRight, LogIn } from 'lucide-react';

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

        // Validaciones intactas
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
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
            
            {/* Tarjeta Contenedora Principal */}
            <div style={{
                width: '100%',
                maxWidth: '980px',
                backgroundColor: '#ffffff',
                borderRadius: '24px',
                boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.08), 0 0 1px 1px rgba(0, 0, 0, 0.05)',
                border: '1px solid #e2e8f0',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap'
            }}>
                
                {/* Lateral Izquierdo - Ilustración & Marca */}
                <div style={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 50%, #1e40af 100%)',
                    color: '#ffffff',
                    padding: '40px 32px',
                    width: '38%',
                    minWidth: '280px',
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    {/* Círculo de luz decorativo */}
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
                            <UserPlus size={16} color="#ffffff" />
                            <span>Nueva Cuenta</span>
                        </div>
                        
                        <h2 style={{
                            fontSize: '28px',
                            fontWeight: '800',
                            color: '#ffffff',
                            margin: '0 0 12px 0',
                            lineHeight: '1.2',
                            letterSpacing: '-0.02em'
                        }}>
                            Únete a MercaditoLibre
                        </h2>
                        
                        <p style={{
                            fontSize: '14px',
                            color: '#dbeafe',
                            margin: 0,
                            lineHeight: '1.6'
                        }}>
                            Crea tu usuario para empezar a comprar productos, guardar direcciones de entrega y gestionar tus órdenes.
                        </p>
                    </div>

                    <div style={{ zIndex: 2, marginTop: '40px' }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '12px 16px',
                            borderRadius: '16px',
                            backgroundColor: 'rgba(255, 255, 255, 0.12)',
                            backdropFilter: 'blur(8px)'
                        }}>
                            <Shield size={20} color="#ffffff" />
                            <div>
                                <p style={{ fontSize: '12px', fontWeight: '700', color: '#ffffff', margin: 0 }}>Protección de Datos</p>
                                <p style={{ fontSize: '11px', color: '#bfdbfe', margin: 0 }}>Tus datos están protegidos</p>
                            </div>
                        </div>
                    </div>

                    {/* Watermark de fondo */}
                    <UserPlus size={260} color="#ffffff" style={{ position: 'absolute', right: '-60px', bottom: '-60px', opacity: 0.08, pointerEvents: 'none' }} />
                </div>

                {/* Lado Derecho - Formulario */}
                <div style={{
                    backgroundColor: '#ffffff',
                    padding: '36px 32px',
                    width: '62%',
                    flex: '1',
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}>
                    
                    <div style={{ marginBottom: '20px' }}>
                        <h3 style={{
                            fontSize: '22px',
                            fontWeight: '800',
                            color: '#0f172a',
                            margin: '0 0 4px 0',
                            letterSpacing: '-0.01em'
                        }}>
                            Crear una Cuenta
                        </h3>
                        <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
                            Completa los campos obligatorios para registrarte
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        
                        {/* Mensaje de Error */}
                        {error && (
                            <div style={{
                                backgroundColor: '#fef2f2',
                                border: '1px solid #fee2e2',
                                color: '#991b1b',
                                padding: '10px 14px',
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

                        {/* Mensaje de Éxito */}
                        {success && (
                            <div style={{
                                backgroundColor: '#f0fdf4',
                                border: '1px solid #dcfce7',
                                color: '#166534',
                                padding: '10px 14px',
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

                        {/* Rol Selector */}
                        <div>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '4px' }}>
                                Rol de Usuario
                            </label>
                            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                <Shield size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', pointerEvents: 'none', zIndex: 1 }} />
                                <select
                                    value={rol}
                                    onChange={(e) => setRol(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '10px 14px 10px 42px',
                                        borderRadius: '10px',
                                        border: '1.5px solid #cbd5e1',
                                        backgroundColor: '#f8fafc',
                                        color: '#0f172a',
                                        fontSize: '13px',
                                        outline: 'none',
                                        boxSizing: 'border-box'
                                    }}
                                >
                                    <option value="ROLE_CLIENTE">Cliente (Comprador)</option>
                                    <option value="ROLE_ADMIN">Administrador</option>
                                </select>
                            </div>
                            <p style={{ fontSize: '11px', color: '#94a3b8', margin: '4px 0 0 2px' }}>
                                {rol === 'ROLE_CLIENTE' 
                                    ? 'Podrás comprar productos y gestionar tu perfil.' 
                                    : 'Tendrás acceso completo al panel de administración.'}
                            </p>
                        </div>

                        {/* Fila Doble: Nombre Completo y Usuario */}
                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                            {/* Nombre Completo */}
                            <div style={{ flex: '1', minWidth: '200px' }}>
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '4px' }}>
                                    Nombre Completo
                                </label>
                                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                    <User size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', pointerEvents: 'none', zIndex: 1 }} />
                                    <input
                                        type="text"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                        placeholder="Tu nombre completo"
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '10px 14px 10px 42px',
                                            borderRadius: '10px',
                                            border: '1.5px solid #cbd5e1',
                                            backgroundColor: '#f8fafc',
                                            color: '#0f172a',
                                            fontSize: '13px',
                                            outline: 'none',
                                            boxSizing: 'border-box'
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Username */}
                            <div style={{ flex: '1', minWidth: '200px' }}>
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '4px' }}>
                                    Nombre de Usuario
                                </label>
                                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                    <User size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', pointerEvents: 'none', zIndex: 1 }} />
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="usuario123"
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '10px 14px 10px 42px',
                                            borderRadius: '10px',
                                            border: '1.5px solid #cbd5e1',
                                            backgroundColor: '#f8fafc',
                                            color: '#0f172a',
                                            fontSize: '13px',
                                            outline: 'none',
                                            boxSizing: 'border-box'
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Fila Doble: Email y Contraseña */}
                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                            {/* Email */}
                            <div style={{ flex: '1', minWidth: '200px' }}>
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '4px' }}>
                                    Correo Electrónico
                                </label>
                                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                    <Mail size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', pointerEvents: 'none', zIndex: 1 }} />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="tucorreo@ejemplo.com"
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '10px 14px 10px 42px',
                                            borderRadius: '10px',
                                            border: '1.5px solid #cbd5e1',
                                            backgroundColor: '#f8fafc',
                                            color: '#0f172a',
                                            fontSize: '13px',
                                            outline: 'none',
                                            boxSizing: 'border-box'
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Contraseña */}
                            <div style={{ flex: '1', minWidth: '200px' }}>
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '4px' }}>
                                    Contraseña
                                </label>
                                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                    <Lock size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', pointerEvents: 'none', zIndex: 1 }} />
                                    <input
                                        type={mostrarPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Mínimo 6 caracteres"
                                        required
                                        minLength="6"
                                        style={{
                                            width: '100%',
                                            padding: '10px 38px 10px 42px',
                                            borderRadius: '10px',
                                            border: '1.5px solid #cbd5e1',
                                            backgroundColor: '#f8fafc',
                                            color: '#0f172a',
                                            fontSize: '13px',
                                            outline: 'none',
                                            boxSizing: 'border-box'
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setMostrarPassword(!mostrarPassword)}
                                        style={{
                                            position: 'absolute',
                                            right: '10px',
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            padding: '2px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            color: '#64748b'
                                        }}
                                    >
                                        {mostrarPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Fila Doble: Teléfono y Dirección */}
                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                            {/* Teléfono */}
                            <div style={{ flex: '1', minWidth: '200px' }}>
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '4px' }}>
                                    Teléfono
                                </label>
                                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                    <Phone size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', pointerEvents: 'none', zIndex: 1 }} />
                                    <input
                                        type="tel"
                                        value={telefono}
                                        onChange={(e) => setTelefono(e.target.value)}
                                        placeholder="55 1234 5678"
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '10px 14px 10px 42px',
                                            borderRadius: '10px',
                                            border: '1.5px solid #cbd5e1',
                                            backgroundColor: '#f8fafc',
                                            color: '#0f172a',
                                            fontSize: '13px',
                                            outline: 'none',
                                            boxSizing: 'border-box'
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Dirección */}
                            <div style={{ flex: '1', minWidth: '200px' }}>
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '4px' }}>
                                    Dirección
                                </label>
                                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                    <MapPin size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', pointerEvents: 'none', zIndex: 1 }} />
                                    <input
                                        type="text"
                                        value={direccion}
                                        onChange={(e) => setDireccion(e.target.value)}
                                        placeholder="Calle, número, colonia"
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '10px 14px 10px 42px',
                                            borderRadius: '10px',
                                            border: '1.5px solid #cbd5e1',
                                            backgroundColor: '#f8fafc',
                                            color: '#0f172a',
                                            fontSize: '13px',
                                            outline: 'none',
                                            boxSizing: 'border-box'
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
                                marginTop: '10px',
                                padding: '12px 20px',
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
                                justifyContent: 'center',
                                gap: '8px',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            {loading ? (
                                <span style={{ color: '#ffffff' }}>Creando cuenta...</span>
                            ) : (
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%' }}>
                                    <UserPlus size={18} color="#ffffff" />
                                    <span style={{ color: '#ffffff' }}>Crear Cuenta</span>
                                </div>
                            )}
                        </button>

                    </form>

                    {/* Enlace hacia Login */}
                    <div style={{
                        marginTop: '20px',
                        paddingTop: '16px',
                        borderTop: '1px solid #f1f5f9',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                    }}>
                        <span style={{ fontSize: '13px', color: '#64748b' }}>¿Ya tienes cuenta?</span>
                        <button
                            onClick={onGoToLogin}
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
                            <LogIn size={15} color="#2563eb" />
                            <span>Inicia Sesión</span>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Registro;