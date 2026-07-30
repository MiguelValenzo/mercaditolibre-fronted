import React, { useState } from 'react';
import { apiService } from '../../../services/apiService';
import { Save, ArrowLeft, User, Mail, Phone, MapPin, Loader2, AlertCircle, CheckCircle2, ShieldCheck, Users } from 'lucide-react';

const ClienteCrear = ({ navegar }) => {
    const [guardando, setGuardando] = useState(false);
    const [error, setError] = useState('');
    const [exito, setExito] = useState(false);
    
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        direccion: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setExito(false);

        if (!formData.nombre.trim()) {
            setError('El nombre del cliente es obligatorio.');
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

        setGuardando(true);

        try {
            const clienteData = {
                nombre: formData.nombre.trim(),
                email: formData.email.trim(),
                telefono: formData.telefono.trim(),
                direccion: formData.direccion.trim()
            };
            
            console.log('👤 Enviando cliente:', clienteData);
            const response = await apiService.crearCliente(clienteData);
            console.log('👤 Respuesta del servidor:', response);
            
            setExito(true);
            setTimeout(() => {
                navegar('clientes', 'list');
            }, 1400);
        } catch (err) {
            console.error('❌ Error al crear cliente:', err);
            setError('Error al crear el cliente: ' + (err.message || 'Intente de nuevo.'));
        } finally {
            setGuardando(false);
        }
    };

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
                                Nuevo Cliente
                            </h1>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', zIndex: 1, alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.08)', padding: '10px 16px', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <ShieldCheck style={{ width: '20px', height: '20px', color: '#34d399' }} />
                    <span style={{ fontSize: '12px', fontWeight: '600', color: '#e2e8f0' }}>Alta Segura en Sistema</span>
                </div>
            </div>

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
                        fontWeight: '600',
                        boxShadow: '0 4px 12px rgba(239, 68, 68, 0.1)'
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
                        fontWeight: '600',
                        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.1)'
                    }}>
                        <div style={{ background: '#10b981', color: 'white', padding: '8px', borderRadius: '10px', display: 'flex' }}>
                            <CheckCircle2 style={{ width: '18px', height: '18px' }} />
                        </div>
                        <span>¡Cliente registrado exitosamente! Redirigiendo al panel...</span>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '28px', marginBottom: '35px' }}>
                        
                        <div style={{ gridColumn: '1 / -1' }}>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '10px', letterSpacing: '0.5px' }}>
                                Nombre del Cliente <span style={{ color: '#ef4444' }}>*</span>
                            </label>
                            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                <span style={{ position: 'absolute', left: '18px', color: '#818cf8', display: 'flex', pointerEvents: 'none' }}>
                                    <User style={{ width: '20px', height: '20px' }} />
                                </span>
                                <input
                                    type="text"
                                    name="nombre"
                                    required
                                    maxLength={100}
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    placeholder="Ej: Juan Pérez"
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

                        <div>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '10px', letterSpacing: '0.5px' }}>
                                Correo Electrónico <span style={{ color: '#ef4444' }}>*</span>
                            </label>
                            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                <span style={{ position: 'absolute', left: '18px', color: '#818cf8', display: 'flex', pointerEvents: 'none' }}>
                                    <Mail style={{ width: '20px', height: '20px' }} />
                                </span>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="cliente@email.com"
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

                        <div style={{ gridColumn: '1 / -1' }}>
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

                    </div>

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
                                    <span>Guardando Registro...</span>
                                </>
                            ) : (
                                <>
                                    <Save style={{ width: '18px', height: '18px', strokeWidth: 2.5 }} />
                                    <span>Guardar Cliente</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ClienteCrear;