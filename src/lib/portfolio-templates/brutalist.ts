/* eslint-disable @typescript-eslint/no-explicit-any */
import { TemplateDefinition } from ".";

function getBrutalistHTML(userData: any) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${userData.personalInfo.name} | Portfolio</title>
    <link href="https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
    <script>window.__PORTFOLIO_DATA__ = ${JSON.stringify(userData)};</script>
</head>
<body>
    <div id="root">
        <header class="main-header">
            <div class="header-inner">
                <div class="top-row">
                    <span id="user-title" class="role-label heading-mobile"></span>
                </div>
                <div id="name-container" class="name-block">
                    <span id="first-name" class="name-first"></span>
                    <span id="last-name" class="name-last"></span>
                </div>
                <div id="contact-row" class="contact-row"></div>
            </div>
        </header>

        <main id="main-content" class="main-area"></main>

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

function getBrutalistCSS() {
  return `:root {
    --bg-color: #090910;
    --accent-color: #3ecf8e;
    --text-color: #fafafa;
    --muted-text: #aaaaaa;
    --card-border: #333333;
    --hover-bg: #1a1a25;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
    background-color: var(--bg-color);
    color: var(--text-color);
    font-family: "Courier New", Courier, monospace;
    min-height: 100vh;
    overflow-x: hidden;
}

::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--bg-color); }
::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
::-webkit-scrollbar-thumb:hover { background: var(--accent-color); }

.main-header {
    background-color: var(--bg-color);
    border-bottom: 3px solid var(--accent-color);
}

.header-inner {
    max-width: 860px;
    margin: 0 auto;
    padding: 40px 16px;
}

.top-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(62, 207, 142, 0.2);
    padding-bottom: 8px;
    margin-bottom: 20px;
}

.role-label {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.15em;
}

.name-block {
    width: 100%;
    overflow: hidden;
}

.name-first {
    font-family: 'Archivo Black', Impact, sans-serif;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: -0.02em;
    line-height: 0.92;
    color: var(--text-color);
    display: block;
    white-space: nowrap;
}

.name-last {
    font-family: 'Archivo Black', Impact, sans-serif;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: -0.02em;
    line-height: 0.92;
    color: transparent;
    -webkit-text-stroke: 2px var(--accent-color);
    display: block;
    white-space: nowrap;
}

.contact-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 25px;
}

.contact-btn {
    border: 2px solid var(--text-color);
    padding: 6px 12px;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--text-color);
    background: var(--bg-color);
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
    white-space: nowrap;
}

.contact-btn:hover {
    background: var(--text-color);
    color: var(--bg-color);
}

.main-area {
    max-width: 860px;
    margin: 0 auto;
    padding: 60px 16px 80px;
}

.section-head {
    font-family: 'Archivo Black', Impact, sans-serif;
    font-size: clamp(1.5rem, 5vw, 2.4rem);
    font-weight: 900;
    text-transform: uppercase;
    line-height: 1;
    padding-bottom: 15px;
    border-bottom: 3px solid var(--accent-color);
    margin-bottom: 30px;
    margin-top: 60px;
    color: var(--accent-color);
}

.section-head:first-child { margin-top: 0; }

.card-base {
    border: 3px solid var(--card-border);
    padding: 24px;
    margin-bottom: 24px;
    transition: all 0.2s ease;
}

.card-base:hover {
    background: var(--hover-bg);
    border-color: var(--accent-color);
}

.card-head {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 8px;
    margin-bottom: 12px;
    flex-wrap: wrap;
}

.job-title {
    font-family: 'Archivo Black', Impact, sans-serif;
    font-size: clamp(0.95rem, 3vw, 1.35rem);
    font-weight: 900;
    text-transform: uppercase;
    line-height: 1.1;
}

.company-text {
    font-size: clamp(0.72rem, 2vw, 0.88rem);
    font-weight: 700;
    margin-top: 5px;
    color: var(--accent-color);
}

.date-badge {
    border: 2px solid currentColor;
    padding: 2px 8px;
    font-size: 11px;
    font-weight: 700;
    white-space: nowrap;
}

.desc-text {
    font-size: clamp(0.75rem, 1.8vw, 0.9rem);
    line-height: 1.7;
    color: var(--muted-text);
}

.tech-tag {
    border: 2px solid currentColor;
    padding: 2px 7px;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    margin-right: 6px;
    margin-bottom: 6px;
    display: inline-block;
}

.skill-chip {
    background: var(--accent-color);
    color: #000;
    padding: 4px 10px;
    font-size: 11px;
    font-weight: 700;
}

.cat-title {
    font-family: 'Archivo Black', Impact, sans-serif;
    font-size: clamp(0.9rem, 2.8vw, 1.2rem);
    font-weight: 900;
    text-transform: uppercase;
    padding-bottom: 8px;
    border-bottom: 2px solid currentColor;
    margin-bottom: 15px;
}

.site-footer {
    border-top: 3px solid var(--accent-color);
    padding: 40px 16px;
    margin-top: 80px;
    background: #000;
}

.footer-inner {
    max-width: 860px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    flex-wrap: wrap;
    text-align: center;
}

.footer-dot { color: var(--accent-color); }

@media (max-width: 767px) {
    .header-inner { padding: 30px 16px; }
    .heading-mobile { font-size: 10px; }
    .contact-mobile { font-size: 10px; padding: 5px 10px; }
    .main-area { padding: 40px 16px 60px; }
}`;
}

