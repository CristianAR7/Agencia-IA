// ============================================
// GENERADOR DE LANDING PAGE
// Página de captura con agente de IA integrado
// ============================================

const fs = require('fs');
const path = require('path');

class LandingPageGenerator {
    constructor(config) {
        this.config = {
            businessName: config.businessName || 'Mi Negocio',
            industry: config.industry || 'general',
            offer: config.offer || 'Nuestro servicio',
            ctaText: config.ctaText || 'Contáctanos',
            colors: config.colors || {
                primary: '#6366f1',
                secondary: '#ec4899',
                background: '#ffffff'
            },
            features: config.features || [],
            includeChat: config.includeChat !== false
        };
        this.outputDir = config.outputDir || './generated-landing-page';
    }

    generate() {
        console.log('🎨 Generando Landing Page...');
        
        this.createProjectStructure();
        this.generateHTML();
        this.generateCSS();
        this.generateJS();
        if (this.config.includeChat) {
            this.generateChatIntegration();
        }
        this.generateAssets();
        this.generateReadme();
        
        console.log('✅ Landing Page generada exitosamente en:', this.outputDir);
        console.log('\n📋 Próximos pasos:');
        console.log('1. cd ' + this.outputDir);
        console.log('2. Abrir index.html en navegador');
        console.log('3. Personalizar contenido');
        console.log('4. Deploy a Vercel/Netlify');
    }

    createProjectStructure() {
        const dirs = [
            this.outputDir,
            `${this.outputDir}/css`,
            `${this.outputDir}/js`,
            `${this.outputDir}/img`,
            `${this.outputDir}/backend`
        ];
        
        dirs.forEach(dir => {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
        });
    }

