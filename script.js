const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = (s, r = document) => r.querySelector(s);
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

/* ============ DONNÉES : modifie tes textes ici ============ */
/* Images : un dossier par projet, Images/<id>/ → cover.png, logo.png, ordi-1.png, tel-1.png, wireframe-ordi-1.png, wireframe-tel-1.png, demarche-1.png, affiche.png
   theme:{bg,fg,accent} = couleurs de la carte (reprises de la cover) ; color = couleur de repli du bouton de date */
const PROJECTS = [
  { id:'goeland', title:'Goéland Sentinelle', kind:"Analyse UX · Audit d'interface · Maquettes figma", date:'Septembre 2026 – en cours', color:'#E63329', ink:'#fff',
    short:'Conception de la nouvelle interface de Goeland Sentinel, une application de géolocalisation développée par Wide-Int.', long:[
      "En petite équipe, nous travaillons sur la nouvelle version de Goeland Sentinel, une application développée par Wide-Int dédiée à la géolocalisation et au suivi en temps réel dans le cadre d’enquêtes.",
      "Après une analyse de l’application existante, nous concevons de nouvelles maquettes afin d’améliorer son ergonomie et l’expérience utilisateur.",
    ],
    chips:['Maquettage et Prototypage','Analyse des besoins','Ergonomie','Audit', 'Cahier des Charges'], mock:true },

  { id:'Senlab', title:'Senlab', kind:'Identité visuelle · Maquettes Figma · Shopify', date:'Septembre 2026 – en cours', color:'#EFE6D6', theme:{ bg:'#F0EADE', fg:'#242222', accent:'#F2686A' },
    short:"Création d’une boutique en ligne de matériel de musique sur Shopify", long:[
      "Senlab est un projet de création d’une boutique en ligne réalisée sur Shopify. Le projet a débuté par une étude du marché et de la concurrence, ainsi que par la définition de personas",
      "Nous avons ensuite développé l’identité visuelle de la marque, incluant le logo, les couleurs, la typographie...",
      "Enfin, après la conception des wireframes et des maquettes sur Figma, le site a été développé et intégré sur Shopify.",
    ],
    chips:['Boutique e-commerce','UX/UI Design','Graphisme','Wireframes','Mock-up','Analyse concurentielle',], mock:true },

  { id:'magan', title:'Magañ', kind:'Site Web · Maquettes Figma · Marketing · Comm R/S', date:'Octobre 2025 – Mars 2026', color:'#FB8C2E', theme:{ bg:'#2F3A22', fg:'#EFE6D6', accent:'#FB8C2E' },
    short:"Création complète de l'identité de marque de Magañ - l'atelier végétal", long:[
      "Dans le cadre du projet « Opération CréaIUT », notre équipe a accompagné une jeune entrepreneuse arboricultrice dans le développement de sa marque.",
      "Nous avons travaillé sur l’analyse du marché, la création de son identité visuelle, sa communication ainsi que la conception de son site internet.",
    ],
    chips:['Maquettage et Prototypage','Intégration','Analyse du marché', 'Stratégie de communication'], mock:true },
  { id:'diorama', title:'Diorama 3D', kind:'Blender · 3D', date:'Janvier 2026', color:'#36527F', ink:'#fff', theme:{ bg:'#121522', fg:'#EFE6D6', accent:'#E8C547' }, fit:true, bg:'#121522',
    video:'Images/diorama/video.mp4', videoRatio:'978/792', poster:'Images/diorama/apercu.jpg',
    short:'Reconstitution 3D du magasin de tofu Fujiwara (Initial D), avec une courte animation de la Toyota AE86.',
    long:[
      "Reconstitution en 3D du magasin de tofu de la famille Fujiwara, issu de l’univers d’Initial D, accompagnée d’une courte animation de la Toyota AE86 quittant le magasin.",
      "Inspirée d’une scène emblématique de la série, la scène se déroule de nuit afin de mettre en valeur le travail des lumières et l’ambiance environnante. Une attention particulière a également été portée aux matériaux et aux textures pour apporter davantage de réalisme au décor.",
    ],
    chips:['Modélisation 3D','Éclairage','Matériaux & textures','Animation','Poly Haven'] },
  { id:'locfit', title:'Locfit', kind:'Maquettes Figma · Site web', date:'Septembre 2025 – Janvier 2026', color:'#F2C75C', theme:{ bg:'#2A2A2A', fg:'#EFE6D6', accent:'#E0AC55' },
    short:'Maquettes et site internet de location d’équipements de sport.',
    long:[
      "LocFit est un projet de location d’équipements et de vêtements de sport.",
      "Nous avons commencé par concevoir les wireframes et les maquettes de l’interface sur Figma, avant de réaliser le site internet à partir de ces différentes propositions.",
    ],
    chips:['UX/UI Design','Prototypage','Wireframes','Mock-up','Conception Web'], mock:true },
  { id:'spectacle', title:'Application de réservation de spectacle', kind:'Application mobile · Maquettes Figma', date:'Novembre 2025', color:'#6EA8FF', theme:{ bg:'#101A3C', fg:'#EFE6D6', accent:'#6EA8FF' }, img:'Images/spectacle.jpg',
    short:"Maquettage d’une application mobile dédiée à la réservation de spectacles",
    long:[
      "Conception UX/UI d’une application mobile dédiée à la réservation de spectacles.",
      "Le projet a consisté à imaginer différents parcours utilisateurs, puis à concevoir les wireframes et les maquettes sur Figma",
    ],
    chips:['User Flows','Wireframes','Mock-up','Ergonomie'], mock:true },
  { id:'confiz', title:'Confiz’', kind:'Maquettes Figma · Site Web', date:'Avril 2025 – Juin 2025', color:'#F08AA8', theme:{ bg:'#583848', fg:'#EFE6D6', accent:'#F08AA8' },
    short:"Conception de maquettes et réalisation du site internet d’une confiserie.",
    long:[
      "Création de maquettes répondant aux besoins d’un persona défini, suivie de la réalisation d’un site web pour une confiserie.",
      "Le projet est passé par des wireframes, puis par des mock-up sur Figma.",
    ],
    chips:['Wireframes','Mock-up','UX/UI Design','Site Web'], mock:true },
  { id:'westfest', title:"À l’West Fest", kind:'Affiche · Graphisme', date:'Février 2025', color:'#B3A1CD', theme:{ bg:'#B3A1CD', fg:'#141210', accent:'#4B3A7A' }, visuel:'affiche',
    short:'Affiche pour le festival MMI « À l’Ouest Fest » 2025, sélectionnée pour représenter l’événement.',
    badge:'Affiche sélectionnée · Édition 2025',
    long:[
      "Création d’une affiche pour le festival MMI « À l’Ouest Fest » 2025. Le visuel repose sur l’image d’un gobelet dont le liquide forme une vague, illustrant le concept : « Le multimédia déferle sur l’Ouest ». ",
      "Ce projet m’a permis de travailler la composition graphique et la création d’une identité visuelle en lien avec l’univers du festival.",
    ],
    chips:['Affinity Designer','Identité visuelle','Typographie','Illustration','Affiche'] }
];

