import React from 'react';
import { Bell, Search, ShieldAlert, Sparkles, User, ShieldCheck, Settings } from 'lucide-react';

const AdminHeader = () => {
    return (
        <header style={{
            position: 'sticky',
            top: 0,
            zIndex: 20,
            background: 'rgba(15, 23, 42, 0.95)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid rgba(51, 65, 85, 0.5)',
            padding: '16px 32px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                maxWidth: '1320px',
                margin: '0 auto'
            }}>
                
                {/* BARRA DE BÚSQUEDA */}
                <div style={{
                    flex: 1,
                    maxWidth: '480px'
                }}>
                    <div style={{ position: 'relative' }}>
                        <span style={{
                            position: 'absolute',
                            left: '14px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: '#64748b',
                            display: 'flex',
                            pointerEvents: 'none'
                        }}>
                            <Search style={{ width: '18px', height: '18px' }} />
                        </span>
                        <input
                            type="text"
                            placeholder="Buscar en el panel general..."
                            style={{
                                width: '100%',
                                padding: '11px 16px 11px 44px',
                                borderRadius: '14px',
                                border: '1.5px solid #334155',
                                background: 'rgba(51, 65, 85, 0.3)',
                                fontSize: '13px',
                                fontWeight: '500',
                                color: '#f1f5f9',
                                outline: 'none',
                                transition: 'all 0.2s ease',
                                boxSizing: 'border-box'
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

                {/* ACCIONES E INFORMACIÓN DE USUARIO */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px'
                }}>
                    
                    {/* BOTÓN DE NOTIFICACIONES */}
                    <button 
                        title="Notificaciones"
                        style={{
                            position: 'relative',
                            padding: '10px',
                            background: 'rgba(51, 65, 85, 0.3)',
                            border: '1px solid rgba(51, 65, 85, 0.4)',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            color: '#94a3b8',
                            transition: 'all 0.2s ease',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(79, 70, 229, 0.2)';
                            e.currentTarget.style.color = '#818cf8';
                            e.currentTarget.style.borderColor = 'rgba(79, 70, 229, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(51, 65, 85, 0.3)';
                            e.currentTarget.style.color = '#94a3b8';
                            e.currentTarget.style.borderColor = 'rgba(51, 65, 85, 0.4)';
                        }}
                    >
                        <Bell style={{ width: '20px', height: '20px' }} />
                        <span style={{
                            position: 'absolute',
                            top: '6px',
                            right: '6px',
                            width: '8px',
                            height: '8px',
                            background: '#ef4444',
                            borderRadius: '50%',
                            border: '2px solid #0f172a',
                            animation: 'pulse 2s ease-in-out infinite'
                        }}></span>
                    </button>

                    <div style={{
                        width: '1px',
                        height: '32px',
                        background: 'rgba(51, 65, 85, 0.4)'
                    }}></div>

                    {/* PERFIL DE USUARIO PERSONALIZADO */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px',
                        paddingLeft: '4px'
                    }}>
                        <div style={{
                            position: 'relative',
                            width: '44px',
                            height: '44px',
                            background: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)',
                            borderRadius: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: '900',
                            fontSize: '15px',
                            boxShadow: '0 8px 16px -4px rgba(79, 70, 229, 0.3)',
                            flexShrink: 0
                        }}>
                            M
                            <span style={{
                                position: 'absolute',
                                bottom: '-2px',
                                right: '-2px',
                                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                color: 'white',
                                padding: '2px',
                                borderRadius: '50%',
                                border: '2px solid #0f172a',
                                display: 'flex'
                            }}>
                                <ShieldCheck style={{ width: '10px', height: '10px' }} />
                            </span>
                        </div>
                        <div style={{
                            display: 'none',
                            textAlign: 'left',
                            '@media (min-width: 640px)': {
                                display: 'block'
                            }
                        }}>
                            <p style={{
                                fontSize: '13px',
                                fontWeight: '900',
                                color: '#f1f5f9',
                                margin: 0,
                                letterSpacing: '-0.02em',
                                lineHeight: '1.2'
                            }}>
                                Miguel Ángel Valenzo Negrón
                            </p>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                marginTop: '2px'
                            }}>
                                <span style={{
                                    display: 'inline-block',
                                    width: '6px',
                                    height: '6px',
                                    borderRadius: '50%',
                                    background: '#10b981'
                                }}></span>
                                <p style={{
                                    fontSize: '10px',
                                    fontWeight: '800',
                                    color: '#94a3b8',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px',
                                    margin: 0
                                }}>
                                    Ing. en Sistemas / Admin
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.6; transform: scale(0.9); }
                }
            `}</style>
        </header>
    );
};

export default AdminHeader;