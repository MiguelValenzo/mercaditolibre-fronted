import React, { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';
import { 
    Search, ShoppingCart, Info, AlertTriangle, Zap, LogIn, 
    CheckCircle2, PackageX, Sparkles, SlidersHorizontal, ArrowUpDown, X,
    Loader2
} from 'lucide-react';

export const Catalogo = ({ setVistaActual, user, addToCart, comprarAhora }) => {
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [carga, setCarga] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [selecionCategoria, setSelecionCategoria] = useState('Todos');
    const [orden, setOrden] = useState('defecto');

    const isClient = user && (user.rol === 'CLIENTE' || user.rol === 'ROLE_CLIENTE');

    useEffect(() => {
        const cargaDatosCatalogo = async () => {
            setCarga(true);
            setError('');
            try {
                const datosProductos = await apiService.getProductos();
                console.log('📦 Productos recibidos:', datosProductos);
                setProductos(datosProductos || []);

                const datosCategorias = await apiService.getCategorias();
                console.log('📂 Categorías recibidas:', datosCategorias);
                
                // 🔥 ELIMINAR DUPLICADOS POR NOMBRE 🔥
                const categoriasUnicas = [];
                const nombresVistos = new Set();
                
                datosCategorias.forEach(cat => {
                    if (cat && cat.nombre && !nombresVistos.has(cat.nombre)) {
                        nombresVistos.add(cat.nombre);
                        categoriasUnicas.push(cat);
                    }
                });
                
                setCategorias(categoriasUnicas || []);
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
        if (!user) {
            setVistaActual('login');
            return;
        }
        if (!isClient) {
            alert('Solo los clientes pueden realizar compras.');
            return;
        }
        if (comprarAhora) {
            comprarAhora(producto);
        }
    };

    // ✅ FILTRO CORREGIDO - Ahora verifica que categoria existe
    const productosFiltrados = productos.filter((producto) => {
        // Buscar por nombre o descripción
        const busqueda =
            producto.nombre?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (producto.descripcion && producto.descripcion.toLowerCase().includes(searchQuery.toLowerCase()));

        // ✅ Obtener nombre de categoría de forma segura
        const categoriaNombre = producto.categoria?.nombre || '';
        const busquedaCategorias =
            selecionCategoria === 'Todos' ||
            categoriaNombre === selecionCategoria;

        return busqueda && busquedaCategorias;
    });

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
                fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                background: '#0f172a'
            }}>
                <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '24px',
                    background: '#1e293b',
                    border: '1px solid #334155',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#818cf8',
                    boxShadow: '0 10px 25px -5px rgba(79, 70, 229, 0.3)'
                }}>
                    <Loader2 style={{ width: '32px', height: '32px', animation: 'spin 1s linear infinite' }} />
                </div>
                <p style={{ color: '#94a3b8', marginTop: '20px', fontWeight: '700', fontSize: '16px' }}>
                    Sincronizando inventario...
                </p>
                <style>{`
                    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                `}</style>
            </div>
        );
    }

    return (
        <div style={{
            maxWidth: '1320px',
            margin: '0 auto',
            padding: '24px 20px 64px 20px',
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            boxSizing: 'border-box',
            background: '#0f172a',
            minHeight: '100vh'
        }}>
            
            {/* HERO BANNER PREMIUM - MODO OSCURO */}
            <div style={{
                background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)',
                borderRadius: '28px',
                padding: '40px 36px',
                marginBottom: '32px',
                color: '#ffffff',
                boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.6)',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid rgba(99, 102, 241, 0.2)'
            }}>
                <div style={{
                    position: 'absolute',
                    right: '-30px',
                    top: '-30px',
                    width: '200px',
                    height: '200px',
                    background: 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, rgba(255,255,255,0) 70%)',
                    borderRadius: '50%',
                    pointerEvents: 'none'
                }}></div>

                <div style={{ position: 'relative', zIndex: 2, maxWidth: '680px' }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        backgroundColor: 'rgba(99, 102, 241, 0.2)',
                        border: '1px solid rgba(99, 102, 241, 0.3)',
                        color: '#a5b4fc',
                        padding: '6px 14px',
                        borderRadius: '30px',
                        fontSize: '11px',
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
                        color: '#ffffff'
                    }}>
                        Descubre productos excepcionales
                    </h1>
                    <p style={{
                        margin: '0 0 28px 0',
                        color: '#c7d2fe',
                        fontSize: '16px',
                        lineHeight: '1.6',
                        maxWidth: '540px'
                    }}>
                        Calidad garantizada en cada artículo, envíos seguros y la mejor atención a nuestros clientes.
                    </p>

                    {/* Buscador Integrado - Modo Oscuro */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: '#1e293b',
                        borderRadius: '16px',
                        padding: '6px 8px 6px 18px',
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                        maxWidth: '540px',
                        border: '1px solid #334155'
                    }}>
                        <Search size={20} color="#94a3b8" style={{ marginRight: '12px', flexShrink: 0 }} />
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
                                color: '#f1f5f9',
                                fontWeight: '500',
                                backgroundColor: 'transparent'
                            }}
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                style={{
                                    border: 'none',
                                    backgroundColor: '#334155',
                                    borderRadius: '50%',
                                    width: '28px',
                                    height: '28px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    marginRight: '6px',
                                    color: '#94a3b8'
                                }}
                            >
                                <X size={14} />
                            </button>
                        )}
                    </div>
                </div>

                <ShoppingCart size={280} style={{
                    position: 'absolute',
                    right: '-50px',
                    bottom: '-50px',
                    opacity: 0.05,
                    pointerEvents: 'none',
                    color: '#ffffff'
                }} />
            </div>

            {/* ALERTA DE ERROR - Modo Oscuro */}
            {error && (
                <div style={{
                    backgroundColor: '#450a0a',
                    border: '1px solid #7f1d1d',
                    color: '#fca5a5',
                    padding: '16px 20px',
                    borderRadius: '16px',
                    fontSize: '14px',
                    marginBottom: '28px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    boxShadow: '0 2px 8px rgba(239, 68, 68, 0.08)'
                }}>
                    <Info size={22} color="#f87171" style={{ flexShrink: 0 }} />
                    <div style={{ flexGrow: 1 }}>
                        <strong style={{ fontWeight: '700' }}>Error de conexión:</strong> {error}
                    </div>
                </div>
            )}

            {/* BARRA DE HERRAMIENTAS - Modo Oscuro */}
            <div style={{
                backgroundColor: '#1e293b',
                borderRadius: '20px',
                padding: '16px 20px',
                border: '1px solid #334155',
                marginBottom: '28px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
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
                    paddingBottom: '4px',
                    flexWrap: 'wrap'
                }}>
                    <span style={{
                        fontSize: '13px',
                        fontWeight: '800',
                        color: '#94a3b8',
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
                            color: selecionCategoria === 'Todos' ? '#ffffff' : '#94a3b8',
                            backgroundColor: selecionCategoria === 'Todos' ? '#4f46e5' : '#0f172a',
                            border: selecionCategoria === 'Todos' ? '1px solid #4f46e5' : '1px solid #334155',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        Todas ({productos.length})
                    </button>

                    {/* 🔥 CATEGORÍAS ÚNICAS - CON VERIFICACIÓN DE SEGURIDAD */}
                    {categorias.map((cat) => {
                        // ✅ Verificar que la categoría existe y tiene nombre
                        if (!cat || !cat.nombre) return null;
                        
                        const active = selecionCategoria === cat.nombre;
                        return (
                            <button
                                key={cat.id || cat.nombre}
                                onClick={() => setSelecionCategoria(cat.nombre)}
                                style={{
                                    padding: '8px 18px',
                                    borderRadius: '12px',
                                    fontSize: '13px',
                                    fontWeight: active ? '700' : '600',
                                    color: active ? '#ffffff' : '#94a3b8',
                                    backgroundColor: active ? '#4f46e5' : '#0f172a',
                                    border: active ? '1px solid #4f46e5' : '1px solid #334155',
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <ArrowUpDown size={15} color="#94a3b8" />
                    <select
                        value={orden}
                        onChange={(e) => setOrden(e.target.value)}
                        style={{
                            padding: '8px 14px',
                            borderRadius: '12px',
                            border: '1px solid #334155',
                            fontSize: '13px',
                            fontWeight: '600',
                            color: '#f1f5f9',
                            backgroundColor: '#0f172a',
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
                                border: '1px solid #7f1d1d',
                                backgroundColor: '#450a0a',
                                color: '#fca5a5',
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

            {/* METRICAS DE RESULTADOS - Modo Oscuro */}
            <div style={{
                marginBottom: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0 4px'
            }}>
                <span style={{ fontSize: '14px', color: '#94a3b8', fontWeight: '600' }}>
                    Mostrando <strong style={{ color: '#f1f5f9' }}>{productosOrdenados.length}</strong> productos
                </span>
            </div>

            {/* GRID DE PRODUCTOS - Modo Oscuro */}
            {productosOrdenados.length === 0 ? (
                <div style={{
                    backgroundColor: '#1e293b',
                    borderRadius: '24px',
                    border: '1px solid #334155',
                    padding: '70px 24px',
                    textAlign: 'center',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
                }}>
                    <div style={{
                        width: '72px',
                        height: '72px',
                        backgroundColor: '#0f172a',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 16px auto',
                        border: '1px solid #334155'
                    }}>
                        <AlertTriangle size={36} color="#64748b" />
                    </div>
                    <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#f1f5f9', margin: '0 0 8px 0' }}>
                        Sin resultados coincidentes
                    </h3>
                    <p style={{ fontSize: '14px', color: '#94a3b8', margin: '0 0 20px 0', maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' }}>
                        No encontramos ningún producto que cumpla con los criterios de búsqueda o categoría seleccionada.
                    </p>
                    <button
                        onClick={limpiarFiltros}
                        style={{
                            padding: '10px 24px',
                            background: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)',
                            color: '#ffffff',
                            borderRadius: '12px',
                            border: 'none',
                            fontWeight: '700',
                            fontSize: '14px',
                            cursor: 'pointer',
                            boxShadow: '0 8px 16px -4px rgba(79, 70, 229, 0.3)'
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
                                    backgroundColor: '#1e293b',
                                    borderRadius: '22px',
                                    border: '1px solid #334155',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
                                    transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                                    position: 'relative'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-4px)';
                                    e.currentTarget.style.boxShadow = '0 20px 40px -12px rgba(79, 70, 229, 0.3)';
                                    e.currentTarget.style.borderColor = '#4f46e5';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.3)';
                                    e.currentTarget.style.borderColor = '#334155';
                                }}
                            >
                                {/* Contenedor Imagen */}
                                <div style={{
                                    height: '210px',
                                    width: '100%',
                                    backgroundColor: '#0f172a',
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
                                    
                                    {/* Tag Categoría - Modo Oscuro */}
                                    {producto.categoria && producto.categoria.nombre && (
                                        <span style={{
                                            position: 'absolute',
                                            top: '12px',
                                            left: '12px',
                                            backgroundColor: 'rgba(15, 23, 42, 0.9)',
                                            backdropFilter: 'blur(8px)',
                                            color: '#c7d2fe',
                                            fontSize: '11px',
                                            fontWeight: '700',
                                            padding: '5px 12px',
                                            borderRadius: '20px',
                                            letterSpacing: '0.02em',
                                            border: '1px solid rgba(99, 102, 241, 0.2)'
                                        }}>
                                            {producto.categoria.nombre}
                                        </span>
                                    )}

                                    {/* Stock Badge - Modo Oscuro */}
                                    <span style={{
                                        position: 'absolute',
                                        top: '12px',
                                        right: '12px',
                                        backgroundColor: isOutOfStock 
                                            ? '#7f1d1d' 
                                            : isLowStock 
                                                ? '#78350f' 
                                                : '#065f46',
                                        color: '#ffffff',
                                        fontSize: '11px',
                                        fontWeight: '800',
                                        padding: '5px 10px',
                                        borderRadius: '20px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '5px',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
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

                                {/* Cuerpo de la Tarjeta - Modo Oscuro */}
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
                                            color: '#f1f5f9',
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
                                            color: '#94a3b8',
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

                                    {/* Precio y Botones - Modo Oscuro */}
                                    <div>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'baseline',
                                            gap: '6px',
                                            marginBottom: '16px'
                                        }}>
                                            <span style={{ fontSize: '22px', fontWeight: '900', color: '#f1f5f9', letterSpacing: '-0.02em' }}>
                                                ${producto.precio?.toLocaleString('es-MX', { minimumFractionDigits: 2 }) || '0.00'}
                                            </span>
                                            <span style={{ fontSize: '12px', fontWeight: '700', color: '#94a3b8' }}>
                                                MXN
                                            </span>
                                        </div>

                                        {/* Acciones del Producto - Modo Oscuro */}
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
                                                        backgroundColor: '#0f172a',
                                                        color: '#94a3b8',
                                                        border: '1px solid #334155',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.15s ease'
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.backgroundColor = '#334155';
                                                        e.currentTarget.style.color = '#f1f5f9';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.backgroundColor = '#0f172a';
                                                        e.currentTarget.style.color = '#94a3b8';
                                                    }}
                                                >
                                                    <ShoppingCart size={16} color="#94a3b8" />
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
                                                        background: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)',
                                                        color: '#ffffff',
                                                        border: 'none',
                                                        cursor: 'pointer',
                                                        boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)',
                                                        transition: 'transform 0.15s ease'
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                                        e.currentTarget.style.boxShadow = '0 8px 20px rgba(79, 70, 229, 0.4)';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.transform = 'translateY(0)';
                                                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(79, 70, 229, 0.3)';
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
                                                    backgroundColor: '#0f172a',
                                                    color: '#64748b',
                                                    border: '1px solid #334155',
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
                                                    backgroundColor: '#1e293b',
                                                    color: '#818cf8',
                                                    border: '1px solid #4f46e5',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: '8px',
                                                    transition: 'all 0.15s ease'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.backgroundColor = '#2d3748';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.backgroundColor = '#1e293b';
                                                }}
                                            >
                                                <LogIn size={16} color="#818cf8" />
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
                                                    backgroundColor: '#0f172a',
                                                    color: '#64748b',
                                                    border: '1px solid #334155',
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