const SKILLS = [
  ['UX Design', 85, "Analyse des besoins, Personas, User journey map, Questionnaires et sondages, Architecture de l’information, A/B Testing."],
  ['UI Design', 90, "Figma, Prototypage interactif, Maquettage, Design system, Design tokens, Auto Layout, Accessibilité, Ergonomie, Variants et propriétés de composants, Cohérence visuelle."],
  ['Dev Web', 70, "HTML, CSS, JavaScript, VS Code, GitHub."],
  ['Graphisme', 80, "Affinity Designer, Identité visuelle, Charte graphique, Affiches, Logos, Infographies."],
  ['Audiovisuel', 70, "Prise de vue et réglages caméra, Montage et étalonnage sur DaVinci Resolve, Son, Mixage, Éclairage, Scénario, Storyboard."],
  ['Communication', 75, "Création de contenu, Réseaux Sociaux, Identité de marque, Storytelling, Événementiel."],
  ['Marketing', 55, "Étude de marché, SWOT, PESTEL, 4P, Positionnement, 5 Forces de Porter, Personas."]
];


/* ============ RENDU ============ */
const chips = a => `<ul class="chips">${a.map((c, k) => `<li style="--k:${k}">${c}</li>`).join('')}</ul>`;
/* titre de carte : chaque lettre dans un <span> (animation en vague au survol), les mots restent entiers */
const wave = t => { let n = 0; return t.split(' ').map(w => `<span class="wd" aria-hidden="true">${[...w].map(ch => `<span class="ch" style="--i:${n++}">${ch}</span>`).join('')}</span>`).join(' '); };
const slot = src => `<div class="slot" data-src="${src}"></div>`;

/* Chaque projet a son dossier Images/<id>/ : cover.png (image de la carte) et logo.png (optionnel, affiché dans la carte) */
const coverStyle = (p, src) => `background-image:url('${src}')${p.fit ? `;background-size:contain;background-color:${p.bg}` : ''}`;
const THEMES = ['', 'pcard--red', 'pcard--cream'];
$('#projectStack').innerHTML = PROJECTS.map((p, i) => `
  <article class="pcard ${THEMES[i % 3]}" style="--i:${i};--dc:${p.color};--dt:${p.ink || '#141210'}" tabindex="0" role="button" data-project="${p.id}" aria-label="Ouvrir ${p.title}">
    <div class="pcard__img" ${p.img ? `style="${coverStyle(p, p.img)}"` : ''}></div>
    <div class="pcard__body">
      <span class="date">${p.date}</span>
      <p class="kicker">${p.kind}</p>
      <h3 aria-label="${p.title}">${wave(p.title)}</h3><p>${p.short}</p>
      ${chips(p.chips.slice(0, 3))}
      <span class="more">Voir le détail</span>
    </div></article>`).join('');

