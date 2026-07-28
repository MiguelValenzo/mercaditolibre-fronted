import React, { useState, useEffect } from 'react';
import { apiService } from '../../../services/apiService';
import { Search, Eye, CheckCircle, XCircle, Clock, ShoppingBag, DollarSign } from 'lucide-react';

const VentasList = ({ navegar }) => {
    const [ventas, setVentas] = useState([]);
    const [carga, setCarga] = useState(true);
    const [busqueda, setBusqueda] = useState('');

    useEffect(() => {
        cargarVentas();
    }, []);

    const cargarVentas = async () => {
        setCarga(true);
        try {
            const data = await apiService.getVentas();
            setVentas(data || []);
        } catch (error) {
            console.error('Error cargando ventas:', error);
        } finally {
            setCarga(false);
        }
    };

    const getEstadoBadge = (estado) => {
        const estados = {
            'PENDIENTE': { color: 'bg-yellow-100 text-yellow-700', icon: Clock },
            'PAGADO': { color: 'bg-green-100 text-green-700', icon: CheckCircle },
            'CANCELADO': { color: 'bg-red-100 text-red-700', icon: XCircle }
        };
        const e = estados[estado] || estados['PENDIENTE'];
        const Icon = e.icon;
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 ${e.color}`}>
                <Icon className="w-3 h-3" />
                {estado}
            </span>
        );
    };

    const ventasFiltradas = ventas.filter(v =>
        v.cliente?.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
        v.id?.toString().includes(busqueda)
    );

    if (carga) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <ShoppingBag className="w-6 h-6 text-indigo-600" />
                    Historial de Ventas
                </h1>
                <p className="text-sm text-gray-500 mt-1">Gestiona y monitorea todas las ventas realizadas</p>
            </div>

            {/* Buscador */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        placeholder="Buscar por cliente o ID de venta..."
                        className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-gray-50 hover:bg-white transition-colors"
                    />
                </div>
            </div>

            {/* Tabla */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">ID</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Cliente</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">Fecha</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Total</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Estado</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {ventasFiltradas.map(venta => (
                                <tr key={venta.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-semibold text-gray-800">#{venta.id}</td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-medium text-gray-800">{venta.cliente?.nombre || 'N/A'}</p>
                                            <p className="text-xs text-gray-500">{venta.cliente?.email || ''}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 hidden md:table-cell text-gray-600">
                                        {new Date(venta.fecha).toLocaleDateString('es-MX', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric'
                                        })}
                                    </td>
                                    <td className="px-6 py-4 font-bold text-indigo-600">${venta.total?.toLocaleString()}</td>
                                    <td className="px-6 py-4">{getEstadoBadge(venta.estadoPago)}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => navegar('ventas', 'ver', venta.id)}
                                            className="p-2.5 text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors"
                                            title="Ver detalles"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {ventasFiltradas.length === 0 && (
                    <div className="text-center py-12">
                        <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">No hay ventas registradas</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VentasList;