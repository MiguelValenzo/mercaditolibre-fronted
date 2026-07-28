import React, { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';
import { 
    Search, ShoppingCart, Info, AlertTriangle, Zap, LogIn, 
    CheckCircle2, PackageX, Sparkles, SlidersHorizontal, ArrowUpDown, X 
} from 'lucide-react';

export const Catalogo = ({ setVistaActual, user, addToCart, comprarAhora }) => {
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [carga, setCarga] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [selecionCategoria, setSelecionCategoria] = useState('Todos');
    const [orden, setOrden] = useState('defecto'); // 'defecto', 'precio-asc', 'precio-desc', 'nombre'

    // ✅ Log para debug
    console.log('👤 Usuario en Catalogo:', user);
    console.log('👑 Rol del usuario:', user?.rol);
    const isClient = user && (user.rol === 'CLIENTE' || user.rol === 'ROLE_CLIENTE');
    console.log('👤 isClient:', isClient);

    useEffect(() => {
        const cargaDatosCatalogo = async () => {
            setCarga(true);
            setError('');
            try {
                console.log('Cargando productos...');
                const datosProductos = await apiService.getProductos();
                console.log('Productos recibidos:', datosProductos);
                setProductos(datosProductos || []);

                console.log('Cargando categorías...');
                const datosCategorias = await apiService.getCategorias();
                console.log('Categorías recibidas:', datosCategorias);
                setCategorias(datosCategorias || []);
            } catch (err) {
                console.error('Error cargando catálogo:', err);
                setError('Error en el servidor backend: ' + err.message);
            } finally {
                setCarga(false);
            }
        };
        cargaDatosCatalogo();
    }, []);

    const handleAddToCart = (producto) => {
        if (!user) {
            setVistaActual('login');
            return;
        }
        if (!isClient) {
            alert('Solo los clientes pueden realizar compras.');
            return;
        }
        if (addToCart) {
            addToCart(producto);
        }
    };

    const handleComprarAhora = (producto) => {
        console.log('⚡ handleComprarAhora llamado');
        console.log('👤 Usuario:', user);
        
        if (!user) {
            console.log('❌ No hay usuario, redirigiendo a login');
            setVistaActual('login');
            return;
        }
        
        console.log('🔑 Rol del usuario:', user.rol);
        
        if (!isClient) {
            console.log('❌ Usuario no es CLIENTE, rol:', user.rol);
            alert('Solo los clientes pueden realizar compras.');
            return;
        }
        
        console.log('✅ Usuario es CLIENTE, comprando...');
        if (comprarAhora) {
            comprarAhora(producto);
        }
    };

    // Filtrado de productos
    const productosFiltrados = productos.filter((producto) => {
        const busqueda =
            producto.nombre?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (producto.descripcion && producto.descripcion.toLowerCase().includes(searchQuery.toLowerCase()));

        const busquedaCategorias =
            selecionCategoria === 'Todos' ||
            (producto.categoria && producto.categoria.nombre === selecionCategoria);

        return busqueda && busquedaCategorias;
    });

    // Ordenamiento de productos
    const productosOrdenados = [...productosFiltrados].sort((a, b) => {
        if (orden === 'precio-asc') return (a.precio || 0) - (b.precio || 0);
        if (orden === 'precio-desc') return (b.precio || 0) - (a.precio || 0);
        if (orden === 'nombre') return (a.nombre || '').localeCompare(b.nombre || '');
        return 0;
    });

    const limpiarFiltros = () => {
        setSearchQuery('');
        setSelecionCategoria('Todos');
        setOrden('defecto');
    };

    if (carga) {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '70vh',
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>
                <div style={{
                    width: '56px',
                    height: '56px',
                    border: '4px solid #e2e8f0',
                    borderTop: '4px solid #2563eb',
                    borderRadius: '50%',
                    animation: 'spin 0.75s linear infinite'
                }} />
                <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                <p style={{ color: '#334155', marginTop: '20px', fontWeight: '700', fontSize: '16px' }}>
                    Sincronizando inventario...
                </p>
            </div>
        );
    }

    return (
        <div style={{
            maxWidth: '1320px',
            margin: '0 auto',
            padding: '24px 20px 64px 20px',
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            boxSizing: 'border-box'
        }}>
            
            {/* HERO BANNER PREMIUM */}
            <div style={{
                background: 'radial-gradient(circle at 80% 20%, #1e40af 0%, #0f172a 60%, #020617 100%)',
                borderRadius: '28px',
                padding: '40px 36px',
                marginBottom: '32px',
                color: '#ffffff',
                boxShadow: '0 20px 40px -15px rgba(15, 23, 42, 0.4)',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
                <div style={{ position: 'relative', zIndex: 2, maxWidth: '680px' }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        backgroundColor: 'rgba(59, 130, 246, 0.2)',
                        border: '1px solid rgba(147, 197, 253, 0.3)',
                        color: '#93c5fd',
                        padding: '6px 14px',
                        borderRadius: '30px',
                        fontSize: '12px',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        marginBottom: '16px'
                    }}>
                        <Sparkles size={14} /> Tienda Oficial
                    </div>
                    <h1 style={{
                        fontSize: '38px',
                        fontWeight: '900',
                        margin: '0 0 12px 0',
                        letterSpacing: '-0.03em',
                        lineHeight: '1.15',
                        background: 'linear-gradient(to right, #ffffff, #cbd5e1)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        Descubre productos excepcionales
                    </h1>
                    <p style={{
                        margin: '0 0 28px 0',
                        color: '#94a3b8',
                        fontSize: '16px',
                        lineHeight: '1.6',
                        maxWidth: '540px'
                    }}>
                        Calidad garantizada en cada artículo, envíos seguros y la mejor atención a nuestros clientes.
                    </p>

                    {/* Buscador Integrado */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: '#ffffff',
                        borderRadius: '16px',
                        padding: '6px 8px 6px 18px',
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
                        maxWidth: '540px'
                    }}>
                        <Search size={20} color="#64748b" style={{ marginRight: '12px', flexShrink: 0 }} />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Buscar por marca, artículo o palabra clave..."
                            style={{
                                width: '100%',
                                border: 'none',
                                outline: 'none',
                                fontSize: '15px',
                                color: '#0f172a',
                                fontWeight: '500',
                                backgroundColor: 'transparent'
                            }}
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                style={{
                                    border: 'none',
                                    backgroundColor: '#f1f5f9',
                                    borderRadius: '50%',
                                    width: '28px',
                                    height: '28px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    marginRight: '6px'
                                }}
                            >
                                <X size={14} color="#64748b" />
                            </button>
                        )}
                    </div>
                </div>

                <ShoppingCart size={280} color="#ffffff" style={{
                    position: 'absolute',
                    right: '-50px',
                    bottom: '-50px',
                    opacity: 0.05,
                    pointerEvents: 'none'
                }} />
            </div>

            {/* ALERTA DE ERROR */}
            {error && (
                <div style={{
                    backgroundColor: '#fef2f2',
                    border: '1px solid #fecdd3',
                    color: '#991b1b',
                    padding: '16px 20px',
                    borderRadius: '16px',
                    fontSize: '14px',
                    marginBottom: '28px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    boxShadow: '0 2px 8px rgba(239, 68, 68, 0.08)'
                }}>
                    <Info size={22} color="#dc2626" style={{ flexShrink: 0 }} />
                    <div style={{ flexGrow: 1 }}>
                        <strong style={{ fontWeight: '700' }}>Error de conexión:</strong> {error}
                    </div>
                </div>
            )}

            {/* BARRA DE HERRAMIENTAS: CATEGORÍAS Y ORDENAMIENTO */}
            <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '20px',
                padding: '16px 20px',
                border: '1px solid #e2e8f0',
                marginBottom: '28px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px'
            }}>
                {/* Categorías (Chips) */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    overflowX: 'auto',
                    maxWidth: '100%',
                    paddingBottom: '4px'
                }}>
                    <span style={{
                        fontSize: '13px',
                        fontWeight: '800',
                        color: '#64748b',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        marginRight: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        flexShrink: 0
                    }}>
                        <SlidersHorizontal size={15} /> Filtros:
                    </span>

                    <button
                        onClick={() => setSelecionCategoria('Todos')}
                        style={{
                            padding: '8px 18px',
                            borderRadius: '12px',
                            fontSize: '13px',
                            fontWeight: selecionCategoria === 'Todos' ? '700' : '600',
                            color: selecionCategoria === 'Todos' ? '#ffffff' : '#475569',
                            backgroundColor: selecionCategoria === 'Todos' ? '#2563eb' : '#f8fafc',
                            border: selecionCategoria === 'Todos' ? '1px solid #2563eb' : '1px solid #e2e8f0',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        Todas ({productos.length})
                    </button>

                    {categorias.map((cat) => {
                        const active = selecionCategoria === cat.nombre;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setSelecionCategoria(cat.nombre)}
                                style={{
                                    padding: '8px 18px',
                                    borderRadius: '12px',
                                    fontSize: '13px',
                                    fontWeight: active ? '700' : '600',
                                    color: active ? '#ffffff' : '#475569',
                                    backgroundColor: active ? '#2563eb' : '#f8fafc',
                                    border: active ? '1px solid #2563eb' : '1px solid #e2e8f0',
                                    cursor: 'pointer',
                                    whiteSpace: 'nowrap',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                {cat.nombre}
                            </button>
                        );
                    })}
                </div>

                {/* Ordenamiento */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <ArrowUpDown size={15} color="#64748b" />
                    <select
                        value={orden}
                        onChange={(e) => setOrden(e.target.value)}
                        style={{
                            padding: '8px 14px',
                            borderRadius: '12px',
                            border: '1px solid #cbd5e1',
                            fontSize: '13px',
                            fontWeight: '600',
                            color: '#334155',
                            backgroundColor: '#ffffff',
                            outline: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        <option value="defecto">Ordenar por: Relevancia</option>
                        <option value="precio-asc">Precio: Menor a Mayor</option>
                        <option value="precio-desc">Precio: Mayor a Menor</option>
                        <option value="nombre">Nombre (A-Z)</option>
                    </select>

                    {(searchQuery || selecionCategoria !== 'Todos' || orden !== 'defecto') && (
                        <button
                            onClick={limpiarFiltros}
                            title="Limpiar filtros"
                            style={{
                                padding: '8px 12px',
                                borderRadius: '12px',
                                border: '1px solid #fca5a5',
                                backgroundColor: '#fef2f2',
                                color: '#ef4444',
                                fontSize: '12px',
                                fontWeight: '700',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                            }}
                        >
                            <X size={14} /> Limpiar
                        </button>
                    )}
                </div>
            </div>

            {/* METRICAS DE RESULTADOS */}
            <div style={{
                marginBottom: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0 4px'
            }}>
                <span style={{ fontSize: '14px', color: '#64748b', fontWeight: '600' }}>
                    Mostrando <strong style={{ color: '#0f172a' }}>{productosOrdenados.length}</strong> productos
                </span>
            </div>

            {/* GRID DE PRODUCTOS */}
            {productosOrdenados.length === 0 ? (
                <div style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '24px',
                    border: '1px solid #e2e8f0',
                    padding: '70px 24px',
                    textAlign: 'center',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
                }}>
                    <div style={{
                        width: '72px',
                        height: '72px',
                        backgroundColor: '#f1f5f9',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 16px auto'
                    }}>
                        <AlertTriangle size={36} color="#94a3b8" />
                    </div>
                    <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', margin: '0 0 8px 0' }}>
                        Sin resultados coincidentes
                    </h3>
                    <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 20px 0', maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' }}>
                        No encontramos ningún producto que cumpla con los criterios de búsqueda o categoría seleccionada.
                    </p>
                    <button
                        onClick={limpiarFiltros}
                        style={{
                            padding: '10px 24px',
                            backgroundColor: '#2563eb',
                            color: '#ffffff',
                            borderRadius: '12px',
                            border: 'none',
                            fontWeight: '700',
                            fontSize: '14px',
                            cursor: 'pointer'
                        }}
                    >
                        Ver todos los productos
                    </button>
                </div>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
                    gap: '24px'
                }}>
                    {productosOrdenados.map((producto) => {
                        const defaultImage = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400";
                        const isOutOfStock = producto.stock <= 0;
                        const isLowStock = producto.stock > 0 && producto.stock <= 3;

                        return (
                            <div
                                key={producto.id}
                                style={{
                                    backgroundColor: '#ffffff',
                                    borderRadius: '22px',
                                    border: '1px solid #e2e8f0',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
                                    transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                                    position: 'relative'
                                }}
                            >
                                {/* Contenedor Imagen */}
                                <div style={{
                                    height: '210px',
                                    width: '100%',
                                    backgroundColor: '#f8fafc',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}>
                                    <img
                                        src={producto.imagenUrl || defaultImage}
                                        alt={producto.nombre}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover'
                                        }}
                                        onError={(e) => {
                                            e.target.src = defaultImage;
                                        }}
                                    />
                                    
                                    {/* Tag Categoría */}
                                    {producto.categoria && (
                                        <span style={{
                                            position: 'absolute',
                                            top: '12px',
                                            left: '12px',
                                            backgroundColor: 'rgba(15, 23, 42, 0.85)',
                                            backdropFilter: 'blur(8px)',
                                            color: '#ffffff',
                                            fontSize: '11px',
                                            fontWeight: '700',
                                            padding: '5px 12px',
                                            borderRadius: '20px',
                                            letterSpacing: '0.02em'
                                        }}>
                                            {producto.categoria.nombre}
                                        </span>
                                    )}

                                    {/* Stock Badge */}
                                    <span style={{
                                        position: 'absolute',
                                        top: '12px',
                                        right: '12px',
                                        backgroundColor: isOutOfStock 
                                            ? '#ef4444' 
                                            : isLowStock 
                                                ? '#f59e0b' 
                                                : '#10b981',
                                        color: '#ffffff',
                                        fontSize: '11px',
                                        fontWeight: '800',
                                        padding: '5px 10px',
                                        borderRadius: '20px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '5px',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                                    }}>
                                        {isOutOfStock ? (
                                            <>
                                                <PackageX size={13} /> Agotado
                                            </>
                                        ) : isLowStock ? (
                                            <>
                                                <AlertTriangle size={13} /> ¡Últimas {producto.stock}!
                                            </>
                                        ) : (
                                            <>
                                                <CheckCircle2 size={13} /> Disponible ({producto.stock})
                                            </>
                                        )}
                                    </span>
                                </div>

                                {/* Cuerpo de la Tarjeta */}
                                <div style={{
                                    padding: '20px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    flexGrow: 1,
                                    justifyContent: 'space-between',
                                    gap: '16px'
                                }}>
                                    <div>
                                        <h3 style={{
                                            fontSize: '17px',
                                            fontWeight: '800',
                                            color: '#0f172a',
                                            margin: '0 0 8px 0',
                                            lineHeight: '1.3',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        }} title={producto.nombre}>
                                            {producto.nombre}
                                        </h3>
                                        <p style={{
                                            fontSize: '13px',
                                            color: '#64748b',
                                            margin: 0,
                                            height: '38px',
                                            overflow: 'hidden',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            lineHeight: '1.45'
                                        }}>
                                            {producto.descripcion || 'Sin descripción detallada disponible.'}
                                        </p>
                                    </div>

                                    {/* Precio y Botones */}
                                    <div>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'baseline',
                                            gap: '6px',
                                            marginBottom: '16px'
                                        }}>
                                            <span style={{ fontSize: '22px', fontWeight: '900', color: '#0f172a', letterSpacing: '-0.02em' }}>
                                                ${producto.precio?.toLocaleString('es-MX', { minimumFractionDigits: 2 }) || '0.00'}
                                            </span>
                                            <span style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>
                                                MXN
                                            </span>
                                        </div>

                                        {/* Acciones del Producto */}
                                        {!isOutOfStock && user && isClient && (
                                            <div style={{ display: 'flex', gap: '10px' }}>
                                                <button
                                                    onClick={() => handleAddToCart(producto)}
                                                    title="Agregar al carrito"
                                                    style={{
                                                        flex: 1,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        gap: '6px',
                                                        padding: '11px 10px',
                                                        borderRadius: '14px',
                                                        fontWeight: '700',
                                                        fontSize: '13px',
                                                        backgroundColor: '#f1f5f9',
                                                        color: '#1e293b',
                                                        border: '1px solid #cbd5e1',
                                                        cursor: 'pointer',
                                                        transition: 'background-color 0.15s ease'
                                                    }}
                                                >
                                                    <ShoppingCart size={16} color="#1e293b" />
                                                    <span>+ Carrito</span>
                                                </button>

                                                <button
                                                    onClick={() => handleComprarAhora(producto)}
                                                    title="Comprar inmediatamente"
                                                    style={{
                                                        flex: 1,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        gap: '6px',
                                                        padding: '11px 10px',
                                                        borderRadius: '14px',
                                                        fontWeight: '700',
                                                        fontSize: '13px',
                                                        backgroundColor: '#2563eb',
                                                        color: '#ffffff',
                                                        border: 'none',
                                                        cursor: 'pointer',
                                                        boxShadow: '0 4px 12px rgba(37, 99, 235, 0.35)',
                                                        transition: 'transform 0.15s ease'
                                                    }}
                                                >
                                                    <Zap size={16} color="#ffffff" />
                                                    <span>Comprar</span>
                                                </button>
                                            </div>
                                        )}

                                        {!isOutOfStock && user && !isClient && (
                                            <button
                                                disabled
                                                style={{
                                                    width: '100%',
                                                    padding: '12px',
                                                    borderRadius: '14px',
                                                    fontWeight: '700',
                                                    fontSize: '13px',
                                                    backgroundColor: '#f1f5f9',
                                                    color: '#94a3b8',
                                                    border: 'none',
                                                    cursor: 'not-allowed'
                                                }}
                                            >
                                                Exclusivo para clientes
                                            </button>
                                        )}

                                        {!isOutOfStock && !user && (
                                            <button
                                                onClick={() => setVistaActual('login')}
                                                style={{
                                                    width: '100%',
                                                    padding: '12px',
                                                    borderRadius: '14px',
                                                    fontWeight: '700',
                                                    fontSize: '13px',
                                                    backgroundColor: '#eff6ff',
                                                    color: '#2563eb',
                                                    border: '1px solid #bfdbfe',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: '8px'
                                                }}
                                            >
                                                <LogIn size={16} color="#2563eb" />
                                                <span>Inicia sesión para comprar</span>
                                            </button>
                                        )}

                                        {isOutOfStock && (
                                            <button
                                                disabled
                                                style={{
                                                    width: '100%',
                                                    padding: '12px',
                                                    borderRadius: '14px',
                                                    fontWeight: '700',
                                                    fontSize: '13px',
                                                    backgroundColor: '#f8fafc',
                                                    color: '#94a3b8',
                                                    border: '1px solid #e2e8f0',
                                                    cursor: 'not-allowed'
                                                }}
                                            >
                                                Sin stock disponible
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};