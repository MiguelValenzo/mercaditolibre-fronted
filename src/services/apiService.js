// ✅ URL del backend en Coolify
const API_URL = 'http://unzr6gaqki9es0mhgo3crihe.2.24.111.114.sslip.io:8085/api/v1/';

// Manejo de errores
const handleResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || 'Error en la solicitud a la API');
    }
    if (response.status === 204) return null;
    return await response.json();
};

// Obtener headers con token
const getHeaders = () => {
    const token = localStorage.getItem('token');
    console.log('🔑 Token en headers:', token ? '✅ Token existe' : '❌ No hay token');
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
    };
};

export const apiService = {

    // =============================================
    // AUTENTICACIÓN
    // =============================================

    login: async (email, password) => {
        console.log('🔐 Intentando login con:', email);
        const response = await fetch(API_URL + 'auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await handleResponse(response);

        if (data && data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.username);
            localStorage.setItem('email', data.email);
            localStorage.setItem('nombre', data.nombre);
            localStorage.setItem('rol', data.rol);
            console.log('✅ Token guardado, rol:', data.rol);
        }

        return data;
    },

    registro: async (userData) => {
        console.log('📝 Registrando usuario:', userData.email);
        const response = await fetch(API_URL + 'auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        return handleResponse(response);
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('nombre');
        localStorage.removeItem('rol');
        console.log('🚪 Sesión cerrada');
    },

    isAuthenticated: () => {
        return localStorage.getItem('token') !== null;
    },

    // =============================================
    // USUARIOS
    // =============================================

    getUsuarios: async () => {
        console.log('👤 Obteniendo usuarios...');
        const response = await fetch(API_URL + 'usuarios', {
            headers: getHeaders()
        });
        return handleResponse(response);
    },

    getUsuario: async (id) => {
        console.log('👤 Obteniendo usuario:', id);
        const response = await fetch(API_URL + 'usuarios/' + id, {
            headers: getHeaders()
        });
        return handleResponse(response);
    },

    getUsuarioByEmail: async (email) => {
        console.log('👤 Obteniendo usuario por email:', email);
        const response = await fetch(API_URL + 'usuarios/email/' + email, {
            headers: getHeaders()
        });
        return handleResponse(response);
    },

    crearUsuario: async (usuario) => {
        console.log('👤 Creando usuario:', usuario);
        const response = await fetch(API_URL + 'usuarios', {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(usuario),
        });
        return handleResponse(response);
    },

    actualizarUsuario: async (id, usuario) => {
        console.log('👤 Actualizando usuario:', id, usuario);
        const response = await fetch(API_URL + 'usuarios/' + id, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(usuario),
        });
        return handleResponse(response);
    },

    eliminarUsuario: async (id) => {
        console.log('🗑️ Eliminando usuario:', id);
        const response = await fetch(API_URL + 'usuarios/' + id, {
            method: 'DELETE',
            headers: getHeaders()
        });
        return handleResponse(response);
    },

    cambiarRol: async (id, rol) => {
        console.log('🔄 Cambiando rol del usuario:', id, rol);
        const response = await fetch(API_URL + 'usuarios/' + id + '/rol', {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(rol),
        });
        return handleResponse(response);
    },

    // =============================================
    // CLIENTES
    // =============================================

    getClientes: async () => {
        console.log('👤 Obteniendo clientes...');
        const response = await fetch(API_URL + 'clientes', {
            headers: getHeaders()
        });
        return handleResponse(response);
    },

    getCliente: async (id) => {
        console.log('👤 Obteniendo cliente:', id);
        const response = await fetch(API_URL + 'clientes/' + id, {
            headers: getHeaders()
        });
        return handleResponse(response);
    },

    crearCliente: async (cliente) => {
        console.log('👤 Creando cliente:', cliente);
        const response = await fetch(API_URL + 'clientes', {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(cliente),
        });
        return handleResponse(response);
    },

    actualizarCliente: async (id, cliente) => {
        console.log('👤 Actualizando cliente:', id, cliente);
        const response = await fetch(API_URL + 'clientes/' + id, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(cliente),
        });
        return handleResponse(response);
    },

    eliminarCliente: async (id) => {
        console.log('🗑️ Eliminando cliente:', id);
        const response = await fetch(API_URL + 'clientes/' + id, {
            method: 'DELETE',
            headers: getHeaders()
        });
        return handleResponse(response);
    },

    // =============================================
    // PRODUCTOS
    // =============================================

    getProductos: async () => {
        console.log('📦 Obteniendo productos...');
        const response = await fetch(API_URL + 'productos', {
            headers: getHeaders()
        });
        return handleResponse(response);
    },

    getProducto: async (id) => {
        console.log('📦 Obteniendo producto:', id);
        const response = await fetch(API_URL + 'productos/' + id, {
            headers: getHeaders()
        });
        return handleResponse(response);
    },

    crearProducto: async (producto) => {
        console.log('📦 Creando producto:', producto);
        const response = await fetch(API_URL + 'productos', {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(producto),
        });
        return handleResponse(response);
    },

    actualizarProducto: async (id, producto) => {
        console.log('📦 Actualizando producto:', id, producto);
        const response = await fetch(API_URL + 'productos/' + id, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(producto),
        });
        return handleResponse(response);
    },

    eliminarProducto: async (id) => {
        console.log('🗑️ Eliminando producto:', id);
        const response = await fetch(API_URL + 'productos/' + id, {
            method: 'DELETE',
            headers: getHeaders()
        });
        return handleResponse(response);
    },

    // =============================================
    // CATEGORÍAS
    // =============================================

    getCategorias: async () => {
        console.log('📂 Obteniendo categorías...');
        const response = await fetch(API_URL + 'categorias', {
            headers: getHeaders()
        });
        return handleResponse(response);
    },

    getCategoria: async (id) => {
        console.log('📂 Obteniendo categoría:', id);
        const response = await fetch(API_URL + 'categorias/' + id, {
            headers: getHeaders()
        });
        return handleResponse(response);
    },

    crearCategoria: async (categoria) => {
        console.log('📂 Creando categoría:', categoria);
        const response = await fetch(API_URL + 'categorias', {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(categoria),
        });
        return handleResponse(response);
    },

    actualizarCategoria: async (id, categoria) => {
        console.log('📂 Actualizando categoría:', id, categoria);
        const response = await fetch(API_URL + 'categorias/' + id, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(categoria),
        });
        return handleResponse(response);
    },

    eliminarCategoria: async (id) => {
        console.log('🗑️ Eliminando categoría:', id);
        const response = await fetch(API_URL + 'categorias/' + id, {
            method: 'DELETE',
            headers: getHeaders()
        });
        return handleResponse(response);
    },

    // =============================================
    // PROVEEDORES
    // =============================================

    getProveedores: async () => {
        console.log('🚚 Obteniendo proveedores...');
        const response = await fetch(API_URL + 'proveedores', {
            headers: getHeaders()
        });
        return handleResponse(response);
    },

    getProveedor: async (id) => {
        console.log('🚚 Obteniendo proveedor:', id);
        const response = await fetch(API_URL + 'proveedores/' + id, {
            headers: getHeaders()
        });
        return handleResponse(response);
    },

    crearProveedor: async (proveedor) => {
        console.log('🚚 Creando proveedor:', proveedor);
        const response = await fetch(API_URL + 'proveedores', {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(proveedor),
        });
        return handleResponse(response);
    },

    actualizarProveedor: async (id, proveedor) => {
        console.log('🚚 Actualizando proveedor:', id, proveedor);
        const response = await fetch(API_URL + 'proveedores/' + id, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(proveedor),
        });
        return handleResponse(response);
    },

    eliminarProveedor: async (id) => {
        console.log('🗑️ Eliminando proveedor:', id);
        const response = await fetch(API_URL + 'proveedores/' + id, {
            method: 'DELETE',
            headers: getHeaders()
        });
        return handleResponse(response);
    },

    // =============================================
    // VENTAS
    // =============================================

    getVentas: async () => {
        console.log('💰 Obteniendo ventas...');
        const response = await fetch(API_URL + 'ventas', {
            headers: getHeaders()
        });
        return handleResponse(response);
    },

    getVenta: async (id) => {
        console.log('💰 Obteniendo venta:', id);
        const response = await fetch(API_URL + 'ventas/' + id, {
            headers: getHeaders()
        });
        return handleResponse(response);
    },

    procesarVenta: async (venta) => {
        console.log('📦 Enviando venta al backend:', venta);
        const response = await fetch(API_URL + 'ventas', {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(venta)
        });
        console.log('📦 Respuesta status:', response.status);
        return handleResponse(response);
    },

    getMisCompras: async () => {
        console.log('💰 Obteniendo mis compras...');
        const response = await fetch(API_URL + 'ventas/mis-compras', {
            headers: getHeaders()
        });
        return handleResponse(response);
    },

    confirmarPagoVenta: async (idVenta) => {
        console.log('✅ Confirmando pago de venta:', idVenta);
        const response = await fetch(API_URL + 'ventas/' + idVenta + '/confirmar-pago', {
            method: 'PUT',
            headers: getHeaders()
        });
        return handleResponse(response);
    },

    // =============================================
    // PAGOS (Stripe)
    // =============================================

    crearIntencionPago: async (idVenta) => {
        try {
            const response = await fetch(API_URL + 'pagos/crear-intencion', {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify({ idVenta, moneda: 'mxn' })
            });
            const data = await handleResponse(response);
            console.log('📦 Respuesta de crearIntencionPago:', data);
            return data;
        } catch (error) {
            console.error('❌ Error en crearIntencionPago:', error);
            return {
                modoPrueba: true,
                mensaje: 'Error al conectar con Stripe'
            };
        }
    }
};