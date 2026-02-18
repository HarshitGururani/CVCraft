/* eslint-disable @typescript-eslint/no-explicit-any */
import { TemplateDefinition } from "./index";

function getMagazineHTML(userData: any) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${userData.personalInfo.name} | Magazine Editorial</title>
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,400&family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
    <script>window.__PORTFOLIO_DATA__ = ${JSON.stringify(userData)};</script>
</head>
<body>
    <div id="root">
        <!-- Page now starts directly with the Hero section -->
        <section class="hero-section">
            <div class="hero-inner">
                <h1 class="hero-name" id="hero-name"></h1>
                <p class="hero-role" id="hero-role"></p>
                <div class="hero-rule"></div>
            </div>
        </section>

        <main id="main-content"></main>

        <footer class="site-footer">
            <div class="footer-inner">
                <span id="footer-name"></span>
                <span class="footer-dot">◆</span>
                <span id="footer-role-bottom"></span>
                <span class="footer-dot">◆</span>
                <span>© <span id="footer-year"></span></span>
            </div>
        </footer>
    </div>
    <script src="script.js"></script>
</body>
</html>`;
}

function getMagazineCSS() {
  return `:root {
    --bg: #fdfaf5; --ink: #1a1208; --accent: #b91c1c; --desk: #f1f3f3;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

body { 
    background: var(--desk); 
    font-family: 'DM Sans', sans-serif; 
    padding: 24px 16px; 
}

@media (max-width: 768px) {
    body { padding: 0; background: var(--bg); }
    #root { box-shadow: none !important; border-radius: 0 !important; }
    
    .hero-section { padding: 40px 20px !important; }
    .mag-section { padding: 40px 20px !important; }
    
    .exp-card { grid-template-columns: 1fr !important; }
    .exp-sidebar { border-right: none !important; border-bottom: 1.5px solid var(--ink); padding: 20px !important; }
    
    .section-num { font-size: 2.5rem !important; }
    .section-name { font-size: 2rem !important; }
}

@media (max-width: 480px) {
    .hero-name { font-size: 3.5rem !important; }
    .section-num { font-size: 2rem !important; }
    .section-name { font-size: 1.6rem !important; }
    .exp-body { padding: 20px 15px !important; }
}

#root {
    background: var(--bg);
    max-width: 1000px; margin: 0 auto; min-height: 100vh;
    box-shadow: 0 20px 60px rgba(0,0,0,0.08);
    position: relative;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E");
}

.hero-section { padding: 60px 40px; border-bottom: 5px double var(--ink); text-align: center; }
.hero-name { font-family: 'DM Serif Display', serif; font-size: clamp(3rem, 12vw, 8.5rem); line-height: 0.85; margin-bottom: 20px; text-transform: uppercase; }
.hero-role { font-family: 'Bebas Neue', sans-serif; font-size: 1.3rem; letter-spacing: 0.4em; color: var(--accent); }
.hero-rule { width: 80px; height: 4px; background: var(--ink); margin: 30px auto 0; }

.mag-section { padding: 60px 40px; border-bottom: 1px solid rgba(0,0,0,0.1); }
.mag-section-head { display: flex; align-items: baseline; gap: 20px; margin-bottom: 40px; border-bottom: 2.5px solid var(--ink); padding-bottom: 12px; }
.section-num { font-family: 'Bebas Neue', sans-serif; font-size: 4rem; color: var(--accent); line-height: 1; }
.section-name { font-family: 'Bebas Neue', sans-serif; font-size: 3rem; line-height: 1; letter-spacing: 1px; }