/* Compétences : fiche de stats = radar animé + onglets + détail en chips (rien à lire en bloc) */
function buildSkills() {
  const S = [...SKILLS].sort((a, b) => b[1] - a[1]);     // du % le plus élevé au moins élevé
  const root = $('#skillGrid'); root.className = 'skills2';
  const N = S.length, R = 170, C = 260, ang = i => -Math.PI / 2 + i * 2 * Math.PI / N;
  const pt = (i, r) => [C + r * Math.cos(ang(i)), C + r * Math.sin(ang(i))];
  const poly = pts => pts.map(p => p.map(v => v.toFixed(1)).join(',')).join(' ');
  const rings = [.25, .5, .75, 1].map(k => `<polygon class="rd__ring" points="${poly(S.map((_, i) => pt(i, R * k)))}"/>`).join('');
  const axes = S.map((_, i) => { const [x, y] = pt(i, R); return `<line class="rd__axis" x1="${C}" y1="${C}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}"/>`; }).join('');
  const vals = S.map(([, v], i) => pt(i, R * v / 100));
  const dots = vals.map(([x, y], i) => `<circle class="rd__dot" data-i="${i}" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="8"/>`).join('');
  const labels = S.map(([n], i) => { const [x, y] = pt(i, R + 30), c = Math.cos(ang(i));
    return `<text class="rd__label" data-i="${i}" x="${x.toFixed(1)}" y="${(y + 5).toFixed(1)}" text-anchor="${Math.abs(c) < .2 ? 'middle' : c > 0 ? 'start' : 'end'}">${n}</text>`; }).join('');
  root.innerHTML = `
    <div class="radar reveal"><svg viewBox="-90 25 700 455" role="img" aria-label="Radar de mes compétences">
      <g class="rd__poly"><polygon class="rd__shape" points="${poly(vals)}"/></g>
      ${rings}${axes}
      <g class="rd__poly">${dots}</g>${labels}</svg></div>
    <div class="skills2__panel reveal" style="--d:.12s">
      <div class="skills2__tabs" role="tablist">${S.map(([n], i) => `<button type="button" role="tab" data-i="${i}">${n}</button>`).join('')}</div>
      <div class="skills2__card">
        <p class="skills2__pct"></p><h3 class="skills2__name"></h3>
        <div class="skills2__bar"><i></i></div><ul class="chips skills2__chips"></ul>
      </div></div>`;
  const $$ = s => [...root.querySelectorAll(s)];
  const card = $('.skills2__card', root), pct = $('.skills2__pct', root), name = $('.skills2__name', root);
  const bar = $('.skills2__bar i', root), chipsEl = $('.skills2__chips', root);
  let cur = -1, auto = null, touched = false;
  const paint = i => { const [n, v, d] = S[i];
    pct.textContent = v + ' %'; name.textContent = n; bar.style.width = v + '%';
    chipsEl.innerHTML = d.replace(/\.$/, '').split(', ').map((t, k) => `<li style="--k:${k}">${t}</li>`).join(''); };
  function select(i, user) {
    if (user) { touched = true; clearInterval(auto); auto = null; }
    if (i === cur) return; cur = i;
    $$('[data-i]').forEach(el => el.classList.toggle('on', +el.dataset.i === i));
    paint(i);
  }
  const fit = () => {          // la carte garde la hauteur de la plus grande : les onglets ne bougent plus
    card.style.minHeight = '0'; let m = 0;
    S.forEach((_, i) => { paint(i); m = Math.max(m, card.offsetHeight); });
    card.style.minHeight = m + 'px'; paint(cur);
  };
  root.addEventListener('click', e => { const t = e.target.closest('[data-i]'); if (t) select(+t.dataset.i, true); });
  root.addEventListener('pointerover', e => { const t = e.target.closest('[data-i]'); if (t && e.pointerType === 'mouse') select(+t.dataset.i, true); });
  select(0); fit(); document.fonts?.ready.then(fit); addEventListener('resize', fit);
  if (!reduce) new IntersectionObserver(es => es.forEach(e => {   // défilement automatique tant que tu n'y touches pas
    if (e.isIntersecting && !touched && !auto) auto = setInterval(() => select((cur + 1) % N), 3200);
    else if (!e.isIntersecting) { clearInterval(auto); auto = null; }
  }), { threshold: .35 }).observe(root);
}
buildSkills();

/* Titres : les mots montent un par un */
document.querySelectorAll('.huge').forEach(h => {
  h.innerHTML = h.textContent.trim().split(' ').map((w, i) => `<span class="w"><span style="--i:${i}">${w}</span></span>`).join(' ');
});

/* Marquees en contour derrière chaque chapitre */
document.querySelectorAll('.chap[data-word]').forEach(c => {
  const m = document.createElement('div'); m.className = 'marquee'; m.setAttribute('aria-hidden', 'true');
  m.innerHTML = `<span>${(c.dataset.word + ' ').repeat(8)}</span>`; c.prepend(m); c._m = m.firstChild;
});

