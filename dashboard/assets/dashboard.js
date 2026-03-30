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
