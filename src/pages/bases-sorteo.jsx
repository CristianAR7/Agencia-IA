import { ArrowLeft } from 'lucide-react';

export default function BasesSorteo() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* Header */}
      <header className="border-b-4 border-black dark:border-white p-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo-firma.png?v=2" alt="CRIAL" className="w-10 h-10 object-contain" />
            <span className="text-2xl font-black dark:text-white">CRIAL SOLUTIONS</span>
          </div>
          <a
            href="/"
            className="flex items-center gap-2 px-4 py-2 border-2 border-black dark:border-white font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors dark:text-white"
          >
            <ArrowLeft size={20} />
            VOLVER
          </a>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto p-8 py-16">
        <h1 className="text-5xl font-black mb-2 dark:text-white">BASES LEGALES DEL SORTEO</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-12 font-bold">
          Sorteo de una landing page profesional · Última actualización: agosto 2026
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-3xl font-black mb-4 dark:text-white">1. EMPRESA ORGANIZADORA</h2>
            <div className="border-4 border-black dark:border-white p-6 bg-yellow-50 dark:bg-zinc-900 space-y-2">
              <p className="font-bold dark:text-white">Organizador: Cristian Alcaina Ramírez (CRIAL Solutions)</p>
              <p className="font-bold dark:text-white">NIF: 39902409P</p>
              <p className="font-bold dark:text-white">Domicilio: La Llagosta, Barcelona</p>
              <p className="font-bold dark:text-white">Email: contacto@crial.solutions</p>
            </div>
            <p className="mt-4 text-lg dark:text-gray-300">
              El organizador realiza un sorteo de carácter gratuito conforme a las presentes bases,
              de ámbito nacional (España).
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-black mb-4 dark:text-white">2. PERIODO DE PARTICIPACIÓN</h2>
            <p className="text-lg leading-relaxed dark:text-gray-300">
              La promoción estará activa desde el <strong>lunes 24 de agosto de 2026</strong> a las 00:00 h hasta el{' '}
              <strong>viernes 25 de septiembre de 2026</strong> a las 23:59 h (hora peninsular española). No se admitirán
              participaciones fuera de este plazo.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-black mb-4 dark:text-white">3. REQUISITOS PARA PARTICIPAR</h2>
            <p className="mb-4 font-bold dark:text-white">Podrán participar quienes cumplan TODOS estos requisitos:</p>
            <div className="space-y-3">
              <div className="border-l-4 border-black dark:border-white pl-4">
                <p className="font-black dark:text-white">Ser mayor de 18 años y residir en España</p>
              </div>
              <div className="border-l-4 border-black dark:border-white pl-4">
                <p className="font-black dark:text-white">Ser titular de un negocio o autónomo dado de alta</p>
                <p className="text-sm dark:text-gray-400">El premio se destina a un negocio real y verificable</p>
              </div>
              <div className="border-l-4 border-black dark:border-white pl-4">
                <p className="font-black dark:text-white">Tener perfil público de Instagram y seguir a la cuenta organizadora</p>
              </div>
              <div className="border-l-4 border-black dark:border-white pl-4">
                <p className="font-black dark:text-white">Comentar en la publicación del sorteo indicando su negocio y sector</p>
              </div>
              <div className="border-l-4 border-black dark:border-white pl-4">
                <p className="font-black dark:text-white">Etiquetar en el comentario a otra persona con negocio propio</p>
              </div>
            </div>
            <p className="mt-4 text-lg dark:text-gray-300">
              Cada participante puede dejar hasta <strong>3 comentarios</strong> (etiquetando a personas
              distintas), lo que supone hasta 3 participaciones. Compartir la publicación en stories
              otorga <strong>1 participación adicional</strong> (deberá comunicarse por mensaje directo).
              Quedan excluidos los perfiles falsos, inactivos o creados exclusivamente para el sorteo,
              así como familiares directos del organizador.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-black mb-4 dark:text-white">4. PREMIO</h2>
            <p className="mb-4 text-lg dark:text-gray-300">
              Se sorteará <strong>un sistema completo de captación de clientes</strong> valorado en
              1.200 €, desarrollado por CRIAL Solutions: página web, chatbot con inteligencia artificial
              y automatización de WhatsApp. El premio consiste <strong>única y exclusivamente</strong>
              en lo detallado a continuación.
            </p>


            <p className="font-bold mb-3 dark:text-white">EL PREMIO INCLUYE:</p>
            <div className="space-y-3 mb-6">
              <div className="border-l-4 border-blue-600 pl-4">
                <p className="font-black dark:text-white">UNA (1) sola página web, de scroll vertical</p>
                <p className="text-sm dark:text-gray-400">No son varias páginas navegables: es una única página</p>
              </div>
              <div className="border-l-4 border-blue-600 pl-4">
                <p className="font-black dark:text-white">UN (1) solo idioma: castellano</p>
                <p className="text-sm dark:text-gray-400">No se incluyen versiones en otros idiomas</p>
              </div>
              <div className="border-l-4 border-blue-600 pl-4">
                <p className="font-black dark:text-white">Hasta 5 secciones dentro de esa página</p>
                <p className="text-sm dark:text-gray-400">Portada, servicios, sobre el negocio, galería y contacto</p>
              </div>
              <div className="border-l-4 border-blue-600 pl-4">
                <p className="font-black dark:text-white">Hasta 6 servicios o productos listados</p>
              </div>
              <div className="border-l-4 border-blue-600 pl-4">
                <p className="font-black dark:text-white">Hasta 10 fotografías en la galería</p>
                <p className="text-sm dark:text-gray-400">Las aporta el ganador, ya editadas</p>
              </div>
              <div className="border-l-4 border-blue-600 pl-4">
                <p className="font-black dark:text-white">Formulario de contacto con recepción por email</p>
              </div>
              <div className="border-l-4 border-blue-600 pl-4">
                <p className="font-black dark:text-white">Diseño adaptado a móvil y tablet</p>
              </div>
              <div className="border-l-4 border-blue-600 pl-4">
                <p className="font-black dark:text-white">Chatbot con inteligencia artificial en la web</p>
                <p className="text-sm dark:text-gray-400">Entrenado con la información del negocio, capta consultas y contactos 24/7</p>
              </div>
              <div className="border-l-4 border-blue-600 pl-4">
                <p className="font-black dark:text-white">Automatización de WhatsApp</p>
                <p className="text-sm dark:text-gray-400">Aviso automático al negocio de cada contacto recibido y respuestas automáticas básicas</p>
              </div>
              <div className="border-l-4 border-blue-600 pl-4">
                <p className="font-black dark:text-white">Alojamiento incluido durante 1 año</p>
              </div>
              <div className="border-l-4 border-blue-600 pl-4">
                <p className="font-black dark:text-white">TRES (3) meses de servicio gratuito de chatbot y WhatsApp</p>
                <p className="text-sm dark:text-gray-400">Incluye los costes de plataforma. Pasados los 3 meses el ganador decide si continuar bajo la tarifa vigente, sin ninguna obligación</p>
              </div>
              <div className="border-l-4 border-blue-600 pl-4">
                <p className="font-black dark:text-white">Dos rondas de cambios sobre la propuesta inicial</p>
              </div>
            </div>

            <p className="font-bold mb-3 dark:text-white">EL PREMIO NO INCLUYE:</p>
            <div className="border-4 border-black dark:border-white p-6 space-y-2">
              <p className="font-bold dark:text-white">Agente de voz telefónico</p>
              <p className="font-bold dark:text-white">Continuidad gratuita del chatbot y WhatsApp más allá de los 3 meses</p>
              <p className="font-bold dark:text-white">Integración con CRM, agenda, calendario ni sistemas de terceros</p>
              <p className="font-bold dark:text-white">Páginas adicionales, blog, área privada ni registro de usuarios</p>
              <p className="font-bold dark:text-white">Tienda online, reservas, pasarela de pago ni funciones a medida</p>
              <p className="font-bold dark:text-white">Versiones en otros idiomas</p>
              <p className="font-bold dark:text-white">Dominio propio (el organizador facilitará un subdominio)</p>
              <p className="font-bold dark:text-white">Textos, fotografías ni logotipo, que aportará el ganador</p>
              <p className="font-bold dark:text-white">Redacción de contenidos, copywriting, traducción ni sesión de fotos</p>
              <p className="font-bold dark:text-white">Posicionamiento SEO, campañas de publicidad ni gestión de redes</p>
              <p className="font-bold dark:text-white">Mantenimiento, soporte ni cambios posteriores a la entrega</p>
              <p className="font-bold dark:text-white">Migración de una web existente ni conservación de su contenido</p>
            </div>

            <p className="mt-4 text-lg dark:text-gray-300">
              Cualquier funcionalidad, sección, idioma o servicio no listado expresamente en el
              apartado «EL PREMIO INCLUYE» queda fuera del premio y, si el ganador lo desea, deberá
              presupuestarse y contratarse aparte a precio de tarifa.
            </p>
            <p className="mt-4 text-lg dark:text-gray-300">
              Las <strong>dos rondas de cambios</strong> incluidas se refieren a ajustes sobre la
              propuesta entregada (textos, colores, orden de secciones). No incluyen rediseños completos
              ni cambios de concepto. A partir de la tercera ronda, los cambios se facturarán aparte.
            </p>
            <p className="mt-4 text-lg dark:text-gray-300">
              El premio es <strong>personal e intransferible</strong> y no podrá canjearse por su valor
              en metálico ni por ningún otro servicio. El ganador deberá aportar los contenidos en un
              plazo máximo de 30 días naturales desde la comunicación; transcurrido dicho plazo sin
              recibirlos, el organizador podrá dar por decaído el premio.
            </p>
            <p className="mt-4 text-lg dark:text-gray-300">
              Plazo de entrega: <strong>10 días laborables</strong> desde la recepción completa de los
              contenidos.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-black mb-4 dark:text-white">5. ELECCIÓN DEL GANADOR</h2>
            <p className="text-lg leading-relaxed mb-4 dark:text-gray-300">
              El ganador se elegirá <strong>por sorteo aleatorio</strong> entre todos los comentarios
              válidos, mediante una herramienta de selección aleatoria, el día{' '}
              <strong>sábado 26 de septiembre de 2026</strong>. El proceso se grabará y publicará en el perfil del
              organizador para garantizar la transparencia.
            </p>
            <p className="text-lg leading-relaxed dark:text-gray-300">
              Se elegirán además <strong>dos suplentes</strong>, que accederán al premio por orden si el
              ganador no cumple los requisitos, no responde en el plazo indicado o renuncia.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-black mb-4 dark:text-white">6. COMUNICACIÓN Y ACEPTACIÓN</h2>
            <p className="text-lg leading-relaxed dark:text-gray-300">
              El ganador será anunciado públicamente y contactado por mensaje directo de Instagram.
              Dispondrá de <strong>48 horas</strong> para responder aceptando el premio y facilitar sus
              datos de contacto. Si no responde en ese plazo, el premio pasará al primer suplente.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-black mb-4 dark:text-white">7. DERECHOS DE IMAGEN Y DIFUSIÓN</h2>
            <p className="text-lg leading-relaxed dark:text-gray-300">
              La aceptación del premio implica autorizar al organizador a publicar el nombre del negocio
              ganador y el resultado del trabajo realizado en su web y redes sociales con fines
              promocionales, sin que ello genere derecho a contraprestación alguna. El ganador podrá
              revocar esta autorización comunicándolo por escrito a contacto@crial.solutions.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-black mb-4 dark:text-white">8. PROTECCIÓN DE DATOS</h2>
            <p className="text-lg leading-relaxed mb-4 dark:text-gray-300">
              Los datos facilitados serán tratados por Cristian Alcaina Ramírez con la única finalidad
              de gestionar el sorteo, comunicar el resultado y, en su caso, ejecutar el premio. La base
              legal es el consentimiento del participante, otorgado al participar.
            </p>
            <p className="text-lg leading-relaxed dark:text-gray-300">
              Los datos no se cederán a terceros y se conservarán durante el tiempo necesario para
              gestionar la promoción. Puede ejercer sus derechos de acceso, rectificación, supresión,
              oposición, limitación y portabilidad escribiendo a{' '}
              <strong>contacto@crial.solutions</strong>. Más información en nuestra{' '}
              <a href="/privacidad" className="underline font-bold dark:text-white">política de privacidad</a>.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-black mb-4 dark:text-white">9. FISCALIDAD</h2>
            <p className="text-lg leading-relaxed dark:text-gray-300">
              El premio se entrega en especie y queda sujeto a la normativa fiscal vigente. En caso de
              resultar de aplicación el ingreso a cuenta del IRPF correspondiente a premios en especie,
              será asumido íntegramente por el organizador, sin coste para el ganador.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-black mb-4 dark:text-white">10. EXONERACIÓN DE INSTAGRAM</h2>
            <div className="border-4 border-black dark:border-white p-6 bg-yellow-50 dark:bg-zinc-900">
              <p className="font-bold text-lg dark:text-white">
                Esta promoción no está patrocinada, avalada ni administrada por Instagram, ni asociada
                en modo alguno a dicha plataforma. Los participantes liberan a Instagram de toda
                responsabilidad derivada de la promoción.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-black mb-4 dark:text-white">11. ACEPTACIÓN Y LEGISLACIÓN</h2>
            <p className="text-lg leading-relaxed dark:text-gray-300">
              La participación en el sorteo implica la aceptación íntegra de estas bases. El organizador
              se reserva el derecho de excluir a cualquier participante que incumpla los requisitos o
              actúe de forma fraudulenta, así como de modificar o cancelar la promoción por causas
              justificadas, comunicándolo por los mismos medios de difusión.
            </p>
            <p className="text-lg leading-relaxed mt-4 dark:text-gray-300">
              Para cualquier controversia serán competentes los juzgados y tribunales que correspondan
              conforme a la legislación española vigente.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
