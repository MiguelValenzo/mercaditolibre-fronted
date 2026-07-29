import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { apiService } from '../services/apiService';
import { CreditCard, CheckCircle2, ShieldAlert, Loader2, Play, Sparkles, ShieldCheck, ShoppingBag } from 'lucide-react';

// Clave pública de prueba de Stripe
const stripePromise = loadStripe('pk_test_51TwjpTFagauFC90G5GDZcRYoezv40ebwuXCJs0fsOb32sDS1wY12ZVm0NpLpKnund3PafOIHJzoyml7NxzuQQz1000xrTWQPIH');

const PaymentForm = ({ venta, onPaymentSuccess, setVistaActual }) => {
    const stripe = useStripe();
    const elements = useElements();

    const [clientSecret, setClientSecret] = useState('');
    const [procesando, setProcesando] = useState(false);
    const [error, setError] = useState('');
    const [simulating, setSimulating] = useState(false);
    const [modoPrueba, setModoPrueba] = useState(false);

    useEffect(() => {
        const getSecret = async () => {
            try {
                const res = await apiService.crearIntencionPago(venta.id);
                console.log('📦 Respuesta de Stripe:', res);
                
                if (res && res.modoPrueba) {
                    // ✅ Si el backend dice que está en modo prueba
                    setModoPrueba(true);
                    setError('Stripe no está configurado. Usa el Simulador de Pago.');
                } else if (res && res.clientSecret) {
                    setClientSecret(res.clientSecret);
                    setModoPrueba(false);
                } else {
                    setModoPrueba(true);
                    setError('No se pudo inicializar Stripe. Usa el Simulador de Pago.');
                }
            } catch (err) {
                console.warn('⚠️ No se pudo inicializar Stripe:', err);
                setModoPrueba(true);
                setError('Error al conectar con Stripe. Usa el Simulador de Pago.');
            }
        };
        if (venta && venta.id) {
            getSecret();
        }
    }, [venta]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // ✅ Si estamos en modo prueba, mostrar mensaje
        if (modoPrueba) {
            setError('Stripe no está configurado. Usa el botón "Simular Pago Exitoso"');
            return;
        }

        if (!stripe || !elements || !clientSecret) {
            setError('Stripe no está inicializado correctamente. Usa el Simulador de Pago.');
            return;
        }

        setProcesando(true);
        setError('');

        try {
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                }
            });

            if (result.error) {
                setError(result.error.message);
                setProcesando(false);
            } else if (result.paymentIntent.status === 'succeeded') {
                await apiService.confirmarPagoVenta(venta.id);
                onPaymentSuccess();
            }
        } catch (err) {
            setError(err.message || 'Error de conexión durante el pago.');
            setProcesando(false);
        }
    };

    const handleSimulatePayment = async () => {
        setSimulating(true);
        setError('');
        try {
            await apiService.confirmarPagoVenta(venta.id);
            onPaymentSuccess();
        } catch (err) {
            setError('Error al conectar con la API para simular el pago.');
        } finally {
            setSimulating(false);
        }
    };

    // ✅ Si está en modo prueba, mostrar solo el simulador
    if (modoPrueba) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{
                    background: 'rgba(245, 158, 11, 0.15)',
                    border: '1px solid rgba(245, 158, 11, 0.3)',
                    padding: '16px 20px',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    color: '#fbbf24',
                    fontSize: '13px',
                    fontWeight: '600'
                }}>
                    <ShieldAlert style={{ width: '20px', height: '20px', flexShrink: 0, marginTop: '2px' }} />
                    <div>
                        <strong>Stripe no está configurado:</strong>
                        <p style={{ margin: '4px 0 0 0', fontWeight: '400', color: '#94a3b8' }}>
                            Para usar pagos reales, configura la clave secreta de Stripe en el backend.
                            Mientras tanto, usa el simulador de pago.
                        </p>
                    </div>
                </div>

                <div style={{
                    background: 'rgba(16, 185, 129, 0.15)',
                    borderRadius: '16px',
                    padding: '24px',
                    border: '1px solid rgba(16, 185, 129, 0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            background: 'rgba(16, 185, 129, 0.2)',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#6ee7b7'
                        }}>
                            <Play style={{ width: '24px', height: '24px' }} />
                        </div>
                        <div>
                            <h4 style={{
                                fontSize: '15px',
                                fontWeight: '800',
                                color: '#f1f5f9',
                                margin: 0
                            }}>
                                Simulador de Pago
                            </h4>
                            <p style={{
                                fontSize: '12px',
                                color: '#94a3b8',
                                margin: '2px 0 0 0'
                            }}>
                                Prueba el flujo completo de compra sin usar Stripe
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleSimulatePayment}
                        disabled={simulating}
                        style={{
                            width: '100%',
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                            color: '#ffffff',
                            padding: '16px',
                            borderRadius: '14px',
                            border: 'none',
                            fontWeight: '700',
                            fontSize: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px',
                            cursor: simulating ? 'not-allowed' : 'pointer',
                            opacity: simulating ? 0.7 : 1,
                            boxShadow: '0 10px 20px -5px rgba(16, 185, 129, 0.4)',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                            if (!simulating) {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 16px 30px -8px rgba(16, 185, 129, 0.5)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!simulating) {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 10px 20px -5px rgba(16, 185, 129, 0.4)';
                            }
                        }}
                    >
                        {simulating ? (
                            <>
                                <Loader2 style={{ width: '18px', height: '18px', animation: 'spin 1s linear infinite' }} />
                                <span>Simulando pago...</span>
                            </>
                        ) : (
                            <>
                                <CheckCircle2 style={{ width: '18px', height: '18px' }} />
                                <span>Simular Pago Exitoso (${venta.total.toFixed(2)} MXN)</span>
                            </>
                        )}
                    </button>

                    <p style={{
                        fontSize: '11px',
                        color: '#64748b',
                        margin: 0,
                        textAlign: 'center'
                    }}>
                        ⚡ Esto actualizará la base de datos sin usar Stripe
                    </p>
                </div>
            </div>
        );
    }

    // ✅ Si no está en modo prueba, mostrar el formulario normal
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {error && (
                <div style={{
                    background: 'rgba(239, 68, 68, 0.15)',
                    border: '1px solid #7f1d1d',
                    padding: '16px 20px',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    color: '#fca5a5',
                    fontSize: '13px',
                    fontWeight: '600'
                }}>
                    <ShieldAlert style={{ width: '20px', height: '20px', color: '#f87171', flexShrink: 0, marginTop: '2px' }} />
                    <div>{error}</div>
                </div>
            )}

            <form onSubmit={handleSubmit} style={{
                background: '#0f172a',
                padding: '20px',
                borderRadius: '16px',
                border: '1px solid #334155',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
            }}>
                <label style={{
                    display: 'block',
                    fontSize: '12px',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    color: '#94a3b8'
                }}>
                    Tarjeta de Crédito o Débito
                </label>
                <div style={{
                    background: '#0f172a',
                    padding: '16px',
                    borderRadius: '14px',
                    border: '1.5px solid #334155',
                    transition: 'all 0.2s ease'
                }}>
                    <CardElement options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#f1f5f9',
                                '::placeholder': { color: '#64748b' },
                                iconColor: '#818cf8',
                            },
                            invalid: {
                                color: '#f87171',
                                iconColor: '#f87171',
                            }
                        }
                    }} />
                </div>

                <button
                    type="submit"
                    disabled={!stripe || procesando || !clientSecret}
                    style={{
                        width: '100%',
                        background: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)',
                        color: '#ffffff',
                        padding: '14px',
                        borderRadius: '14px',
                        border: 'none',
                        fontWeight: '700',
                        fontSize: '13px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        cursor: procesando ? 'not-allowed' : 'pointer',
                        opacity: (!stripe || procesando || !clientSecret) ? 0.5 : 1,
                        boxShadow: '0 10px 20px -5px rgba(79, 70, 229, 0.4)',
                        transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                        if (!procesando && stripe && clientSecret) {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 16px 30px -8px rgba(79, 70, 229, 0.5)';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (!procesando && stripe && clientSecret) {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 10px 20px -5px rgba(79, 70, 229, 0.4)';
                        }
                    }}
                >
                    {procesando ? (
                        <>
                            <Loader2 style={{ width: '18px', height: '18px', animation: 'spin 1s linear infinite' }} />
                            <span>Procesando pago con Stripe...</span>
                        </>
                    ) : (
                        <>
                            <CreditCard style={{ width: '18px', height: '18px' }} />
                            <span>Pagar Ahora (${venta.total.toFixed(2)} MXN)</span>
                        </>
                    )}
                </button>
            </form>

            <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <div style={{ width: '100%', borderTop: '1px solid #334155' }}></div>
                </div>
                <span style={{
                    position: 'relative',
                    background: '#0f172a',
                    padding: '0 16px',
                    fontSize: '10px',
                    fontWeight: '800',
                    color: '#64748b',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                }}>
                    O de Respaldo
                </span>
            </div>

            <div style={{
                background: 'rgba(245, 158, 11, 0.1)',
                borderRadius: '16px',
                padding: '20px',
                border: '1px solid rgba(245, 158, 11, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
            }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <ShieldAlert style={{ width: '20px', height: '20px', color: '#fbbf24', flexShrink: 0, marginTop: '2px' }} />
                    <div>
                        <h4 style={{
                            fontSize: '13px',
                            fontWeight: '800',
                            color: '#fbbf24',
                            margin: 0
                        }}>
                            Simulador de Pago de Pruebas
                        </h4>
                        <p style={{
                            fontSize: '12px',
                            color: '#94a3b8',
                            margin: '4px 0 0 0',
                            lineHeight: '1.5'
                        }}>
                            Si estás usando las claves de Stripe por defecto o si no tienes internet, puedes simular una transacción exitosa para actualizar la base de datos.
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleSimulatePayment}
                    disabled={simulating}
                    style={{
                        width: '100%',
                        background: 'rgba(245, 158, 11, 0.2)',
                        color: '#fbbf24',
                        padding: '12px',
                        borderRadius: '14px',
                        border: '1px solid rgba(245, 158, 11, 0.3)',
                        fontWeight: '700',
                        fontSize: '13px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        cursor: simulating ? 'not-allowed' : 'pointer',
                        opacity: simulating ? 0.5 : 1,
                        transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                        if (!simulating) {
                            e.currentTarget.style.background = 'rgba(245, 158, 11, 0.3)';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (!simulating) {
                            e.currentTarget.style.background = 'rgba(245, 158, 11, 0.2)';
                        }
                    }}
                >
                    {simulating ? (
                        <>
                            <Loader2 style={{ width: '16px', height: '16px', animation: 'spin 1s linear infinite' }} />
                            <span>Simulando...</span>
                        </>
                    ) : (
                        <>
                            <Play style={{ width: '16px', height: '16px' }} />
                            <span>Simular Pago Exitoso (Recomendado para Pruebas)</span>
                        </>
                    )}
                </button>
            </div>

            <style>{`
                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
};

export const CheckoutForm = ({ ventaActiva, setVistaActual }) => {
    const [pagado, setPagado] = useState(false);

    if (!ventaActiva) {
        return (
            <div style={{
                maxWidth: '480px',
                margin: '48px auto',
                background: '#1e293b',
                borderRadius: '24px',
                padding: '32px',
                border: '1px solid #334155',
                textAlign: 'center',
                boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.3)'
            }}>
                <div style={{
                    width: '64px',
                    height: '64px',
                    background: 'rgba(79, 70, 229, 0.15)',
                    borderRadius: '16px',
                    border: '1px solid rgba(79, 70, 229, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px auto',
                    color: '#818cf8'
                }}>
                    <ShoppingBag style={{ width: '32px', height: '32px' }} />
                </div>
                <h3 style={{
                    fontSize: '18px',
                    fontWeight: '800',
                    color: '#f1f5f9',
                    margin: '0 0 8px 0'
                }}>
                    No hay ninguna venta activa
                </h3>
                <p style={{
                    fontSize: '13px',
                    color: '#94a3b8',
                    margin: '0 0 20px 0'
                }}>
                    Regresa al catálogo y añade productos para realizar el pago.
                </p>
                <button
                    onClick={() => setVistaActual('catalogo')}
                    style={{
                        background: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)',
                        color: '#ffffff',
                        padding: '12px 24px',
                        borderRadius: '14px',
                        border: 'none',
                        fontWeight: '700',
                        fontSize: '13px',
                        cursor: 'pointer',
                        boxShadow: '0 10px 20px -5px rgba(79, 70, 229, 0.4)',
                        transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 16px 30px -8px rgba(79, 70, 229, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 10px 20px -5px rgba(79, 70, 229, 0.4)';
                    }}
                >
                    Ver Catálogo
                </button>
            </div>
        );
    }

    const handlePaymentSuccess = () => {
        setPagado(true);
    };

    if (pagado) {
        return (
            <div style={{
                maxWidth: '480px',
                margin: '48px auto',
                background: '#1e293b',
                borderRadius: '24px',
                padding: '32px',
                border: '1px solid #334155',
                textAlign: 'center',
                boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.3)',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
            }}>
                <CheckCircle2 style={{
                    width: '64px',
                    height: '64px',
                    color: '#6ee7b7',
                    margin: '0 auto',
                    animation: 'bounce 1s ease-in-out infinite'
                }} />
                <div>
                    <h2 style={{
                        fontSize: '24px',
                        fontWeight: '900',
                        color: '#f1f5f9',
                        margin: '0 0 4px 0'
                    }}>
                        ¡Pago Exitoso!
                    </h2>
                    <p style={{
                        fontSize: '13px',
                        color: '#94a3b8',
                        margin: 0
                    }}>
                        Tu orden #{ventaActiva.id} ha sido procesada y pagada correctamente.
                    </p>
                </div>
                <div style={{
                    background: '#0f172a',
                    padding: '16px',
                    borderRadius: '14px',
                    border: '1px solid #334155',
                    textAlign: 'left',
                    fontSize: '12px',
                    color: '#94a3b8',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px'
                }}>
                    <div><span style={{ fontWeight: '700', color: '#f1f5f9' }}>Total Pagado:</span> ${ventaActiva.total.toFixed(2)} MXN</div>
                    <div><span style={{ fontWeight: '700', color: '#f1f5f9' }}>Estado:</span> <span style={{ color: '#6ee7b7', fontWeight: '700' }}>PAGADO</span></div>
                    <div><span style={{ fontWeight: '700', color: '#f1f5f9' }}>Cliente:</span> {ventaActiva.cliente?.nombre || 'Demo'}</div>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                        onClick={() => setVistaActual('miscompras')}
                        style={{
                            flex: 1,
                            background: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)',
                            color: '#ffffff',
                            padding: '14px',
                            borderRadius: '14px',
                            border: 'none',
                            fontWeight: '700',
                            fontSize: '13px',
                            cursor: 'pointer',
                            boxShadow: '0 10px 20px -5px rgba(79, 70, 229, 0.4)',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 16px 30px -8px rgba(79, 70, 229, 0.5)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 10px 20px -5px rgba(79, 70, 229, 0.4)';
                        }}
                    >
                        Ver Mis Compras
                    </button>
                    <button
                        onClick={() => setVistaActual('catalogo')}
                        style={{
                            flex: 1,
                            background: '#1e293b',
                            color: '#94a3b8',
                            padding: '14px',
                            borderRadius: '14px',
                            border: '1px solid #334155',
                            fontWeight: '700',
                            fontSize: '13px',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#2d3748';
                            e.currentTarget.style.color = '#f1f5f9';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = '#1e293b';
                            e.currentTarget.style.color = '#94a3b8';
                        }}
                    >
                        Seguir Comprando
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            maxWidth: '480px',
            margin: '48px auto',
            background: '#1e293b',
            borderRadius: '24px',
            overflow: 'hidden',
            border: '1px solid #334155',
            boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.3)'
        }}>
            <div style={{
                background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)',
                padding: '24px 28px',
                textAlign: 'center',
                borderBottom: '1px solid rgba(99, 102, 241, 0.2)'
            }}>
                <h2 style={{
                    fontSize: '20px',
                    fontWeight: '900',
                    color: '#ffffff',
                    margin: 0
                }}>
                    Checkout de Venta
                </h2>
                <p style={{
                    color: '#a5b4fc',
                    margin: '4px 0 0 0',
                    fontSize: '12px',
                    fontWeight: '500'
                }}>
                    Completa tu pago seguro para la orden #{ventaActiva.id}
                </p>
            </div>

            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <h3 style={{
                        fontSize: '12px',
                        fontWeight: '800',
                        color: '#94a3b8',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        margin: 0
                    }}>
                        Resumen del Pedido
                    </h3>
                    <div style={{
                        background: 'rgba(79, 70, 229, 0.08)',
                        padding: '16px',
                        borderRadius: '14px',
                        border: '1px solid rgba(79, 70, 229, 0.15)',
                        fontSize: '13px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px'
                    }}>
                        {ventaActiva.detalles && ventaActiva.detalles.map((det, idx) => (
                            <div key={idx} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                color: '#94a3b8',
                                fontSize: '12px'
                            }}>
                                <span>
                                    {det.producto?.nombre || `Producto #${det.producto?.id}`} (x{det.cantidad})
                                </span>
                                <span style={{ fontWeight: '700', color: '#f1f5f9' }}>${(det.precioUnitario * det.cantidad).toFixed(2)}</span>
                            </div>
                        ))}
                        <div style={{
                            borderTop: '1px solid rgba(79, 70, 229, 0.2)',
                            paddingTop: '10px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontWeight: '900',
                            color: '#f1f5f9',
                            fontSize: '14px'
                        }}>
                            <span>Total a Cobrar</span>
                            <span style={{ color: '#818cf8' }}>${ventaActiva.total.toFixed(2)} MXN</span>
                        </div>
                    </div>
                </div>

                <Elements stripe={stripePromise}>
                    <PaymentForm
                        venta={ventaActiva}
                        onPaymentSuccess={handlePaymentSuccess}
                        setVistaActual={setVistaActual}
                    />
                </Elements>
            </div>
        </div>
    );
};