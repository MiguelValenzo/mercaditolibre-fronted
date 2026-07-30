import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import AdminDashboard from './AdminDashboard';
import ProductosList from './productos/ProductosList';
import ProductoCrear from './productos/ProductoCrear';
import ProductoEditar from './productos/ProductoEditar';
import CategoriasList from './Categorias/CategoriasList';
import CategoriaCrear from './Categorias/CategoriaCrear';
import CategoriaEditar from './Categorias/CategoriaEditar';
import ProveedoresList from './proveedores/ProveedoresList';
import ProveedorCrear from './proveedores/ProveedorCrear';
import ProveedorEditar from './proveedores/ProveedorEditar';
import VentasList from './ventas/VentasList';
import VentaDetalle from './ventas/VentaDetalle';
import ClientesList from './clientes/ClientesList';
import ClienteCrear from './clientes/ClienteCrear';
import ClienteEditar from './clientes/ClienteEditar';
// ✅ No importamos Usuarios

const AdminPanel = () => {
    const [seccionActual, setSeccionActual] = useState('dashboard');
    const [subSeccion, setSubSeccion] = useState('list');
    const [editandoId, setEditandoId] = useState(null);
    const [verId, setVerId] = useState(null);

    const navegar = (seccion, sub = 'list', id = null) => {
        console.log('🔀 Navegando a:', seccion, sub, id);
        setSeccionActual(seccion);
        setSubSeccion(sub);
        if (id) {
            if (sub === 'editar') setEditandoId(id);
            if (sub === 'ver') setVerId(id);
        } else {
            setEditandoId(null);
            setVerId(null);
        }
    };

    const renderSeccion = () => {
        console.log('📌 Renderizando sección:', seccionActual, subSeccion);
        
        // ✅ PRODUCTOS
        if (seccionActual === 'productos') {
            if (subSeccion === 'crear') return <ProductoCrear navegar={navegar} />;
            if (subSeccion === 'editar') return <ProductoEditar productoId={editandoId} navegar={navegar} />;
            return <ProductosList navegar={navegar} />;
        }

        // ✅ CATEGORÍAS
        if (seccionActual === 'categorias') {
            if (subSeccion === 'crear') return <CategoriaCrear navegar={navegar} />;
            if (subSeccion === 'editar') return <CategoriaEditar id={editandoId} navegar={navegar} />;
            return <CategoriasList navegar={navegar} />;
        }

        // ✅ PROVEEDORES
        if (seccionActual === 'proveedores') {
            if (subSeccion === 'crear') return <ProveedorCrear navegar={navegar} />;
            if (subSeccion === 'editar') return <ProveedorEditar id={editandoId} navegar={navegar} />;
            return <ProveedoresList navegar={navegar} />;
        }

        // ✅ VENTAS
        if (seccionActual === 'ventas') {
            if (subSeccion === 'ver') return <VentaDetalle id={verId} navegar={navegar} />;
            return <VentasList navegar={navegar} />;
        }

        // ✅ CLIENTES
        if (seccionActual === 'clientes') {
            if (subSeccion === 'crear') return <ClienteCrear navegar={navegar} />;
            if (subSeccion === 'editar') return <ClienteEditar id={editandoId} navegar={navegar} />;
            return <ClientesList navegar={navegar} />;
        }

        // ✅ DASHBOARD
        return <AdminDashboard />;
    };

    return (
        <div style={{
            display: 'flex',
            height: '100vh',
            background: '#0f172a',
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            overflow: 'hidden'
        }}>
            <AdminSidebar 
                seccionActual={seccionActual} 
                setSeccionActual={(seccion) => {
                    console.log('🔄 Cambiando sección a:', seccion);
                    setSeccionActual(seccion);
                    setSubSeccion('list');
                    setEditandoId(null);
                    setVerId(null);
                }} 
            />

            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                minWidth: 0,
                overflow: 'hidden'
            }}>
                <AdminHeader />
                <main style={{
                    flex: 1,
                    overflowY: 'auto',
                    background: '#0f172a',
                    padding: '0'
                }}>
                    {renderSeccion()}
                </main>
            </div>
        </div>
    );
};

export default AdminPanel;