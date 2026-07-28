import React, { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';
import { ShoppingBag, Package, CheckCircle, Clock, XCircle } from 'lucide-react';

export const Purchases = () => {
    const [compras, setCompras] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const cargarCompras = async () => {
            try {
                const data = await apiService.getMisCompras();
                setCompras(data || []);
            } catch (err) {
                setError(err.message || 'Error al cargar tus compras');
            } finally {
                setLoading(false);
            }
        };
        cargarCompras();
    }, []);

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

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-gradient-to-r from-indigo-800 to-indigo-600 rounded-2xl p-8 mb-8 text-white shadow-lg relative overflow-hidden">
                <div className="relative z-10 max-w-xl">
                    <div className="flex items-center gap-3 mb-2">
                        <ShoppingBag className="h-8 w-8 text-indigo-300" />
                        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Mis Compras</h1>
                    </div>
                    <p className="mt-2 text-indigo-100 text-sm sm:text-base">
                        Historial de todas tus compras realizadas.
                    </p>
                </div>
                <div className="absolute right-0 bottom-0 top-0 opacity-10 flex items-center justify-center p-8">
                    <Package className="w-64 h-64" />
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 p-4 rounded-xl flex items-start gap-2.5 text-red-700 text-sm mb-6">
                    <span className="font-bold">Error:</span> {error}
                </div>
            )}

            {compras.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center shadow-sm">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="font-bold text-lg text-gray-800">No tienes compras realizadas</h3>
                    <p className="text-gray-500 text-sm mt-1">Comienza a comprar productos en el catálogo.</p>
                    <button
                        onClick={() => window.location.href = '/catalogo'}
                        className="mt-4 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-colors"
                    >
                        Ir al Catálogo
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {compras.map((venta) => (
                        <div key={venta.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                            <div className="p-6">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                    <div>
                                        <h3 className="font-bold text-gray-800">Orden #{venta.id}</h3>
                                        <p className="text-xs text-gray-500">
                                            {new Date(venta.fecha).toLocaleDateString('es-MX', {
                                                day: '2-digit',
                                                month: 'long',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        {getEstadoBadge(venta.estadoPago)}
                                        <span className="font-bold text-indigo-600">
                                            ${venta.total?.toLocaleString()}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-4 pt-4 border-t border-gray-100">
                                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Productos:</h4>
                                    <div className="space-y-2">
                                        {venta.detalles && venta.detalles.map((det, idx) => (
                                            <div key={idx} className="flex justify-between text-sm text-gray-600">
                                                <span>{det.producto?.nombre || `Producto #${det.producto?.id}`}</span>
                                                <span>{det.cantidad} x ${det.precioUnitario} = ${det.subtotal}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};