    generateHTML() {
        const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${this.config.businessName} - ${this.config.offer}</title>
    <meta name="description" content="${this.config.businessName} - ${this.config.offer}">
    <link rel="stylesheet" href="css/styles.css">
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
    <!-- Hero Section -->
    <section class="hero-section" id="hero">
        <div class="container">
            <div class="hero-content">
                <h1 class="hero-title">${this.config.businessName}</h1>
                <p class="hero-subtitle">${this.config.offer}</p>
                <button class="cta-button" onclick="scrollToForm()">${this.config.ctaText}</button>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section class="features-section" id="features">
        <div class="container">
            <h2 class="section-title">¿Por qué elegirnos?</h2>
            <div class="features-grid">
                ${this.generateFeaturesHTML()}
            </div>
        </div>
    </section>

    <!-- Benefits Section -->
    <section class="benefits-section" id="benefits">
        <div class="container">
            <h2 class="section-title">Beneficios</h2>
            <div class="benefits-list">
                <div class="benefit-item">
                    <div class="benefit-icon">✓</div>
                    <div class="benefit-text">
                        <h3>Resultados Garantizados</h3>
                        <p>Obtén resultados medibles en tiempo récord</p>
                    </div>
                </div>
                <div class="benefit-item">
                    <div class="benefit-icon">⚡</div>
                    <div class="benefit-text">
                        <h3>Implementación Rápida</h3>
                        <p>Comienza en menos de 48 horas</p>
                    </div>
                </div>
                <div class="benefit-item">
                    <div class="benefit-icon">🔒</div>
                    <div class="benefit-text">
                        <h3>100% Seguro</h3>
                        <p>Protección total de tus datos</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Social Proof Section -->
    <section class="testimonials-section" id="testimonials">
        <div class="container">
            <h2 class="section-title">Lo que dicen nuestros clientes</h2>
            <div class="testimonials-grid">
                <div class="testimonial-card">
                    <div class="testimonial-rating">⭐⭐⭐⭐⭐</div>
                    <p class="testimonial-text">"Increíble servicio, superó todas mis expectativas. Lo recomiendo totalmente."</p>
                    <p class="testimonial-author">- María García</p>
                </div>
                <div class="testimonial-card">
                    <div class="testimonial-rating">⭐⭐⭐⭐⭐</div>
                    <p class="testimonial-text">"Profesionales, rápidos y eficientes. No podría estar más satisfecho."</p>
                    <p class="testimonial-author">- Carlos Ruiz</p>
                </div>
                <div class="testimonial-card">
                    <div class="testimonial-rating">⭐⭐⭐⭐⭐</div>
                    <p class="testimonial-text">"La mejor decisión que he tomado para mi negocio este año."</p>
                    <p class="testimonial-author">- Ana Martínez</p>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section with Form -->
    <section class="cta-section" id="contact">
        <div class="container">
            <h2 class="section-title">¿Listo para comenzar?</h2>
            <p class="section-subtitle">Completa el formulario y nos pondremos en contacto contigo</p>
            
            <form class="contact-form" id="contactForm">
                <div class="form-group">
                    <input type="text" id="name" name="name" placeholder="Nombre completo" required>
                </div>
                <div class="form-group">
                    <input type="email" id="email" name="email" placeholder="Email" required>
                </div>
                <div class="form-group">
                    <input type="tel" id="phone" name="phone" placeholder="Teléfono" required>
                </div>
                <div class="form-group">
                    <textarea id="message" name="message" placeholder="¿En qué podemos ayudarte?" rows="4" required></textarea>
                </div>
                <button type="submit" class="submit-button">${this.config.ctaText}</button>
            </form>

            <div id="formSuccess" class="form-success hidden">
                ✅ ¡Mensaje enviado! Nos pondremos en contacto contigo pronto.
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <p>&copy; 2025 ${this.config.businessName}. Todos los derechos reservados.</p>
        </div>
    </footer>

    ${this.config.includeChat ? '<div id="ai-chat-widget"></div>' : ''}

    <script src="js/main.js"></script>
    ${this.config.includeChat ? '<script src="js/chat-widget.js"></script>' : ''}
</body>
</html>
`;
        
        fs.writeFileSync(`${this.outputDir}/index.html`, htmlContent);
    }

    generateFeaturesHTML() {
        const defaultFeatures = [
            { icon: '🚀', title: 'Rápido y Eficiente', desc: 'Resultados en tiempo récord' },
            { icon: '💎', title: 'Alta Calidad', desc: 'Estándares premium' },
            { icon: '🎯', title: 'Personalizado', desc: 'Adaptado a tus necesidades' },
            { icon: '📊', title: 'Medible', desc: 'ROI claramente definido' }
        ];

        return defaultFeatures.map(feature => `
            <div class="feature-card">
                <div class="feature-icon">${feature.icon}</div>
                <h3 class="feature-title">${feature.title}</h3>
                <p class="feature-desc">${feature.desc}</p>
            </div>
        `).join('');
    }

    generateCSS() {
        const cssContent = `:root {
    --primary-color: ${this.config.colors.primary};
    --secondary-color: ${this.config.colors.secondary};
    --background-color: ${this.config.colors.background};
    --text-color: #1f2937;
    --light-gray: #f9fafb;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    color: var(--text-color);
    line-height: 1.6;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Hero Section */
.hero-section {
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
    color: white;
    padding: 100px 20px;
    text-align: center;
}

.hero-title {
    font-size: 3.5rem;
    font-weight: 800;
    margin-bottom: 20px;
}

.hero-subtitle {
    font-size: 1.5rem;
    margin-bottom: 40px;
    opacity: 0.9;
}

.cta-button {
    background: white;
    color: var(--primary-color);
    padding: 18px 48px;
    border: none;
    border-radius: 50px;
    font-size: 1.2rem;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
}

.cta-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
}

/* Features Section */
.features-section {
    padding: 80px 20px;
    background: var(--light-gray);
}

.section-title {
    text-align: center;
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 50px;
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
}

.feature-card {
    background: white;
    padding: 40px 30px;
    border-radius: 12px;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    transition: transform 0.2s;
}

.feature-card:hover {
    transform: translateY(-5px);
}

.feature-icon {
    font-size: 3rem;
    margin-bottom: 20px;
}

.feature-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 10px;
}

.feature-desc {
    color: #6b7280;
}

/* Benefits Section */
.benefits-section {
    padding: 80px 20px;
}

.benefits-list {
    max-width: 800px;
    margin: 0 auto;
}

.benefit-item {
    display: flex;
    gap: 20px;
    margin-bottom: 30px;
    padding: 30px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.benefit-icon {
    font-size: 2rem;
    color: var(--primary-color);
    font-weight: bold;
}

/* Testimonials */
.testimonials-section {
    padding: 80px 20px;
    background: var(--light-gray);
}

.testimonials-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
}

.testimonial-card {
    background: white;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.testimonial-rating {
    color: #fbbf24;
    margin-bottom: 15px;
}

.testimonial-text {
    font-style: italic;
    margin-bottom: 15px;
    color: #4b5563;
}

.testimonial-author {
    font-weight: 600;
    color: var(--primary-color);
}

/* CTA Section */
.cta-section {
    padding: 80px 20px;
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
    color: white;
}

.section-subtitle {
    text-align: center;
    font-size: 1.2rem;
    margin-bottom: 50px;
    opacity: 0.9;
}

.contact-form {
    max-width: 600px;
    margin: 0 auto;
}

.form-group {
    margin-bottom: 20px;
}

.contact-form input,
.contact-form textarea {
    width: 100%;
    padding: 15px;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
}

.submit-button {
    width: 100%;
    background: white;
    color: var(--primary-color);
    padding: 18px;
    border: none;
    border-radius: 8px;
    font-size: 1.2rem;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s;
}

.submit-button:hover {
    transform: translateY(-2px);
}

.form-success {
    text-align: center;
    padding: 20px;
    background: rgba(255,255,255,0.2);
    border-radius: 8px;
    margin-top: 20px;
}

.hidden {
    display: none;
}

/* Footer */
.footer {
    background: #1f2937;
    color: white;
    padding: 30px 20px;
    text-align: center;
}

/* Responsive */
@media (max-width: 768px) {
    .hero-title {
        font-size: 2.5rem;
    }
    
    .hero-subtitle {
        font-size: 1.2rem;
    }
    
    .section-title {
        font-size: 2rem;
    }
}
`;
        
        fs.writeFileSync(`${this.outputDir}/css/styles.css`, cssContent);
    }

    generateJS() {
        const jsContent = `// Main JavaScript para Landing Page

// Scroll suave
function scrollToForm() {
    document.getElementById('contact').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// Manejo del formulario
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        message: document.getElementById('message').value,
        timestamp: new Date().toISOString(),
        source: 'landing-page'
    };

    try {
        // Enviar a tu backend
        const response = await fetch('http://localhost:3000/api/leads', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            // Mostrar mensaje de éxito
            document.getElementById('contactForm').style.display = 'none';
            document.getElementById('formSuccess').classList.remove('hidden');

            // Analytics
            trackConversion(formData);

            // Opcional: Redirigir a página de gracias
            // setTimeout(() => window.location.href = '/gracias.html', 2000);
        }

    } catch (error) {
        console.error('Error enviando formulario:', error);
        alert('Hubo un error. Por favor intenta de nuevo.');
    }
});

