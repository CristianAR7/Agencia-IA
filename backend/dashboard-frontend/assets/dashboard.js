/* ── CRIAL Dashboard — Shared JS Utilities ───────────────────────────────── */

// ── API ───────────────────────────────────────────────────────────────────────
const API = {
    base: '/dashboard/api',

    async post(path, body) {
        const res = await fetch(this.base + path, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || `Error ${res.status}`);
        return data;
    },

    async get(path) {
        const res = await fetch(this.base + path);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || `Error ${res.status}`);
        return data;
    },

    async download(path, body, filename) {
        const res = await fetch(this.base + path, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        if (!res.ok) {
            const d = await res.json();
            throw new Error(d.error || `Error ${res.status}`);
        }
        const blob = await res.blob();
        const url  = URL.createObjectURL(blob);
        const a    = document.createElement('a');
        a.href     = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    }
};

// ── Toast ─────────────────────────────────────────────────────────────────────
function toast(message, type = 'info', duration = 3500) {
    let el = document.getElementById('toast');
    if (!el) {
        el = document.createElement('div');
        el.id = 'toast';
        document.body.appendChild(el);
    }
    el.textContent  = message;
    el.className    = `show ${type}`;
    clearTimeout(el._timer);
    el._timer = setTimeout(() => { el.classList.remove('show'); }, duration);
}

// ── Loading state ─────────────────────────────────────────────────────────────
function setLoading(btnEl, isLoading, loadingText = 'Procesando...') {
    if (!btnEl) return;
    if (isLoading) {
        btnEl._original = btnEl.innerHTML;
        btnEl.disabled  = true;
        btnEl.innerHTML = `<span class="spinner"></span> ${loadingText}`;
    } else {
        btnEl.disabled  = false;
        btnEl.innerHTML = btnEl._original || btnEl.innerHTML;
    }
}

// ── Sidebar active link ───────────────────────────────────────────────────────
function setActiveNav() {
    const path = window.location.pathname;
    document.querySelectorAll('.nav-link').forEach(a => {
        const href = a.getAttribute('href') || '';
        const isActive = path === href || (href !== '/dashboard/' && path.startsWith(href.replace('.html', '')));
        a.classList.toggle('active', isActive);
    });
}

// ── Tabs ──────────────────────────────────────────────────────────────────────
function initTabs(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    container.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.tab;
            container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            container.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            const panel = container.querySelector(`[data-panel="${target}"]`);
            if (panel) panel.classList.add('active');
        });
    });

    // Activate first tab by default
    const firstBtn = container.querySelector('.tab-btn');
    if (firstBtn) firstBtn.click();
}

// ── Copy to clipboard ─────────────────────────────────────────────────────────
async function copyText(text, btnEl) {
    await navigator.clipboard.writeText(text);
    if (btnEl) {
        const orig = btnEl.textContent;
        btnEl.textContent = '✓ Copiado';
        setTimeout(() => { btnEl.textContent = orig; }, 1500);
    }
    toast('Copiado al portapapeles', 'success', 1500);
}

// ── Score bar renderer ────────────────────────────────────────────────────────
function renderScoreBar(label, value, max = 10) {
    const pct   = Math.min(100, (value / max) * 100);
    const color = pct >= 70 ? '#10b981' : pct >= 40 ? '#f59e0b' : '#ef4444';
    return `
        <div class="score-bar-wrap">
            <span class="score-bar-label">${label}</span>
            <div class="score-bar-track">
                <div class="score-bar-fill" style="width:${pct}%;background:${color}"></div>
            </div>
            <span class="score-bar-val" style="color:${color}">${value}</span>
        </div>`;
}

// ── Session management (chat) ─────────────────────────────────────────────────
const Session = {
    key: 'crial_chat_session',
    get()  { return localStorage.getItem(this.key); },
    set(id){ localStorage.setItem(this.key, id); },
    clear(){ localStorage.removeItem(this.key); }
};

// ── Format date ───────────────────────────────────────────────────────────────
function formatDate(iso) {
    if (!iso) return '—';
    return new Date(iso).toLocaleDateString('es-ES', {
        day: '2-digit', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
    });
}

// ── Escape HTML ───────────────────────────────────────────────────────────────
function esc(str) {
    return String(str ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ── Init on DOM ready ─────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', setActiveNav);

// ── Simple Markdown renderer (no library) ─────────────────────────────────────
function renderMarkdown(text) {
    if (!text) return '';
    let html = esc(text);

    // Code blocks (``` ... ```)
    html = html.replace(/```(\w*)\n?([\s\S]*?)```/g, (_, lang, code) =>
        `<pre><code>${code.trim()}</code></pre>`);

    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Bold **text** or __text__
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/__([^_]+)__/g, '<strong>$1</strong>');

    // Italic *text* or _text_
    html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    html = html.replace(/_([^_]+)_/g, '<em>$1</em>');

    // Headers
    html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');

    // Numbered lists
    html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>(\n|$))+/g, m => `<ol>${m}</ol>`);

    // Bullet lists
    html = html.replace(/^[-*] (.+)$/gm, '<li>$1</li>');
    html = html.replace(/(?<!<ol>)(<li>.*<\/li>(\n|$))+/g, m => `<ul>${m}</ul>`);

    // Links [text](url)
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

    // Line breaks → paragraphs
    const paragraphs = html.split(/\n{2,}/);
    html = paragraphs.map(p => {
        p = p.trim();
        if (!p) return '';
        if (/^<(h[1-3]|ul|ol|pre|li)/.test(p)) return p;
        return `<p>${p.replace(/\n/g, '<br>')}</p>`;
    }).join('');

    return html;
}

// ── Circular SVG gauge ─────────────────────────────────────────────────────────
function renderGauge(label, value, max = 10) {
    const pct    = Math.min(1, value / max);
    const r      = 30;
    const circ   = 2 * Math.PI * r;
    const offset = circ * (1 - pct);
    const color  = pct >= 0.7 ? '#10b981' : pct >= 0.4 ? '#f59e0b' : '#ef4444';
    return `
    <div class="gauge-wrap">
      <svg width="80" height="80" viewBox="0 0 80 80" class="gauge-svg">
        <circle class="gauge-bg" cx="40" cy="40" r="${r}" stroke-width="6"/>
        <circle class="gauge-fill" cx="40" cy="40" r="${r}" stroke-width="6"
          stroke="${color}"
          stroke-dasharray="${circ}"
          stroke-dashoffset="${offset}"
          transform="rotate(-90, 40, 40)"/>
        <text x="40" y="38" class="gauge-value" style="font-size:1rem;transform:none;fill:white;dominant-baseline:middle;text-anchor:middle">${value}</text>
        <text x="40" y="52" class="gauge-value-sub" style="transform:none;fill:#94a3b8;dominant-baseline:middle;text-anchor:middle">/10</text>
      </svg>
      <span class="gauge-label">${esc(label)}</span>
    </div>`;
}

// ── Collapsible section helper ─────────────────────────────────────────────────
function initCollapsibles() {
    document.querySelectorAll('.collapsible-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            const body = document.getElementById(btn.dataset.target);
            if (!body) return;
            const open = body.classList.toggle('open');
            btn.classList.toggle('open', open);
        });
    });
}
