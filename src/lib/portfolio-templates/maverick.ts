/* eslint-disable @typescript-eslint/no-explicit-any */
import { TemplateDefinition } from "./index";

function getMaverickHTML(userData: any) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${userData.personalInfo.name} | The Maverick</title>
    <link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@400;600;700;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
    <script>window.__PORTFOLIO_DATA__ = ${JSON.stringify(userData)};</script>
</head>
<body>
    <header class="maverick-header">
        <div class="nav-brand" id="brand-id">MV_01</div>
        <div class="nav-actions">
            <!-- Email link moved to header for quick access -->
            <a href="#" id="header-email-link" class="sec-cta" style="margin-right: 20px; border-color: var(--accent); color: var(--accent);">CONNECT</a>
        </div>
    </header>

    <main id="root">
        <section class="m-hero">
            <div class="m-hero-inner">
                <div class="m-hero-tag">STATUS // AVAILABLE FOR HIRE</div>
                <h1 class="m-hero-title" id="hero-name">MAVERICK</h1>
                <div class="m-hero-sub" id="hero-role">CREATIVE DIRECTOR</div>
                <p class="m-hero-bio" id="hero-bio"></p>
                <div class="m-hero-contact" id="hero-contact"></div>
                <div class="m-hero-ctas">
                    <a href="#" id="hero-email-btn" class="main-cta">GET IN TOUCH</a>
                    <a href="#sec-experience" class="sec-cta">VIEW JOURNEY ↓</a>
                </div>
            </div>
        </section>

        <div id="dynamic-sections"></div>

        <footer class="m-footer">
            <div class="m-footer-inner">
                <div class="m-footer-big">BEYOND.</div>
                <div class="m-footer-bottom">
                    <span id="footer-name-display">NAME</span>
                    <span>© ARCHIVE_<span id="footer-year">2024</span></span>
                </div>
            </div>
        </footer>
    </main>
    <script src="script.js"></script>
</body>
</html>`;
}

function getMaverickCSS() {
  return `:root {
    --bg: #0A0C10; --ink: #FFFFFF; --accent: #7E81FF; --dim: #16181D; --gray: #A0A0A0;
    --ease: cubic-bezier(0.8, 0, 0.2, 1);
}

* { box-sizing: border-box; margin: 0; padding: 0; }
body { 
    background: var(--bg); 
    color: var(--ink); 
    font-family: 'Inter', sans-serif; 
    overflow-x: hidden; 
    -webkit-font-smoothing: antialiased; 
}

/* 1. HEADER */
.maverick-header {
    position: fixed; top: 0; left: 0; width: 100%; height: 60px; 
    display: flex; align-items: center; justify-content: space-between; 
    padding: 0 40px; z-index: 2000; background: rgba(10, 12, 16, 0.9); backdrop-filter: blur(15px);
    border-bottom: 1px solid var(--dim);
}
.nav-brand { font-family: 'Archivo Black', sans-serif; font-size: 0.9rem; color: var(--accent); letter-spacing: 2px; }