/* ============ FENÊTRE DE DÉTAIL ============ */
const modal = $('#modal'), body = $('#modalBody');
$('#close').onclick = () => modal.close();
modal.addEventListener('click', e => { if (e.target === modal) modal.close(); });
/* ---- Détection automatique des images : Images/<id>/cover, logo, ordi-1.., tel-1.., demarche-1.. ---- */
const DIMS = new Map();   // ratio largeur/hauteur de chaque image chargée
const loadImg = src => new Promise(res => { const i = new Image(); i.onload = () => { DIMS.set(src, i.naturalWidth / i.naturalHeight); res(src); }; i.onerror = () => res(null); i.src = src; });
const EXTS = ['png', 'webp', 'jpg', 'jpeg', 'svg'];
async function findOne(base) { for (const e of EXTS) { const r = await loadImg(`${base}.${e}`); if (r) return r; } return null; }
async function findImages(base, max = 12) {
  const out = [];
  for (let n = 1; n <= max; n++) { const r = await findOne(`${base}-${n}`); if (!r) break; out.push(r); }
  return out;
}
/* ---- Couleurs d'une carte = couleurs de sa cover (calculées automatiquement, ou forcées avec theme:{bg,fg,accent}) ---- */
const INK = '#141210', CREAM = '#EFE6D6', palCache = new Map();
const hexOf = c => '#' + c.slice(0, 3).map(v => Math.round(v).toString(16).padStart(2, '0')).join('');
const rgbOf = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
const lumOf = c => (.2126 * c[0] + .7152 * c[1] + .0722 * c[2]) / 255;
const distOf = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
function paletteOf(src) {
  if (!palCache.has(src)) palCache.set(src, new Promise(res => {
    const im = new Image(); im.crossOrigin = 'anonymous';
    im.onerror = () => res(null);
    im.onload = () => { try {
      const S = 40, cv = document.createElement('canvas'); cv.width = cv.height = S;
      const cx = cv.getContext('2d', { willReadFrequently: true }); cx.drawImage(im, 0, 0, S, S);
      const d = cx.getImageData(0, 0, S, S).data, bins = new Map();
      for (let k = 0; k < d.length; k += 4) { if (d[k + 3] < 200) continue;
        const key = (d[k] >> 4) << 8 | (d[k + 1] >> 4) << 4 | (d[k + 2] >> 4);
        const b = bins.get(key) || { n: 0, r: 0, g: 0, b: 0 }; b.n++; b.r += d[k]; b.g += d[k + 1]; b.b += d[k + 2]; bins.set(key, b); }
      const cols = [...bins.values()].map(b => [b.r / b.n, b.g / b.n, b.b / b.n, b.n]).sort((a, b) => b[3] - a[3]);
      const bg = cols[0], sat = c => { const mx = Math.max(c[0], c[1], c[2]); return mx ? (mx - Math.min(c[0], c[1], c[2])) / mx : 0; };
      let acc = null, best = 0;
      cols.slice(0, 24).forEach(c => { if (distOf(c, bg) < 70) return; const sc = (sat(c) * 1.2 + .15) * Math.sqrt(c[3]); if (sc > best) { best = sc; acc = c; } });
      res({ bg, acc });
    } catch { res(null); } };     // ouverture en file:// : canvas bloqué -> on garde le thème par défaut
    im.src = src;
  }));
  return palCache.get(src);
}
function themeFrom(pal, manual) {
  const bg = manual?.bg || (pal && hexOf(pal.bg)); if (!bg) return null;
  const bgA = rgbOf(bg), fg = manual?.fg || (lumOf(bgA) > .55 ? INK : CREAM);
  let acc = manual?.accent || (pal?.acc && hexOf(pal.acc));
  if (!acc || distOf(rgbOf(acc), bgA) < 80) acc = fg;            // accent trop proche du fond : on prend la couleur du texte
  const body = hexOf(bgA.map((v, i) => v + ((lumOf(bgA) > .55 ? 0 : 255) - v) * .09));   // zone de texte un peu plus sombre (fonds clairs) ou claire (fonds sombres)
  return { bg, fg, acc, body, accT: lumOf(rgbOf(acc)) > .55 ? INK : CREAM };
}
function applyTheme(card, p, t) {
  if (!t) return; p._theme = t; card.classList.add('themed'); const s = card.style;
  s.setProperty('--cbg', t.bg); s.setProperty('--cbody', t.body); s.setProperty('--cfg', t.fg); s.setProperty('--cacc', t.acc); s.setProperty('--cacct', t.accT); s.setProperty('--dc', t.acc); s.setProperty('--dt', t.accT);
}
const dateVars = p => p._theme ? `--dc:${p._theme.acc};--dt:${p._theme.accT}` : `--dc:${p.color};--dt:${p.ink || INK}`;

async function hydrate() {            // cover + logo + couleurs de chaque carte
  const cards = document.querySelectorAll('.pcard');
  await Promise.all(PROJECTS.map(async (p, i) => {
    const [cover, logo] = await Promise.all([findOne(`Images/${p.id}/cover`), findOne(`Images/${p.id}/logo`)]);
    p._logo = logo;
    if (cover) cards[i].querySelector('.pcard__img').setAttribute('style', coverStyle(p, cover));
    if (p.theme) applyTheme(cards[i], p, themeFrom(null, p.theme));
    else if (cover) paletteOf(cover).then(pal => applyTheme(cards[i], p, themeFrom(pal)));
  }));
}

