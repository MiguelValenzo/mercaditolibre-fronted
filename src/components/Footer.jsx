import React from 'react';
import { 
  Mail, Phone, MapPin, ShoppingBag, Send, ShieldCheck, 
  Truck, Headset, Facebook, Twitter, Instagram, Github, ArrowRight, CheckCircle2 
} from 'lucide-react';

const Footer = ({ setVistaActual }) => {
  const handleNavClick = (e, vista) => {
    e.preventDefault();
    if (setVistaActual) {
      setVistaActual(vista);
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 mt-auto font-sans relative overflow-hidden border-t border-slate-800">
      
      {/* Luz Ambiental de Fondo */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-full max-w-4xl h-32 bg-gradient-to-r from-indigo-500/20 via-violet-500/20 to-indigo-500/20 blur-3xl pointer-events-none" />

      {/* 1. BARRA SUPERIOR: GARANTÍAS Y NEWSLETTER */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Badges de Confianza */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              
              <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700/60 shadow-sm hover:border-indigo-500/40 transition-colors">
                <div className="w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                  <Truck className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h4 className="text-xs font-black" style={{ color: '#ffffff' }}>Envíos Rápidos</h4>
                  <p className="text-[11px] font-bold mt-0.5" style={{ color: '#94a3b8' }}>Garantizados a todo el país</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700/60 shadow-sm hover:border-emerald-500/40 transition-colors">
                <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-xs font-black" style={{ color: '#ffffff' }}>Pago 100% Seguro</h4>
                  <p className="text-[11px] font-bold mt-0.5" style={{ color: '#94a3b8' }}>Protección de datos SSL</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700/60 shadow-sm hover:border-amber-500/40 transition-colors">
                <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                  <Headset className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-xs font-black" style={{ color: '#ffffff' }}>Soporte Dedicado</h4>
                  <p className="text-[11px] font-bold mt-0.5" style={{ color: '#94a3b8' }}>Atención personalizada</p>
                </div>
              </div>

            </div>

            {/* Suscripción a Ofertas */}
            <div className="lg:col-span-5 bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900 p-4 rounded-2xl border border-indigo-500/30 shadow-lg relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-black uppercase tracking-wider flex items-center gap-1.5" style={{ color: '#ffffff' }}>
                  <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                  <span>Suscríbete a ofertas VIP</span>
                </h4>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Descuentos exclusivos
                </span>
              </div>
              
              <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
                <input
                  type="email"
                  placeholder="Tu correo electrónico..."
                  className="flex-1 bg-slate-950/90 border border-slate-700 rounded-xl px-4 py-2.5 text-xs font-medium text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
                />
                <button
                  type="submit"
                  style={{ backgroundColor: '#4f46e5', color: '#ffffff' }}
                  className="px-5 py-2.5 hover:bg-indigo-600 rounded-xl text-xs font-black uppercase tracking-wider shadow-md shadow-indigo-600/30 active:scale-95 transition-all flex items-center gap-1.5 shrink-0 group"
                >
                  <span style={{ color: '#ffffff' }}>Unirme</span>
                  <Send className="w-3.5 h-3.5 text-white group-hover:translate-x-0.5 transition-transform" />
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>

      {/* 2. NAVEGACIÓN Y ENLACES PRINCIPALES */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Branding Principal */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-600/30 ring-4 ring-indigo-500/10">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-black tracking-tight" style={{ color: '#ffffff' }}>
                Mercadito<span className="text-indigo-400">Libre</span>
              </h2>
            </div>
            
            <p className="text-xs font-medium leading-relaxed max-w-sm" style={{ color: '#94a3b8' }}>
              Tu plataforma ecommerce de confianza. Ofrecemos la selección más completa de productos con envíos garantizados y experiencia de compra transparente.
            </p>

            {/* Redes Sociales */}
            <div className="pt-2 flex items-center gap-2">
              {[
                { Icon: Facebook, href: "#", label: "Facebook" },
                { Icon: Twitter, href: "#", label: "Twitter" },
                { Icon: Instagram, href: "#", label: "Instagram" },
                { Icon: Github, href: "#", label: "Github" },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  aria-label={item.label}
                  className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-indigo-600 hover:border-indigo-500 transition-all active:scale-90 shadow-sm"
                >
                  <item.Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Enlaces de Navegación */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider mb-4 border-l-2 border-indigo-500 pl-2.5" style={{ color: '#ffffff' }}>
              Navegación
            </h3>
            <ul className="space-y-3 text-xs font-bold" style={{ color: '#cbd5e1' }}>
              <li>
                <a href="#" onClick={(e) => handleNavClick(e, 'inicio')} className="hover:text-indigo-400 transition-all flex items-center gap-1 group">
                  <ArrowRight className="w-3 h-3 text-indigo-500 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  <span>Inicio</span>
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => handleNavClick(e, 'productos')} className="hover:text-indigo-400 transition-all flex items-center gap-1 group">
                  <ArrowRight className="w-3 h-3 text-indigo-500 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  <span>Catálogo de Productos</span>
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => handleNavClick(e, 'ofertas')} className="hover:text-indigo-400 transition-all flex items-center gap-1 group">
                  <ArrowRight className="w-3 h-3 text-indigo-500 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  <span>Ofertas Especiales</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Atención al Cliente */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider mb-4 border-l-2 border-indigo-500 pl-2.5" style={{ color: '#ffffff' }}>
              Atención al Cliente
            </h3>
            <ul className="space-y-3 text-xs font-bold" style={{ color: '#cbd5e1' }}>
              <li><a href="#" className="hover:text-indigo-400 transition-colors block">Preguntas Frecuentes</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors block">Política de Devoluciones</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors block">Términos y Condiciones</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors block">Aviso de Privacidad</a></li>
            </ul>
          </div>

          {/* Información de Contacto Directo */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider mb-4 border-l-2 border-indigo-500 pl-2.5" style={{ color: '#ffffff' }}>
              Contacto Directo
            </h3>
            <ul className="space-y-3 text-xs font-bold">
              <li className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                  <Mail className="w-3.5 h-3.5 text-indigo-400" />
                </div>
                <span className="truncate" style={{ color: '#cbd5e1' }}>info@mercaditolibre.com</span>
              </li>

              <li className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                  <Phone className="w-3.5 h-3.5 text-indigo-400" />
                </div>
                <span style={{ color: '#cbd5e1' }}>+52 (55) 1234-5678</span>
              </li>

              <li className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                </div>
                <span style={{ color: '#cbd5e1' }}>Ciudad de México, CDMX</span>
              </li>
            </ul>
          </div>

        </div>

        {/* 3. DERECHOS Y CRÉDITOS */}
        <div className="border-t border-slate-800/80 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-bold" style={{ color: '#64748b' }}>
          <p>
            &copy; {new Date().getFullYear()} <span style={{ color: '#f8fafc' }}>MercaditoLibre</span>. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6 text-[11px]">
            <a href="#" className="hover:text-slate-300 transition-colors">Términos de Servicio</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Privacidad</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Aviso Legal</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;