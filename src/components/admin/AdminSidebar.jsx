import React from 'react';
import { 
    LayoutDashboard, 
    Package, 
    FolderTree, 
    Truck, 
    ShoppingBag, 
    LogOut,
    ShieldCheck
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
        <aside className="w-72 bg-slate-950 text-slate-300 flex flex-col h-screen sticky top-0 shadow-2xl border-r border-slate-800/80 font-sans z-30">
            
            {/* ENCABEZADO / LOGO */}
            <div className="p-6 border-b border-slate-800/80 bg-slate-900/40 backdrop-blur-md">
                <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 bg-gradient-to-tr from-indigo-600 to-violet-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-600/30 ring-4 ring-indigo-500/10 shrink-0">
                        <Package className="w-5 h-5 text-white" />
                    </div>
                    <div className="min-w-0">
                        <h1 className="text-base font-black tracking-tight truncate" style={{ color: '#ffffff' }}>
                            Mercadito<span className="text-indigo-400">Libre</span>
                        </h1>
                        <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                            <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: '#94a3b8' }}>
                                Panel Admin
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* MENÚ DE NAVEGACIÓN */}
            <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
                <p className="text-[10px] font-black uppercase tracking-widest px-3 py-2" style={{ color: '#64748b' }}>
                    Menú Principal
                </p>
                
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = seccionActual === item.id;
                    
                    return (
                        <button
                            key={item.id}
                            onClick={() => setSeccionActual(item.id)}
                            style={isActive ? { backgroundColor: '#4f46e5', color: '#ffffff' } : {}}
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-200 text-xs font-black uppercase tracking-wider group ${
                                isActive
                                    ? 'shadow-lg shadow-indigo-600/30 ring-2 ring-indigo-400/20'
                                    : 'text-slate-400 hover:bg-slate-900 hover:text-white border border-transparent hover:border-slate-800'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                                    isActive ? 'bg-white/10 text-white' : 'bg-slate-900 text-slate-400 group-hover:text-indigo-400 group-hover:bg-slate-800'
                                }`}>
                                    <Icon className="w-4 h-4" />
                                </div>
                                <span style={isActive ? { color: '#ffffff' } : {}}>{item.label}</span>
                            </div>
                        </button>
                    );
                })}
            </nav>

            {/* ZONA INFERIOR / CIERRE DE SESIÓN */}
            <div className="p-4 border-t border-slate-800/80 bg-slate-900/30">
                <button 
                    onClick={onLogout}
                    style={{ backgroundColor: '#7f1d1d', borderColor: '#991b1b', color: '#fca5a5' }}
                    className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider hover:bg-rose-900 hover:text-white transition-all duration-200 border shadow-sm active:scale-95 group"
                >
                    <div className="w-8 h-8 rounded-xl bg-rose-500/20 flex items-center justify-center shrink-0 group-hover:bg-rose-500/30 transition-colors">
                        <LogOut className="w-4 h-4 text-rose-300" />
                    </div>
                    <span style={{ color: '#fca5a5' }} className="group-hover:text-white transition-colors">
                        Cerrar Sesión
                    </span>
                </button>
            </div>
            
        </aside>
    );
};

export default AdminSidebar;