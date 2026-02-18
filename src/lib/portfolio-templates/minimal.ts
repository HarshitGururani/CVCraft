/* eslint-disable @typescript-eslint/no-explicit-any */
import { TemplateDefinition } from "./index";

function getMinimalHTML(userData: any) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${userData.personalInfo.name} | Superior Portfolio</title>
    <!-- Premium Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
    <script>window.__PORTFOLIO_DATA__ = ${JSON.stringify(userData)};</script>
</head>
<body>
    <div id="scroll-progress"></div>

    <!-- Glass HUD Navigation -->
    <header class="hud-nav">
        <div class="hud-inner">
            <div class="hud-brand" id="brand-name">NAME</div>
            
            <nav class="hud-desktop-links" id="main-nav"></nav>

            <div class="hud-actions">
                <a href="#" id="header-cta" class="action-btn">CONNECT</a>
                <button id="menu-trigger" class="hamburger-icon" aria-label="Open Menu">
                    <div class="bar bar-top"></div>
                    <div class="bar bar-bottom"></div>
                </button>
            </div>
        </div>
    </header>

    <!-- Cinematic Mobile Menu Overlay -->
    <div id="cinematic-menu" class="menu-overlay">
        <div class="menu-content" id="menu-content">
            <nav class="menu-links" id="mob-nav-list"></nav>
        </div>
    </div>

    <div id="root">
        <!-- Hero Section -->
        <section class="hero-full">
            <div class="hero-container">
                <div class="hero-label-top">[ PORTFOLIO EDITION <span id="hero-year">2024</span> ]</div>
                <h1 class="hero-big-type" id="hero-title">Portfolio</h1>
                <div class="hero-lower">
                    <div class="hero-status">
                        <span class="status-dot"></span> 
                        <span id="hero-role">CREATIVE DEVELOPER</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- Dynamic Content Sections -->
        <main id="main-content"></main>

        <!-- Simple Editorial Footer -->
        <footer class="minimal-footer">
            <div class="footer-inner">
                <div class="footer-top-row">
                    <div class="footer-brand-simple" id="footer-brand-name">NAME</div>
                    <div class="footer-tagline-simple">Designing the future.</div>
                </div>
                
                <div class="footer-bottom-row">
                    <div class="footer-legal">© <span id="footer-year">2024</span> — ALL RIGHTS RESERVED</div>
                    <button class="back-to-top" onclick="window.scrollTo({top:0, behavior:'smooth'})">
                        BACK TO TOP ↑
                    </button>
                </div>
            </div>
        </footer>
    </div>
    <script src="script.js"></script>
</body>
</html>`;
}

function getMinimalCSS() {
  return `:root {
    --bg: #ffffff; --ink: #000000; --muted: #7f7f7f; --rule: #f0f0f0;
    --ease: cubic-bezier(0.7, 0, 0.3, 1);
}

* { box-sizing: border-box; margin:0; padding:0; }
body { background: var(--bg); color: var(--ink); font-family: 'Inter', sans-serif; overflow-x: hidden; -webkit-font-smoothing: antialiased; }

/* 1. PROGRESS BAR */
#scroll-progress { position: fixed; top: 0; left: 0; width: 0%; height: 3px; background: var(--ink); z-index: 3000; transition: width 0.1s linear; }

/* 2. HUD + GLASS NAVIGATION */
.hud-nav { 
    position: fixed; top: 0; left: 0; width: 100%; height: 75px; 
    z-index: 2000; background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(15px);
    border-bottom: 1px solid var(--rule);
}
.hud-inner { max-width: 1400px; margin: 0 auto; height: 100%; display: flex; align-items: center; justify-content: space-between; padding: 0 20px; }

.hud-brand { 
    font-family: 'Playfair Display', serif; font-weight: 700; font-size: 0.9rem; 
    text-transform: uppercase; white-space: nowrap; overflow: hidden; 
    text-overflow: ellipsis; max-width: 60%; 
}

.hud-desktop-links { display: none; gap: 35px; }

