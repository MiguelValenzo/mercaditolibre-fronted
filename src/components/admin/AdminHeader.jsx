import React from 'react';
import { Bell, User, Search } from 'lucide-react';

const AdminHeader = () => {
    return (
        <header className="bg-white border-b border-gray-200 px-8 py-4 shadow-sm">
            <div className="flex items-center justify-between">
                <div className="flex-1 max-w-md">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar en el panel..."
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm bg-gray-50 hover:bg-white transition-colors"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button className="relative p-2.5 hover:bg-gray-100 rounded-xl transition-colors">
                        <Bell className="w-5 h-5 text-gray-600" />
                        <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>
                    <div className="w-px h-8 bg-gray-200"></div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-sm">
                            A
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-800">Administrador</p>
                            <p className="text-xs text-gray-500">Super Admin</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;