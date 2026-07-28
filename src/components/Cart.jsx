import React, { useState } from 'react';
import { apiService } from '../services/apiService';
import { 
    X, ShoppingBag, Trash2, Plus, Minus, CreditCard, 
    Loader2, Sparkles, ShieldCheck, PackageCheck, ArrowRight, Tag, RefreshCw
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
        <div className="fixed inset-0 z-[9999] overflow-hidden font-sans">
            {/* Overlay Oscuro con Blur */}
            <div
                className="absolute inset-0 bg-slate-950/65 backdrop-blur-md transition-opacity duration-300"
                onClick={handleClose}
            />

            {/* Panel Deslizante Lateral */}
            <div className="absolute inset-y-0 right-0 max-w-full flex pl-4 sm:pl-10">
                <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full border-l border-slate-200">
                    
                    {/* ENCABEZADO HEADER */}
                    <div className="px-6 py-5 bg-gradient-to-b from-slate-100 to-white border-b border-slate-200/90 flex items-center justify-between relative">
                        <div className="flex items-center gap-3.5">
                            <div className="w-11 h-11 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-600/30 ring-4 ring-indigo-100">
                                <ShoppingBag className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-black tracking-tight leading-tight" style={{ color: '#0f172a' }}>
                                    Tu Carrito
                                </h2>
                                <p className="text-xs font-bold mt-0.5 flex items-center gap-1.5" style={{ color: '#475569' }}>
                                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                                    {cart.length} {cart.length === 1 ? 'producto seleccionado' : 'productos seleccionados'}
                                </p>
                            </div>
                        </div>

                        {/* Botón Cerrar */}
                        <button
                            onClick={handleClose}
                            className="p-2.5 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-2xl transition-all active:scale-90 border border-slate-300/80 group"
                            aria-label="Cerrar carrito"
                        >
                            <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
                        </button>
                    </div>

                    {/* CUERPO DE PRODUCTOS */}
                    <div className="flex-1 overflow-y-auto p-6 bg-slate-50/70 space-y-4">
                        
                        {/* Mensaje de Error */}
                        {error && (
                            <div className="bg-rose-50 border-2 border-rose-300 p-4 rounded-2xl text-xs font-black shadow-sm flex items-center gap-3" style={{ color: '#881337' }}>
                                <span className="w-2.5 h-2.5 rounded-full bg-rose-600 shrink-0 animate-ping" />
                                <span>{error}</span>
                            </div>
                        )}

                        {/* Estado Vacío */}
                        {cart.length === 0 ? (
                            <div className="text-center py-20 flex flex-col items-center justify-center">
                                <div className="relative mb-5">
                                    <div className="w-24 h-24 bg-gradient-to-tr from-indigo-100 via-indigo-50 to-slate-100 text-indigo-600 rounded-3xl flex items-center justify-center border border-indigo-200/80 shadow-inner">
                                        <PackageCheck className="w-12 h-12 text-indigo-600" />
                                    </div>
                                    <span className="absolute -bottom-1 -right-1 w-7 h-7 bg-white rounded-full border border-slate-200 shadow flex items-center justify-center">
                                        <Sparkles className="w-4 h-4 text-amber-500" />
                                    </span>
                                </div>
                                <h3 className="font-black text-xl tracking-tight" style={{ color: '#0f172a' }}>
                                    El carrito está vacío
                                </h3>
                                <p className="text-xs font-bold mt-2 max-w-[240px] leading-relaxed" style={{ color: '#64748b' }}>
                                    ¡Explora nuestro catálogo y agrega tus productos preferidos!
                                </p>
                                
                                <button
                                    onClick={handleClose}
                                    style={{ backgroundColor: '#4f46e5', color: '#ffffff' }}
                                    className="mt-6 px-7 py-3.5 hover:bg-indigo-700 rounded-2xl text-xs font-black uppercase tracking-wider shadow-lg shadow-indigo-600/30 active:scale-95 transition-all flex items-center gap-2.5 group"
                                >
                                    <span style={{ color: '#ffffff' }}>Explorar Catálogo</span>
                                    <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        ) : (
                            /* Tarjetas de Productos */
                            <div className="space-y-3.5">
                                {cart.map((item) => (
                                    <div
                                        key={item.producto.id}
                                        className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-200 flex items-center gap-4 group"
                                    >
                                        {/* Imagen del Producto */}
                                        <div className="relative shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                                            <img
                                                src={item.producto.imagenUrl || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=100"}
                                                alt={item.producto.nombre}
                                                className="w-16 h-16 object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>

                                        {/* Datos del Producto */}
                                        <div className="flex-grow min-w-0">
                                            <div className="flex items-start justify-between gap-2">
                                                <h4 className="font-black text-sm truncate tracking-tight" style={{ color: '#0f172a' }}>
                                                    {item.producto.nombre}
                                                </h4>
                                                
                                                <button
                                                    onClick={() => removeFromCart(item.producto.id)}
                                                    className="text-slate-400 hover:text-rose-600 hover:bg-rose-50 p-1.5 rounded-xl transition-all active:scale-90 shrink-0"
                                                    title="Quitar producto"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>

                                            <p className="text-xs font-black mt-0.5 tracking-tight" style={{ color: '#4f46e5' }}>
                                                ${item.producto.precio.toFixed(2)} <span className="text-[10px] font-bold" style={{ color: '#64748b' }}>c/u</span>
                                            </p>

                                            {/* Incremental y Subtotal */}
                                            <div className="flex items-center justify-between mt-3.5">
                                                <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl border border-slate-200 shadow-inner">
                                                    <button
                                                        onClick={() => updateQuantity(item.producto.id, item.cantidad - 1)}
                                                        className="w-7 h-7 bg-white hover:bg-slate-200 text-slate-800 rounded-xl flex items-center justify-center transition-all shadow-sm font-black active:scale-90 disabled:opacity-30 border border-slate-200"
                                                        disabled={item.cantidad <= 1}
                                                    >
                                                        <Minus className="w-3.5 h-3.5" style={{ color: '#0f172a' }} />
                                                    </button>

                                                    <span className="px-2 text-xs font-black min-w-[22px] text-center" style={{ color: '#0f172a' }}>
                                                        {item.cantidad}
                                                    </span>

                                                    <button
                                                        onClick={() => updateQuantity(item.producto.id, item.cantidad + 1)}
                                                        className="w-7 h-7 bg-white hover:bg-slate-200 text-slate-800 rounded-xl flex items-center justify-center transition-all shadow-sm font-black active:scale-90 disabled:opacity-30 border border-slate-200"
                                                        disabled={item.cantidad >= item.producto.stock}
                                                    >
                                                        <Plus className="w-3.5 h-3.5" style={{ color: '#0f172a' }} />
                                                    </button>
                                                </div>

                                                <div className="text-right">
                                                    <span className="text-[10px] font-black uppercase tracking-wider block leading-none mb-1" style={{ color: '#64748b' }}>
                                                        Subtotal
                                                    </span>
                                                    <span className="font-black text-base tracking-tight" style={{ color: '#0f172a' }}>
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

                    {/* FOOTER CON BOTONES CON FONDOS DE COLOR VIBRANTE */}
                    {cart.length > 0 && (
                        <div className="border-t border-slate-200/90 p-6 bg-white space-y-4 shadow-2xl relative z-10">
                            
                            {/* Caja de Total */}
                            <div className="space-y-3 bg-gradient-to-br from-slate-50 to-indigo-50/40 p-4 rounded-2xl border border-slate-200 shadow-sm">
                                <div className="flex justify-between items-center text-xs font-black">
                                    <span className="flex items-center gap-1.5" style={{ color: '#475569' }}>
                                        <Tag className="w-3.5 h-3.5 text-indigo-600" /> Costo de envío
                                    </span>
                                    <span className="text-emerald-800 font-black uppercase text-[10px] bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300 shadow-sm">
                                        Gratis
                                    </span>
                                </div>
                                
                                <div className="flex justify-between items-center pt-2.5 border-t border-slate-200">
                                    <span className="text-sm font-black tracking-tight" style={{ color: '#0f172a' }}>
                                        Total acumulado
                                    </span>
                                    <div className="text-right">
                                        <span className="text-2xl font-black tracking-tight block leading-none" style={{ color: '#4f46e5' }}>
                                            ${total.toFixed(2)}
                                        </span>
                                        <span className="text-[10px] font-black tracking-widest uppercase" style={{ color: '#64748b' }}>
                                            MXN
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* BOTONES CON COLOR DE FONDO DESTACADO */}
                            <div className="flex items-center gap-3">
                                
                                {/* 1. BOTÓN VACIAR (Fondo Rojo Suave con Borde y Texto Rojo Carmesí) */}
                                <button
                                    onClick={clearCart}
                                    style={{ 
                                        backgroundColor: '#ffe4e6', 
                                        borderColor: '#fecdd3', 
                                        color: '#be123c' 
                                    }}
                                    className="px-5 py-4 hover:bg-rose-200 hover:border-rose-300 rounded-2xl font-black text-xs uppercase tracking-wider transition-all active:scale-95 border shadow-sm flex items-center gap-2 group shrink-0"
                                    title="Vaciar carrito"
                                >
                                    <RefreshCw className="w-4 h-4 text-rose-700 group-hover:rotate-180 transition-transform duration-300" />
                                    <span style={{ color: '#be123c' }}>Vaciar</span>
                                </button>
                                
                                {/* 2. BOTÓN PROCEDER AL PAGO (Fondo Indigo/Azul Vibrante con Texto Blanco) */}
                                <button
                                    onClick={handleCheckout}
                                    disabled={loading}
                                    style={{ 
                                        backgroundColor: '#4f46e5', 
                                        color: '#ffffff' 
                                    }}
                                    className="flex-1 py-4 px-6 bg-gradient-to-r from-indigo-600 via-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 rounded-2xl font-black text-xs uppercase tracking-wider shadow-xl shadow-indigo-600/35 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2.5 group"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin text-white" />
                                            <span style={{ color: '#ffffff' }}>Procesando...</span>
                                        </>
                                    ) : (
                                        <>
                                            <CreditCard className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                                            <span style={{ color: '#ffffff' }}>Proceder al Pago</span>
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Garantía */}
                            <div className="flex items-center justify-center gap-1.5 text-xs font-bold pt-1" style={{ color: '#64748b' }}>
                                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                                <span>Garantía de compra 100% encriptada</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cart;