.exp-card { display: grid; grid-template-columns: 240px 1fr; border: 1.5px solid var(--ink); background: #fff; margin-bottom: 25px; }
.exp-sidebar { padding: 25px; background: #ede5d5; border-right: 1.5px solid var(--ink); }
.exp-body { padding: 25px; }

.proj-card { border: 1.5px solid var(--ink); background: #fff; padding: 30px; transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); display: flex; flex-direction: column; height: 100%; }
.proj-card:hover { transform: translate(-4px, -4px); box-shadow: 8px 8px 0 var(--accent); }

.site-footer { border-top: 3px solid var(--ink); padding: 30px 40px; margin-top: 40px; background: #1a1208; color: #fff; }
.footer-inner { display: flex; align-items: center; justify-content: center; gap: 15px; font-family: 'DM Sans', sans-serif; font-size: 0.8rem; letter-spacing: 1px; flex-wrap: wrap; text-align: center; }
.footer-dot { color: var(--accent); }`;
}

function getMagazineJS() {
  return `let resumeData = null;
const SECTION_LABELS = { experience: 'Experience', projects: 'Projects', skills: 'Skills', about: 'About' };

window.addEventListener('message', e => {
    if (e.data?.type === 'UPDATE_DATA') { 
        resumeData = e.data.payload; 
        render(); 
    }
});

function init() {
    resumeData = window.__PORTFOLIO_DATA__ || null;
    render();
}

function ensureUrl(u) { return u?.startsWith('http') ? u : 'https://' + u; }

function getVisible() {
    if (!resumeData) return ['about'];
    const v = [];
    if (resumeData.experience?.length) v.push('experience');
    if (resumeData.projects?.length) v.push('projects');
    if (resumeData.skills && Object.values(resumeData.skills).some(s=>s?.length)) v.push('skills');
    v.push('about'); 
    return v;
}

function render() {
    if (!resumeData || !resumeData.personalInfo) return;
    const info = resumeData.personalInfo;
    const sections = getVisible();

    const nameEl = document.getElementById('hero-name');
    const roleEl = document.getElementById('hero-role');
    if (nameEl) nameEl.textContent = (info.name || "YOUR NAME").toUpperCase();
    if (roleEl) {
        roleEl.textContent = (info.title || "").toUpperCase();
        roleEl.style.display = info.title ? 'block' : 'none';
    }

    const fName = document.getElementById('footer-name');
    const fRole = document.getElementById('footer-role-bottom');
    const fYear = document.getElementById('footer-year');
    if(fName) fName.textContent = (info.name || "").toUpperCase();
    if(fRole) fRole.textContent = (info.title || "").toUpperCase();
    if(fYear) fYear.textContent = new Date().getFullYear();
    
    const main = document.getElementById('main-content');
    if (!main) return;
    main.innerHTML = '';
    
    sections.forEach((sec, index) => {
        const displayNum = String(index + 1).padStart(2, '0');
        const el = document.createElement('section');
        el.className = 'mag-section';
        el.innerHTML = \`
            <div class="mag-section-head">
                <span class="section-num">\${displayNum}</span>
                <span class="section-name">\${SECTION_LABELS[sec]}</span>
                <div style="flex:1; height:1px; background:rgba(0,0,0,0.1); margin-left: 20px;"></div>
            </div>
            <div id="content-\${sec}"></div>
        \`;
        main.appendChild(el);
        
        const contentDiv = document.getElementById(\`content-\${sec}\`);
        if (sec === 'experience') renderExperience(contentDiv);
        else if (sec === 'projects') renderProjects(contentDiv);
        else if (sec === 'skills') renderSkills(contentDiv);
        else if (sec === 'about') renderAbout(contentDiv);
    });
}

function renderExperience(con) {
    (resumeData.experience || []).forEach(j => {
        const card = document.createElement('div');
        card.className = 'exp-card';
        card.innerHTML = \`<div class="exp-sidebar"><div style="font-weight:800; text-transform:uppercase;">\${j.company}</div><div style="font-size:12px; color:#666; margin-top:5px;">\${j.startDate} – \${j.endDate}</div></div><div class="exp-body"><div style="font-family:'Bebas Neue'; font-size:1.8rem; margin-bottom:10px;">\${j.title}</div><ul style="padding-left:20px; color:#555;">\${(j.description||[]).map(d=>\`<li>\${d}</li>\`).join('')}</ul></div>\`;
        con.appendChild(card);
    });
}

function renderProjects(con) {
    const grid = document.createElement('div');
    grid.style.display = 'grid'; grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(320px, 1fr))'; grid.style.gap = '25px';
    (resumeData.projects || []).forEach(p => {
        const card = document.createElement('div');
        card.className = 'proj-card';
        card.innerHTML = \`
            <div style="font-family:'DM Serif Display'; font-size:1.8rem; margin-bottom:12px;">\${p.name}</div>
            <p style="color:#6b6050; font-size:0.95rem; line-height:1.6; margin-bottom:15px;">\${p.description}</p>
            
            \${p.highlights?.length ? \`
                <ul style="padding-left:15px; font-size:0.85rem; color:#666; margin-bottom:15px; border-left:2px solid #b91c1c; list-style:none; flex-grow:1;">
                    \${p.highlights.map(h=>\`<li style="margin-bottom:5px;">• \${h}</li>\`).join('')}
                </ul>
            \` : '<div style="flex-grow:1;"></div>'}

            <div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:20px;">
                \${(p.technologies||[]).map(t=>\`<span style="font-size:10px; font-weight:bold; background:#1a1208; color:#fff; padding:3px 8px;">\${t}</span>\`).join('')}
            </div>
            <div style="display:flex; gap:10px; margin-top:auto;">
                \${p.liveUrl?\`<a href="\${ensureUrl(p.liveUrl)}" target="_blank" style="font-size:10px; font-weight:bold; text-transform:uppercase; padding:5px 12px; border:1px solid #1a1208; color:#1a1208; text-decoration:none;">Live</a>\`:''}
                \${p.githubUrl?\`<a href="\${ensureUrl(p.githubUrl)}" target="_blank" style="font-size:10px; font-weight:bold; text-transform:uppercase; padding:5px 12px; border:1px solid #1a1208; color:#1a1208; text-decoration:none;">GitHub</a>\`:''}
            </div>\`;
        grid.appendChild(card);
    });
    con.appendChild(grid);
}

function renderSkills(con) {
    const grid = document.createElement('div');
    grid.style.display='grid'; grid.style.gridTemplateColumns='repeat(auto-fit, minmax(200px, 1fr))'; grid.style.gap='40px';
    Object.entries(resumeData.skills || {}).forEach(([cat, list]) => {
        if (!list?.length) return;
        const col = document.createElement('div');
        col.innerHTML = \`<h3 style="font-family:'Bebas Neue'; font-size:1.5rem; border-bottom:2px solid #b91c1c; margin-bottom:15px; color:#1a1208;">\${cat.toUpperCase()}</h3><div style="display:flex; flex-wrap:wrap; gap:8px;">\${list.map(s => \`<span style="padding:5px 12px; border:1px solid rgba(0,0,0,0.1); font-size:12px; background:#fff;">\${s}</span>\`).join('')}</div>\`;
        grid.appendChild(col);
    });
    con.appendChild(grid);
}

function renderAbout(con) {
    const summary = resumeData.summary || resumeData.personalInfo.summary || "Designing the future through code and creativity.";
    con.innerHTML = \`<p style="font-family:'DM Serif Display'; font-style:italic; font-size:1.8rem; color:#6b6050; line-height:1.6; margin-bottom:60px; max-width:800px;">\${summary}</p>\`;
    if (resumeData.education?.length) {
        let h = '<h2 style="font-family:Bebas Neue; font-size:2.2rem; border-bottom:3px solid #1a1208; margin-bottom:30px; display:inline-block; letter-spacing:2px;">EDUCATION</h2>';
        resumeData.education.forEach(e => { h += \`<div style="margin-bottom:25px; border-left:4px solid #b91c1c; padding-left:20px;"><div style="font-weight:800; font-size:1.2rem; text-transform:uppercase;">\${e.degree}</div><div style="color:#666;">\${e.institution} — \${e.year}</div></div>\`; });
        con.innerHTML += h;
    }
}

init();`;
}

export const magazineTemplate: TemplateDefinition = {
  getHTML: getMagazineHTML,
  getCSS: getMagazineCSS,
  getJS: getMagazineJS,
};
