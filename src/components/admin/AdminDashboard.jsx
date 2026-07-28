import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/apiService';
import { Package, FolderTree, Truck, ShoppingBag, DollarSign, TrendingUp } from 'lucide-react';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        productos: 0,
        categorias: 0,
        proveedores: 0,
        ventas: 0,
        ingresos: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargarStats = async () => {
            try {
                const [productos, categorias, proveedores, ventas] = await Promise.all([
                    apiService.getProductos(),
                    apiService.getCategorias(),
                    apiService.getProveedores(),
                    apiService.getVentas()
                ]);

                const totalIngresos = ventas?.reduce((sum, v) => sum + v.total, 0) || 0;

                setStats({
                    productos: productos?.length || 0,
                    categorias: categorias?.length || 0,
                    proveedores: proveedores?.length || 0,
                    ventas: ventas?.length || 0,
                    ingresos: totalIngresos
                });
            } catch (error) {
                console.error('Error cargando estadísticas:', error);
            } finally {
                setLoading(false);
            }
        };
        cargarStats();
    }, []);

    const cards = [
        { titulo: 'Productos', valor: stats.productos, icono: Package, bgColor: 'bg-blue-50', textColor: 'text-blue-600' },
        { titulo: 'Categorías', valor: stats.categorias, icono: FolderTree, bgColor: 'bg-green-50', textColor: 'text-green-600' },
        { titulo: 'Proveedores', valor: stats.proveedores, icono: Truck, bgColor: 'bg-purple-50', textColor: 'text-purple-600' },
        { titulo: 'Ventas Totales', valor: stats.ventas, icono: ShoppingBag, bgColor: 'bg-orange-50', textColor: 'text-orange-600' },
        { titulo: 'Ingresos', valor: `$${stats.ingresos.toLocaleString()}`, icono: DollarSign, bgColor: 'bg-emerald-50', textColor: 'text-emerald-600' },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                    <TrendingUp className="w-8 h-8 text-indigo-600" />
                    Panel de Control
                </h1>
                <p className="text-gray-500 mt-1">Visión general de tu negocio</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {cards.map((card, index) => {
                    const Icon = card.icono;
                    return (
                        <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">{card.titulo}</p>
                                    <p className="text-2xl font-bold text-gray-800 mt-1">{card.valor}</p>
                                </div>
                                <div className={`${card.bgColor} p-3 rounded-xl`}>
                                    <Icon className={`w-6 h-6 ${card.textColor}`} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AdminDashboard;