/* Agrandissement d'une maquette en entier */
const lb = document.createElement('dialog'); lb.id = 'lightbox';
lb.innerHTML = '<button class="modal__close" aria-label="Fermer">✕</button><div class="lb__scroll"><img alt=""></div>';
document.body.append(lb);
const syncLock = () => document.documentElement.classList.toggle('lock', modal.open || lb.open);
modal.addEventListener('close', syncLock); lb.addEventListener('close', syncLock);
lb.querySelector('button').onclick = () => lb.close();
lb.addEventListener('click', e => { if (e.target === lb) lb.close(); });
function openLightbox(src, mode) {
  lb.classList.toggle('phone', mode === 'mobile'); lb.querySelector('img').src = src; lb.showModal(); syncLock(); lb.querySelector('.lb__scroll').scrollTop = 0;
}

let openToken = 0;
const logoHTML = p => p._logo ? `<img class="m-logo" src="${p._logo}" alt="Logo ${p.title}">` : '';
function openProject(id) {
  const p = PROJECTS.find(x => x.id === id), tok = ++openToken;
  const media = p.video
    ? `<video class="visual" style="aspect-ratio:${p.videoRatio || '1/1'}" controls playsinline preload="metadata" poster="${p.poster || p.img}" src="${p.video}#t=0.1"></video>`
    : p.mock ? '<div class="car-host"></div>' : `<img class="visual" alt="Visuel ${p.title}" hidden>`;
  body.innerHTML = `<div class="meta m-top"><div class="m-top__l"><span class="date" style="${dateVars(p)}">${p.date}</span>${logoHTML(p)}${p.badge ? `<small class="badge">★ ${p.badge}</small>` : ''}</div></div>
    <div class="m-grid${p.mock ? ' m-grid--car' : ''}">
      <div class="m-text">
        <p class="kicker">${p.kind}</p><h2 class="huge">${p.title}</h2>
        ${[].concat(p.long).map(t => `<p class="lead">${t}</p>`).join('')}
        <h3 class="sub">Compétences</h3>${chips(p.chips)}
      </div>
      <div class="m-media">${media}</div>
    </div>
    ${p.mock ? '<div class="demarche" hidden><h3 class="sub">Démarche</h3><div class="demarche-host"></div></div>' : ''}`;
  body.querySelector('.huge').classList.add('is-in');
  body.style.setProperty('--pacc', p._theme?.acc || p.color);      // couleur de l'univers du projet (points du carrousel)
  modal.showModal(); syncLock(); body.scrollTop = 0;
  if (p._logo === undefined) findOne(`Images/${p.id}/logo`).then(l => { p._logo = l; if (l && tok === openToken) body.querySelector('.m-top .date').insertAdjacentHTML('afterend', logoHTML(p)); });
  if (p.mock) initMock(p, tok);
  else if (!p.video) findOne(`Images/${p.id}/${p.visuel || 'visuel'}`).then(src => {       // Images/<id>/affiche.png ou visuel.png
    const v = body.querySelector('.visual'); if (tok !== openToken || !v) return;
    const s = src || p.img; if (s) { v.src = s; v.hidden = false; } else v.remove();
  });
}