.action-btn { 
    display: none; font-size: 0.65rem; font-weight: 600; letter-spacing: 0.2em; 
    text-decoration: none; color: var(--ink); border: 1px solid var(--ink); padding: 9px 20px; transition: all 0.3s; 
}
@media (min-width: 1024px) { 
    .hud-brand { font-size: 1.1rem; max-width: none; }
    .hud-inner { padding: 0 40px; height: 90px; }
    .hud-desktop-links { display: flex; } 
    .action-btn { display: block; }
}

.hud-link { font-size: 0.65rem; font-weight: 600; letter-spacing: 0.2em; text-decoration: none; color: var(--muted); transition: color 0.3s; }
.hud-link:hover, .hud-link.active { color: var(--ink); }

.hud-actions { display: flex; align-items: center; gap: 20px; }

.hamburger-icon { background: none; border: none; cursor: pointer; padding: 10px; display: flex; flex-direction: column; gap: 7px; z-index: 3000; }
.bar { width: 22px; height: 1.2px; background: var(--ink); transition: all 0.5s var(--ease); }

@media (min-width: 1024px) { .hamburger-icon { display: none !important; } }
.menu-open .bar-top { transform: translateY(4.1px) rotate(45deg); }
.menu-open .bar-bottom { transform: translateY(-4.1px) rotate(-45deg); }

