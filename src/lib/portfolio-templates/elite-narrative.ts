/* eslint-disable @typescript-eslint/no-explicit-any */
import { TemplateDefinition } from "./index";

function getEliteHTML(userData: any) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${userData.personalInfo.name} | Elite Portfolio</title>
    <!-- Premium Font Pair -->
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
    <script>window.__PORTFOLIO_DATA__ = ${JSON.stringify(userData)};</script>
</head>
<body>
    <header class="elite-header">
        <div class="elite-logo serif" id="header-name">ELITE</div>
        
        <!-- Desktop Nav -->
        <nav class="elite-nav-desktop" id="nav-links"></nav>

        <button id="menu-trigger" class="elite-menu-btn">MENU</button>
    </header>

    <!-- Mobile Menu Overlay -->
    <div id="menu-overlay" class="elite-overlay">
        <button id="close-menu" class="close-btn">×</button>
        <nav class="elite-overlay-nav" id="mob-nav-list"></nav>
    </div>

    <main id="root">
        <!-- Magazine Style Hero -->
        <section class="elite-hero">
            <div class="hero-container">
                <span class="hero-label">A PORTRAIT OF</span>
                <h1 id="hero-name" class="hero-title serif">NAME</h1>
                <p id="hero-tagline" class="hero-tagline italic-serif">CURATING IMPACT THROUGH EXCELLENCE.</p>
                
                <div class="hero-actions">
                    <a href="#experience" class="cta-solid">View Journey</a>
                    <a href="#" id="contact-link" class="cta-outline">Get in Touch</a>
                </div>
                <div class="hero-contact-row" id="hero-contact"></div>
            </div>
        </section>

        <!-- Dynamic Content Flow -->
        <div id="elite-content"></div>

        <!-- Premium Footer -->
        <footer class="elite-footer">
            <div class="footer-inner">
                <div class="footer-divider"></div>
                <div class="footer-content">
                    <p class="footer-copyright">
                        © <span id="footer-year">2024</span> <span id="footer-name" class="serif">NAME</span>
                    </p>
                    <div class="footer-contact-row" id="footer-contact"></div>
                    <p class="footer-status">PERSONAL & CONFIDENTIAL // ARCHIVE_2026</p>
                </div>
            </div>
        </footer>
    </main>
    <script src="script.js"></script>
</body>
</html>`;
}

function getEliteCSS() {
  return `:root {
    --bg: #F9F8F6; --text: #1A1A1A; --accent: #B89B72; --border: rgba(0,0,0,0.08);
}

* { box-sizing: border-box; margin: 0; padding: 0; }
body { background: var(--bg); color: var(--text); font-family: 'Inter', sans-serif; line-height: 1.6; overflow-x: hidden; }
.serif { font-family: 'Playfair Display', serif; }
.italic-serif { font-family: 'Playfair Display', serif; font-style: italic; }

/* 1. HEADER */
.elite-header {
    position: fixed; top: 0; left: 0; width: 100%; height: 60px;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 25px; z-index: 1000; background: rgba(249, 248, 246, 0.98); backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--border);
}
.elite-logo { font-size: 1.1rem; font-weight: 700; white-space: nowrap; }

.elite-nav-desktop { display: none !important; }

@media (min-width: 1024px) {
    .elite-header { height: 80px; padding: 0 50px; }
    .elite-nav-desktop { display: flex !important; gap: 35px; align-items: center; }
    .nav-item { 
        text-decoration: none; color: var(--text); font-size: 0.65rem; 
        letter-spacing: 0.15em; text-transform: uppercase; opacity: 0.6; transition: 0.3s;
    }
    .nav-item:hover { opacity: 1; color: var(--accent); }
    .elite-menu-btn { display: none !important; }
}

.elite-menu-btn { 
    background: #1A1A1A; color: #fff; border: none; padding: 8px 16px; 
    font-size: 0.65rem; font-weight: 600; letter-spacing: 0.1em; border-radius: 2px;
}
.elite-overlay { 
    position: fixed; inset: 0; background: var(--bg); z-index: 3000; display: none; 
    flex-direction: column; align-items: center; justify-content: center;
}
.elite-overlay.active { display: flex; }
.elite-overlay-nav { display: flex; flex-direction: column; gap: 30px; text-align: center; }
.mob-nav-item { font-family: 'Playfair Display'; font-size: 2.5rem; text-decoration: none; color: var(--text); }
.close-btn { position: absolute; top: 25px; right: 25px; font-size: 2rem; background: none; border: none; }

