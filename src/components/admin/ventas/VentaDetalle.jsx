import React, { useState, useEffect } from 'react';
import { apiService } from '../../../services/apiService';
import { ArrowLeft, CheckCircle, XCircle, Clock, ShoppingBag, DollarSign } from 'lucide-react';

const VentaDetalle = ({ id, navegar }) => {
    const [venta, setVenta] = useState(null);
    const [carga, setCarga] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const cargarVenta = async () => {
            try {
                const data = await apiService.getVenta(id);
                setVenta(data);
            } catch (err) {
                setError('Error cargando los detalles de la venta');
            } finally {
                setCarga(false);
            }
        };
        if (id) {
            cargarVenta();
        }
    }, [id]);

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

    if (carga) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (error || !venta) {
        return (
            <div className="text-center py-12">
                <p className="text-red-500">{error || 'Venta no encontrada'}</p>
                <button
                    onClick={() => navegar('ventas', 'list')}
                    className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
                >
                    Volver a Ventas
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={() => navegar('ventas', 'list')}
                    className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                    <ArrowLeft className="w-6 h-6 text-gray-600" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <ShoppingBag className="w-6 h-6 text-indigo-600" />
                        Detalle de Venta #{venta.id}
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Información completa de la transacción</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
                {/* Resumen */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-gray-50 rounded-xl">
                    <div>
                        <p className="text-xs text-gray-500">Cliente</p>
                        <p className="font-semibold text-gray-800">{venta.cliente?.nombre || 'N/A'}</p>
                        <p className="text-sm text-gray-600">{venta.cliente?.email || ''}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">Fecha</p>
                        <p className="font-semibold text-gray-800">
                            {new Date(venta.fecha).toLocaleDateString('es-MX', {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">Estado</p>
                        <div className="mt-1">{getEstadoBadge(venta.estadoPago)}</div>
                    </div>
                </div>

                {/* Productos */}
                <div>
                    <h3 className="font-semibold text-gray-800 mb-3">Productos</h3>
                    <div className="space-y-2">
                        {venta.detalles?.map((detalle, index) => (
                            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center font-bold text-xs">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-800">{detalle.producto?.nombre}</p>
                                        <p className="text-xs text-gray-500">
                                            {detalle.cantidad} unidades x ${detalle.precioUnitario?.toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                                <span className="font-bold text-gray-800">${detalle.subtotal?.toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Total */}
                <div className="flex justify-end pt-4 border-t border-gray-200">
                    <div className="text-right">
                        <p className="text-sm text-gray-500">Total</p>
                        <p className="text-2xl font-bold text-indigo-600">
                            ${venta.total?.toLocaleString()}
                        </p>
                    </div>
                </div>

                {/* Botón volver */}
                <div className="flex justify-center pt-4 border-t border-gray-200">
                    <button
                        onClick={() => navegar('ventas', 'list')}
                        className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors font-medium"
                    >
                        Volver al listado
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VentaDetalle;