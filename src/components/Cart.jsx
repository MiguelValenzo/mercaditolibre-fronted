import React, { useState } from 'react';
import { apiService } from '../services/apiService';
import { 
    X, ShoppingBag, Trash2, Plus, Minus, CreditCard, 
    Loader2, Sparkles, ShieldCheck, PackageCheck, ArrowRight, Tag, RefreshCw,
    AlertCircle, CheckCircle, DollarSign
} from 'lucide-react';

const Cart = ({ 
    isOpen, 
    setIsOpen, 
    cart = [], 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    setVistaActual,
    setVentaActiva,
    user
}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const total = cart.reduce((sum, item) => sum + item.producto.precio * item.cantidad, 0);

    const handleCheckout = async () => {
        if (cart.length === 0) {
            setError('El carrito está vacío');
            return;
        }

        if (!user) {
            setError('Debes iniciar sesión para realizar la compra');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const ventaPayload = {
                detalles: cart.map(item => ({
                    producto: { id: item.producto.id },
                    cantidad: item.cantidad
                }))
            };

            const ventaRegistrada = await apiService.procesarVenta(ventaPayload);
            
            if (setVentaActiva) setVentaActiva(ventaRegistrada);
            clearCart();
            if (setIsOpen) setIsOpen(false);
            if (setVistaActual) setVistaActual('checkout');

        } catch (err) {
            setError(err.message || 'Error al procesar la compra. Inténtalo de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        if (setIsOpen) setIsOpen(false);
    };

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            overflow: 'hidden',
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
        }}>
            {/* Overlay Oscuro con Blur */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(15, 23, 42, 0.85)',
                    backdropFilter: 'blur(12px)',
                    transition: 'opacity 0.3s ease'
                }}
                onClick={handleClose}
            />

            {/* Panel Deslizante Lateral - Modo Oscuro */}
            <div style={{
                position: 'absolute',
                insetY: 0,
                right: 0,
                maxWidth: '100%',
                display: 'flex',
                paddingLeft: '16px'
            }}>
                <div style={{
                    width: '100vw',
                    maxWidth: '440px',
                    background: '#1e293b',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    borderLeft: '1px solid #334155',
                    borderRadius: '32px 0 0 32px',
                    overflow: 'hidden'
                }}>
                    
                    {/* ENCABEZADO HEADER - Modo Oscuro */}
                    <div style={{
                        padding: '24px 28px',
                        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                        borderBottom: '1px solid #334155',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                            <div style={{
                                width: '44px',
                                height: '44px',
                                background: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)',
                                color: 'white',
                                borderRadius: '14px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 8px 16px -4px rgba(79, 70, 229, 0.4)'
                            }}>
                                <ShoppingBag style={{ width: '20px', height: '20px' }} />
                            </div>
                            <div>
                                <h2 style={{
                                    fontSize: '20px',
                                    fontWeight: '900',
                                    color: '#f1f5f9',
                                    letterSpacing: '-0.02em',
                                    margin: 0,
                                    lineHeight: '1.2'
                                }}>
                                    Tu Carrito
                                </h2>
                                <p style={{
                                    fontSize: '11px',
                                    fontWeight: '700',
                                    color: '#94a3b8',
                                    margin: '2px 0 0 0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px'
                                }}>
                                    <span style={{
                                        width: '8px',
                                        height: '8px',
                                        borderRadius: '50%',
                                        background: cart.length > 0 ? '#10b981' : '#64748b',
                                        display: 'inline-block'
                                    }} />
                                    {cart.length} {cart.length === 1 ? 'producto seleccionado' : 'productos seleccionados'}
                                </p>
                            </div>
                        </div>

                        {/* Botón Cerrar - Modo Oscuro */}
                        <button
                            onClick={handleClose}
                            style={{
                                padding: '10px',
                                background: '#0f172a',
                                border: '1px solid #334155',
                                borderRadius: '12px',
                                cursor: 'pointer',
                                color: '#94a3b8',
                                transition: 'all 0.2s ease',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = '#334155';
                                e.currentTarget.style.color = '#f1f5f9';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = '#0f172a';
                                e.currentTarget.style.color = '#94a3b8';
                            }}
                            aria-label="Cerrar carrito"
                        >
                            <X style={{ width: '20px', height: '20px' }} />
                        </button>
                    </div>

                    {/* CUERPO DE PRODUCTOS - Modo Oscuro */}
                    <div style={{
                        flex: 1,
                        overflowY: 'auto',
                        padding: '24px 28px',
                        background: '#0f172a',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px'
                    }}>
                        
                        {/* Mensaje de Error - Modo Oscuro */}
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

                        {/* Estado Vacío - Modo Oscuro */}
                        {cart.length === 0 ? (
                            <div style={{
                                textAlign: 'center',
                                padding: '60px 20px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flex: 1
                            }}>
                                <div style={{
                                    position: 'relative',
                                    marginBottom: '20px'
                                }}>
                                    <div style={{
                                        width: '96px',
                                        height: '96px',
                                        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                                        borderRadius: '28px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        border: '1px solid #334155'
                                    }}>
                                        <PackageCheck style={{ width: '48px', height: '48px', color: '#818cf8' }} />
                                    </div>
                                    <span style={{
                                        position: 'absolute',
                                        bottom: '-4px',
                                        right: '-4px',
                                        width: '28px',
                                        height: '28px',
                                        background: '#1e293b',
                                        borderRadius: '50%',
                                        border: '1px solid #334155',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
                                    }}>
                                        <Sparkles style={{ width: '14px', height: '14px', color: '#fbbf24' }} />
                                    </span>
                                </div>
                                <h3 style={{
                                    fontSize: '18px',
                                    fontWeight: '900',
                                    color: '#f1f5f9',
                                    margin: '0 0 8px 0'
                                }}>
                                    El carrito está vacío
                                </h3>
                                <p style={{
                                    fontSize: '13px',
                                    fontWeight: '500',
                                    color: '#94a3b8',
                                    margin: '0 0 24px 0',
                                    maxWidth: '280px',
                                    lineHeight: '1.5'
                                }}>
                                    ¡Explora nuestro catálogo y agrega tus productos preferidos!
                                </p>
                                
                                <button
                                    onClick={handleClose}
                                    style={{
                                        padding: '14px 32px',
                                        background: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)',
                                        color: '#ffffff',
                                        borderRadius: '16px',
                                        border: 'none',
                                        fontWeight: '700',
                                        fontSize: '13px',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                        cursor: 'pointer',
                                        boxShadow: '0 10px 20px -5px rgba(79, 70, 229, 0.4)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
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
                                    <span>Explorar Catálogo</span>
                                    <ArrowRight style={{ width: '18px', height: '18px' }} />
                                </button>
                            </div>
                        ) : (
                            /* Tarjetas de Productos - Modo Oscuro */
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                {cart.map((item) => (
                                    <div
                                        key={item.producto.id}
                                        style={{
                                            padding: '16px',
                                            background: '#1e293b',
                                            borderRadius: '18px',
                                            border: '1px solid #334155',
                                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                                            transition: 'all 0.2s ease',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '16px'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.borderColor = '#4f46e5';
                                            e.currentTarget.style.boxShadow = '0 8px 24px rgba(79, 70, 229, 0.15)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.borderColor = '#334155';
                                            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.2)';
                                        }}
                                    >
                                        {/* Imagen del Producto */}
                                        <div style={{
                                            flexShrink: 0,
                                            overflow: 'hidden',
                                            borderRadius: '12px',
                                            border: '1px solid #334155',
                                            background: '#0f172a',
                                            width: '64px',
                                            height: '64px'
                                        }}>
                                            <img
                                                src={item.producto.imagenUrl || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=100"}
                                                alt={item.producto.nombre}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    transition: 'transform 0.3s ease'
                                                }}
                                            />
                                        </div>

                                        {/* Datos del Producto - Modo Oscuro */}
                                        <div style={{ flexGrow: 1, minWidth: 0 }}>
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                justifyContent: 'space-between',
                                                gap: '8px'
                                            }}>
                                                <h4 style={{
                                                    fontSize: '14px',
                                                    fontWeight: '800',
                                                    color: '#f1f5f9',
                                                    margin: 0,
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}>
                                                    {item.producto.nombre}
                                                </h4>
                                                
                                                <button
                                                    onClick={() => removeFromCart(item.producto.id)}
                                                    style={{
                                                        background: 'none',
                                                        border: 'none',
                                                        cursor: 'pointer',
                                                        color: '#64748b',
                                                        padding: '4px',
                                                        borderRadius: '8px',
                                                        transition: 'all 0.2s ease',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        flexShrink: 0
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.color = '#f87171';
                                                        e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.color = '#64748b';
                                                        e.currentTarget.style.background = 'none';
                                                    }}
                                                    title="Quitar producto"
                                                >
                                                    <Trash2 style={{ width: '16px', height: '16px' }} />
                                                </button>
                                            </div>

                                            <p style={{
                                                fontSize: '13px',
                                                fontWeight: '700',
                                                color: '#818cf8',
                                                margin: '2px 0 0 0'
                                            }}>
                                                ${item.producto.precio.toFixed(2)} <span style={{ fontSize: '10px', fontWeight: '600', color: '#64748b' }}>c/u</span>
                                            </p>

                                            {/* Incremental y Subtotal - Modo Oscuro */}
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                marginTop: '10px'
                                            }}>
                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '4px',
                                                    background: '#0f172a',
                                                    padding: '4px',
                                                    borderRadius: '14px',
                                                    border: '1px solid #334155'
                                                }}>
                                                    <button
                                                        onClick={() => updateQuantity(item.producto.id, item.cantidad - 1)}
                                                        disabled={item.cantidad <= 1}
                                                        style={{
                                                            width: '28px',
                                                            height: '28px',
                                                            background: '#1e293b',
                                                            border: 'none',
                                                            borderRadius: '10px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            cursor: item.cantidad <= 1 ? 'not-allowed' : 'pointer',
                                                            opacity: item.cantidad <= 1 ? 0.4 : 1,
                                                            transition: 'all 0.2s ease',
                                                            boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            if (item.cantidad > 1) {
                                                                e.currentTarget.style.background = '#2d3748';
                                                            }
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            if (item.cantidad > 1) {
                                                                e.currentTarget.style.background = '#1e293b';
                                                            }
                                                        }}
                                                    >
                                                        <Minus style={{ width: '14px', height: '14px', color: '#94a3b8' }} />
                                                    </button>

                                                    <span style={{
                                                        padding: '0 8px',
                                                        fontSize: '13px',
                                                        fontWeight: '800',
                                                        color: '#f1f5f9',
                                                        minWidth: '20px',
                                                        textAlign: 'center'
                                                    }}>
                                                        {item.cantidad}
                                                    </span>

                                                    <button
                                                        onClick={() => updateQuantity(item.producto.id, item.cantidad + 1)}
                                                        disabled={item.cantidad >= item.producto.stock}
                                                        style={{
                                                            width: '28px',
                                                            height: '28px',
                                                            background: '#1e293b',
                                                            border: 'none',
                                                            borderRadius: '10px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            cursor: item.cantidad >= item.producto.stock ? 'not-allowed' : 'pointer',
                                                            opacity: item.cantidad >= item.producto.stock ? 0.4 : 1,
                                                            transition: 'all 0.2s ease',
                                                            boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            if (item.cantidad < item.producto.stock) {
                                                                e.currentTarget.style.background = '#2d3748';
                                                            }
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            if (item.cantidad < item.producto.stock) {
                                                                e.currentTarget.style.background = '#1e293b';
                                                            }
                                                        }}
                                                    >
                                                        <Plus style={{ width: '14px', height: '14px', color: '#94a3b8' }} />
                                                    </button>
                                                </div>

                                                <div style={{ textAlign: 'right' }}>
                                                    <span style={{
                                                        fontSize: '9px',
                                                        fontWeight: '800',
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.5px',
                                                        color: '#64748b',
                                                        display: 'block',
                                                        marginBottom: '2px'
                                                    }}>
                                                        Subtotal
                                                    </span>
                                                    <span style={{
                                                        fontSize: '15px',
                                                        fontWeight: '900',
                                                        color: '#f1f5f9'
                                                    }}>
                                                        ${(item.producto.precio * item.cantidad).toFixed(2)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* FOOTER CON BOTONES - Modo Oscuro */}
                    {cart.length > 0 && (
                        <div style={{
                            borderTop: '1px solid #334155',
                            padding: '24px 28px',
                            background: '#1e293b',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px',
                            boxShadow: '0 -8px 30px rgba(0, 0, 0, 0.3)'
                        }}>
                            
                            {/* Caja de Total - Modo Oscuro */}
                            <div style={{
                                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                                padding: '16px 20px',
                                borderRadius: '16px',
                                border: '1px solid #334155'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    fontSize: '12px',
                                    fontWeight: '800',
                                    color: '#94a3b8',
                                    marginBottom: '8px'
                                }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <Tag style={{ width: '14px', height: '14px', color: '#818cf8' }} />
                                        Costo de envío
                                    </span>
                                    <span style={{
                                        background: 'rgba(16, 185, 129, 0.15)',
                                        color: '#6ee7b7',
                                        padding: '2px 12px',
                                        borderRadius: '20px',
                                        fontSize: '10px',
                                        fontWeight: '800',
                                        border: '1px solid rgba(16, 185, 129, 0.2)'
                                    }}>
                                        Gratis
                                    </span>
                                </div>
                                
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingTop: '10px',
                                    borderTop: '1px solid #334155'
                                }}>
                                    <span style={{
                                        fontSize: '14px',
                                        fontWeight: '800',
                                        color: '#f1f5f9'
                                    }}>
                                        Total acumulado
                                    </span>
                                    <div style={{ textAlign: 'right' }}>
                                        <span style={{
                                            fontSize: '24px',
                                            fontWeight: '900',
                                            color: '#818cf8',
                                            display: 'block',
                                            lineHeight: '1.2'
                                        }}>
                                            ${total.toFixed(2)}
                                        </span>
                                        <span style={{
                                            fontSize: '9px',
                                            fontWeight: '700',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.5px',
                                            color: '#64748b'
                                        }}>
                                            MXN
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* BOTONES - Modo Oscuro */}
                            <div style={{ display: 'flex', gap: '12px' }}>
                                
                                {/* Botón Vaciar - Modo Oscuro */}
                                <button
                                    onClick={clearCart}
                                    style={{
                                        padding: '14px 18px',
                                        background: 'rgba(239, 68, 68, 0.15)',
                                        border: '1px solid rgba(239, 68, 68, 0.2)',
                                        borderRadius: '14px',
                                        fontWeight: '700',
                                        fontSize: '11px',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                        cursor: 'pointer',
                                        color: '#f87171',
                                        transition: 'all 0.2s ease',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        flexShrink: 0
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'rgba(239, 68, 68, 0.25)';
                                        e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.4)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)';
                                        e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.2)';
                                    }}
                                    title="Vaciar carrito"
                                >
                                    <RefreshCw style={{ width: '16px', height: '16px' }} />
                                    <span>Vaciar</span>
                                </button>
                                
                                {/* Botón Proceder al Pago - Modo Oscuro */}
                                <button
                                    onClick={handleCheckout}
                                    disabled={loading}
                                    style={{
                                        flex: 1,
                                        padding: '16px 24px',
                                        background: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)',
                                        color: '#ffffff',
                                        border: 'none',
                                        borderRadius: '14px',
                                        fontWeight: '700',
                                        fontSize: '12px',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                        cursor: loading ? 'not-allowed' : 'pointer',
                                        opacity: loading ? 0.7 : 1,
                                        boxShadow: '0 10px 20px -5px rgba(79, 70, 229, 0.4)',
                                        transition: 'all 0.2s ease',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '10px'
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
                                            <Loader2 style={{ width: '18px', height: '18px', animation: 'spin 1s linear infinite' }} />
                                            <span>Procesando...</span>
                                        </>
                                    ) : (
                                        <>
                                            <CreditCard style={{ width: '18px', height: '18px' }} />
                                            <span>Proceder al Pago</span>
                                            <ArrowRight style={{ width: '18px', height: '18px' }} />
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Garantía - Modo Oscuro */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                fontSize: '11px',
                                fontWeight: '700',
                                color: '#94a3b8',
                                paddingTop: '4px'
                            }}>
                                <ShieldCheck style={{ width: '16px', height: '16px', color: '#6ee7b7' }} />
                                <span>Garantía de compra 100% encriptada</span>
                            </div>
                        </div>
                    )}
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

export default Cart;