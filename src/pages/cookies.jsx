import { ArrowLeft } from 'lucide-react';

export default function Cookies() {
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
        <h1 className="text-5xl font-black mb-2">POLÍTICA DE COOKIES</h1>
        <p className="text-sm text-gray-600 mb-12 font-bold">Última actualización: Enero 2025</p>

        <div className="space-y-8">
          <section className="border-4 border-black p-6 bg-yellow-50">
            <p className="font-bold text-lg">
              Esta política explica qué son las cookies, cómo las usamos en www.crial.solutions y cómo puedes gestionarlas.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-black mb-4">1. ¿QUÉ SON LAS COOKIES?</h2>
            <p className="text-lg leading-relaxed">
              Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. 
              Permiten recordar tus acciones y preferencias para mejorar tu experiencia.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-black mb-4">2. TIPOS DE COOKIES QUE UTILIZAMOS</h2>
            
            <div className="space-y-4">
              <div className="border-4 border-black p-6">
                <h3 className="text-xl font-black mb-2">🔒 COOKIES TÉCNICAS (NECESARIAS)</h3>
                <p className="text-sm font-bold mb-3">Duración: Sesión / 1 año | Necesarias: SÍ</p>
                <p className="mb-3">Esenciales para el correcto funcionamiento del sitio. Sin estas cookies no podríamos ofrecerte nuestros servicios.</p>
                <p className="font-bold mb-2">Finalidad:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Gestión de sesiones de usuario</li>
                  <li>Seguridad del sitio web</li>
                  <li>Recordar configuraciones básicas</li>
                  <li>Funcionamiento del formulario</li>
                </ul>
              </div>

              <div className="border-4 border-black p-6">
                <h3 className="text-xl font-black mb-2">📊 COOKIES ANALÍTICAS</h3>
                <p className="text-sm font-bold mb-3">Duración: Hasta 2 años | Necesarias: NO (requieren consentimiento)</p>
                <p className="mb-3">Nos permiten analizar el uso del sitio para mejorar la experiencia de usuario.</p>
                <p className="font-bold mb-2">Finalidad:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Medir tráfico y comportamiento</li>
                  <li>Entender páginas más visitadas</li>
                  <li>Mejorar diseño y contenido</li>
                  <li>Optimizar experiencia</li>
                </ul>
                <p className="mt-3 font-bold">Proveedores: Cloudflare Analytics, Vercel Analytics</p>
              </div>

              <div className="border-4 border-black p-6">
                <h3 className="text-xl font-black mb-2">⚙️ COOKIES DE PREFERENCIAS</h3>
                <p className="text-sm font-bold mb-3">Duración: 1 año | Necesarias: NO (requieren consentimiento)</p>
                <p className="mb-3">Permiten recordar tus preferencias para personalizar futuras visitas.</p>
                <p className="font-bold mb-2">Finalidad:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Recordar idioma preferido</li>
                  <li>Guardar configuraciones</li>
                  <li>Recordar aceptación de cookies</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-black mb-4">3. COOKIES DE TERCEROS</h2>
            <p className="mb-4">Utilizamos servicios de terceros que pueden instalar sus propias cookies:</p>
            <div className="space-y-3">
              <div className="border-l-4 border-black pl-4">
                <p className="font-black">Cloudflare</p>
                <p className="text-sm">CDN y seguridad</p>
                <p className="text-sm">Política: cloudflare.com/privacypolicy</p>
              </div>
              <div className="border-l-4 border-black pl-4">
                <p className="font-black">Vercel</p>
                <p className="text-sm">Hosting y análisis</p>
                <p className="text-sm">Política: vercel.com/legal/privacy-policy</p>
              </div>
              <div className="border-l-4 border-black pl-4">
                <p className="font-black">Railway</p>
                <p className="text-sm">Backend y procesamiento</p>
                <p className="text-sm">Política: railway.app/legal/privacy</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-black mb-4">4. CÓMO GESTIONAR COOKIES</h2>
            <h3 className="text-xl font-black mb-3">📱 Configuración del Navegador</h3>
            <p className="mb-4">Puedes configurar tu navegador para rechazar cookies o avisarte antes de aceptarlas:</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="border-2 border-black p-4 text-center font-bold">
                Google Chrome
              </div>
              <div className="border-2 border-black p-4 text-center font-bold">
                Mozilla Firefox
              </div>
              <div className="border-2 border-black p-4 text-center font-bold">
                Safari
              </div>
              <div className="border-2 border-black p-4 text-center font-bold">
                Microsoft Edge
              </div>
            </div>
            <div className="mt-4 border-4 border-black bg-red-50 p-4">
              <p className="font-black">⚠️ IMPORTANTE:</p>
              <p>Bloquear cookies puede afectar la funcionalidad del sitio.</p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-black mb-4">5. BASE LEGAL</h2>
            <p className="text-lg">
              El uso de cookies se basa en tu consentimiento, excepto cookies técnicas necesarias 
              para el funcionamiento del sitio.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-black mb-4">6. ACTUALIZACIONES</h2>
            <p className="text-lg">
              Podemos actualizar esta política periódicamente. Te recomendamos revisarla regularmente.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-black mb-4">7. MÁS INFORMACIÓN</h2>
            <p className="text-lg">
              Para más información sobre privacidad, consulta nuestra{' '}
              <a href="/privacidad" className="underline font-bold hover:bg-black hover:text-white px-1">
                Política de Privacidad
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-black mb-4">8. CONTACTO</h2>
            <div className="border-4 border-black p-6 space-y-2">
              <p className="font-bold">✉️ contacto@crial.solutions</p>
              <p className="font-bold">🌐 www.crial.solutions</p>
            </div>
          </section>

          <div className="border-4 border-black bg-gray-100 p-6 text-center">
            <p className="font-bold">
              Esta política cumple con la Ley 34/2002 (LSSI-CE) y el RGPD
            </p>
          </div>
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
