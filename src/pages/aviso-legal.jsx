import { ArrowLeft } from 'lucide-react';

export default function AvisoLegal() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b-4 border-black p-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo-firma.png?v=2" alt="CRIAL" className="w-10 h-10 object-contain" />
            <span className="text-2xl font-black">CRIAL SOLUTIONS</span>
          </div>
          <a 
            href="/" 
            className="flex items-center gap-2 px-4 py-2 border-2 border-black font-bold hover:bg-black hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            VOLVER
          </a>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto p-8 py-16">
        <h1 className="text-5xl font-black mb-2">AVISO LEGAL</h1>
        <p className="text-sm text-gray-600 mb-12 font-bold">Última actualización: Enero 2025</p>

        <div className="space-y-8">
          <section>
  <h2 className="text-3xl font-black mb-4">1. DATOS IDENTIFICATIVOS</h2>
  <p className="mb-4 text-lg">
    En cumplimiento de la Ley 34/2002 (LSSI-CE), se informa de los datos del titular de www.crial.solutions:
  </p>
  <div className="border-4 border-black p-6 bg-yellow-50 space-y-2">
    <p className="font-bold">Titular: Cristian Alcaina Ramírez</p>
    <p className="font-bold">NIF/CIF: 39902409P</p>
    <p className="font-bold">Domicilio: La Llagosta, Barcelona</p>
    <p className="font-bold">Email: contacto@crial.solutions</p>
  </div>
</section>

<section>
  <h2 className="text-3xl font-black mb-4">2. OBJETO</h2>
  <p className="text-lg leading-relaxed">
    El presente aviso legal regula el uso de www.crial.solutions. La navegación implica 
    la aceptación de todas las disposiciones aquí incluidas.
  </p>
</section>

          <section>
            <h2 className="text-3xl font-black mb-4">3. SERVICIOS</h2>
            <p className="mb-4 font-bold">CRIAL Solutions ofrece:</p>
            <div className="space-y-3">
              <div className="border-l-4 border-black pl-4">
                <p className="font-black">🤖 Desarrollo de agentes de Inteligencia Artificial</p>
              </div>
              <div className="border-l-4 border-black pl-4">
                <p className="font-black">💬 Automatización de comunicaciones</p>
                <p className="text-sm">WhatsApp, voz, chat web</p>
              </div>
              <div className="border-l-4 border-black pl-4">
                <p className="font-black">🔗 Integración con CRM y plataformas empresariales</p>
              </div>
              <div className="border-l-4 border-black pl-4">
                <p className="font-black">📊 Consultoría técnica en automatización</p>
              </div>
              <div className="border-l-4 border-black pl-4">
                <p className="font-black">🛠️ Mantenimiento y soporte</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-black mb-4">4. RESPONSABILIDADES</h2>
            <p className="mb-4">El titular no se hace responsable de:</p>
            <div className="border-4 border-black p-6 space-y-3">
              <div className="flex items-start gap-3">
                <span className="font-black text-2xl">×</span>
                <p>Calidad de la conexión a Internet</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-black text-2xl">×</span>
                <p>Disponibilidad continua del sitio</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-black text-2xl">×</span>
                <p>Uso inadecuado de los servicios</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-black text-2xl">×</span>
                <p>Contenidos de sitios de terceros</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-black mb-4">5. PROPIEDAD INTELECTUAL</h2>
            <div className="border-4 border-black p-6 bg-blue-50">
              <p className="font-bold text-lg">
                Todos los contenidos están protegidos por derechos de propiedad intelectual. 
                Prohibida su reproducción sin autorización.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-black mb-4">6. PROTECCIÓN DE DATOS</h2>
            <p className="text-lg">
              Ver nuestra{' '}
              <a href="/privacidad" className="underline font-bold hover:bg-black hover:text-white px-1">
                Política de Privacidad
              </a>{' '}
              para información sobre tratamiento de datos (RGPD y LOPDGDD).
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-black mb-4">7. LEGISLACIÓN Y JURISDICCIÓN</h2>
            <div className="border-4 border-black p-6">
              <p className="font-bold mb-2">Legislación: Española</p>
              <p className="font-bold">Jurisdicción: La Llagosta</p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-black mb-4">8. CONTACTO</h2>
            <div className="border-4 border-black p-6 space-y-2">
              <p className="font-bold">✉️ contacto@crial.solutions</p>
              <p className="font-bold">🌐 www.crial.solutions</p>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t-4 border-black p-8 mt-16">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-bold mb-4">© 2025 CRIAL SOLUTIONS</p>
          <div className="flex gap-4 justify-center">
            <a href="/aviso-legal" className="underline hover:bg-black hover:text-white px-2 py-1">
              Aviso Legal
            </a>
            <a href="/privacidad" className="underline hover:bg-black hover:text-white px-2 py-1">
              Privacidad
            </a>
            <a href="/cookies" className="underline hover:bg-black hover:text-white px-2 py-1">
              Cookies
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