/* 2. HERO */
.m-hero { min-height: 85vh; display: flex; align-items: center; padding: 100px 40px 40px; }
@media (min-width: 1024px) { .m-hero { padding: 100px 80px 60px; } }
.m-hero-tag { font-family: 'Archivo Black', sans-serif; font-size: 0.6rem; color: var(--accent); letter-spacing: 0.25em; margin-bottom: 20px; }
.m-hero-title { font-family: 'Archivo Black', sans-serif; font-size: clamp(3.5rem, 13vw, 10rem); line-height: 0.8; letter-spacing: -0.05em; text-transform: uppercase; }
.m-hero-sub { font-size: clamp(1.2rem, 3.5vw, 2.8rem); font-weight: 900; color: #fff; margin-top: 25px; font-style: italic; }
.m-hero-bio { color: var(--gray); font-size: 1.15rem; max-width: 750px; margin-top: 35px; line-height: 1.6; }
.m-hero-contact { display: flex; flex-wrap: wrap; gap: 30px; margin-top: 30px; font-size: 0.8rem; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; }
.m-hero-contact a { color: var(--ink); text-decoration: none; border-bottom: 2px solid var(--accent); padding-bottom: 2px; transition: all 0.2s; }
.m-hero-contact a:hover { color: var(--accent); }
.m-hero-contact span { color: var(--accent); }

.m-hero-ctas { display: flex; flex-wrap: wrap; gap: 20px; margin-top: 50px; }
.main-cta { background: var(--accent); color: #fff; text-decoration: none; padding: 18px 45px; font-size: 0.8rem; font-weight: 900; letter-spacing: 0.15em; border-radius: 4px; transition: transform 0.2s; }
.main-cta:hover { transform: translateY(-3px); }
.sec-cta { color: #fff; text-decoration: none; font-size: 0.8rem; font-weight: 900; letter-spacing: 0.15em; border-bottom: 2px solid var(--accent); padding-bottom: 6px; transition: opacity 0.2s; }
.sec-cta:hover { opacity: 0.7; }

/* 3. SECTIONS */
.m-section { padding: 80px 40px; border-top: 1px solid var(--dim); position: relative; }
@media (min-width: 1024px) { .m-section { padding: 100px 80px; } }

/* VISIBLE GHOST TEXT: Reduced font size */
.m-label { 
    font-family: 'Archivo Black', sans-serif; 
    font-size: clamp(2rem, 12vw, 7rem); 
    color: transparent;
    -webkit-text-stroke: 2px #7E78FF; /* Solid Bright Indigo */
    margin-bottom: 30px; line-height: 1; text-transform: uppercase; 
}

.m-entry { padding-bottom: 40px; margin-bottom: 50px; border-bottom: 1px solid var(--dim); }
.m-entry-title { font-family: 'Archivo Black', sans-serif; font-size: clamp(1.6rem, 5vw, 3rem); color: #fff; margin-bottom: 15px; }
.m-entry-meta { font-size: 0.8rem; color: var(--accent); font-weight: 800; letter-spacing: 0.15em; margin-bottom: 15px; display: block; }

/* 4. PROJECTS */
.proj-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 30px; }
.proj-card { 
    background: var(--dim); padding: 40px; border-radius: 8px; 
    height: 100%; display: flex; flex-direction: column; 
    border: 1px solid rgba(255,255,255,0.05); transition: border-color 0.2s;
}
.proj-card:hover { border-color: var(--accent); }
.proj-links { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 25px; }
.proj-link { 
    color: var(--accent); text-decoration: none; font-size: 0.7rem; font-weight: 900; 
    border: 1px solid var(--accent); padding: 10px 20px; border-radius: 4px; 
    transition: all 0.2s; text-transform: uppercase;
}
.proj-link:hover { background: var(--accent); color: #fff; }

.skill-tag { 
    font-family: 'Archivo Black', sans-serif; font-size: 0.8rem; 
    background: var(--dim); color: #fff; padding: 14px 28px; 
    border-radius: 4px; border: 1px solid rgba(255,255,255,0.15); /* Brightened border */
    text-transform: uppercase;
}

/* 5. FOOTER */
.m-footer { padding: 120px 40px; border-top: 1px solid var(--dim); text-align: center; }
.m-footer-big { font-family: 'Archivo Black'; font-size: clamp(4rem, 20vw, 15rem); line-height: 0.8; color: var(--dim); margin-bottom: 60px; opacity: 0.5; }
.m-footer-bottom { 
    display: flex; justify-content: space-between; align-items: center; 
    padding-top: 40px; border-top: 1px solid var(--dim); 
    font-size: 0.75rem; font-weight: 900; letter-spacing: 0.2em; color: var(--gray);
}

@media (max-width: 768px) {
    .maverick-header { padding: 0 20px; }
    .m-hero { padding: 100px 20px 40px; }
    .m-section { padding: 60px 20px; }
    .m-footer { padding: 80px 20px; }
}`;
}

function getMaverickJS() {
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
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.onclick = function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        };
    });
}

function render() {
    if (!resumeData || !resumeData.personalInfo) return;
    const info = resumeData.personalInfo;

    document.getElementById('brand-id').textContent = (info.name || "MV").split(' ').map(n => n[0]).join('').toUpperCase() + "_01";
    document.getElementById('hero-name').textContent = info.name || "MAVERICK";
    document.getElementById('hero-role').textContent = (info.title || "CREATIVE").toUpperCase();
    document.getElementById('footer-name-display').textContent = (info.name || "").toUpperCase();
    document.getElementById('footer-year').textContent = new Date().getFullYear();
    
    const bio = resumeData.summary || info.summary || "Pushing the boundaries of digital design and development with a focus on high-impact creativity.";
    document.getElementById('hero-bio').textContent = bio;
    
    if (info.email) {
        document.getElementById('hero-email-btn').href = "mailto:" + info.email;
        document.getElementById('header-email-link').href = "mailto:" + info.email;
    }

    const contactRow = document.getElementById('hero-contact');
    if (contactRow) {
        contactRow.innerHTML = '';
        const ensureUrl = (u) => u?.startsWith('http') ? u : 'https://' + u;
        if (info.phone) contactRow.innerHTML += \`<a href="tel:\${info.phone}">\${info.phone}</a>\`;
        if (info.location) contactRow.innerHTML += \`<span>\${info.location}</span>\`;
        if (info.github) contactRow.innerHTML += \`<a href="\${ensureUrl(info.github)}" target="_blank">GITHUB ↗</a>\`;
        if (info.linkedin) contactRow.innerHTML += \`<a href="\${ensureUrl(info.linkedin)}" target="_blank">LINKEDIN ↗</a>\`;
    }

    const sections = [];
    if (resumeData.experience?.length) sections.push('experience');
    if (resumeData.projects?.length) sections.push('projects');
    if (resumeData.education?.length) sections.push('education');
    if (resumeData.skills && Object.values(resumeData.skills).some(s => s && s.length)) sections.push('skills');

    const main = document.getElementById('dynamic-sections');
    main.innerHTML = sections.map(sec => \`
        <section id="sec-\${sec}" class="m-section">
            <div class="m-label">\${sec}</div>
            <div id="con-\${sec}"></div>
        </section>
    \`).join('');

    sections.forEach(sec => {
        const con = document.getElementById('con-' + sec);
        if (sec === 'experience') renderExp(con);
        else if (sec === 'projects') renderProj(con);
        else if (sec === 'education') renderEducation(con);
        else if (sec === 'skills') renderSkills(con);
    });
}

function renderExp(con) {
    con.innerHTML = (resumeData.experience || []).map(j => \`
        <div class="m-entry">
            <span class="m-entry-meta">\${j.startDate} — \${j.endDate} // \${j.company.toUpperCase()}</span>
            <div class="m-entry-title">\${j.title}</div>
            <p style="color:var(--gray); margin-top:15px; line-height:1.7; font-size:1.1rem;">\${(j.description||[]).join('. ')}</p>
        </div>
    \`).join('');
}

function renderProj(con) {
    con.innerHTML = \`<div class="proj-grid">\` + 
    (resumeData.projects || []).map(p => \`
        <div class="proj-card">
            <div style="flex-grow: 1;">
                <div style="font-family:'Archivo Black'; font-size:1.8rem; color:#fff; line-height:1.1; margin-bottom:15px; text-transform: uppercase;">\${p.name}</div>
                <p style="color:var(--gray); font-size:1.05rem; line-height: 1.6; margin-bottom: 20px;">\${p.description}</p>
                
                \${p.highlights?.length ? \`
                    <ul style="list-style: none; margin-bottom: 20px; border-left: 2px solid var(--accent); padding-left: 20px;">
                        \${p.highlights.map(h => \`<li style="color: var(--gray); font-size: 0.95rem; margin-bottom: 8px;">\${h}</li>\`).join('')}
                    </ul>
                \` : ''}
            </div>
            <div class="proj-links">
                \${p.liveUrl ? \`<a href="\${p.liveUrl}" target="_blank" class="proj-link">LIVE_SITE ↗</a>\` : ''}
                \${p.githubUrl ? \`<a href="\${p.githubUrl}" target="_blank" class="proj-link">REPOSITORY ↗</a>\` : ''}
            </div>
        </div>
    \`).join('') + \`</div>\`;
}

function renderEducation(con) {
    con.innerHTML = (resumeData.education || []).map(e => \`
        <div class="m-entry">
            <span class="m-entry-meta">\${e.year} // \${e.marks || 'COMPLETED'}</span>
            <div class="m-entry-title">\${e.degree}</div>
            <p style="color:var(--accent); font-weight:900; margin-top:10px; text-transform:uppercase; letter-spacing: 2px;">\${e.institution}</p>
        </div>
    \`).join('');
}

function renderSkills(con) {
    let sArray = []; if (typeof resumeData.skills === 'object') sArray = Object.values(resumeData.skills).flat();
    con.innerHTML = \`<div style="display:flex; flex-wrap:wrap; gap:15px;">\` + sArray.map(s => \`<span class="skill-tag">\${s}</span>\`).join('') + \`</div>\`;
}

init();`;
}

export const maverickTemplate: TemplateDefinition = {
  getHTML: getMaverickHTML,
  getCSS: getMaverickCSS,
  getJS: getMaverickJS,
};
