import { ArrowLeft } from 'lucide-react';

export default function Privacidad() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b-4 border-black p-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo-firma.png" alt="CRIAL" className="w-10 h-10 object-contain" />
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
        <h1 className="text-5xl font-black mb-2">POLÍTICA DE PRIVACIDAD</h1>
        <p className="text-sm text-gray-600 mb-12 font-bold">Última actualización: Enero 2025</p>

        <div className="space-y-8">
          <section className="border-4 border-black p-6 bg-blue-50">
            <p className="font-bold text-lg">
              En CRIAL Solutions respetamos tu privacidad. Esta política explica cómo recopilamos, 
              usamos y protegemos tus datos conforme al RGPD.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-black mb-4">1. RESPONSABLE DEL TRATAMIENTO</h2>
            <div className="border-4 border-black p-6 bg-yellow-50">
              <p className="font-bold mb-2">Identidad: Cristian Alcaina Ramírez/p>
              <p className="font-bold mb-2">NIF/CIF: 39902409P/p>
              <p className="font-bold mb-2">Dirección: La Llagosta, Barcelona</p>
              <p className="font-bold">Email: contacto@crial.solutions</p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-black mb-4">2. DATOS QUE RECOPILAMOS</h2>
            
            <div className="space-y-4">
              <div className="border-4 border-black p-6">
                <h3 className="text-xl font-black mb-3">👤 DATOS DE IDENTIFICACIÓN</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Nombre y apellidos</li>
                  <li>Email</li>
                  <li>Teléfono (opcional)</li>
                  <li>Nombre de empresa</li>
                </ul>
              </div>

              <div className="border-4 border-black p-6">
                <h3 className="text-xl font-black mb-3">💼 DATOS COMERCIALES</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Industria o sector</li>
                  <li>Descripción del negocio</li>
                  <li>Necesidades y objetivos</li>
                  <li>Presupuesto indicativo</li>
                </ul>
              </div>

              <div className="border-4 border-black p-6">
                <h3 className="text-xl font-black mb-3">🌐 DATOS DE NAVEGACIÓN</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Dirección IP</li>
                  <li>Tipo de navegador</li>
                  <li>Páginas visitadas</li>
                  <li>Cookies (ver Política de Cookies)</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-black mb-4">3. FINALIDAD DEL TRATAMIENTO</h2>
            <div className="space-y-3">
              <div className="border-l-4 border-black pl-4">
                <p className="font-black">Gestión de solicitudes</p>
                <p className="text-sm font-bold">Base legal: Consentimiento</p>
              </div>
              <div className="border-l-4 border-black pl-4">
                <p className="font-black">Generación de propuestas</p>
                <p className="text-sm font-bold">Base legal: Medidas precontractuales</p>
              </div>
              <div className="border-l-4 border-black pl-4">
                <p className="font-black">Prestación de servicios</p>
                <p className="text-sm font-bold">Base legal: Ejecución de contrato</p>
              </div>
              <div className="border-l-4 border-black pl-4">
                <p className="font-black">Comunicaciones comerciales</p>
                <p className="text-sm font-bold">Base legal: Consentimiento (baja en cualquier momento)</p>
              </div>
              <div className="border-l-4 border-black pl-4">
                <p className="font-black">Cumplimiento legal</p>
                <p className="text-sm font-bold">Base legal: Obligación legal</p>
              </div>
              <div className="border-l-4 border-black pl-4">
                <p className="font-black">Mejora de servicios</p>
                <p className="text-sm font-bold">Base legal: Interés legítimo</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-black mb-4">4. CONSERVACIÓN DE DATOS</h2>
            <div className="border-4 border-black p-6 space-y-2">
              <p><span className="font-black">Solicitudes:</span> 1 año desde última interacción</p>
              <p><span className="font-black">Contratos:</span> Durante vigencia + 6 años</p>
              <p><span className="font-black">Marketing:</span> Hasta solicitud de baja</p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-black mb-4">5. DESTINATARIOS</h2>
            <p className="mb-4">Tus datos pueden comunicarse a:</p>
            <div className="space-y-3">
              <div className="border-l-4 border-black pl-4">
                <p className="font-black">Proveedores tecnológicos</p>
                <p className="text-sm">Railway, Vercel, Cloudflare</p>
              </div>
              <div className="border-l-4 border-black pl-4">
                <p className="font-black">Servicios IA</p>
                <p className="text-sm">Anthropic (Claude)</p>
              </div>
              <div className="border-l-4 border-black pl-4">
                <p className="font-black">Autoridades</p>
                <p className="text-sm">Cuando sea legalmente requerido</p>
              </div>
            </div>
            <div className="mt-4 border-4 border-black bg-green-50 p-4">
              <p className="font-bold">✓ Todos cumplen con RGPD o tienen garantías adecuadas.</p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-black mb-4">6. TUS DERECHOS</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border-4 border-black p-4">
                <p className="font-black mb-2">👁️ ACCESO</p>
                <p className="text-sm">Confirmar y acceder a tus datos</p>
              </div>
              <div className="border-4 border-black p-4">
                <p className="font-black mb-2">✏️ RECTIFICACIÓN</p>
                <p className="text-sm">Corregir datos inexactos</p>
              </div>
              <div className="border-4 border-black p-4">
                <p className="font-black mb-2">🗑️ SUPRESIÓN</p>
                <p className="text-sm">Eliminar datos innecesarios</p>
              </div>
              <div className="border-4 border-black p-4">
                <p className="font-black mb-2">🚫 OPOSICIÓN</p>
                <p className="text-sm">Oponerte al tratamiento</p>
              </div>
              <div className="border-4 border-black p-4">
                <p className="font-black mb-2">⏸️ LIMITACIÓN</p>
                <p className="text-sm">Limitar el tratamiento</p>
              </div>
              <div className="border-4 border-black p-4">
                <p className="font-black mb-2">📦 PORTABILIDAD</p>
                <p className="text-sm">Recibir y trasladar datos</p>
              </div>
            </div>

            <div className="mt-6 border-4 border-black p-6 bg-yellow-50">
              <p className="font-black mb-3">¿Cómo ejercer tus derechos?</p>
              <p className="mb-2"><span className="font-bold">Email:</span> contacto@crial.solutions</p>
              <p className="mb-2">Incluye copia de tu DNI. Respuesta en máximo 1 mes.</p>
              <p className="font-bold">También puedes reclamar ante la AEPD (www.aepd.es).</p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-black mb-4">7. SEGURIDAD</h2>
            <div className="border-4 border-black p-6">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="font-black">🔒</span>
                  <span>Cifrado SSL/TLS en comunicaciones</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-black">🖥️</span>
                  <span>Servidores seguros certificados</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-black">👥</span>
                  <span>Acceso restringido al personal autorizado</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-black">💾</span>
                  <span>Copias de seguridad periódicas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-black">🔍</span>
                  <span>Auditorías regulares</span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-black mb-4">8. MENORES</h2>
            <p className="text-lg">
              Servicios no dirigidos a menores de 18 años. No recopilamos datos de menores intencionadamente.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-black mb-4">9. ACTUALIZACIONES</h2>
            <p className="text-lg">
              Podemos actualizar esta política periódicamente. Te notificaremos cambios significativos.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-black mb-4">10. CONTACTO</h2>
            <div className="border-4 border-black p-6 space-y-2">
              <p className="font-bold">✉️ contacto@crial.solutions</p>
              <p className="font-bold">🌐 www.crial.solutions</p>
            </div>
          </section>

          <div className="border-4 border-black bg-gray-100 p-6 text-center">
            <p className="font-bold">
              Esta política cumple con el RGPD (UE 2016/679) y LOPDGDD (Ley Orgánica 3/2018)
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
