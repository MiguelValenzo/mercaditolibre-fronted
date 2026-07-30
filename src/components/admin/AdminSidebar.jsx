import React from 'react';
import { 
    LayoutDashboard, 
    Package, 
    FolderTree, 
    Truck, 
    ShoppingBag, 
    LogOut,
    Store,
    ShieldCheck,
    Sparkles
} from 'lucide-react';

const AdminSidebar = ({ seccionActual, setSeccionActual, onLogout }) => {
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'productos', label: 'Productos', icon: Package },
        { id: 'categorias', label: 'Categorías', icon: FolderTree },
        { id: 'proveedores', label: 'Proveedores', icon: Truck },
        { id: 'ventas', label: 'Ventas', icon: ShoppingBag },
    ];

    return (
        <aside style={{
            width: '280px',
            background: 'linear-gradient(180deg, #0f172a 0%, #1e1b4b 100%)',
            color: '#e2e8f0',
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            position: 'sticky',
            top: 0,
            boxShadow: '4px 0 30px rgba(0, 0, 0, 0.5)',
            borderRight: '1px solid rgba(51, 65, 85, 0.5)',
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            userSelect: 'none',
            zIndex: 30,
            overflow: 'hidden'
        }}>
            
            {/* ENCABEZADO / LOGO */}
            <div style={{
                padding: '24px',
                borderBottom: '1px solid rgba(51, 65, 85, 0.5)',
                background: 'rgba(15, 23, 42, 0.6)',
                backdropFilter: 'blur(8px)'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px'
                }}>
                    <div style={{
                        width: '44px',
                        height: '44px',
                        background: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)',
                        color: 'white',
                        borderRadius: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 8px 16px -4px rgba(79, 70, 229, 0.4)',
                        flexShrink: 0
                    }}>
                        <Store style={{ width: '22px', height: '22px', color: 'white' }} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                        <h1 style={{
                            fontSize: '16px',
                            fontWeight: '900',
                            letterSpacing: '-0.02em',
                            color: '#ffffff',
                            margin: 0,
                            lineHeight: '1.2',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}>
                            Mercadito<span style={{ color: '#818cf8' }}>Libre</span>
                        </h1>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            marginTop: '4px'
                        }}>
                            <span style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                background: '#10b981',
                                display: 'inline-block',
                                animation: 'pulse 2s ease-in-out infinite'
                            }} />
                            <p style={{
                                fontSize: '10px',
                                fontWeight: '800',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                color: '#94a3b8',
                                margin: 0
                            }}>
                                Panel Admin
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* MENÚ DE NAVEGACIÓN */}
            <nav style={{
                flex: 1,
                padding: '16px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
            }}>
                <p style={{
                    fontSize: '9px',
                    fontWeight: '800',
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    color: '#64748b',
                    padding: '8px 12px',
                    margin: '0 0 4px 0'
                }}>
                    Menú Principal
                </p>
                
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = seccionActual === item.id;
                    
                    return (
                        <button
                            key={item.id}
                            onClick={() => {
                                console.log('🔄 Click en menú:', item.id);
                                setSeccionActual(item.id);
                            }}
                            style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '12px 16px',
                                borderRadius: '14px',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                fontSize: '12px',
                                fontWeight: '800',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                                background: isActive ? '#4f46e5' : 'transparent',
                                color: isActive ? '#ffffff' : '#94a3b8',
                                boxShadow: isActive ? '0 8px 16px -4px rgba(79, 70, 229, 0.4)' : 'none',
                                position: 'relative'
                            }}
                            onMouseEnter={(e) => {
                                if (!isActive) {
                                    e.currentTarget.style.background = 'rgba(51, 65, 85, 0.5)';
                                    e.currentTarget.style.color = '#f1f5f9';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isActive) {
                                    e.currentTarget.style.background = 'transparent';
                                    e.currentTarget.style.color = '#94a3b8';
                                }
                            }}
                        >
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px'
                            }}>
                                <div style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.2s ease',
                                    background: isActive ? 'rgba(255, 255, 255, 0.15)' : 'rgba(51, 65, 85, 0.3)',
                                    color: isActive ? '#ffffff' : '#94a3b8'
                                }}>
                                    <Icon style={{ width: '16px', height: '16px' }} />
                                </div>
                                <span style={{ color: isActive ? '#ffffff' : '#94a3b8' }}>
                                    {item.label}
                                </span>
                            </div>
                            {isActive && (
                                <span style={{
                                    width: '4px',
                                    height: '24px',
                                    borderRadius: '2px',
                                    background: '#818cf8',
                                    display: 'block'
                                }} />
                            )}
                        </button>
                    );
                })}
            </nav>

            {/* ZONA INFERIOR / CIERRE DE SESIÓN */}
            <div style={{
                padding: '16px',
                borderTop: '1px solid rgba(51, 65, 85, 0.5)',
                background: 'rgba(15, 23, 42, 0.4)'
            }}>
                <button 
                    onClick={onLogout}
                    style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '14px 16px',
                        borderRadius: '14px',
                        border: '1px solid rgba(153, 27, 27, 0.5)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        fontSize: '11px',
                        fontWeight: '800',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        background: 'rgba(127, 29, 29, 0.2)',
                        color: '#fca5a5'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(153, 27, 27, 0.4)';
                        e.currentTarget.style.borderColor = 'rgba(153, 27, 27, 0.8)';
                        e.currentTarget.style.color = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(127, 29, 29, 0.2)';
                        e.currentTarget.style.borderColor = 'rgba(153, 27, 27, 0.5)';
                        e.currentTarget.style.color = '#fca5a5';
                    }}
                >
                    <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '10px',
                        background: 'rgba(239, 68, 68, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        transition: 'all 0.2s ease'
                    }}>
                        <LogOut style={{ width: '16px', height: '16px', color: '#fca5a5' }} />
                    </div>
                    <span style={{ color: '#fca5a5' }}>
                        Cerrar Sesión
                    </span>
                </button>

                {/* Badge de versión */}
                <div style={{
                    marginTop: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '8px',
                    borderRadius: '10px',
                    background: 'rgba(51, 65, 85, 0.2)'
                }}>
                    <Sparkles style={{ width: '12px', height: '12px', color: '#64748b' }} />
                    <span style={{
                        fontSize: '9px',
                        fontWeight: '700',
                        color: '#64748b',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                    }}>
                        v2.4 • Seguro
                    </span>
                    <ShieldCheck style={{ width: '12px', height: '12px', color: '#10b981' }} />
                </div>
            </div>

            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.5; transform: scale(0.85); }
                }
            `}</style>
        </aside>
    );
};

export default AdminSidebar;