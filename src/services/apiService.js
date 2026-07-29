// ✅ URL del backend en Coolify (hardcodeada temporalmente)
const API_URL = 'http://e2k5x0g59y9wbs81wnnjnnhp.2.24.111.114.sslip.io:8081/api/v1/';

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

    // Login con email
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

    // Registro
    registro: async (userData) => {
        const response = await fetch(API_URL + 'auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        return handleResponse(response);
    },

    // Logout
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('nombre');
        localStorage.removeItem('rol');
        console.log('🚪 Sesión cerrada');
    },

    // Verificar autenticación
    isAuthenticated: () => {
        return localStorage.getItem('token') !== null;
    },

    // =============================================
    // PRODUCTOS
    // =============================================

    getProductos: async () => {
        const response = await fetch(API_URL + 'productos', {
            headers: getHeaders()
        });
        return handleResponse(response);
    },

    getProducto: async (id) => {
        const response = await fetch(API_URL + 'productos/' + id, {
            headers: getHeaders()
        });
        return handleResponse(response);
    },

    // ✅ CORREGIDO: Usa getHeaders()
    crearProducto: async (producto) => {
        console.log('📦 Creando producto:', producto);
        const headers = getHeaders();
        console.log('📦 Headers:', headers);
        const response = await fetch(API_URL + 'productos', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(producto),
        });
        return handleResponse(response);
    },

    // ✅ CORREGIDO: Usa getHeaders()
    actualizarProducto: async (id, producto) => {
        console.log('📦 Actualizando producto:', id, producto);
        const response = await fetch(API_URL + 'productos/' + id, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(producto),
        });
        return handleResponse(response);
    },

    // ✅ CORREGIDO: Usa getHeaders()
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
        const response = await fetch(API_URL + 'categorias', {
            headers: getHeaders()
        });
        return handleResponse(response);
    },

    getCategoria: async (id) => {
        const response = await fetch(API_URL + 'categorias/' + id, {
            headers: getHeaders()
        });
        return handleResponse(response);
    },

    crearCategoria: async (categoria) => {
        const response = await fetch(API_URL + 'categorias', {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(categoria),
        });
        return handleResponse(response);
    },

    actualizarCategoria: async (id, categoria) => {
        const response = await fetch(API_URL + 'categorias/' + id, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(categoria),
        });
        return handleResponse(response);
    },

    eliminarCategoria: async (id) => {
        const response = await fetch(API_URL + 'categorias/' + id, {
            method: 'DELETE',
            headers: getHeaders()
        });
        return handleResponse(response);
    },

    // =============================================
    // CLIENTES
    // =============================================

    getClientes: async () => {
        const response = await fetch(API_URL + 'clientes', {
            headers: getHeaders()
        });
        return handleResponse(response);
    },

    getCliente: async (id) => {
        const response = await fetch(API_URL + 'clientes/' + id, {
            headers: getHeaders()
        });
        return handleResponse(response);
    },

    crearCliente: async (cliente) => {
        const response = await fetch(API_URL + 'clientes', {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(cliente),
        });
        return handleResponse(response);
    },

    actualizarCliente: async (id, cliente) => {
        const response = await fetch(API_URL + 'clientes/' + id, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(cliente),
        });
        return handleResponse(response);
    },

    eliminarCliente: async (id) => {
        const response = await fetch(API_URL + 'clientes/' + id, {
            method: 'DELETE',
            headers: getHeaders()
        });
        return handleResponse(response);
    },

    // =============================================
    // PROVEEDORES
    // =============================================

    getProveedores: async () => {
        const response = await fetch(API_URL + 'proveedores', {
            headers: getHeaders()
        });
        return handleResponse(response);
    },

    getProveedor: async (id) => {
        const response = await fetch(API_URL + 'proveedores/' + id, {
            headers: getHeaders()
        });
        return handleResponse(response);
    },

    crearProveedor: async (proveedor) => {
        const response = await fetch(API_URL + 'proveedores', {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(proveedor),
        });
        return handleResponse(response);
    },

    actualizarProveedor: async (id, proveedor) => {
        const response = await fetch(API_URL + 'proveedores/' + id, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(proveedor),
        });
        return handleResponse(response);
    },

    eliminarProveedor: async (id) => {
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
        const response = await fetch(API_URL + 'ventas', {
            headers: getHeaders()
        });
        return handleResponse(response);
    },

    getVenta: async (id) => {
        const response = await fetch(API_URL + 'ventas/' + id, {
            headers: getHeaders()
        });
        return handleResponse(response);
    },

 // Ventas - Procesar venta
procesarVenta: async (venta) => {
    console.log('📦 Enviando venta al backend:', venta);
    const headers = getHeaders();
    console.log('📦 Headers:', headers);
    const response = await fetch(API_URL + 'ventas', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(venta)
    });
    console.log('📦 Respuesta status:', response.status);
    return handleResponse(response);
},

    getMisCompras: async () => {
        const response = await fetch(API_URL + 'ventas/mis-compras', {
            headers: getHeaders()
        });
        return handleResponse(response);
    },

    confirmarPagoVenta: async (idVenta) => {
        const response = await fetch(API_URL + 'ventas/' + idVenta + '/confirmar-pago', {
            method: 'PUT',
            headers: getHeaders()
        });
        return handleResponse(response);
    },

    // =============================================
    // PAGOS (Stripe)
    // =============================================

  // En apiService.js, la función crearIntencionPago debe ser:

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
        // ✅ Devolver un objeto con modoPrueba en caso de error
        return {
            modoPrueba: true,
            mensaje: 'Error al conectar con Stripe'
        };
    }
}, 
};