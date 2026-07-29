import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import AdminDashboard from './AdminDashboard';
import ProductosList from './productos/ProductosList';
import ProductoCrear from './productos/ProductoCrear';
import ProductoEditar from './productos/ProductoEditar';
import CategoriasList from './categorias/CategoriasList';
import CategoriaCrear from './categorias/CategoriaCrear';
import CategoriaEditar from './categorias/CategoriaEditar';
import ProveedoresList from './proveedores/ProveedoresList';
import ProveedorCrear from './proveedores/ProveedorCrear';
import ProveedorEditar from './proveedores/ProveedorEditar';
import VentasList from './ventas/VentasList';
import VentaDetalle from './ventas/VentaDetalle';

const AdminPanel = () => {
    // Estado principal
    const [seccionActual, setSeccionActual] = useState('dashboard');
    const [subSeccion, setSubSeccion] = useState('list');
    const [editandoId, setEditandoId] = useState(null);
    const [verId, setVerId] = useState(null);

    // Navegación - mantiene el historial
    const [historial, setHistorial] = useState([]);

    const navegar = (seccion, sub = 'list', id = null) => {
        // Guardar en historial antes de navegar
        setHistorial(prev => [...prev, { seccion, sub, id }]);
        
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

    const volver = () => {
        if (historial.length > 0) {
            const anterior = historial[historial.length - 1];
            setHistorial(prev => prev.slice(0, -1));
            
            setSeccionActual(anterior.seccion);
            setSubSeccion(anterior.sub);
            if (anterior.id) {
                if (anterior.sub === 'editar') setEditandoId(anterior.id);
                if (anterior.sub === 'ver') setVerId(anterior.id);
            } else {
                setEditandoId(null);
                setVerId(null);
            }
        } else {
            // Si no hay historial, volver al listado de la sección actual
            setSubSeccion('list');
            setEditandoId(null);
            setVerId(null);
        }
    };

    const renderSeccion = () => {
        // Productos
        if (seccionActual === 'productos') {
            if (subSeccion === 'crear') return <ProductoCrear navegar={navegar} />;
            if (subSeccion === 'editar') return <ProductoEditar productoId={editandoId} navegar={navegar} />;
            return <ProductosList navegar={navegar} />;
        }

        // Categorías
        if (seccionActual === 'categorias') {
            if (subSeccion === 'crear') return <CategoriaCrear navegar={navegar} />;
            if (subSeccion === 'editar') return <CategoriaEditar id={editandoId} navegar={navegar} />;
            return <CategoriasList navegar={navegar} />;
        }

        // Proveedores
        if (seccionActual === 'proveedores') {
            if (subSeccion === 'crear') return <ProveedorCrear navegar={navegar} />;
            if (subSeccion === 'editar') return <ProveedorEditar id={editandoId} navegar={navegar} />;
            return <ProveedoresList navegar={navegar} />;
        }

        // Ventas
        if (seccionActual === 'ventas') {
            if (subSeccion === 'ver') return <VentaDetalle id={verId} navegar={navegar} />;
            return <VentasList navegar={navegar} />;
        }

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
            {/* Barra lateral de navegación */}
            <AdminSidebar 
                seccionActual={seccionActual} 
                setSeccionActual={(seccion) => {
                    setHistorial([]); // Limpiar historial al cambiar de sección principal
                    setSeccionActual(seccion);
                    setSubSeccion('list');
                    setEditandoId(null);
                    setVerId(null);
                }} 
            />

            {/* Contenedor principal de la interfaz */}
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