/* Carrousel générique (maquettes + démarche) : Wireframes / Mock-up  ×  Ordi / Téléphone */
const PHASE_LBL = { wireframe: 'Wireframes', mockup: 'Mock-up' }, MODE_LBL = { desktop: 'Ordi', mobile: 'Téléphone' };
const CAR_PAD = .10;      // la carte centrale occupe 80 % de la colonne : 10 % de marge de chaque côté
function mountCarousel(host, groups, o) {
  const solo = !groups.wireframe, key = p => solo ? '_' : p;
  const has = (p, m) => !!groups[p] && (groups[p][m] || []).length > 0;
  const anyImgs = p => !!groups[p] && Object.keys(groups[p]).some(m => has(p, m));
  // une phase sans image est masquée dès que l'autre en a (ex. Magañ : mock-up seulement) ; tout vide = les deux s'affichent avec leurs emplacements
  const phases = solo ? [] : ['wireframe', 'mockup'].filter(p => anyImgs(p) || !(anyImgs('wireframe') || anyImgs('mockup')));
  let phase = solo ? '_' : phases.includes('mockup') ? 'mockup' : phases[0];
  const modesOf = () => { const ks = Object.keys(groups[key(phase)]).filter(m => has(key(phase), m)); return ks.length ? ks : Object.keys(groups[key(phase)]); };
  let mode = modesOf()[0];
  host.innerHTML = `<div class="car" data-mode="${mode}" data-phase="${phase}">
    <div class="car__bar"></div>
    <div class="car__track" tabindex="0"></div>
    <div class="car__nav"><button type="button" class="prev" aria-label="Précédent">←</button><div class="car__mid"><div class="car__dots"></div></div><button type="button" class="next" aria-label="Suivant">→</button></div></div>`;
  const root = host.firstElementChild, bar = $('.car__bar', root), track = $('.car__track', root), dots = $('.car__dots', root);
  const prev = $('.prev', root), next = $('.next', root);
  let slides = [], cur = 0, raf = 0;
  const start = () => root.dataset.mode === 'demarche';      // démarche : carte calée à gauche ; maquettes : carte centrée
  const nearest = () => { const c = start() ? track.scrollLeft : track.scrollLeft + track.clientWidth / 2; let b = 0, d = 1e9;
    slides.forEach((s, i) => { const x = Math.abs((start() ? s.offsetLeft : s.offsetLeft + s.offsetWidth / 2) - c); if (x < d) { d = x; b = i; } }); return b; };
  const goTo = i => { i = clamp(i, 0, slides.length - 1); const s = slides[i];
    track.scrollTo({ left: start() ? s.offsetLeft : s.offsetLeft - (track.clientWidth - s.offsetWidth) / 2, behavior: 'smooth' }); };
  const update = () => { cur = nearest();
    slides.forEach((s, i) => s.classList.toggle('on', i === cur));
    [...dots.children].forEach((d, i) => d.classList.toggle('on', i === cur));
    prev.disabled = cur === 0; next.disabled = cur === slides.length - 1; };
  const seg = (g, keys, active, label) => keys.length > 1                       // plusieurs choix : boutons ; un seul : étiquette noire
    ? `<div class="seg" data-g="${g}">${keys.map(k => `<button type="button" data-v="${k}" class="${k === active ? 'on' : ''}">${label[k]}</button>`).join('')}</div>`
    : (label[keys[0]] ? `<div class="seg"><span>${label[keys[0]]}</span></div>` : '');
  function renderBar() {
    if (solo) { bar.innerHTML = ''; return; }
    const phaseSeg = seg('phase', phases, phase, PHASE_LBL), modeSeg = seg('mode', modesOf(), mode, o.modeLabel);
    bar.innerHTML = `<div class="car__grp">${phaseSeg}</div>${modeSeg ? `<div class="car__grp car__grp--r">${modeSeg}</div>` : ''}`;
    bar.querySelectorAll('.seg button').forEach(b => b.onclick = () => {
      if (b.parentElement.dataset.g === 'phase') phase = b.dataset.v; else mode = b.dataset.v;
      if (!modesOf().includes(mode)) mode = modesOf()[0];
      renderBar(); render();
    });
  }
  function render() {
    root.dataset.mode = mode; root.dataset.phase = phase;
    const list = groups[key(phase)][mode] || [];
    track.innerHTML = list.length
      ? list.map((s, i) => `<figure class="mslide"><button type="button" class="mframe" data-full="${s}"><img src="${s}" alt="${o.alt}" draggable="false"><span class="idx">${i + 1} / ${list.length}</span><span class="zoom">⤢ Voir en entier</span></button></figure>`).join('')
      : `<figure class="mslide"><div class="slot">${o.ph(phase, mode)}</div></figure>`;
    if (mode === 'demarche') {          // cadre adapté au format réel des images (larges = cartes larges, peu hautes)
      const rs = list.map(s => DIMS.get(s)).filter(Boolean);
      if (rs.length) root.style.setProperty('--ar', clamp(rs.reduce((x, y) => x + y) / rs.length, 1.3, 2.8).toFixed(2));
    }
    slides = [...track.querySelectorAll('.mslide')];
    dots.innerHTML = slides.map((_, i) => `<button type="button" aria-label="Image ${i + 1}"></button>`).join('');
    [...dots.children].forEach((d, i) => d.onclick = () => goTo(i));
    track.scrollLeft = 0; update();
  }
  prev.onclick = () => goTo(cur - 1); next.onclick = () => goTo(cur + 1);
  track.addEventListener('scroll', () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); }, { passive: true });
  track.addEventListener('keydown', e => { if (e.target !== track) return; if (e.key === 'ArrowRight') goTo(cur + 1); if (e.key === 'ArrowLeft') goTo(cur - 1); });

  const ac = new AbortController(); modal.addEventListener('close', () => ac.abort(), { once: true });
  let down = false, dragged = false, sx = 0, sl = 0;       // glisser à la souris (le doigt utilise le swipe natif)
  track.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') return; down = true; dragged = false; sx = e.clientX; sl = track.scrollLeft; track.classList.add('drag'); });
  addEventListener('pointermove', e => { if (!down) return; if (Math.abs(e.clientX - sx) > 5) dragged = true; track.scrollLeft = sl - (e.clientX - sx); }, { signal: ac.signal });
  addEventListener('pointerup', () => { if (!down) return; down = false; track.classList.remove('drag'); goTo(nearest()); setTimeout(() => dragged = false); }, { signal: ac.signal });
  track.addEventListener('click', e => {                     // carte voisine : on y va ; carte centrale : on l'agrandit
    const s = e.target.closest('.mslide'); if (!s || dragged) return;
    const i = slides.indexOf(s); if (i !== cur) return goTo(i);
    const f = e.target.closest('.mframe'); if (f) openLightbox(f.dataset.full, root.dataset.mode);
  });
  if (!solo) {       // hauteur de scène FIXE : changer de phase ou d'appareil ne déplace ni les boutons ni la suite de la page
    const setStage = () => { const w = root.clientWidth; if (w) root.style.setProperty('--stage',
      clamp((w * (1 - 2 * CAR_PAD) - 6) / 1.5, 220, Math.max(240, innerHeight * .9 - 340)).toFixed(0) + 'px'); };
    setStage(); new ResizeObserver(setStage).observe(root);
  }
  renderBar(); render();
}

