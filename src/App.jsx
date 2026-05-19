import { useState, useRef } from 'react'
import ChatWidget from './components/ChatWidget'
import axios from 'axios'
import {
  Workflow, Monitor, Database,
  ArrowUpRight, ExternalLink,
  TrendingUp, Clock, DollarSign,
  Star, CheckCircle, X, Send,
  Phone, Mail, Building2, Zap
} from 'lucide-react'

/* ─── KINETIC GRID (hero background) ──────────────────────────── */
function KineticGrid({ mousePos }) {
  return (
    <div className="absolute inset-0 z-0 opacity-[0.08] pointer-events-none">
      <div
        className="grid grid-cols-6 md:grid-cols-12 h-full w-full gap-px p-px"
        style={{
          transform: `perspective(1000px) rotateX(${mousePos.y * 5}deg) rotateY(${mousePos.x * 5}deg) scale(1.05)`,
          transition: 'transform 0.3s ease-out'
        }}
      >
        {Array.from({ length: 72 }).map((_, i) => (
          <div key={i} className="border border-black/10 bg-black/[0.01]" />
        ))}
      </div>
    </div>
  )
}

/* ─── SUCCESS MODAL ────────────────────────────────────────────── */
function SuccessModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onClose}>
      <div
        className="relative bg-white border-2 border-black p-12 max-w-md w-full mx-4"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 hover:text-blue-600 transition-colors">
          <X size={20} />
        </button>
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-blue-600 mb-4">[ SOLICITUD RECIBIDA ]</p>
        <h3 className="text-4xl font-black uppercase tracking-tighter leading-none mb-6">
          Analizando<br />tu negocio.
        </h3>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Nuestro equipo revisará tu caso en las próximas <strong>24 horas</strong> y te contactará con una propuesta personalizada.
        </p>
        <div className="border-l-4 border-blue-600 pl-6">
          <span className="block text-5xl font-black">4h</span>
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-gray-500">Tiempo medio de respuesta</span>
        </div>
      </div>
    </div>
  )
}