/* 3. HERO & BUTTONS */
.elite-hero { min-height: 85vh; display: flex; align-items: center; justify-content: center; text-align: center; padding: 100px 20px 40px; }
.hero-label { font-size: 0.65rem; letter-spacing: 0.4em; color: var(--accent); margin-bottom: 20px; display: block; }
.hero-title { font-size: clamp(3rem, 10vw, 7rem); line-height: 0.9; margin-bottom: 30px; }
.hero-tagline { font-size: clamp(1.1rem, 3vw, 2.2rem); color: #666; max-width: 800px; margin: 0 auto 50px; }

.hero-actions { display: flex; flex-direction: column; gap: 15px; align-items: center; }
@media (min-width: 768px) { .hero-actions { flex-direction: row; justify-content: center; gap: 20px; } }
.cta-solid { background: #1A1A1A; color: #fff; text-decoration: none; padding: 18px 40px; border-radius: 4px; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; width: 220px; display: inline-block; text-align: center; }
.cta-outline { border: 1px solid #1A1A1A; color: #1A1A1A; text-decoration: none; padding: 18px 40px; border-radius: 4px; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; width: 220px; display: inline-block; text-align: center; }

/* 4. CONTENT & ENTRIES */
.e-section { padding: 80px 25px; max-width: 1000px; margin: 0 auto; border-top: 1px solid var(--border); }
.e-label { font-size: 0.65rem; color: var(--accent); letter-spacing: 0.3em; margin-bottom: 45px; text-transform: uppercase; }

.e-entry { margin-bottom: 60px; }
@media (min-width: 768px) { .e-entry-grid { display: grid; grid-template-columns: 200px 1fr; gap: 40px; } }
.e-date { font-size: 0.8rem; font-style: italic; color: #888; margin-bottom: 10px; }
.e-title { font-size: 2.2rem; line-height: 1.1; margin-bottom: 10px; }
.e-org { font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.15em; color: var(--accent); font-weight: 600; margin-bottom: 20px; }
.e-desc { color: #555; font-size: 1.05rem; line-height: 1.8; }

.hero-contact-row, .footer-contact-row {
    display: flex; gap: 25px; margin-top: 30px; justify-content: center; flex-wrap: wrap;
    font-size: 0.75rem; letter-spacing: 0.15em; font-weight: 600; text-transform: uppercase;
}
.hero-contact-row a, .footer-contact-row a { color: var(--text); text-decoration: none; border-bottom: 1px solid var(--accent); transition: 0.3s; }
.hero-contact-row a:hover, .footer-contact-row a:hover { color: var(--accent); }
.hero-contact-row span, .footer-contact-row span { color: var(--accent); }

/* 5. FOOTER */
.elite-footer { padding: 100px 25px 60px; text-align: center; }
.footer-divider { width: 80px; height: 1px; background: var(--accent); margin: 0 auto 40px; }
.footer-copyright { font-size: 1rem; color: var(--text); margin-bottom: 8px; }
.footer-status { font-size: 0.6rem; letter-spacing: 0.2em; color: #999; }`;
}

function getEliteJS() {
  return `let resumeData = null;

function init() {
    resumeData = window.__PORTFOLIO_DATA__ || null;
    render();
    initUI();
}

window.addEventListener('message', e => {
    if (e.data?.type === 'UPDATE_DATA') { resumeData = e.data.payload; render(); initUI(); }
});

function initUI() {
    const trigger = document.getElementById('menu-trigger');
    const close = document.getElementById('close-menu');
    const overlay = document.getElementById('menu-overlay');

    if (trigger) trigger.onclick = () => overlay.classList.add('active');
    if (close) close.onclick = () => overlay.classList.remove('active');

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.onclick = (e) => {
            const href = link.getAttribute('href');
            if (href === "#") return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                overlay.classList.remove('active');
                target.scrollIntoView({ behavior: 'smooth' });
            }
        };
    });
}

function render() {
    if (!resumeData || !resumeData.personalInfo) return;
    const info = resumeData.personalInfo;

    document.querySelectorAll('#header-name, #hero-name, #footer-name').forEach(el => {
        el.textContent = info.name || "ELITE";
    });
    document.getElementById('hero-tagline').textContent = resumeData.summary || info.summary || "Breaking boundaries through creative innovation and strategic design...";
    
    const year = new Date().getFullYear();
    document.getElementById('footer-year').textContent = year;
    const statusEl = document.querySelector('.footer-status');
    if (statusEl) statusEl.textContent = "PERSONAL & CONFIDENTIAL // ARCHIVE_" + year;
    
    if (info.email) document.getElementById('contact-link').href = "mailto:" + info.email;

    function ensureUrl(u) { return u?.startsWith('http') ? u : 'https://' + u; }

    const renderContact = (elId) => {
        const el = document.getElementById(elId);
        if (!el) return;
        el.innerHTML = '';
        if (info.phone) el.innerHTML += \`<a href="tel:\${info.phone}">\${info.phone}</a>\`;
        if (info.location) el.innerHTML += \`<span>\${info.location}</span>\`;
        if (info.github) el.innerHTML += \`<a href="\${ensureUrl(info.github)}" target="_blank">GITHUB</a>\`;
        if (info.linkedin) el.innerHTML += \`<a href="\${ensureUrl(info.linkedin)}" target="_blank">LINKEDIN</a>\`;
    };
    renderContact('hero-contact');
    renderContact('footer-contact');

    const list = [];
    if (resumeData.experience?.length) list.push('experience');
    if (resumeData.education?.length) list.push('education');
    if (resumeData.projects?.length) list.push('projects');
    if (resumeData.skills && Object.values(resumeData.skills).some(s => s && s.length)) list.push('skills');

    document.getElementById('nav-links').innerHTML = list.map(s => \`<a href="#\${s}" class="nav-item">\${s}</a>\`).join('');
    document.getElementById('mob-nav-list').innerHTML = list.map(s => \`<a href="#\${s}" class="mob-nav-item">\${s.toUpperCase()}</a>\`).join('');

    const content = document.getElementById('elite-content');
    content.innerHTML = list.map(sec => \`
        <section id="\${sec}" class="e-section">
            <h2 class="e-label">\${sec}</h2>
            <div id="con-\${sec}"></div>
        </section>
    \`).join('');

    list.forEach(sec => {
        const con = document.getElementById('con-' + sec);
        if (sec === 'experience') renderExp(con);
        else if (sec === 'education') renderEdu(con);
        else if (sec === 'projects') renderProj(con);
        else if (sec === 'skills') renderSkills(con);
    });
}

function renderExp(con) {
    con.innerHTML = (resumeData.experience || []).map(j => \`
        <div class="e-entry">
            <div class="e-entry-grid">
                <div class="e-date">\${j.startDate} — \${j.endDate}</div>
                <div><h3 class="serif e-title">\${j.title}</h3><p class="e-org">\${j.company}</p><p class="e-desc">\${(j.description||[]).join('. ')}</p></div>
            </div>
        </div>
    \`).join('');
}

function renderEdu(con) {
    con.innerHTML = (resumeData.education || []).map(e => \`
        <div class="e-entry">
            <div class="e-entry-grid">
                <div class="e-date">\${e.year}</div>
                <div><h3 class="serif e-title">\${e.degree}</h3><p class="e-org">\${e.institution}\${e.marks ? ' — ' + e.marks : ''}</p></div>
            </div>
        </div>
    \`).join('');
}

function renderProj(con) {
    con.innerHTML = \`<div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:40px;">\` + 
    (resumeData.projects || []).map(p => \`
        <div style="border-top: 1px solid var(--border); padding-top:20px; display: flex; flex-direction: column;">
            <h3 class="serif" style="font-size:1.6rem; margin-bottom:10px;">\${p.name}</h3>
            \${p.technologies ? \`
                <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px;">
                    \${p.technologies.map(t => \`<span style="font-size: 0.6rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--accent); font-weight: 700;">#\${t}</span>\`).join('')}
                </div>
            \` : ''}
            <p class="e-desc" style="margin-bottom: 15px;">\${p.description}</p>
            
            \${p.highlights?.length ? \`
                <ul style="list-style: none; margin-bottom: 25px; flex-grow: 1;">
                    \${p.highlights.map(h => \`<li style="font-size: 0.9rem; color: #666; margin-bottom: 8px; padding-left: 15px; position: relative;">
                        <span style="position: absolute; left: 0; color: var(--accent);">•</span> \${h}
                    </li>\`).join('')}
                </ul>
            \` : ''}

            <div style="display:flex; gap:12px; margin-top: auto;">
                \${p.liveUrl ? \`<a href="\${p.liveUrl}" target="_blank" class="cta-solid" style="width: auto; padding: 12px 24px; font-size: 0.6rem; background: var(--accent);">Live Demo</a>\` : ''}
                \${p.githubUrl ? \`<a href="\${p.githubUrl}" target="_blank" class="cta-outline" style="width: auto; padding: 12px 24px; font-size: 0.6rem;">GitHub</a>\` : ''}
            </div>
        </div>
    \`).join('') + \`</div>\`;
}

function renderSkills(con) {
    let sArray = []; if (typeof resumeData.skills === 'object') sArray = Object.values(resumeData.skills).flat();
    con.innerHTML = \`<div style="display:flex; flex-wrap:wrap; gap:12px;">\` + sArray.map(s => \`<span style="padding:10px 20px; border:1px solid var(--border); font-size:0.8rem; background:#fff; letter-spacing: 0.05em; font-weight: 600;">\${s}</span>\`).join('') + \`</div>\`;
}

init();`;
}

export const eliteNarrativeTemplate: TemplateDefinition = {
  getHTML: getEliteHTML,
  getCSS: getEliteCSS,
  getJS: getEliteJS,
};
