import React, { useState } from 'react';
import { apiService } from '../services/apiService';
import { 
    ShoppingCart, LogOut, User, LayoutDashboard, 
    ShoppingBag, Menu, X, ShieldCheck, LogIn, UserPlus, PackageCheck 
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
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all duration-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    
                    {/* 1. BRANDING / LOGO */}
                    <div 
                        onClick={() => setVistaActual('catalogo')}
                        className="flex items-center gap-3 cursor-pointer select-none group"
                    >
                        <div className="w-11 h-11 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-md shadow-indigo-200 group-hover:bg-indigo-700 group-hover:scale-105 transition-all duration-200">
                            <ShoppingBag className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-black text-slate-900 tracking-tight leading-none group-hover:text-indigo-600 transition-colors">
                                Mercadito<span className="text-indigo-600">Libre</span>
                            </span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                                Tienda Oficial
                            </span>
                        </div>
                    </div>

                    {/* 2. NAVEGACIÓN DESKTOP (ESPACIADO AMPLIO Y BOTONES ESTILO PILL) */}
                    <nav className="hidden md:flex items-center gap-3">
                        <button
                            onClick={() => setVistaActual('catalogo')}
                            className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 flex items-center gap-2 active:scale-95 ${
                                vistaActual === 'catalogo'
                                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                                    : 'text-slate-600 bg-slate-100/80 hover:bg-slate-200/70 hover:text-slate-900 border border-slate-200/50'
                            }`}
                        >
                            <ShoppingBag className="w-4 h-4" />
                            Catálogo
                        </button>

                        {isClient && (
                            <button
                                onClick={() => setVistaActual('miscompras')}
                                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 flex items-center gap-2 active:scale-95 ${
                                    vistaActual === 'miscompras'
                                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                                        : 'text-slate-600 bg-slate-100/80 hover:bg-slate-200/70 hover:text-slate-900 border border-slate-200/50'
                                }`}
                            >
                                <PackageCheck className="w-4 h-4" />
                                Mis Compras
                            </button>
                        )}

                        {isAdmin && (
                            <button
                                onClick={() => setVistaActual('admin-panel')}
                                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 flex items-center gap-2 active:scale-95 ${
                                    vistaActual === 'admin-panel'
                                        ? 'bg-amber-500 text-white shadow-md shadow-amber-500/25'
                                        : 'text-slate-600 bg-amber-50/80 hover:bg-amber-100/70 hover:text-amber-900 border border-amber-200/60'
                                }`}
                            >
                                <LayoutDashboard className="w-4 h-4" />
                                Panel Admin
                            </button>
                        )}
                    </nav>

                    {/* 3. ACCIONES DERECHA (CARRITO Y PERFIL DE USUARIO SEPARADOS) */}
                    <div className="flex items-center gap-4">
                        
                        {/* Botón Carrito Redondeado */}
                        <button
                            onClick={openCart}
                            className="relative p-3 bg-slate-100/90 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 rounded-full transition-all duration-200 border border-slate-200/80 active:scale-95 shadow-sm"
                            aria-label="Abrir Carrito"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[11px] font-black rounded-full h-5 min-w-[20px] px-1.5 flex items-center justify-center border-2 border-white shadow-sm animate-pulse">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        {/* Estado del Usuario / Invitado */}
                        {user ? (
                            <div className="flex items-center gap-3 pl-3 border-l-2 border-slate-200/80">
                                {/* Badge de Perfil */}
                                <div className="flex items-center gap-3 px-3.5 py-1.5 bg-slate-100/80 rounded-full border border-slate-200/60 shadow-inner">
                                    <div className="relative">
                                        <div className="w-8 h-8 bg-indigo-600 text-white font-black rounded-full flex items-center justify-center text-xs shadow-sm">
                                            {user.nombre ? user.nombre.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
                                        </div>
                                        {isAdmin && (
                                            <span className="absolute -bottom-0.5 -right-0.5 bg-amber-500 text-white p-0.5 rounded-full ring-2 ring-white" title="Administrador">
                                                <ShieldCheck className="w-2.5 h-2.5" />
                                            </span>
                                        )}
                                    </div>
                                    <div className="hidden lg:flex flex-col text-left">
                                        <span className="text-xs font-black text-slate-800 leading-tight">
                                            {user.nombre || 'Usuario'}
                                        </span>
                                        <span className="text-[10px] font-bold text-indigo-600 capitalize">
                                            {isAdmin ? 'Administrador' : 'Cliente'}
                                        </span>
                                    </div>
                                </div>

                                {/* Botón Salir */}
                                <button
                                    onClick={handleLogout}
                                    title="Cerrar sesión"
                                    className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full border border-transparent hover:border-red-200 transition-all duration-200 active:scale-95"
                                >
                                    <LogOut className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            /* Botones Invitado */
                            <div className="hidden sm:flex items-center gap-3 pl-2">
                                <button
                                    onClick={() => setVistaActual('login')}
                                    className="px-5 py-2.5 text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200/80 hover:text-slate-900 rounded-full border border-slate-200/60 transition-all duration-200 flex items-center gap-2 active:scale-95"
                                >
                                    <LogIn className="w-4 h-4 text-slate-500" />
                                    Iniciar Sesión
                                </button>
                                <button
                                    onClick={() => setVistaActual('register')}
                                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-full transition-all duration-200 shadow-md shadow-indigo-500/20 active:scale-95 flex items-center gap-2"
                                >
                                    <UserPlus className="w-4 h-4" />
                                    Registrarse
                                </button>
                            </div>
                        )}

                        {/* Menú Hambuerguesa Móvil */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2.5 text-slate-600 hover:bg-slate-100 rounded-full border border-slate-200 transition-all active:scale-95"
                            aria-label="Menú"
                        >
                            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* 4. MENÚ MÓVIL (Misma separación limpia) */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-slate-200/80 space-y-2 bg-white">
                        {user && (
                            <div className="flex items-center gap-3 px-4 py-2.5 mb-3 bg-slate-50 rounded-2xl border border-slate-200/60">
                                <div className="w-9 h-9 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-sm">
                                    {user.nombre ? user.nombre.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-black text-slate-800">{user.nombre}</span>
                                    <span className="text-xs font-semibold text-indigo-600 capitalize">{user.rol || 'Cliente'}</span>
                                </div>
                            </div>
                        )}

                        <button
                            onClick={() => { setVistaActual('catalogo'); setMobileMenuOpen(false); }}
                            className={`w-full px-4 py-3 rounded-xl text-sm font-bold text-left flex items-center gap-2.5 transition-all ${
                                vistaActual === 'catalogo' 
                                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20' 
                                    : 'text-slate-700 hover:bg-slate-100'
                            }`}
                        >
                            <ShoppingBag className="w-4 h-4" /> Catálogo
                        </button>

                        {isClient && (
                            <button
                                onClick={() => { setVistaActual('miscompras'); setMobileMenuOpen(false); }}
                                className={`w-full px-4 py-3 rounded-xl text-sm font-bold text-left flex items-center gap-2.5 transition-all ${
                                    vistaActual === 'miscompras' 
                                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20' 
                                        : 'text-slate-700 hover:bg-slate-100'
                                }`}
                            >
                                <PackageCheck className="w-4 h-4" /> Mis Compras
                            </button>
                        )}

                        {isAdmin && (
                            <button
                                onClick={() => { setVistaActual('admin-panel'); setMobileMenuOpen(false); }}
                                className={`w-full px-4 py-3 rounded-xl text-sm font-bold text-left flex items-center gap-2.5 transition-all ${
                                    vistaActual === 'admin-panel' 
                                        ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20' 
                                        : 'text-slate-700 hover:bg-slate-100'
                                }`}
                            >
                                <LayoutDashboard className="w-4 h-4" /> Panel Admin
                            </button>
                        )}

                        {!user ? (
                            <div className="pt-3 border-t border-slate-100 space-y-2">
                                <button
                                    onClick={() => { setVistaActual('login'); setMobileMenuOpen(false); }}
                                    className="w-full px-4 py-3 rounded-xl text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all text-left flex items-center gap-2"
                                >
                                    <LogIn className="w-4 h-4 text-slate-500" /> Iniciar Sesión
                                </button>
                                <button
                                    onClick={() => { setVistaActual('register'); setMobileMenuOpen(false); }}
                                    className="w-full px-4 py-3 bg-indigo-600 text-white font-bold rounded-xl text-sm transition-all text-center flex items-center justify-center gap-2 shadow-md shadow-indigo-500/20"
                                >
                                    <UserPlus className="w-4 h-4" /> Registrarse
                                </button>
                            </div>
                        ) : (
                            <div className="pt-3 border-t border-slate-100">
                                <button
                                    onClick={handleLogout}
                                    className="w-full px-4 py-3 rounded-xl text-sm font-bold text-red-600 hover:bg-red-50 transition-all text-left flex items-center gap-2"
                                >
                                    <LogOut className="w-4 h-4" /> Cerrar Sesión
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
};