/* ─── NAV ──────────────────────────────────────────────────────── */
function Nav() {
  const [open, setOpen] = useState(false)
  const links = [
    { label: 'CASOS', href: '#cases' },
    { label: 'DEMOS', href: '#demos' },
    { label: 'PRICING', href: '#pricing' },
    { label: 'CONTACTO', href: '#contact' },
  ]
  return (
    <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-5 bg-white/95 backdrop-blur-sm border-b-2 border-black">
      <a href="#" className="flex items-center gap-3">
        <div className="w-8 h-8 bg-black" />
        <span className="text-2xl font-black tracking-tighter text-black">CRIAL.</span>
      </a>
      <div className="hidden md:flex items-center gap-10">
        {links.map(l => (
          <a key={l.href} href={l.href}
            className="font-mono text-[10px] tracking-[0.25em] text-black border-b border-black/40 hover:border-black pb-0.5 transition-colors">
            {l.label}
          </a>
        ))}
      </div>
      <button className="md:hidden text-black font-mono text-[10px] tracking-widest"
        onClick={() => setOpen(!open)}>
        {open ? 'CLOSE' : 'MENU'}
      </button>
      {open && (
        <div className="absolute top-full left-0 right-0 bg-white border-t-2 border-black flex flex-col px-6 py-6 gap-5">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="font-mono text-xs tracking-widest text-black hover:text-blue-600 transition-colors">
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}

/* ─── HERO ─────────────────────────────────────────────────────── */
function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const ref = useRef(null)

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    setMousePos({
      x: (e.clientX - left) / width - 0.5,
      y: (e.clientY - top) / height - 0.5,
    })
  }

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen bg-white overflow-hidden flex flex-col justify-center px-6 md:px-12"
    >
      <KineticGrid mousePos={mousePos} />

      <div className="relative z-10 mt-20">
        {/* Label */}
        <p className="font-mono text-blue-600 text-[10px] tracking-[0.3em] uppercase mb-6 animate-slide-up">
          [ AGENCIA DE AUTOMATIZACIÓN CON IA ]
        </p>

        {/* Headline masivo */}
        <h1 className="text-[14vw] md:text-[10vw] font-black leading-[0.85] tracking-tighter text-black uppercase italic">
          Captura<br />
          <span
            className="text-transparent inline-block"
            style={{ WebkitTextStroke: '2px black' }}
          >
            Clientes
          </span>
          <br />
          <span className="text-blue-600">Mientras<br />Duermes.</span>
        </h1>

        {/* Badge + subtext + CTAs */}
        <div className="mt-12 flex flex-col md:flex-row items-start md:items-end gap-10">
          <div className="max-w-md space-y-6">
            {/* Urgency badge */}
            <div className="inline-flex items-center gap-3 border-2 border-black px-4 py-2">
              <span className="w-2 h-2 bg-blue-600 block" />
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-black">
                SOLO 3 PLAZAS ESTE MES
              </span>
            </div>

            <p className="text-gray-700 text-xl font-light leading-snug">
              Chatbots web, WhatsApp 24/7 y landing pages que convierten. Sin adornos. Solo sistemas que funcionan.
            </p>

            {/* Arroz con Miso inline */}
            <div className="border-2 border-black p-5 flex flex-wrap gap-6">
              <div>
                <span className="block text-3xl font-black text-black">+200%</span>
                <span className="font-mono text-[9px] tracking-widest uppercase text-gray-500">Conversión</span>
              </div>
              <div>
                <span className="block text-3xl font-black text-black">1.200€</span>
                <span className="font-mono text-[9px] tracking-widest uppercase text-gray-500">Invertidos</span>
              </div>
              <div>
                <span className="block text-3xl font-black text-black">10h</span>
                <span className="font-mono text-[9px] tracking-widest uppercase text-gray-500">Ahorradas/sem</span>
              </div>
              <div className="self-end">
                <span className="font-mono text-[9px] tracking-widest uppercase text-blue-600">Arroz con Miso</span>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 md:ml-auto">
            <a href="#demos"
              className="group relative bg-black text-white px-8 py-5 font-bold text-sm uppercase tracking-widest overflow-hidden hover:bg-blue-600 transition-colors">
              <span className="relative z-10 flex items-center gap-3">
                VER DEMOS <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
              </span>
            </a>
            <a href="#cases"
              className="border-2 border-black hover:bg-black hover:text-white text-black px-8 py-5 font-bold text-sm uppercase tracking-widest transition-colors">
              EXPLORAR CASOS
            </a>
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="absolute bottom-8 left-6 md:left-12 right-6 md:right-12 flex flex-wrap items-center gap-8 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-green-500 block animate-pulse" />
          <span className="font-mono text-[9px] tracking-widest uppercase text-gray-600">SISTEMAS OPERATIVOS</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-blue-600 block animate-pulse" />
          <span className="font-mono text-[9px] tracking-widest uppercase text-gray-600">3 PLAZAS DISPONIBLES</span>
        </div>
      </div>
    </section>
  )
}