async function initMock(p, tok) {
  const host = body.querySelector('.car-host'), B = `Images/${p.id}/`;
  const [mD, mM, wD, wM, dem] = await Promise.all([findImages(B + 'ordi'), findImages(B + 'tel'), findImages(B + 'wireframe-ordi'), findImages(B + 'wireframe-tel'), findImages(B + 'demarche')]);
  if (tok !== openToken || !host.isConnected) return;
  mountCarousel(host, { wireframe: { desktop: wD, mobile: wM }, mockup: { desktop: mD, mobile: mM } }, {
    modeLabel: MODE_LBL, alt: `${p.title}`,
    ph: () => 'Bientôt dispo' });
  const box = body.querySelector('.demarche');             // « Démarche » : typo, couleurs, iconographie… en carrousel
  if (dem.length || p.id === 'magan') {
    box.hidden = false;
    const dh = $('.demarche-host', box);
    mountCarousel(dh, { _: { demarche: dem } }, { modeLabel: { demarche: '' }, alt: `Démarche ${p.title}`,
      ph: () => 'Bientôt dispo' });
    const car = $('.car', dh), media = body.querySelector('.m-media');
    const setSw = () => { const W = dh.clientWidth, Wr = media.clientWidth;   // la flèche « suivant » des maquettes finit à 10 % de la colonne
      if (W && Wr) car.style.setProperty('--sw', (W - CAR_PAD * Wr) + 'px'); };
    setSw(); new ResizeObserver(setSw).observe(dh);
  }
}
modal.addEventListener('close', () => body.querySelector('video')?.pause());
document.addEventListener('click', e => { const p = e.target.closest('[data-project]'); if (p) openProject(p.dataset.project); });
document.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.dataset?.project) openProject(e.target.dataset.project); });

function loadSlots(root) {
  root.querySelectorAll('.slot').forEach(s => {
    const img = new Image();
    img.onload = () => { s.innerHTML = ''; s.append(img); s.classList.add('has-img'); };
    img.onerror = () => { s.textContent = 'Ajoute ton image : ' + s.dataset.src; };
    img.alt = ''; img.src = s.dataset.src;
  });
}

/* ============ NAVIGATION LATÉRALE : points par section, couleurs adaptées ============ */
const SECS = [['bio','Mini-bio'],['projets','Projets'],['competences','Compétences'],['experience','Expérience'],['formation','Formation'],['interets','Intérêts'],['contact','Contact']]
  .map(([id, l]) => ({ id, l, el: document.getElementById(id) }));
const dots = document.createElement('nav'); dots.className = 'dots'; dots.setAttribute('aria-label', 'Sections');
dots.innerHTML = SECS.map(s => `<a href="#${s.id}" data-l="${s.l}" aria-label="${s.l}"></a>`).join('');
document.body.append(dots);
const dotEls = [...dots.children]; let cur = -1;
function updateDots() {
  let i = 0; SECS.forEach((s, k) => { if (s.el.getBoundingClientRect().top <= innerHeight * .5) i = k; });
  if (i === cur) return; cur = i;
  dotEls.forEach((d, k) => d.classList.toggle('on', k === i));
  dots.style.setProperty('--fill', i / (SECS.length - 1));
  dots.dataset.theme = (SECS[i].el.className.match(/chap--(\w+)/) || [])[1] || 'cream';
}
updateDots();

/* ============ SCROLL : tout bouge ============ */
const chaps = [...document.querySelectorAll('.chap[data-word]')];
const cards = [...document.querySelectorAll('.pcard')], fast = [...document.querySelectorAll('[data-speed]')];
let lastY = scrollY, skew = 0;

function onScroll() {
  updateDots();
  const path = $('.path');                         // la carte « stage » glisse vers la droite, la flèche la suit
  if (path) { const r = path.getBoundingClientRect(), p = clamp((innerHeight * .9 - r.top) / (r.height * .9), 0, 1);
    path.style.setProperty('--sx', (innerWidth < 860 || reduce ? 0 : p * r.width * .22) + 'px'); }
  if (reduce) return;
  chaps.forEach(c => { const r = c.getBoundingClientRect(); if (r.bottom > 0 && r.top < innerHeight) c._m.style.transform = `translateX(${r.top * .45 - 80}px)`; });
  fast.forEach(el => {
    const r = el.getBoundingClientRect(), base = r.top + r.height / 2 - (el._py || 0) - innerHeight / 2;
    el._py = clamp(-base * el.dataset.speed, -80, 80); el.style.setProperty('--py', el._py + 'px');
  });
  cards.forEach((c, i) => {                       // les cartes projets se « tassent » quand la suivante arrive
    const n = cards[i + 1]; if (!n || innerWidth < 860) return;
    const p = clamp(1 - (n.getBoundingClientRect().top - (80 + i * 28)) / (innerHeight * .7), 0, 1);
    c.style.transform = `scale(${1 - .05 * p})`; c.style.filter = `brightness(${1 - .4 * p})`;
  });
}
addEventListener('scroll', onScroll, { passive: true }); onScroll();

