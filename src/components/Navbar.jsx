import React, { useState } from 'react';
import { apiService } from '../services/apiService';
import { 
    ShoppingCart, LogOut, User, LayoutDashboard, 
    ShoppingBag, Menu, X, ShieldCheck, LogIn, UserPlus, PackageCheck,
    Sparkles, Store, UserCircle
} from 'lucide-react';

export const Navbar = ({ vistaActual, setVistaActual, user, onLogout, cartCount, openCart }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        apiService.logout();
        onLogout();
        setVistaActual('catalogo');
        setMobileMenuOpen(false);
    };

    const isClient = user && (user.rol === 'CLIENTE' || user.rol === 'ROLE_CLIENTE');
    const isAdmin = user && (user.rol === 'ADMIN' || user.rol === 'ROLE_ADMIN');

    return (
        <header style={{
            position: 'sticky',
            top: 0,
            zIndex: 50,
            background: 'rgba(15, 23, 42, 0.95)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid rgba(51, 65, 85, 0.5)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
            transition: 'all 0.2s ease',
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
        }}>
            <div style={{
                maxWidth: '1320px',
                margin: '0 auto',
                padding: '0 24px',
                boxSizing: 'border-box'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: '76px'
                }}>
                    
                    {/* 1. BRANDING / LOGO */}
                    <div 
                        onClick={() => setVistaActual('catalogo')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            cursor: 'pointer',
                            userSelect: 'none'
                        }}
                    >
                        <div style={{
                            width: '44px',
                            height: '44px',
                            background: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)',
                            borderRadius: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            boxShadow: '0 8px 16px -4px rgba(79, 70, 229, 0.3)',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                            e.currentTarget.style.boxShadow = '0 12px 24px -4px rgba(79, 70, 229, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = '0 8px 16px -4px rgba(79, 70, 229, 0.3)';
                        }}>
                            <ShoppingBag style={{ width: '20px', height: '20px' }} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{
                                fontSize: '20px',
                                fontWeight: '900',
                                color: '#f1f5f9',
                                letterSpacing: '-0.02em',
                                lineHeight: '1.2'
                            }}>
                                Mercadito<span style={{ color: '#818cf8' }}>Libre</span>
                            </span>
                            <span style={{
                                fontSize: '9px',
                                fontWeight: '800',
                                color: '#64748b',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                marginTop: '1px'
                            }}>
                                Tienda Oficial
                            </span>
                        </div>
                    </div>

                    {/* 2. NAVEGACIÓN DESKTOP */}
                    <nav style={{
                        display: 'none',
                        alignItems: 'center',
                        gap: '8px',
                        '@media (min-width: 768px)': {
                            display: 'flex'
                        }
                    }}>
                        <button
                            onClick={() => setVistaActual('catalogo')}
                            style={{
                                padding: '10px 20px',
                                borderRadius: '30px',
                                fontSize: '13px',
                                fontWeight: '700',
                                transition: 'all 0.2s ease',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                border: 'none',
                                cursor: 'pointer',
                                background: vistaActual === 'catalogo' 
                                    ? 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)'
                                    : 'rgba(51, 65, 85, 0.3)',
                                color: vistaActual === 'catalogo' 
                                    ? '#ffffff' 
                                    : '#94a3b8',
                                boxShadow: vistaActual === 'catalogo' 
                                    ? '0 8px 16px -4px rgba(79, 70, 229, 0.3)'
                                    : 'none'
                            }}
                            onMouseEnter={(e) => {
                                if (vistaActual !== 'catalogo') {
                                    e.currentTarget.style.background = 'rgba(51, 65, 85, 0.5)';
                                    e.currentTarget.style.color = '#f1f5f9';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (vistaActual !== 'catalogo') {
                                    e.currentTarget.style.background = 'rgba(51, 65, 85, 0.3)';
                                    e.currentTarget.style.color = '#94a3b8';
                                }
                            }}
                        >
                            <ShoppingBag style={{ width: '16px', height: '16px' }} />
                            Catálogo
                        </button>

                        {isClient && (
                            <>
                                <button
                                    onClick={() => setVistaActual('miscompras')}
                                    style={{
                                        padding: '10px 20px',
                                        borderRadius: '30px',
                                        fontSize: '13px',
                                        fontWeight: '700',
                                        transition: 'all 0.2s ease',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        border: 'none',
                                        cursor: 'pointer',
                                        background: vistaActual === 'miscompras' 
                                            ? 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)'
                                            : 'rgba(51, 65, 85, 0.3)',
                                        color: vistaActual === 'miscompras' 
                                            ? '#ffffff' 
                                            : '#94a3b8',
                                        boxShadow: vistaActual === 'miscompras' 
                                            ? '0 8px 16px -4px rgba(79, 70, 229, 0.3)'
                                            : 'none'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (vistaActual !== 'miscompras') {
                                            e.currentTarget.style.background = 'rgba(51, 65, 85, 0.5)';
                                            e.currentTarget.style.color = '#f1f5f9';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (vistaActual !== 'miscompras') {
                                            e.currentTarget.style.background = 'rgba(51, 65, 85, 0.3)';
                                            e.currentTarget.style.color = '#94a3b8';
                                        }
                                    }}
                                >
                                    <PackageCheck style={{ width: '16px', height: '16px' }} />
                                    Mis Compras
                                </button>
                                
                                {/* ✅ BOTÓN MI PERFIL - PARA CLIENTES */}
                                <button
                                    onClick={() => setVistaActual('profile')}
                                    style={{
                                        padding: '10px 20px',
                                        borderRadius: '30px',
                                        fontSize: '13px',
                                        fontWeight: '700',
                                        transition: 'all 0.2s ease',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        border: 'none',
                                        cursor: 'pointer',
                                        background: vistaActual === 'profile' 
                                            ? 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)'
                                            : 'rgba(51, 65, 85, 0.3)',
                                        color: vistaActual === 'profile' 
                                            ? '#ffffff' 
                                            : '#94a3b8',
                                        boxShadow: vistaActual === 'profile' 
                                            ? '0 8px 16px -4px rgba(79, 70, 229, 0.3)'
                                            : 'none'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (vistaActual !== 'profile') {
                                            e.currentTarget.style.background = 'rgba(51, 65, 85, 0.5)';
                                            e.currentTarget.style.color = '#f1f5f9';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (vistaActual !== 'profile') {
                                            e.currentTarget.style.background = 'rgba(51, 65, 85, 0.3)';
                                            e.currentTarget.style.color = '#94a3b8';
                                        }
                                    }}
                                >
                                    <UserCircle style={{ width: '16px', height: '16px' }} />
                                    Mi Perfil
                                </button>
                            </>
                        )}

                        {isAdmin && (
                            <>
                                <button
                                    onClick={() => setVistaActual('admin-panel')}
                                    style={{
                                        padding: '10px 20px',
                                        borderRadius: '30px',
                                        fontSize: '13px',
                                        fontWeight: '700',
                                        transition: 'all 0.2s ease',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        border: 'none',
                                        cursor: 'pointer',
                                        background: vistaActual === 'admin-panel' 
                                            ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
                                            : 'rgba(245, 158, 11, 0.15)',
                                        color: vistaActual === 'admin-panel' 
                                            ? '#ffffff' 
                                            : '#fbbf24',
                                        boxShadow: vistaActual === 'admin-panel' 
                                            ? '0 8px 16px -4px rgba(245, 158, 11, 0.3)'
                                            : 'none',
                                        border: vistaActual !== 'admin-panel' 
                                            ? '1px solid rgba(245, 158, 11, 0.2)'
                                            : 'none'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (vistaActual !== 'admin-panel') {
                                            e.currentTarget.style.background = 'rgba(245, 158, 11, 0.25)';
                                            e.currentTarget.style.color = '#fbbf24';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (vistaActual !== 'admin-panel') {
                                            e.currentTarget.style.background = 'rgba(245, 158, 11, 0.15)';
                                            e.currentTarget.style.color = '#fbbf24';
                                        }
                                    }}
                                >
                                    <LayoutDashboard style={{ width: '16px', height: '16px' }} />
                                    Panel Admin
                                </button>
                                
                                {/* ✅ BOTÓN MI PERFIL - TAMBIÉN PARA ADMIN */}
                                <button
                                    onClick={() => setVistaActual('profile')}
                                    style={{
                                        padding: '10px 20px',
                                        borderRadius: '30px',
                                        fontSize: '13px',
                                        fontWeight: '700',
                                        transition: 'all 0.2s ease',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        border: 'none',
                                        cursor: 'pointer',
                                        background: vistaActual === 'profile' 
                                            ? 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)'
                                            : 'rgba(51, 65, 85, 0.3)',
                                        color: vistaActual === 'profile' 
                                            ? '#ffffff' 
                                            : '#94a3b8',
                                        boxShadow: vistaActual === 'profile' 
                                            ? '0 8px 16px -4px rgba(79, 70, 229, 0.3)'
                                            : 'none'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (vistaActual !== 'profile') {
                                            e.currentTarget.style.background = 'rgba(51, 65, 85, 0.5)';
                                            e.currentTarget.style.color = '#f1f5f9';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (vistaActual !== 'profile') {
                                            e.currentTarget.style.background = 'rgba(51, 65, 85, 0.3)';
                                            e.currentTarget.style.color = '#94a3b8';
                                        }
                                    }}
                                >
                                    <UserCircle style={{ width: '16px', height: '16px' }} />
                                    Mi Perfil
                                </button>
                            </>
                        )}
                    </nav>

                    {/* 3. ACCIONES DERECHA */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                    }}>
                        
                        {/* Botón Carrito */}
                        <button
                            onClick={openCart}
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
                            aria-label="Abrir Carrito"
                        >
                            <ShoppingCart style={{ width: '20px', height: '20px' }} />
                            {cartCount > 0 && (
                                <span style={{
                                    position: 'absolute',
                                    top: '-6px',
                                    right: '-6px',
                                    background: '#ef4444',
                                    color: 'white',
                                    fontSize: '10px',
                                    fontWeight: '800',
                                    borderRadius: '50%',
                                    height: '20px',
                                    minWidth: '20px',
                                    padding: '0 5px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '2px solid #0f172a',
                                    boxShadow: '0 2px 8px rgba(239, 68, 68, 0.4)'
                                }}>
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        {/* Estado del Usuario */}
                        {user ? (
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                paddingLeft: '12px',
                                borderLeft: '1px solid rgba(51, 65, 85, 0.4)'
                            }}>
                                {/* Perfil */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    padding: '4px 14px 4px 4px',
                                    background: 'rgba(51, 65, 85, 0.3)',
                                    borderRadius: '30px',
                                    border: '1px solid rgba(51, 65, 85, 0.4)'
                                }}>
                                    <div style={{ position: 'relative' }}>
                                        <div style={{
                                            width: '32px',
                                            height: '32px',
                                            background: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)',
                                            color: 'white',
                                            fontWeight: '900',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '12px',
                                            boxShadow: '0 4px 8px rgba(79, 70, 229, 0.3)'
                                        }}>
                                            {user.nombre ? user.nombre.charAt(0).toUpperCase() : <User style={{ width: '16px', height: '16px' }} />}
                                        </div>
                                        {isAdmin && (
                                            <span style={{
                                                position: 'absolute',
                                                bottom: '-2px',
                                                right: '-2px',
                                                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                                                color: 'white',
                                                padding: '2px',
                                                borderRadius: '50%',
                                                border: '2px solid #0f172a',
                                                display: 'flex'
                                            }}>
                                                <ShieldCheck style={{ width: '10px', height: '10px' }} />
                                            </span>
                                        )}
                                    </div>
                                    <div style={{
                                        display: 'none',
                                        flexDirection: 'column',
                                        textAlign: 'left',
                                        '@media (min-width: 1024px)': {
                                            display: 'flex'
                                        }
                                    }}>
                                        <span style={{
                                            fontSize: '12px',
                                            fontWeight: '900',
                                            color: '#f1f5f9',
                                            lineHeight: '1.2'
                                        }}>
                                            {user.nombre || 'Usuario'}
                                        </span>
                                        <span style={{
                                            fontSize: '9px',
                                            fontWeight: '700',
                                            color: '#818cf8',
                                            textTransform: 'capitalize'
                                        }}>
                                            {isAdmin ? 'Administrador' : 'Cliente'}
                                        </span>
                                    </div>
                                </div>

                                {/* Botón Salir */}
                                <button
                                    onClick={handleLogout}
                                    title="Cerrar sesión"
                                    style={{
                                        padding: '8px',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: '#64748b',
                                        borderRadius: '8px',
                                        transition: 'all 0.2s ease',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color = '#f87171';
                                        e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color = '#64748b';
                                        e.currentTarget.style.background = 'none';
                                    }}
                                >
                                    <LogOut style={{ width: '18px', height: '18px' }} />
                                </button>
                            </div>
                        ) : (
                            /* Botones Invitado */
                            <div style={{
                                display: 'none',
                                alignItems: 'center',
                                gap: '10px',
                                '@media (min-width: 640px)': {
                                    display: 'flex'
                                }
                            }}>
                                <button
                                    onClick={() => setVistaActual('login')}
                                    style={{
                                        padding: '10px 18px',
                                        fontSize: '13px',
                                        fontWeight: '700',
                                        color: '#94a3b8',
                                        background: 'rgba(51, 65, 85, 0.3)',
                                        border: '1px solid rgba(51, 65, 85, 0.4)',
                                        borderRadius: '30px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
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
                                    <LogIn style={{ width: '16px', height: '16px' }} />
                                    Iniciar Sesión
                                </button>
                                <button
                                    onClick={() => setVistaActual('register')}
                                    style={{
                                        padding: '10px 20px',
                                        fontSize: '13px',
                                        fontWeight: '700',
                                        color: '#ffffff',
                                        background: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)',
                                        border: 'none',
                                        borderRadius: '30px',
                                        cursor: 'pointer',
                                        boxShadow: '0 8px 16px -4px rgba(79, 70, 229, 0.4)',
                                        transition: 'all 0.2s ease',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                        e.currentTarget.style.boxShadow = '0 12px 24px -4px rgba(79, 70, 229, 0.5)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 8px 16px -4px rgba(79, 70, 229, 0.4)';
                                    }}
                                >
                                    <UserPlus style={{ width: '16px', height: '16px' }} />
                                    Registrarse
                                </button>
                            </div>
                        )}

                        {/* Menú Hamburguesa Móvil */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            style={{
                                display: 'flex',
                                padding: '10px',
                                background: 'none',
                                border: '1px solid rgba(51, 65, 85, 0.4)',
                                borderRadius: '10px',
                                cursor: 'pointer',
                                color: '#94a3b8',
                                transition: 'all 0.2s ease',
                                '@media (min-width: 768px)': {
                                    display: 'none'
                                }
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(51, 65, 85, 0.3)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'none';
                            }}
                            aria-label="Menú"
                        >
                            {mobileMenuOpen ? 
                                <X style={{ width: '20px', height: '20px' }} /> : 
                                <Menu style={{ width: '20px', height: '20px' }} />
                            }
                        </button>
                    </div>
                </div>

                {/* 4. MENÚ MÓVIL */}
                {mobileMenuOpen && (
                    <div style={{
                        padding: '16px 0',
                        borderTop: '1px solid rgba(51, 65, 85, 0.4)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        background: '#0f172a'
                    }}>
                        {user && (
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '12px 16px',
                                marginBottom: '8px',
                                background: 'rgba(51, 65, 85, 0.3)',
                                borderRadius: '14px',
                                border: '1px solid rgba(51, 65, 85, 0.4)'
                            }}>
                                <div style={{
                                    width: '36px',
                                    height: '36px',
                                    background: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)',
                                    color: 'white',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: '900',
                                    fontSize: '14px'
                                }}>
                                    {user.nombre ? user.nombre.charAt(0).toUpperCase() : <User style={{ width: '16px', height: '16px' }} />}
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ fontSize: '14px', fontWeight: '800', color: '#f1f5f9' }}>
                                        {user.nombre || 'Usuario'}
                                    </span>
                                    <span style={{ fontSize: '11px', fontWeight: '700', color: '#818cf8', textTransform: 'capitalize' }}>
                                        {user.rol || 'Cliente'}
                                    </span>
                                </div>
                            </div>
                        )}

                        <button
                            onClick={() => { setVistaActual('catalogo'); setMobileMenuOpen(false); }}
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                borderRadius: '12px',
                                fontSize: '14px',
                                fontWeight: '700',
                                textAlign: 'left',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                border: 'none',
                                cursor: 'pointer',
                                background: vistaActual === 'catalogo' 
                                    ? 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)'
                                    : 'transparent',
                                color: vistaActual === 'catalogo' 
                                    ? '#ffffff' 
                                    : '#94a3b8',
                                boxShadow: vistaActual === 'catalogo' 
                                    ? '0 4px 12px rgba(79, 70, 229, 0.3)'
                                    : 'none',
                                transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                                if (vistaActual !== 'catalogo') {
                                    e.currentTarget.style.background = 'rgba(51, 65, 85, 0.3)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (vistaActual !== 'catalogo') {
                                    e.currentTarget.style.background = 'transparent';
                                }
                            }}
                        >
                            <ShoppingBag style={{ width: '18px', height: '18px' }} /> Catálogo
                        </button>

                        {isClient && (
                            <>
                                <button
                                    onClick={() => { setVistaActual('miscompras'); setMobileMenuOpen(false); }}
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        borderRadius: '12px',
                                        fontSize: '14px',
                                        fontWeight: '700',
                                        textAlign: 'left',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        border: 'none',
                                        cursor: 'pointer',
                                        background: vistaActual === 'miscompras' 
                                            ? 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)'
                                            : 'transparent',
                                        color: vistaActual === 'miscompras' 
                                            ? '#ffffff' 
                                            : '#94a3b8',
                                        boxShadow: vistaActual === 'miscompras' 
                                            ? '0 4px 12px rgba(79, 70, 229, 0.3)'
                                            : 'none',
                                        transition: 'all 0.2s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (vistaActual !== 'miscompras') {
                                            e.currentTarget.style.background = 'rgba(51, 65, 85, 0.3)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (vistaActual !== 'miscompras') {
                                            e.currentTarget.style.background = 'transparent';
                                        }
                                    }}
                                >
                                    <PackageCheck style={{ width: '18px', height: '18px' }} /> Mis Compras
                                </button>
                                
                                {/* ✅ BOTÓN MI PERFIL EN MENÚ MÓVIL */}
                                <button
                                    onClick={() => { setVistaActual('profile'); setMobileMenuOpen(false); }}
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        borderRadius: '12px',
                                        fontSize: '14px',
                                        fontWeight: '700',
                                        textAlign: 'left',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        border: 'none',
                                        cursor: 'pointer',
                                        background: vistaActual === 'profile' 
                                            ? 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)'
                                            : 'transparent',
                                        color: vistaActual === 'profile' 
                                            ? '#ffffff' 
                                            : '#94a3b8',
                                        boxShadow: vistaActual === 'profile' 
                                            ? '0 4px 12px rgba(79, 70, 229, 0.3)'
                                            : 'none',
                                        transition: 'all 0.2s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (vistaActual !== 'profile') {
                                            e.currentTarget.style.background = 'rgba(51, 65, 85, 0.3)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (vistaActual !== 'profile') {
                                            e.currentTarget.style.background = 'transparent';
                                        }
                                    }}
                                >
                                    <UserCircle style={{ width: '18px', height: '18px' }} /> Mi Perfil
                                </button>
                            </>
                        )}

                        {isAdmin && (
                            <>
                                <button
                                    onClick={() => { setVistaActual('admin-panel'); setMobileMenuOpen(false); }}
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        borderRadius: '12px',
                                        fontSize: '14px',
                                        fontWeight: '700',
                                        textAlign: 'left',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        border: 'none',
                                        cursor: 'pointer',
                                        background: vistaActual === 'admin-panel' 
                                            ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
                                            : 'rgba(245, 158, 11, 0.1)',
                                        color: vistaActual === 'admin-panel' 
                                            ? '#ffffff' 
                                            : '#fbbf24',
                                        boxShadow: vistaActual === 'admin-panel' 
                                            ? '0 4px 12px rgba(245, 158, 11, 0.3)'
                                            : 'none',
                                        transition: 'all 0.2s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (vistaActual !== 'admin-panel') {
                                            e.currentTarget.style.background = 'rgba(245, 158, 11, 0.2)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (vistaActual !== 'admin-panel') {
                                            e.currentTarget.style.background = 'rgba(245, 158, 11, 0.1)';
                                        }
                                    }}
                                >
                                    <LayoutDashboard style={{ width: '18px', height: '18px' }} /> Panel Admin
                                </button>
                                
                                {/* ✅ BOTÓN MI PERFIL PARA ADMIN EN MENÚ MÓVIL */}
                                <button
                                    onClick={() => { setVistaActual('profile'); setMobileMenuOpen(false); }}
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        borderRadius: '12px',
                                        fontSize: '14px',
                                        fontWeight: '700',
                                        textAlign: 'left',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        border: 'none',
                                        cursor: 'pointer',
                                        background: vistaActual === 'profile' 
                                            ? 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)'
                                            : 'transparent',
                                        color: vistaActual === 'profile' 
                                            ? '#ffffff' 
                                            : '#94a3b8',
                                        boxShadow: vistaActual === 'profile' 
                                            ? '0 4px 12px rgba(79, 70, 229, 0.3)'
                                            : 'none',
                                        transition: 'all 0.2s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (vistaActual !== 'profile') {
                                            e.currentTarget.style.background = 'rgba(51, 65, 85, 0.3)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (vistaActual !== 'profile') {
                                            e.currentTarget.style.background = 'transparent';
                                        }
                                    }}
                                >
                                    <UserCircle style={{ width: '18px', height: '18px' }} /> Mi Perfil
                                </button>
                            </>
                        )}

                        {!user ? (
                            <div style={{
                                paddingTop: '12px',
                                borderTop: '1px solid rgba(51, 65, 85, 0.4)',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '8px'
                            }}>
                                <button
                                    onClick={() => { setVistaActual('login'); setMobileMenuOpen(false); }}
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        borderRadius: '12px',
                                        fontSize: '14px',
                                        fontWeight: '700',
                                        textAlign: 'left',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        border: 'none',
                                        cursor: 'pointer',
                                        background: 'rgba(51, 65, 85, 0.3)',
                                        color: '#94a3b8',
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
                                    <LogIn style={{ width: '18px', height: '18px' }} /> Iniciar Sesión
                                </button>
                                <button
                                    onClick={() => { setVistaActual('register'); setMobileMenuOpen(false); }}
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        borderRadius: '12px',
                                        fontSize: '14px',
                                        fontWeight: '700',
                                        textAlign: 'center',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '10px',
                                        border: 'none',
                                        cursor: 'pointer',
                                        background: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)',
                                        color: '#ffffff',
                                        boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)',
                                        transition: 'all 0.2s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-1px)';
                                        e.currentTarget.style.boxShadow = '0 8px 20px rgba(79, 70, 229, 0.4)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(79, 70, 229, 0.3)';
                                    }}
                                >
                                    <UserPlus style={{ width: '18px', height: '18px' }} /> Registrarse
                                </button>
                            </div>
                        ) : (
                            <div style={{ paddingTop: '12px', borderTop: '1px solid rgba(51, 65, 85, 0.4)' }}>
                                <button
                                    onClick={handleLogout}
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        borderRadius: '12px',
                                        fontSize: '14px',
                                        fontWeight: '700',
                                        textAlign: 'left',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: '#f87171',
                                        background: 'none',
                                        transition: 'all 0.2s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'none';
                                    }}
                                >
                                    <LogOut style={{ width: '18px', height: '18px' }} /> Cerrar Sesión
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
};