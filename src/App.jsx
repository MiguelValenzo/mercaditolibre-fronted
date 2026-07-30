import React, { useState, useEffect } from 'react';
import Footer from './components/Footer';
import { Catalogo } from './components/Catalogo';
import { Navbar } from './components/Navbar';
import AdminPanel from './components/admin/AdminPanel';
import Login from './components/Login';
import Registro from './components/Registro';
import Cart from './components/Cart';
import { CheckoutForm } from './components/CheckoutForm';
import { Purchases } from './components/Purchases';
import { apiService } from './services/apiService';
import Profile from './components/Profile';

function App() {
    const [vistaActual, setVistaActual] = useState('catalogo');
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [ventaActiva, setVentaActiva] = useState(null);
    const [adminSubTab, setAdminSubTab] = useState('usuarios');
    const [mensaje, setMensaje] = useState(null);

    const getCartKey = (username) => {
        return `cart_${username}`;
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        const email = localStorage.getItem('email');
        const nombre = localStorage.getItem('nombre');
        const rol = localStorage.getItem('rol');

        if (token && username) {
            console.log(' Cargando usuario desde localStorage:', { username, email, nombre, rol });
            setUser({
                username,
                email,
                nombre,
                rol: rol || 'CLIENTE'
            });

            // ✅ Cargar carrito del usuario específico
            cargarCarritoPorUsuario(username);
        } else {
            // ✅ Si no hay usuario, el carrito debe estar vacío
            setCart([]);
        }
    }, []);

    // ✅ Función para cargar carrito de un usuario específico
    const cargarCarritoPorUsuario = (username) => {
        const cartKey = getCartKey(username);
        const carritoGuardado = localStorage.getItem(cartKey);
        
        if (carritoGuardado) {
            try {
                const carritoParseado = JSON.parse(carritoGuardado);
                console.log(` Carrito cargado para ${username}:`, carritoParseado);
                setCart(carritoParseado);
            } catch (error) {
                console.error(' Error al cargar carrito:', error);
                localStorage.removeItem(cartKey);
                setCart([]);
            }
        } else {
            console.log(` No hay carrito guardado para ${username}`);
            setCart([]);
        }
    };

    // ✅ Guardar carrito en localStorage cuando cambie (solo si hay usuario)
    useEffect(() => {
        if (user && user.username) {
            const cartKey = getCartKey(user.username);
            console.log(` Guardando carrito para ${user.username}:`, cart);
            localStorage.setItem(cartKey, JSON.stringify(cart));
        }
    }, [cart, user]);

    const mostrarMensaje = (texto, tipo = 'success') => {
        setMensaje({ texto, tipo });
        setTimeout(() => setMensaje(null), 3000);
    };

    const guardarUsuario = (userData) => {
        console.log(' Guardando usuario:', userData);
        
        if (userData.token) {
            localStorage.setItem('token', userData.token);
        }
        if (userData.username) {
            localStorage.setItem('username', userData.username);
        }
        if (userData.email) {
            localStorage.setItem('email', userData.email);
        }
        if (userData.nombre) {
            localStorage.setItem('nombre', userData.nombre);
        }
        if (userData.rol) {
            localStorage.setItem('rol', userData.rol);
        }
        
        setUser({
            username: userData.username,
            email: userData.email,
            nombre: userData.nombre,
            rol: userData.rol
        });

        cargarCarritoPorUsuario(userData.username);
    };

    const AddToCart = (producto) => {
        if (!user || !user.username) {
            mostrarMensaje('Inicia sesión para agregar productos al carrito', 'error');
            setVistaActual('login');
            return;
        }

        console.log(` Añadiendo al carrito de ${user.username}:`, producto.nombre);
        setCart((prevCart) => {
            const existing = prevCart.find(
                (item) => item.producto.id === producto.id
            );

            if (existing) {
                if (existing.cantidad >= producto.stock) {
                    mostrarMensaje(`No hay más stock de ${producto.nombre}`, 'error');
                    return prevCart;
                }
                mostrarMensaje(`Otra unidad de ${producto.nombre} añadida`, 'success');
                return prevCart.map((item) =>
                    item.producto.id === producto.id
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                );
            }

            mostrarMensaje(`${producto.nombre} añadido al carrito`, 'success');
            return [...prevCart, { producto: producto, cantidad: 1 }];
        });

        setIsCartOpen(true);
    };

    const comprarAhora = async (producto) => {
        console.log('Comprar ahora:', producto.nombre);
        console.log('Usuario actual:', user);
        
        if (!user) {
            console.log(' No hay usuario, redirigiendo a login');
            setVistaActual('login');
            return;
        }

        console.log('🔑 Rol del usuario:', user.rol);
        
        if (user.rol !== 'CLIENTE') {
            console.log(' Usuario no es CLIENTE, es:', user.rol);
            mostrarMensaje('Solo los clientes pueden realizar compras.', 'error');
            return;
        }

        try {
            mostrarMensaje('Procesando compra...', 'info');
            
            const ventaPayload = {
                detalles: [
                    {
                        producto: { id: producto.id },
                        cantidad: 1
                    }
                ]
            };

            console.log(' Enviando venta:', ventaPayload);
            const venta = await apiService.procesarVenta(ventaPayload);
            console.log(' Venta creada:', venta);
            
            setVentaActiva(venta);
            // ✅ Limpiar carrito del usuario después de comprar
            const cartKey = getCartKey(user.username);
            localStorage.removeItem(cartKey);
            setCart([]);
            
            setVistaActual('checkout');
            
        } catch (err) {
            console.error(' Error al procesar la compra:', err);
            mostrarMensaje(err.message || 'Error al procesar la compra', 'error');
        }
    };

    const UpdateQuantity = (productoId, nuevaCantidad) => {
        if (nuevaCantidad <= 0) {
            removeFromCart(productoId);
            return;
        }

        setCart((prevCart) =>
            prevCart.map((item) => {
                if (item.producto.id === productoId) {
                    if (nuevaCantidad > item.producto.stock) {
                        mostrarMensaje(`No se puede exceder el stock disponible: ${item.producto.stock}`, 'error');
                        return item;
                    }
                    return { ...item, cantidad: nuevaCantidad };
                }
                return item;
            })
        );
    };

    const removeFromCart = (productoId) => {
        setCart((prevCart) =>
            prevCart.filter((item) => item.producto.id !== productoId)
        );
        mostrarMensaje('Producto eliminado del carrito', 'info');
    };

    const clearCart = () => {
        setCart([]);
        if (user && user.username) {
            const cartKey = getCartKey(user.username);
            localStorage.removeItem(cartKey);
        }
        mostrarMensaje('Carrito vaciado', 'info');
    };

    // ✅ cartCount solo cuenta si hay usuario
    const cartCount = user ? cart.reduce((sum, item) => sum + item.cantidad, 0) : 0;

    const handleLoginSuccess = (userData) => {
        console.log(' Login exitoso, datos:', userData);
        guardarUsuario(userData);
        
        if (userData.rol === 'ADMIN') {
            setVistaActual('admin-panel');
        } else {
            setVistaActual('catalogo');
        }
    };

    const handleLogout = () => {
        // ✅ Guardar el carrito antes de cerrar sesión
        if (user && user.username) {
            const cartKey = getCartKey(user.username);
            localStorage.setItem(cartKey, JSON.stringify(cart));
            console.log(` Carrito guardado para ${user.username} antes de cerrar sesión`);
        }
        
        // ✅ Limpiar estado de usuario
        setUser(null);
        setVentaActiva(null);
        setVistaActual('catalogo');
        
        // ✅ Limpiar localStorage de sesión
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('nombre');
        localStorage.removeItem('rol');
        
        // ✅ El carrito se limpia de la vista porque cartCount es 0 al no haber usuario
        console.log(' Sesión cerrada, carrito guardado por usuario');
    };

   const vistaContenido = () => {
    switch (vistaActual) {
        case 'catalogo':
            return (
                <Catalogo
                    setVistaActual={setVistaActual}
                    user={user}
                    addToCart={AddToCart}
                    comprarAhora={comprarAhora}
                />
            );
        case 'admin-panel':
            return <AdminPanel />;
        case 'login':
            return (
                <Login
                    onLoginSuccess={handleLoginSuccess}
                    onGoToRegister={() => setVistaActual('register')}
                />
            );
        case 'register':
            return (
                <Registro
                    onRegistroSuccess={() => setVistaActual('login')}
                    onGoToLogin={() => setVistaActual('login')}
                />
            );
        case 'checkout':
            return (
                <CheckoutForm
                    ventaActiva={ventaActiva}
                    setVistaActual={setVistaActual}
                />
            );
        case 'miscompras':
            return <Purchases />;
        case 'profile':  // ✅ AGREGAR ESTA LÍNEA
            return <Profile user={user} onUpdateUser={setUser} />;
        default:
            return (
                <Catalogo
                    setVistaActual={setVistaActual}
                    user={user}
                    addToCart={AddToCart}
                    comprarAhora={comprarAhora}
                />
            );
    }
};

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800 antialiased">
            <Navbar
                vistaActual={vistaActual}
                setVistaActual={setVistaActual}
                user={user}
                onLogout={handleLogout}
                cartCount={cartCount}
                openCart={() => setIsCartOpen(true)}
            />
            <main className="flex-grow pb-12">
                {vistaContenido()}
            </main>

            {mensaje && (
                <div className={`fixed bottom-4 right-4 z-50 px-6 py-3 rounded-xl shadow-lg text-white font-medium transition-all duration-500 ${
                    mensaje.tipo === 'success' ? 'bg-green-600' :
                    mensaje.tipo === 'error' ? 'bg-red-600' :
                    'bg-blue-600'
                }`}>
                    {mensaje.texto}
                </div>
            )}

            <Cart
                isOpen={isCartOpen}
                setIsOpen={setIsCartOpen}
                onClick={() => setIsCartOpen(false)}
                cart={cart}
                updateQuantity={UpdateQuantity}
                removeFromCart={removeFromCart}
                clearCart={clearCart}
                setVistaActual={setVistaActual}
                setVentaActiva={setVentaActiva}
                user={user}
            />

            <Footer />
        </div>
    );
}

export default App;