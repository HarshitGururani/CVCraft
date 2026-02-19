/* eslint-disable @typescript-eslint/no-explicit-any */
import { TemplateDefinition } from "./index";

function getTerminalHTML(userData: any) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${userData.personalInfo.name} | Terminal Portfolio</title>
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
    <script>window.__PORTFOLIO_DATA__ = ${JSON.stringify(userData)};</script>
</head>
<body>
    <div id="root">
        <div class="terminal-window">
            <header class="terminal-titlebar">
                <div class="titlebar-dots">
                    <div class="dot dot-red"></div>
                    <div class="dot dot-yellow"></div>
                    <div class="dot dot-green"></div>
                </div>
                <div class="titlebar-title" id="titlebar-title">${userData.personalInfo.name.split(" ")[0].toLowerCase()}@portfolio: ~</div>
            </header>

            <div class="terminal-body">
                <aside class="term-sidebar">
                    <div id="sidebar-nav-header">${(userData.personalInfo.name.split(" ")[0] || "USER").toUpperCase()}@PORTFOLIO</div>
                    <nav id="sidebar-nav"></nav>
                </aside>

                <main class="term-content" id="term-content"></main>
            </div>
        </div>

        <!-- Mobile-only Bottom Nav -->
        <nav id="mobile-nav" class="mobile-nav"></nav>
    </div>
    <script src="script.js"></script>
</body>
</html>`;
}

function getTerminalCSS() {
  return `:root {
    --bg: #0d1117; 
    --titlebar: #161b22;
    --green: #3fb950; 
    --green-bright: #56d364;
    --blue: #58a6ff; 
    --purple: #bc8cff;
    --text: #e6edf3; 
    --muted: #8b949e; 
    --border: #30363d;
}

* { box-sizing: border-box; margin: 0; padding: 0; }
body { background: #000; font-family: 'JetBrains Mono', monospace; color: var(--text); height: 100vh; overflow: hidden; }

/* THE WINDOW */
.terminal-window { 
    width: 100%; height: 100vh; background: var(--bg); 
    display: flex; flex-direction: column; overflow: hidden;
    position: relative;
}

@media (min-width: 800px) {
    body { padding: 30px; }
    .terminal-window { 
        max-width: 1100px; margin: 0 auto; height: calc(100vh - 60px); 
        border-radius: 12px; border: 1px solid var(--border);
        box-shadow: 0 40px 80px rgba(0,0,0,0.6);
    }
}

.terminal-titlebar { 
    height: 40px; background: var(--titlebar); flex-shrink: 0; 
    display: flex; align-items: center; padding: 0 20px; 
    border-bottom: 1px solid var(--border); z-index: 100; 
}
.titlebar-dots { display: flex; gap: 8px; margin-right: 20px; }
.dot { width: 12px; height: 12px; border-radius: 50%; }
.dot-red { background: #ff5f57; } .dot-yellow { background: #febc2e; } .dot-green { background: #28c840; }
.titlebar-title { font-size: 0.75rem; color: var(--muted); letter-spacing: 0.5px; }

.terminal-body { flex: 1; display: flex; overflow: hidden; position: relative; }

/* SIDEBAR - VERTICAL LIST */
.term-sidebar { 
    width: 200px; border-right: 1px solid var(--border); 
    padding: 30px 0; display: flex; flex-direction: column; 
    flex-shrink: 0; background: var(--bg);
}

#sidebar-nav-header {
    font-size: 0.7rem; font-weight: bold; color: var(--muted);
    padding: 0 20px 20px; border-bottom: 1px solid var(--border);
    margin-bottom: 20px; opacity: 0.6;
}

.sidebar-nav-link { 
    display: block; width: 100%; border: none; background: none; 
    color: var(--muted); text-align: left; font-family: inherit;
    font-size: 0.8rem; padding: 12px 20px; cursor: pointer;
    border-left: 3px solid transparent; transition: all 0.2s;
}
.sidebar-nav-link:hover { color: var(--green); background: rgba(255,255,255,0.03); }

/* SCROLLSPY ACTIVE STATES */
.sidebar-nav-link.active {
    color: var(--green-bright);
    background: rgba(86, 211, 100, 0.08);
    border-left: 3px solid var(--green);
}

.mobile-nav-btn.active { color: var(--green-bright); border-bottom: 2px solid var(--green); }

/* MOBILE NAV (Bottom Bar) */
.mobile-nav { 
    position: fixed; bottom: 0; left: 0; right: 0; height: 60px; 
    background: var(--titlebar); border-top: 1px solid var(--border);
    display: none; align-items: center; justify-content: space-around;
    z-index: 1000;
}
.mobile-nav-btn { 
    background: none; border: none; color: var(--muted); 
    font-family: inherit; font-size: 0.7rem; font-weight: bold;
}

@media (max-width: 800px) {
    .term-sidebar { display: none !important; }
    .mobile-nav { display: flex !important; }
}

/* CONTENT CORE */
.term-content { 
    flex: 1; overflow-y: auto; overflow-x: hidden;
    padding: 50px; scroll-behavior: smooth;
}

.term-section { margin-bottom: 80px; }
.boot-section { margin-bottom: 60px; border-bottom: 1px solid var(--border); padding-bottom: 30px; }

.section-cmd { color: var(--green); font-weight: bold; font-size: 1rem; margin-bottom: 30px; }

/* DATA ALIGNMENT */
.lbl { color: var(--blue); font-weight: bold; display: inline-block; width: 70px; }
.lbl::after { content: ":"; opacity: 0.4; }

.entry-block { border-left: 2px solid var(--green); padding-left: 25px; margin-bottom: 40px; }
.entry-title { color: var(--green-bright); font-weight: bold; font-size: 1.1rem; }
.desc-list { list-style: none; font-size: 0.85rem; color: var(--muted); line-height: 1.8; margin-top: 10px; }
.desc-list li { margin-bottom: 6px; }
.tech-badge { 
    font-size: 0.65rem; background: rgba(88,166,255,0.08); color: var(--blue); 
    padding: 4px 10px; margin: 0 8px 8px 0; border: 1px solid rgba(88,166,255,0.15); border-radius: 4px; display: inline-block; 
}

@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
.cursor-blink { animation: blink 1s infinite; }`;
}

function getTerminalJS() {
  return `let resumeData = null;

window.addEventListener('message', e => {
    if (e.data?.type === 'UPDATE_DATA') { resumeData = e.data.payload; render(); }
});

function init() {
    resumeData = window.__PORTFOLIO_DATA__ || null;
    render();
    initScrollSpy();
}

function gotoSection(id) {
    const target = document.getElementById('section-' + id);
    if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function getVisibleSections() {
    if (!resumeData) return [{ id: 'about', label: 'INFO', cmd: 'whoami' }];
    const v = [];
    if (resumeData.experience?.length) v.push({ id: 'experience', label: 'EXP', cmd: 'ls ./jobs' });
    if (resumeData.projects?.length) v.push({ id: 'projects', label: 'PROJ', cmd: 'cat ./projects' });
    if (resumeData.skills && Object.values(resumeData.skills).some(s=>s?.length)) v.push({ id: 'skills', label: 'SKILLS', cmd: 'grep "skills"' });
    v.push({ id: 'about', label: 'INFO', cmd: 'whoami --verbose' });
    return v;
}

function initScrollSpy() {
    const content = document.getElementById('term-content');
    if (!content) return;

    content.addEventListener('scroll', () => {
        const sections = getVisibleSections();
        let current = sections[0]?.id;

        sections.forEach(sec => {
            const el = document.getElementById('section-' + sec.id);
            if (el) {
                const rect = el.getBoundingClientRect();
                if (rect.top <= 200) current = sec.id;
            }
        });

        document.querySelectorAll('.sidebar-nav-link, .mobile-nav-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-id') === current);
        });
    }, { passive: true });
}