.menu-overlay { position: fixed; inset: 0; background: #fff; z-index: 1500; display: flex; align-items: center; justify-content: center; opacity: 0; pointer-events: none; transition: opacity 0.6s var(--ease); }
.menu-overlay.active { opacity: 1; pointer-events: all; }
.menu-link { display: block; font-family: 'Playfair Display', serif; font-size: clamp(2.2rem, 8vw, 4.5rem); text-decoration: none; color: var(--ink); margin-bottom: 25px; text-align: center; opacity: 0; transform: translateY(30px); transition: all 0.8s var(--ease); }
.menu-overlay.active .menu-link { opacity: 1; transform: translateY(0); transition-delay: calc(var(--i) * 0.1s); }

.menu-connect-btn {
    display: block; margin: 40px auto 0; padding: 14px 28px; border: 1px solid var(--ink);
    color: var(--ink); text-decoration: none; font-size: 0.65rem; font-weight: 700; letter-spacing: 0.2em;
    width: fit-content; opacity: 0; transform: translateY(20px); transition: all 0.6s var(--ease) 0.4s;
}
.menu-overlay.active .menu-connect-btn { opacity: 1; transform: translateY(0); }

.hero-full { min-height: 90vh; display: flex; align-items: center; padding: 0 20px; border-bottom: 1px solid var(--rule); }
.hero-container { max-width: 1400px; margin: 0 auto; width: 100%; padding-top: 60px; }
.hero-label-top { font-size: 0.55rem; letter-spacing: 0.3em; color: var(--muted); margin-bottom: 30px; }
.hero-big-type { font-family: 'Playfair Display', serif; font-size: clamp(2.8rem, 10vw, 10rem); line-height: 0.9; letter-spacing: -0.04em; margin-bottom: 40px; }
.hero-lower { display: flex; justify-content: space-between; border-top: 1px solid var(--rule); padding-top: 30px; }
.hero-status { font-size: 0.7rem; font-weight: 600; letter-spacing: 0.15em; color: var(--muted); text-transform: uppercase; }
.status-dot { display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #32d74b; margin-right: 10px; box-shadow: 0 0 10px rgba(50,215,75,0.2); }

.content-section { padding: 60px 20px; border-bottom: 1px solid var(--rule); }
@media (min-width: 1024px) { .content-section { display: grid; grid-template-columns: 320px 1fr; gap: 80px; padding: 120px 40px; } }
.label { font-size: 0.65rem; letter-spacing: 0.3em; text-transform: uppercase; color: var(--muted); margin-bottom: 30px; font-weight: 700; }

.exp-block { margin-bottom: 70px; }
.exp-title { font-family: 'Playfair Display', serif; font-size: clamp(1.8rem, 4vw, 3rem); line-height: 1.1; margin-bottom: 12px; }

.minimal-footer { background: #ffffff; color: var(--ink); padding: 80px 20px 50px; border-top: 1px solid var(--rule); margin-top: 120px; }
.footer-inner { max-width: 1400px; margin: 0 auto; }
.footer-top-row { display: flex; flex-direction: column; gap: 12px; margin-bottom: 50px; }
@media (min-width: 768px) { .footer-top-row { flex-direction: row; justify-content: space-between; align-items: flex-end; } }
.footer-brand-simple { font-family: 'Playfair Display', serif; font-size: 1.6rem; font-weight: 700; pointer-events: none; }
.footer-tagline-simple { font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); }
.footer-bottom-row { display: flex; justify-content: space-between; align-items: center; padding-top: 35px; border-top: 1px solid var(--rule); color: var(--muted); font-size: 0.6rem; }
.back-to-top { background: none; border: none; cursor: pointer; color: var(--ink); font-weight: 700; opacity: 0.5; transition: opacity 0.3s; }
.back-to-top:hover { opacity: 1; }`;
}

function getMinimalJS() {
  return `let resumeData = null;
let isMenuOpen = false;

function init() {
    resumeData = window.__PORTFOLIO_DATA__ || null;
    render();
    initUI();
}

window.addEventListener('message', e => {
    if (e.data?.type === 'UPDATE_DATA') { 
        resumeData = e.data.payload; 
        render(); 
        initUI(); 
    }
});

function initUI() {
    const trigger = document.getElementById('menu-trigger');
    const overlay = document.getElementById('cinematic-menu');
    const body = document.querySelector('body');

    if (trigger) {
        trigger.onclick = () => {
            isMenuOpen = !isMenuOpen;
            overlay.classList.toggle('active', isMenuOpen);
            body.classList.toggle('menu-open', isMenuOpen);
            body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
        };
    }

    window.onscroll = () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        const prog = document.getElementById("scroll-progress");
        if (prog) prog.style.width = scrolled + "%";
    };

    document.querySelectorAll('.hud-link, .menu-link').forEach(link => {
        link.onclick = (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                if (isMenuOpen && trigger) trigger.click();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        };
    });
}

function render() {
    if (!resumeData || !resumeData.personalInfo) return;
    const info = resumeData.personalInfo;
    
    // Identity Injection
    const nameStr = (info.name || "Portfolio").toUpperCase();
    document.getElementById('brand-name').textContent = nameStr;
    document.getElementById('hero-title').textContent = info.name || "Portfolio";
    document.getElementById('hero-role').textContent = (info.title || "Developer").toUpperCase();
    document.getElementById('footer-brand-name').textContent = nameStr;
    document.getElementById('footer-year').textContent = new Date().getFullYear();
    document.getElementById('hero-year').textContent = new Date().getFullYear();
    
    if (info.email) document.getElementById('header-cta').href = "mailto:" + info.email;

    // Build Navigation Links Array
    const sections = [];
    if (resumeData.experience?.length) sections.push('experience');
    if (resumeData.projects?.length) sections.push('projects');
    if (resumeData.skills && Object.values(resumeData.skills).some(s => s?.length)) sections.push('skills');
    sections.push('about');

    // Desktop Nav
    document.getElementById('main-nav').innerHTML = sections.map(s => \`<a href="#section-\${s}" class="hud-link">\${s.toUpperCase()}</a>\`).join('');
    
    // Mobile Nav + Connect Button for Mobile
    const menuContent = document.getElementById('menu-content');
    document.getElementById('mob-nav-list').innerHTML = sections.map((s, i) => \`<a href="#section-\${s}" class="menu-link" style="--i: \${i}">\${s.toUpperCase()}</a>\`).join('');

    let mobConnect = document.getElementById('mob-connect-action');
    if (!mobConnect) {
        mobConnect = document.createElement('a');
        mobConnect.id = 'mob-connect-action';
        mobConnect.className = 'menu-connect-btn';
        mobConnect.textContent = 'CONNECT WITH ME';
        menuContent.appendChild(mobConnect);
    }
    if (info.email) mobConnect.href = "mailto:" + info.email;

    // Content Block Generation
    const main = document.getElementById('main-content');
    main.innerHTML = sections.map(sec => \`
        <section id="section-\${sec}" class="content-section">
            <div class="label">\${sec}</div>
            <div id="con-\${sec}"></div>
        </section>
    \`).join('');

    // Render Section Content
    sections.forEach(sec => {
        const con = document.getElementById('con-' + sec);
        if (sec === 'experience') renderExp(con);
        else if (sec === 'projects') renderProj(con);
        else if (sec === 'skills') renderSkills(con);
        else if (sec === 'about') renderAbout(con);
    });
}

function renderExp(con) {
    con.innerHTML = (resumeData.experience || []).map(j => \`
        <div class="exp-block">
            <div style="font-size:0.65rem; color:var(--muted); margin-bottom:12px; font-weight:600; letter-spacing:0.1em;">\${j.startDate} — \${j.endDate} // \${j.company.toUpperCase()}</div>
            <div class="exp-title">\${j.title}</div>
            <p style="color:var(--muted); font-size:1.05rem; line-height:1.7; max-width:850px;">\${(j.description||[]).join('. ')}</p>
        </div>
    \`).join('');
}

function renderProj(con) {
    con.innerHTML = \`<div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap:50px;">\` + 
    (resumeData.projects || []).map(p => \`
        <div class="proj-box">
            <div class="exp-title" style="font-size:1.6rem">\${p.name}</div>
            <p style="color:var(--muted); margin:12px 0 20px; font-size:0.9rem;">\${p.description}</p>
            
            \${p.highlights?.length ? \`
                <ul style="list-style: none; margin-bottom: 20px;">
                    \${p.highlights.map(h => \`<li style="font-size: 0.85rem; color: var(--muted); margin-bottom: 6px; padding-left: 15px; position: relative;">
                        <span style="position: absolute; left: 0; color: var(--ink);">•</span> \${h}
                    </li>\`).join('')}
                </ul>
            \` : ''}

            <div style="display:flex; flex-wrap:wrap; gap:8px;">
                \${(p.technologies||[]).map(t => \`<span style="font-size:0.55rem; letter-spacing:0.1em; border:1px solid var(--rule); padding:4px 10px; font-weight:600;">\${t.toUpperCase()}</span>\`).join('')}
            </div>
            
            <div style="margin-top:20px; display:flex; gap:15px;">
                \${p.liveUrl ? \`<a href="\${p.liveUrl}" target="_blank" style="font-size: 0.65rem; color: var(--ink); text-decoration: underline; font-weight: 700; letter-spacing: 0.1em;">LIVE DEMO</a>\` : ''}
                \${p.githubUrl ? \`<a href="\${p.githubUrl}" target="_blank" style="font-size: 0.65rem; color: var(--muted); text-decoration: underline; font-weight: 700; letter-spacing: 0.1em;">SOURCE</a>\` : ''}
            </div>
        </div>
    \`).join('') + \`</div>\`;
}

function renderSkills(con) {
    con.innerHTML = \`<div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap:50px;">\` + 
    Object.entries(resumeData.skills || {}).map(([cat, items]) => {
        if (!items || items.length === 0) return '';
        return \`
            <div>
                <div class="label" style="border-bottom:1px solid var(--ink); padding-bottom:12px; margin-bottom:20px;">\${cat}</div>
                <div style="display:flex; flex-direction:column; gap:10px;">
                    \${items.map(s => \`<div style="font-family:'Playfair Display'; font-size:1.3rem; font-style:italic;">\${s}</div>\`).join('')}
                </div>
            </div>
        \`;
    }).join('') + \`</div>\`;
}

function renderAbout(con) {
    const sum = resumeData.summary || resumeData.personalInfo?.summary || "Designing the future.";
    con.innerHTML = \`<p style="font-family:'Playfair Display'; font-size:clamp(1.6rem, 5vw, 3.2rem); line-height:1.2; font-style:italic; border-left: 2px solid var(--ink); padding-left: 30px;">"\${sum}"</p>\`;
}

init();`;
}

export const minimalSuperiorTemplate: TemplateDefinition = {
  getHTML: getMinimalHTML,
  getCSS: getMinimalCSS,
  getJS: getMinimalJS,
};