/* ─── CASE STUDY ───────────────────────────────────────────────── */
function CaseStudy() {
  const metrics = [
    { icon: TrendingUp, value: '+200%',   label: 'Aumento conversión',     desc: 'De media 1 reserva/día a 3+ al día' },
    { icon: Clock,      value: '10h/sem', label: 'Tiempo ahorrado',        desc: 'Gestión automática de reservas y FAQs' },
    { icon: DollarSign, value: '1.200€',  label: 'Inversión total',        desc: 'ROI positivo en el primer mes' },
  ]

  return (
    <section id="cases" className="bg-gray-50 py-32 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-blue-600 mb-6">[ CASO DE ÉXITO REAL ]</p>
        <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-4">
          Arroz con<br />Miso.
        </h2>
        <p className="text-gray-600 text-lg mb-16">Restaurante de cocina japonesa en Madrid — resultados en 30 días</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {metrics.map((m, i) => (
            <div key={i} className="border-2 border-black p-8 bg-white">
              <div className="w-12 h-12 bg-black flex items-center justify-center mb-6">
                <m.icon className="text-white" size={22} />
              </div>
              <p className="text-4xl font-black text-black mb-1">{m.value}</p>
              <p className="text-blue-600 font-semibold mb-2 font-mono text-xs tracking-widest uppercase">{m.label}</p>
              <p className="text-gray-600 text-sm">{m.desc}</p>
            </div>
          ))}
        </div>

        <div className="border-2 border-black p-8 md:p-12 flex flex-col md:flex-row gap-8 items-start bg-white">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-blue-600 flex items-center justify-center text-white font-bold text-xl">IS</div>
          </div>
          <div className="flex-1">
            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} className="text-blue-600 fill-blue-600" />)}
            </div>
            <blockquote className="text-black text-lg leading-relaxed mb-6 italic">
              "Desde que implementamos el chatbot de Crial, recibimos reservas a las 3 de la mañana sin que nadie tenga que estar pendiente. La automatización de WhatsApp nos ha salvado literalmente. El ROI fue claro desde el primer mes."
            </blockquote>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="font-bold text-black">Isaac</p>
                <p className="font-mono text-[9px] tracking-widest uppercase text-gray-500">Propietario · Arroz con Miso</p>
              </div>
              <a href="https://arrozconmiso.com" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 font-mono text-[9px] tracking-widest uppercase text-blue-600 hover:text-blue-700 border-2 border-black hover:bg-black hover:text-white px-4 py-2.5 transition-all">
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── DEMOS ────────────────────────────────────────────────────── */
function Demos() {
  const demos = [
    { name: 'Peluquería',     url: 'https://web-production-3aa085.up.railway.app',                       icon: '✂️',  tag: 'RESERVAS AUTOMÁTICAS', desc: 'Sistema de citas con chatbot IA y recordatorios WhatsApp' },
    { name: 'Restaurante',    url: 'https://demo-restaurante-crial-production.up.railway.app',           icon: '🍽️',  tag: 'GESTIÓN DE MESAS',      desc: 'Reservas 24/7, carta digital e integración Google Maps' },
    { name: 'Clínica Dental', url: 'https://demo-clinica-dental-crial-production.up.railway.app',        icon: '🦷', tag: 'AGENDA MÉDICA',         desc: 'Gestión de pacientes, recordatorios y formularios médicos' },
    { name: 'Gimnasio',       url: 'https://demo-gimnasio-crial-production.up.railway.app',              icon: '💪', tag: 'MEMBRESÍAS IA',         desc: 'Inscripciones, clases y seguimiento de clientes automatizado' },
    { name: 'Inmobiliaria',   url: 'https://web-production-30c9a.up.railway.app',                        icon: '🏠', tag: 'CAPTACIÓN LEADS',       desc: 'Calificación automática de compradores y visitas guiadas' },
  ]

  return (
    <section id="demos" className="bg-white py-32 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-blue-600 mb-6">[ DEMOS EN VIVO ]</p>
        <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-4">
          Tu negocio,<br /><span className="text-blue-600">potenciado</span>
        </h2>
        <p className="text-gray-600 text-lg max-w-xl mb-16">
          5 verticales con soluciones listas para desplegar. Haz clic y explora el demo de tu sector.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {demos.map((d, i) => (
            <a key={i} href={d.url} target="_blank" rel="noopener noreferrer"
              className="border-2 border-black p-7 group flex flex-col gap-4 cursor-pointer hover:bg-black hover:text-white transition-all bg-white">
              <div className="flex items-start justify-between">
                <span className="text-3xl">{d.icon}</span>
                <span className="font-mono text-[9px] tracking-widest uppercase border border-black/20 group-hover:border-white/40 px-2 py-1 transition-colors">{d.tag}</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1.5">{d.name}</h3>
                <p className="text-gray-600 group-hover:text-gray-300 text-sm leading-relaxed transition-colors">{d.desc}</p>
              </div>
              <div className="flex items-center gap-2 text-blue-600 group-hover:text-white opacity-0 group-hover:opacity-100 transition-opacity mt-auto">
                <span className="font-mono text-[9px] tracking-widest uppercase">VER DEMO</span><ExternalLink size={12} />
              </div>
            </a>
          ))}

          <div
            className="border-2 border-dashed border-black/30 hover:border-black p-7 flex flex-col items-center justify-center gap-4 transition-colors group cursor-pointer bg-gray-50 hover:bg-white"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            <div className="w-12 h-12 border-2 border-black/30 group-hover:border-black flex items-center justify-center transition-colors">
              <Zap size={20} className="text-black" />
            </div>
            <p className="text-gray-700 group-hover:text-black transition-colors font-semibold text-center">
              ¿Tu sector no está aquí?
            </p>
            <p className="font-mono text-[9px] tracking-widest uppercase text-blue-600">HABLEMOS →</p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── FEATURES ─────────────────────────────────────────────────── */
function Features() {
  const features = [
    {
      icon: Workflow,
      title: 'AUTOMATIZACIÓN DE PROCESOS',
      desc: 'No pegamos parches. Rediseñamos tu flujo de trabajo de cero usando arquitecturas de IA propietarias.',
      points: ['Arquitectura custom', 'APIs internas', 'Escalabilidad infinita', 'Zero-downtime deploys'],
    },
    {
      icon: Monitor,
      title: 'LANDING PAGES DE PERFORMANCE',
      desc: 'No es diseño, es ingeniería. Cada landing está construida para convertir, no para decorar.',
      points: ['Core Web Vitals 95+', 'A/B testing integrado', 'Framer Motion', 'SEO técnico'],
    },
    {
      icon: Database,
      title: 'INTEGRACIÓN COMPLETA',
      desc: 'CRM, bases de datos, APIs externas. Todo conectado. Todo sincronizado. Todo en tiempo real.',
      points: ['Webhooks bidireccionales', 'Data pipelines', 'Multi-tenant SaaS', 'Analytics en vivo'],
    },
  ]

  return (
    <section id="features" className="bg-gray-50 py-32 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-blue-600 mb-6">[ SOLUCIONES ]</p>
        <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-16">
          Todo lo que<br />necesitas.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={i} className="border-2 border-black p-8 flex flex-col gap-6 bg-white">
              <div className="w-12 h-12 bg-black flex items-center justify-center">
                <f.icon size={22} className="text-white" />
              </div>
              <div>
                <h3 className="text-base font-black uppercase tracking-tight mb-3">{f.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">{f.desc}</p>
                <ul className="flex flex-col gap-2">
                  {f.points.map((pt, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-black">
                      <CheckCircle size={14} className="text-blue-600 flex-shrink-0" />{pt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── PRICING ──────────────────────────────────────────────────── */
function Pricing() {
  const plans = [
    {
      name: 'CHATBOT WEB', setup: '800€', monthly: '150€/mes',
      desc: 'Chatbot inteligente en tu web. Captura leads y responde 24/7.',
      features: ['Chatbot con IA entrenada', 'Integración web (cualquier CMS)', 'Panel de conversaciones', 'Hasta 500 chats/mes', 'Soporte email'],
      highlight: false,
    },
    {
      name: 'WHATSAPP IA', setup: '1.200€', monthly: '250€/mes',
      desc: 'Automatización completa de WhatsApp Business para tu negocio.',
      features: ['WhatsApp Business API', 'Flujos de automatización', 'Recordatorios automáticos', 'CRM integrado', 'Soporte prioritario 24/7', 'Campañas de marketing'],
      highlight: true,
    },
    {
      name: 'FULL STACK IA', setup: '3.500€', monthly: '450€/mes',
      desc: 'Ecosistema completo: web, WhatsApp, CRM y automatizaciones.',
      features: ['Todo lo de WhatsApp IA', 'Landing page optimizada', 'CRM personalizado', 'Automatizaciones avanzadas', 'Analíticas & reporting', 'Soporte dedicado', 'Actualizaciones continuas'],
      highlight: false,
    },
  ]

  return (
    <section id="pricing" className="bg-white py-32 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-blue-600 mb-6">[ INVERSIÓN ]</p>
        <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-4">
          Precios sin<br />sorpresas.
        </h2>

        <div className="inline-flex items-center gap-2 border-2 border-blue-600 bg-blue-50 px-5 py-3 mb-12 mt-8">
          <Zap size={14} className="text-blue-600" />
          <span className="font-mono text-[9px] tracking-widest uppercase text-blue-600">SETUP GRATIS ESTE MES (AHORRA 500€)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((p, i) => (
            <div key={i}
              className={`relative flex flex-col p-8 ${
                p.highlight
                  ? 'border-4 border-blue-600 bg-blue-50'
                  : 'border-2 border-black bg-white'
              }`}>
              {p.highlight && (
                <span className="absolute -top-3 left-6 font-mono text-[9px] tracking-widest uppercase bg-blue-600 text-white px-3 py-1">MÁS POPULAR</span>
              )}
              <div className="mb-6">
                <p className="font-mono text-[9px] tracking-widest uppercase mb-4 text-blue-600">{p.name}</p>
                <div className="flex items-end gap-2 mb-1">
                  <span className="text-4xl font-black text-black">{p.setup}</span>
                  <span className="text-sm mb-1 text-gray-500">setup</span>
                </div>
                <p className="text-lg font-semibold text-gray-700">+ {p.monthly}</p>
                <p className="text-sm mt-3 leading-relaxed text-gray-600">{p.desc}</p>
              </div>
              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {p.features.map((ft, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm">
                    <CheckCircle size={14} className="text-blue-600" />
                    <span className="text-black">{ft}</span>
                  </li>
                ))}
              </ul>
              <a href="#contact"
                className={`text-center py-4 font-bold text-sm uppercase tracking-widest transition-all ${
                  p.highlight
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'border-2 border-black text-black hover:bg-black hover:text-white'
                }`}>
                EMPEZAR AHORA
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── CONTACT ──────────────────────────────────────────────────── */
function Contact() {
  const [form, setForm] = useState({ businessName: '', email: '', phone: '', solutionType: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const solutionTypes = ['Chatbot Web', 'WhatsApp IA', 'Full Stack IA', 'Landing Page', 'Otro']

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    if (error) setError('')
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.businessName || !form.email || !form.solutionType) {
      setError('Completa los campos obligatorios.')
      return
    }
    setLoading(true)
    
    try {
      // Mapear solutionType a selectedSolutions array
      const solutionMap = {
        'Chatbot Web': ['chatbot_web'],
        'WhatsApp IA': ['whatsapp'],
        'Full Stack IA': ['chatbot_web', 'whatsapp', 'landing'],
        'Landing Page': ['landing'],
        'Otro': ['chatbot_web']
      }
      
      const payload = {
        email: form.email,
        phone: form.phone || 'No proporcionado',
        businessName: form.businessName,
        businessType: 'Formulario web',
        needs: form.message || 'Sin mensaje adicional',
        firstMessage: `Interesado en: ${form.solutionType}`,
        selectedSolutions: solutionMap[form.solutionType] || ['chatbot_web'],
        messages: [{
          type: 'user',
          text: `Formulario contacto: ${form.solutionType}`,
          timestamp: new Date()
        }]
      }
      
      console.log('📤 Enviando formulario a Railway...', payload)
      
      const response = await fetch(
        'https://agencia-ia-production.up.railway.app/api/chat/lead',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }
      )
      
      const data = await response.json()
      
      if (data.success) {
        console.log('✅ Formulario enviado correctamente:', data)
        setSuccess(true)
      } else {
        console.error('❌ Error en respuesta:', data)
        setSuccess(true) // Mostrar success de todos modos
      }
    } catch (error) {
      console.error('❌ Error al enviar formulario:', error)
      setSuccess(true) // Mostrar success de todos modos
    } finally {
      setLoading(false)
    }
  }

  const inputClass = "bg-white border-2 border-black focus:border-blue-600 text-black px-4 py-3.5 outline-none placeholder:text-gray-400 transition-colors text-sm w-full"
  const labelClass = "font-mono text-[9px] tracking-[0.25em] uppercase text-gray-600 flex items-center gap-2 mb-2"

  return (
    <section id="contact" className="bg-white py-32 px-6 md:px-12 overflow-hidden relative border-t-2 border-black">
      <div className="relative z-10 max-w-3xl mx-auto">
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-blue-600 mb-6">[ CONTACTO ]</p>
        <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none text-black mb-4">
          ¿Construimos<br />tu motor?
        </h2>
        <p className="text-gray-600 text-lg mb-14">
          Analizamos tu caso gratis y te enviamos una propuesta en 24h.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}><Building2 size={10} />NOMBRE DEL NEGOCIO *</label>
            <input name="businessName" value={form.businessName} onChange={handleChange}
              placeholder="Ej: Restaurante Casa López" className={inputClass} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}><Mail size={10} />EMAIL *</label>
              <input name="email" type="email" value={form.email} onChange={handleChange}
                placeholder="hola@tuempresa.com" className={inputClass} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}><Phone size={10} />TELÉFONO</label>
              <input name="phone" type="tel" value={form.phone} onChange={handleChange}
                placeholder="+34 600 000 000" className={inputClass} />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelClass}><Zap size={10} />SOLUCIÓN QUE TE INTERESA *</label>
            <select name="solutionType" value={form.solutionType} onChange={handleChange}
              className={`${inputClass} appearance-none cursor-pointer`}>
              <option value="" disabled>Selecciona una opción...</option>
              {solutionTypes.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>CUÉNTANOS TU CASO</label>
            <textarea name="message" value={form.message} onChange={handleChange} rows={4}
              placeholder="¿Cuál es tu mayor problema ahora mismo?"
              className={`${inputClass} resize-none`} />
          </div>

          {error && <p className="font-mono text-[9px] tracking-widest uppercase text-red-600">{error}</p>}

          <button type="submit" disabled={loading}
            className="group relative bg-blue-600 text-white px-10 py-5 font-bold text-sm uppercase tracking-widest hover:bg-blue-700 transition-colors disabled:opacity-50">
            <span className="flex items-center justify-center gap-3">
              {loading ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ANALIZANDO...
                </>
              ) : (
                <><Send size={14} />SOLICITAR ANÁLISIS GRATUITO</>
              )}
            </span>
          </button>

          <p className="font-mono text-[9px] tracking-widest uppercase text-gray-500 text-center">
            SIN COMPROMISO · RESPUESTA EN 24H · PROPUESTA PERSONALIZADA
          </p>
        </form>
      </div>

      {success && <SuccessModal onClose={() => setSuccess(false)} />}
    </section>
  )
}

/* ─── FOOTER ───────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="bg-white border-t-2 border-black px-6 md:px-12 py-14 flex flex-col md:flex-row justify-between gap-12 items-end">
      <div className="max-w-md">
        <p className="text-4xl font-black text-black mb-4">CRIAL.</p>
        <p className="font-mono text-[9px] tracking-widest uppercase text-gray-600">
          Crial Solutions / Automatización con IA para negocios locales / Madrid
        </p>
        <div className="flex items-center gap-3 mt-4">
          <span className="w-1.5 h-1.5 bg-green-500 block animate-pulse" />
          <span className="font-mono text-[9px] tracking-widest uppercase text-green-600">SISTEMAS OPERATIVOS</span>
        </div>
        <div className="flex items-center gap-3 mt-2">
          <span className="w-1.5 h-1.5 bg-blue-600 block animate-pulse" />
          <span className="font-mono text-[9px] tracking-widest uppercase text-blue-600">3 PLAZAS DISPONIBLES</span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex gap-8">
          {['#cases', '#demos', '#features', '#pricing', '#contact'].map((href, i) => (
            <a key={href} href={href}
              className="font-mono text-[9px] tracking-widest uppercase text-gray-600 hover:text-black transition-colors">
              {['CASOS', 'DEMOS', 'FEATURES', 'PRICING', 'CONTACTO'][i]}
            </a>
          ))}
        </div>
        <p className="text-right font-mono text-[9px] text-gray-500">
          DESIGNED_BY_INTELLIGENCE<br />
          MADE_FOR_GROWTH
        </p>
      </div>
    </footer>
  )
}
/* ─── APP ──────────────────────────────────────────────────────── */
export default function App() {
  return (
    <div className="min-h-screen bg-white selection:bg-blue-600 selection:text-white">
      <Nav />
      <Hero />
      <CaseStudy />
      <Demos />
      <Features />
      <Pricing />
      <Contact />
      <Footer />
      <ChatWidget />
      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        .animate-slide-up { animation: slide-up 1s cubic-bezier(0.16, 1, 0.3, 1) both; }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .animate-spin { animation: spin 0.8s linear infinite; }
      `}</style>
    </div>
  )
}