function render() {
    if (!resumeData || !resumeData.personalInfo) return;
    const info = resumeData.personalInfo;
    const sections = getVisibleSections();

    const firstName = info.name ? info.name.split(' ')[0].toLowerCase() : 'user';
    document.getElementById('sidebar-nav-header').textContent = (firstName + '@portfolio').toUpperCase();

    const side = document.getElementById('sidebar-nav');
    if (side) side.innerHTML = sections.map(sec => 
        \`<button class="sidebar-nav-link" data-id="\${sec.id}" onclick="gotoSection('\${sec.id}')">› \${sec.label.toLowerCase()}</button>\`
    ).join('');

    const mNav = document.getElementById('mobile-nav');
    if (mNav) mNav.innerHTML = sections.map(sec => 
        \`<button class="mobile-nav-btn" data-id="\${sec.id}" onclick="gotoSection('\${sec.id}')">\${sec.label}</button>\`
    ).join('');

    const content = document.getElementById('term-content');
    if (!content) return;
    content.innerHTML = '';

    const boot = document.createElement('div');
    boot.className = 'boot-section';
    boot.innerHTML = \`
        <div style="font-size: 1.5rem; color: var(--green-bright); font-weight: bold; margin-bottom: 5px;">\${(info.name || "").toUpperCase()}</div>
        <div style="color: var(--purple); font-size: 0.9rem; margin-bottom: 25px; font-weight: bold;">\${(info.title || "").toUpperCase()}</div>
        <div style="font-size: 0.8rem; line-height: 2.2;">
            \${info.location ? \`<div><span class="lbl">LOC</span> <span style="color:var(--text)">\${info.location}</span></div>\` : ''}
            \${info.email ? \`<div><span class="lbl">MAIL</span> <span style="color:var(--text)">\${info.email}</span></div>\` : ''}
            \${info.phone ? \`<div><span class="lbl">PHONE</span> <span style="color:var(--text)">\${info.phone}</span></div>\` : ''}
            \${info.github ? \`<div><span class="lbl">GIT</span> <span style="color:var(--text)">\${info.github}</span></div>\` : ''}
            \${info.linkedin ? \`<div><span class="lbl">LINK</span> <span style="color:var(--text)">\${info.linkedin}</span></div>\` : ''}
        </div>
    \`;
    content.appendChild(boot);

    sections.forEach(sec => {
        const wrap = document.createElement('div');
        wrap.id = 'section-' + sec.id;
        wrap.className = 'term-section';
        wrap.innerHTML = \`<div class="section-cmd">❯ \${sec.cmd}</div>\`;
        
        if (sec.id === 'experience') renderExp(wrap);
        else if (sec.id === 'projects') renderProj(wrap);
        else if (sec.id === 'skills') renderSkills(wrap);
        else if (sec.id === 'about') renderAbout(wrap);
        
        content.appendChild(wrap);
    });
}

function renderExp(el) {
    (resumeData.experience || []).forEach(j => {
        const d = document.createElement('div'); d.className = 'entry-block';
        d.innerHTML = \`<div class="entry-title">\${j.title}</div><div style="font-size:0.75rem; color:var(--purple); margin: 5px 0 15px;">\${j.company} | \${j.startDate} - \${j.endDate}</div><ul class="desc-list">\${(j.description||[]).map(pt => \`<li>• \${pt}</li>\`).join('')}</ul>\`;
        el.appendChild(d);
    });
}

function renderProj(el) {
    (resumeData.projects || []).forEach(p => {
        const d = document.createElement('div'); d.className = 'entry-block';
        d.innerHTML = \`
            <div class="entry-title">\${p.name}</div>
            <p style="font-size:0.85rem; color:var(--muted); margin: 12px 0;">\${p.description}</p>
            
            \${p.highlights?.length ? \`
                <ul class="desc-list" style="margin-top: 15px; margin-bottom: 15px;">
                    \${p.highlights.map(h => \`<li>• \${h}</li>\`).join('')}
                </ul>
            \` : ''}

            <div style="margin-top:15px; display:flex; flex-wrap:wrap; gap:8px;">
                \${(p.technologies||[]).map(t => \`<span class="tech-badge">\${t}</span>\`).join('')}
            </div>
            <div style="margin-top:20px; display:flex; gap:15px;">
                \${p.liveUrl ? \`<a href="\${p.liveUrl}" target="_blank" style="color: var(--green-bright); text-decoration: none; font-size: 0.8rem; border: 1px solid var(--green); padding: 4px 12px; border-radius: 4px; transition: 0.2s;" onmouseover="this.style.background='rgba(86, 211, 100, 0.1)'" onmouseout="this.style.background='none'">[ LIVE_DEMO ]</a>\` : ''}
                \${p.githubUrl ? \`<a href="\${p.githubUrl}" target="_blank" style="color: var(--blue); text-decoration: none; font-size: 0.8rem; border: 1px solid var(--blue); padding: 4px 12px; border-radius: 4px; transition: 0.2s;" onmouseover="this.style.background='rgba(88, 166, 255, 0.1)'" onmouseout="this.style.background='none'">[ SOURCE_CODE ]</a>\` : ''}
            </div>
        \`;
        el.appendChild(d);
    });
}

function renderSkills(el) {
    const grid = document.createElement('div'); grid.style.display = 'grid'; grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(180px, 1fr))'; grid.style.gap = '30px';
    Object.entries(resumeData.skills || {}).forEach(([cat, list]) => {
        if (!list?.length) return;
        const col = document.createElement('div');
        col.innerHTML = \`<div style="font-size:0.7rem; color:var(--purple); margin-bottom:12px;">// \${cat.toUpperCase()}</div><div style="display:flex; flex-wrap:wrap; gap:8px;">\${list.map(s => \`<span class="tech-badge">\${s}</span>\`).join('')}</div>\`;
        grid.appendChild(col);
    });
    el.appendChild(grid);
}

function renderAbout(el) {
    const sum = resumeData.summary || resumeData.personalInfo?.summary || "> Write your mission statement here...";
    el.innerHTML += \`<div class="entry-block" style="margin-bottom:60px;"><div style="font-size:0.7rem; color:var(--purple); margin-bottom:15px;">/* MISSION_STATEMENT */</div><p style="font-size:1.1rem; line-height:1.8; color:var(--text); font-style: italic;">"\${sum}"</p></div>\`;
    if (resumeData.education?.length) {
        el.innerHTML += \`<div style="color:var(--purple); font-size:0.8rem; margin: 50px 0 25px; font-weight:bold;">// ACADEMIC_HISTORY</div>\`;
        resumeData.education.forEach(e => {
            const ed = document.createElement('div'); ed.className = 'entry-block'; ed.style.marginBottom = "35px";
            ed.innerHTML = \`<div style="color:var(--green-bright); font-weight:bold; font-size:1.1rem;">\${e.degree}</div><div style="color:var(--blue); font-size:0.9rem; margin-top:8px;">\${e.institution} | \${e.year}</div>\`;
            el.appendChild(ed);
        });
    }
}

init();`;
}

export const terminalTemplate: TemplateDefinition = {
  getHTML: getTerminalHTML,
  getCSS: getTerminalCSS,
  getJS: getTerminalJS,
};