// Tracking de conversiones
function trackConversion(data) {
    // Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'conversion', {
            'send_to': 'AW-CONVERSION_ID',
            'value': 1.0,
            'currency': 'EUR'
        });
    }

    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', 'Lead', {
            content_name: 'Landing Page Form',
            value: 1.0,
            currency: 'EUR'
        });
    }

    console.log('Conversión registrada:', data);
}

// Animaciones al scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animación
document.querySelectorAll('.feature-card, .benefit-item, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Contador de visitantes (opcional)
let visitorCount = localStorage.getItem('visitorCount') || 0;
visitorCount++;
localStorage.setItem('visitorCount', visitorCount);
console.log(\`Visitante número: \${visitorCount}\`);
`;
        
        fs.writeFileSync(`${this.outputDir}/js/main.js`, jsContent);
    }

    generateChatIntegration() {
        const chatWidgetCode = `// Integración simple del chat widget
// Este widget se conecta al Web Chatbot que generamos

(function() {
    // Cargar el widget de chat desde tu servidor
    const chatScript = document.createElement('script');
    chatScript.src = 'http://localhost:3000/widget/chatbot.js';
    chatScript.async = true;
    
    chatScript.onload = function() {
        console.log('✅ Chat widget cargado');
    };
    
    document.body.appendChild(chatScript);
})();

// Alternativamente, si prefieres un widget más simple sin backend:
// Descomenta el código de abajo

/*
(function() {
    const widgetHTML = \`
        <div id="simple-chat-widget" style="position: fixed; bottom: 20px; right: 20px; z-index: 9999;">
            <button id="chat-toggle" style="width: 60px; height: 60px; border-radius: 30px; background: ${this.config.colors.primary}; border: none; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
                💬
            </button>
        </div>
    \`;
    
    document.addEventListener('DOMContentLoaded', function() {
        document.body.insertAdjacentHTML('beforeend', widgetHTML);
        
        document.getElementById('chat-toggle').addEventListener('click', function() {
            // Abrir chat o scrollear al formulario
            scrollToForm();
        });
    });
})();
*/
`;
        
        fs.writeFileSync(`${this.outputDir}/js/chat-widget.js`, chatWidgetCode);
    }

    generateAssets() {
        // Crear archivo placeholder para logo
        const placeholderSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
    <rect width="200" height="200" fill="${this.config.colors.primary}"/>
    <text x="100" y="110" font-family="Arial" font-size="24" fill="white" text-anchor="middle">LOGO</text>
</svg>`;
        
        fs.writeFileSync(`${this.outputDir}/img/logo.svg`, placeholderSVG);
    }

    generateReadme() {
        const readmeContent = `# Landing Page - ${this.config.businessName}

Landing page profesional con IA integrada.

## 🚀 Uso Inmediato

1. Abrir \`index.html\` en navegador
2. ¡Listo! Ya funciona

## 📝 Personalización

### Contenido
Editar \`index.html\`:
- Textos y títulos
- Secciones
- Testimonios

### Estilos
Editar \`css/styles.css\`:
- Colores (variables CSS al inicio)
- Fuentes
- Espaciados

### Funcionalidad
Editar \`js/main.js\`:
- Formulario de contacto
- Analytics
- Integraciones

## 🚀 Deploy

### Vercel (Recomendado)
\`\`\`bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
\`\`\`

### Netlify
1. Arrastrar carpeta a netlify.com/drop
2. ¡Listo!

### GitHub Pages
1. Subir a GitHub
2. Settings → Pages → Source: main branch
3. Acceder via: username.github.io/repo-name

## 🔌 Backend (Opcional)

Si quieres procesar leads:

\`\`\`bash
cd backend
npm install
# Configurar .env
npm start
\`\`\`

Ver \`backend/README.md\` para detalles.

## 📊 Analytics

Agregar tracking:

**Google Analytics:**
\`\`\`html
<!-- Antes de </head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
\`\`\`

**Facebook Pixel:**
\`\`\`html
<!-- Antes de </head> -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'YOUR_PIXEL_ID');
  fbq('track', 'PageView');
</script>
\`\`\`

## 💰 Valor

**Setup fee al cliente:** €300-800
**Costo real:** €0-10/mes (hosting)
**Tu margen:** €290-790 + recurrente si incluyes mantenimiento

## 🎯 Optimización

- Velocidad: Comprimir imágenes, minificar CSS/JS
- SEO: Meta tags, estructura semántica
- Conversión: A/B testing de CTA

Landing Page generada por AI Solution Generator
`;
        
        fs.writeFileSync(`${this.outputDir}/README.md`, readmeContent);

        // README del backend
        const backendReadme = `# Backend para Landing Page

API simple para procesar leads del formulario.

## Setup

\`\`\`bash
npm install
cp .env.example .env
npm start
\`\`\`

## Endpoints

**POST /api/leads**
Guardar lead del formulario

\`\`\`json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "phone": "+34666555444",
  "message": "Quiero más info"
}
\`\`\`

## Integraciones

### Enviar a CRM
Editar \`src/services/crmService.js\`

### Enviar emails
Editar \`src/services/emailService.js\`

### Webhook a Zapier
Configurar en \`.env\`:
\`\`\`
ZAPIER_WEBHOOK=https://hooks.zapier.com/hooks/catch/...
\`\`\`
`;
        
        fs.writeFileSync(`${this.outputDir}/backend/README.md`, backendReadme);
    }
}

// Uso del generador
if (require.main === module) {
    const generator = new LandingPageGenerator({
        businessName: 'TechSolutions',
        industry: 'tecnología',
        offer: 'Automatiza tu negocio con IA',
        ctaText: 'Solicitar Demo Gratis',
        colors: {
            primary: '#6366f1',
            secondary: '#ec4899',
            background: '#ffffff'
        },
        features: ['fast', 'secure', 'scalable'],
        includeChat: true,
        outputDir: './generated-landing-page'
    });

    generator.generate();
}

module.exports = LandingPageGenerator;