function getBrutalistJS() {
  return `let resumeData = null;

window.addEventListener('message', e => {
    if (e.data?.type === 'UPDATE_DATA') { 
        resumeData = e.data.payload; 
        render(); 
    }
});

function init() {
    resumeData = window.__PORTFOLIO_DATA__ || null;
    render();
    setupResizeObserver();
}

function ensureUrl(u) { return u?.startsWith('http') ? u : 'https://' + u; }

function render() {
    if (!resumeData || !resumeData.personalInfo) return;
    const info = resumeData.personalInfo;

    // Header Sync
    document.getElementById('user-title').textContent = info.title || "";
    document.getElementById('first-name').textContent = (info.name.split(' ')[0] || "USER").toUpperCase();
    document.getElementById('last-name').textContent = (info.name.split(' ').slice(1).join(' ') || "").toUpperCase();

    const contactRow = document.getElementById('contact-row');
    contactRow.innerHTML = '';
    
    if (info.email) contactRow.innerHTML += \`<a href="mailto:\${info.email}" class="contact-btn contact-mobile">Email</a>\`;
    if (info.phone) contactRow.innerHTML += \`<a href="tel:\${info.phone}" class="contact-btn contact-mobile">Phone</a>\`;
    if (info.location) contactRow.innerHTML += \`<span class="contact-btn contact-mobile" style="cursor: default;">\${info.location}</span>\`;
    if (info.github) contactRow.innerHTML += \`<a href="\${ensureUrl(info.github)}" target="_blank" class="contact-btn contact-mobile">Github</a>\`;
    if (info.linkedin) contactRow.innerHTML += \`<a href="\${ensureUrl(info.linkedin)}" target="_blank" class="contact-btn contact-mobile">LinkedIn</a>\`;

    // Footer Sync
    document.getElementById('footer-name').textContent = (info.name || "").toUpperCase();
    document.getElementById('footer-role-bottom').textContent = (info.title || "").toUpperCase();
    document.getElementById('footer-year').textContent = new Date().getFullYear();

    // Main Content (Single Page)
    const main = document.getElementById('main-content');
    main.innerHTML = '';

    if (resumeData.experience?.length) {
        main.innerHTML += \`<h2 class="section-head">Professional Experience</h2>\`;
        resumeData.experience.forEach(job => {
            const art = document.createElement('article');
            art.className = 'card-base';
            art.innerHTML = \`
                <div class="card-head">
                    <div>
                        <div class="job-title">\${job.title}</div>
                        <div class="company-text">\${job.company} \${job.location ? '/ ' + job.location : ''}</div>
                    </div>
                    <span class="date-badge">\${job.startDate} – \${job.endDate}</span>
                </div>
                <ul style="list-style: none; margin-top: 15px;">
                    \${(job.description || []).map(d => \`<li style="display: flex; gap: 8px; margin-bottom: 8px;"><span style="color: var(--accent-color)">></span> <span class="desc-text">\${d}</span></li>\`).join('')}
                </ul>
            \`;
            main.appendChild(art);
        });
    }

    if (resumeData.projects?.length) {
        main.innerHTML += \`<h2 class="section-head">Featured Projects</h2>\`;
        resumeData.projects.forEach((proj, idx) => {
            const art = document.createElement('article');
            art.className = 'card-base';
            art.style.position = 'relative';
            art.innerHTML = \`
                <span style="position: absolute; top: 0; right: 0; background: var(--accent-color); color: #000; padding: 2px 10px; font-size: 10px; font-weight: 900;">#\${String(idx + 1).padStart(2, '0')}</span>
                <div class="job-title" style="margin-top: 18px">\${proj.name}</div>
                <p class="desc-text" style="margin: 12px 0">\${proj.description}</p>
                
                \${proj.highlights?.length ? \`
                    <ul style="list-style: none; margin-bottom: 15px; border-left: 2px solid var(--accent-color); padding-left: 15px;">
                        \${proj.highlights.map(h => \`<li class="desc-text" style="margin-bottom: 5px;">\${h}</li>\`).join('')}
                    </ul>
                \` : ''}

                <div style="display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 20px">
                    \${(proj.technologies || []).map(t => \`<span class="tech-tag">\${t}</span>\`).join('')}
                </div>
                <div style="display: flex; gap: 10px">
                    \${proj.liveUrl ? \`<a href="\${ensureUrl(proj.liveUrl)}" target="_blank" class="contact-btn" style="font-size: 10px">Live Demo</a>\` : ''}
                    \${proj.githubUrl ? \`<a href="\${ensureUrl(proj.githubUrl)}" target="_blank" class="contact-btn" style="font-size: 10px">Code</a>\` : ''}
                </div>
            \`;
            main.appendChild(art);
        });
    }

    if (resumeData.skills && Object.values(resumeData.skills).some(s => s && s.length)) {
        main.innerHTML += \`<h2 class="section-head">Technical Arsenal</h2>\`;
        const grid = document.createElement('div');
        grid.style.display = 'grid';
        grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(200px, 1fr))';
        grid.style.gap = '16px';
        
        Object.entries(resumeData.skills).forEach(([cat, items]) => {
            if (!items || !items.length) return;
            const card = document.createElement('div');
            card.className = 'card-base';
            card.innerHTML = \`
                <div class="cat-title">\${cat}</div>
                <div style="display: flex; flex-wrap: wrap; gap: 6px">
                    \${items.map(sk => \`<span class="skill-chip">\${sk}</span>\`).join('')}
                </div>
            \`;
            grid.appendChild(card);
        });
        main.appendChild(grid);
    }

    const hasAbout = (resumeData.education?.length > 0) || (resumeData.summary) || (resumeData.personalInfo?.summary);
    if (hasAbout) {
        main.innerHTML += \`<h2 class="section-head">Background</h2>\`;
        const sum = resumeData.summary || info.summary || "Breaking boundaries through creative innovation and strategic design...";
        const card = document.createElement('div');
        card.className = 'card-base';
        card.innerHTML = \`
            <div class="cat-title">About</div>
            <p class="desc-text">\${sum}</p>
        \`;
        main.appendChild(card);

        if (resumeData.education?.length) {
            const card = document.createElement('div');
            card.className = 'card-base';
            card.innerHTML = \`<div class="cat-title">Education</div>\`;
            resumeData.education.forEach(edu => {
                card.innerHTML += \`
                    <div style="margin-bottom: 20px">
                        <div style="font-family: 'Archivo Black', sans-serif; font-weight: 900; font-size: 1.1rem; color: var(--accent-color);">\${edu.degree}</div>
                        <div style="font-weight: 700; margin-top: 5px;">\${edu.institution}</div>
                        <div style="display: flex; align-items: center; gap: 8px; margin-top: 8px">
                            <span class="date-badge">\${edu.year}</span>
                            \${edu.marks ? \`<span class="date-badge" style="background: var(--accent-color); color: #000; border-color: var(--accent-color)">\${edu.marks}</span>\` : ''}
                        </div>
                    </div>
                \`;
            });
            main.appendChild(card);
        }
    }
}

function setupResizeObserver() {
    const container = document.getElementById('name-container');
    const resize = () => {
        const firstName = document.getElementById('first-name');
        const lastName = document.getElementById('last-name');
        if (!container || !firstName || !lastName) return;
        
        const containerW = container.offsetWidth - 4;
        if (containerW <= 0) return;
        
        const name1 = firstName.textContent;
        const name2 = lastName.textContent;
        const longerName = (name1.length >= name2.length ? name1 : name2).toUpperCase();
        
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        let lo = 10, hi = 300;
        while (hi - lo > 1) {
            const mid = Math.floor((lo + hi) / 2);
            ctx.font = \`900 \${mid}px 'Archivo Black', Impact, sans-serif\`;
            const w = ctx.measureText(longerName).width;
            if (w < containerW) lo = mid;
            else hi = mid;
        }
        const size = Math.min(lo, 120);
        firstName.style.fontSize = \`\${size}px\`;
        lastName.style.fontSize = \`\${size}px\`;
    };
    
    new ResizeObserver(resize).observe(container);
    resize();
}

init();`;
}

export const brutalistTemplate: TemplateDefinition = {
  getHTML: getBrutalistHTML,
  getCSS: getBrutalistCSS,
  getJS: getBrutalistJS,
};