/* Inclinaison des titres selon la vitesse de scroll */
if (!reduce) (function loop() {
  const v = scrollY - lastY; lastY = scrollY;
  skew += (clamp(-v * .3, -7, 7) - skew) * .12;
  document.documentElement.style.setProperty('--skew', skew.toFixed(2) + 'deg');
  requestAnimationFrame(loop);
})();

const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
}), { threshold: .15 });
document.querySelectorAll('.reveal, .huge, .path__link').forEach(el => io.observe(el));

/* ============ LOGOS DÉPLAÇABLES : Figma (hero) + IUT / MMI (formation) ============ */
const anchor = $('#fourn'), heroTitle = $('.hero__title');
function makeDraggable(el, placeFn) {
  let ox = 0, oy = 0, start = null, lastX = 0;
  el.addEventListener('pointerdown', e => {
    el.setPointerCapture(e.pointerId); start = { x: e.pageX - ox, y: e.pageY - oy }; lastX = e.pageX;
    el.classList.remove('drop'); el.classList.add('grab');
  });
  el.addEventListener('pointermove', e => {
    if (!start) return;
    ox = e.pageX - start.x; oy = e.pageY - start.y;
    el.style.transform = `translate(${ox}px,${oy}px)`;
    el.style.setProperty('--r', clamp((e.pageX - lastX) * 2.5, -30, 30) + 'deg'); lastX = e.pageX;
  });
  const release = () => {
    if (!start) return; start = null;
    el.classList.remove('grab'); el.style.setProperty('--r', '0deg');
    void el.offsetWidth; el.classList.add('drop'); setTimeout(() => el.classList.remove('drop'), 800);
  };
  el.addEventListener('pointerup', release); el.addEventListener('pointercancel', release);
  return () => placeFn(el);
}
function placeFigma(el) {          // derrière le « n » de Fourn, dans le coin, sans toucher « Mini-bio »
  const r = anchor.getBoundingClientRect(), t = heroTitle.getBoundingClientRect();
  const bottom = r.top + scrollY + r.height * .62, minTop = t.top + scrollY + 8;
  let h = Math.max(100, r.height * 1.7); if (bottom - h < minTop) h = Math.max(90, bottom - minTop);
  const w = h * 38 / 57, left = Math.min(r.right + scrollX - r.width * .1 - w / 2, document.documentElement.clientWidth - w - 14);
  Object.assign(el.style, { width: w + 'px', height: h + 'px', left: left + 'px', top: bottom - h + 'px' });
}
function placeLogo(el, h, ratio, fromRight, dy) {   // à droite, dans le vide, au niveau de la formation MMI
  const s = $('#formation'), li = $('#formation .timeline li'); if (!s || !li) return;
  const lr = li.getBoundingClientRect(), sr = s.getBoundingClientRect(), w = h * ratio;
  const right = sr.right + scrollX - parseFloat(getComputedStyle(s).paddingRight);
  Object.assign(el.style, { width: w + 'px', height: h + 'px',
    left: Math.max(lr.right + scrollX + 24, right - fromRight - w) + 'px', top: lr.top + scrollY + dy + 'px' });
}
function placeHat(el, h) {          // à gauche du petit texte « Centres d'intérêt » en haut à droite
  const m = $('#interets .meta span:last-child'); if (!m) return;
  const r = m.getBoundingClientRect(), w = h * 1.497;
  Object.assign(el.style, { width: w + 'px', height: h + 'px', left: r.left + scrollX - w - 24 + 'px', top: r.top + scrollY + r.height / 2 - h / 2 - 10 + 'px' });
}
const placers = [
  makeDraggable($('#figma'), placeFigma),
  makeDraggable($('#logoMmi'), el => placeLogo(el, 120, .894, 10, 0)),
  makeDraggable($('#logoIut'), el => placeLogo(el, 130, .791, 10 + 107 + 40, 50)),
  makeDraggable($('#logoHat'), el => placeHat(el, 105))
];
const placeAll = () => placers.forEach(f => f());
addEventListener('resize', placeAll); addEventListener('load', placeAll); document.fonts?.ready.then(placeAll);
document.querySelectorAll('.line').forEach(l => l.addEventListener('animationend', placeAll));
placeAll();

/* ============ CONTACT ============ */
$('#copyMail').onclick = async function () {
  try { await navigator.clipboard.writeText($('#mailText').textContent); this.textContent = 'Adresse copiée ✓'; }
  catch { this.textContent = 'Copie impossible : sélectionne l’adresse'; }
  setTimeout(() => this.textContent = 'Copier l’adresse', 2200);
};

hydrate();
