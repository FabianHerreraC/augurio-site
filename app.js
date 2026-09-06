/* ================= idiomas =================
   Todo el texto visible vive aquí, en los dos idiomas. Los módulos leen del
   diccionario en el momento de pintar —no capturan las cadenas al arrancar—,
   así que cambiar de idioma sólo exige volver a pintar. El texto que está en
   el HTML lo reescribe aplicarIdioma(). */
const TEXTOS = {
  es: {
    header: {
      nav: ['INICIO', 'TEORIA', 'CONTACTO'],
      seccion: 'INICIO',
      cita: '\u201cNo sentí que Augurio me dijera quiénes éramos, sino que por fin pudimos ver con claridad qué nos hacía valiosos como organización. Fue la primera vez que sentí que nos escuchaban de verdad, sin encasillarnos en una categoría genérica.\u201d',
      menu: 'Menú',
      bajar: 'Ir a la siguiente sección'
    },
    tagline: {
      fijo: 'Conversaciones',
      largo: 'reveladoras',   // reserva el ancho de la palabra más larga
      palabras: ['masivas', 'profundas', 'reveladoras', 'verdaderas', 'valiosas', 'completas'],
      sr: 'Conversaciones masivas, profundas, reveladoras, verdaderas, valiosas, completas.'
    },
    gato: {
      rotulos: ['COLECTIVO', 'EMERGENTE', 'DISPERSIÓN', 'COMPLEJIDAD', 'TECNOLOGÍA', 'ÚNICO'],
      frases: [
        ['Profundidad_', 'Creemos que el valor de un equipo no está en lo que sabe cada persona por separado, sino en lo que sabe como colectivo.'],
        ['Revelación_', 'Creemos que ese conocimiento no se declara, se revela conversando.'],
        ['Granularidad_', 'Creemos que una buena conversación no es un promedio de opiniones, es la que también escucha a la voz disidente.'],
        ['Ambigüedad_', 'Creemos que una buena conversación no se queda en la superficie, va en profundidad.'],
        ['LLM_', 'Creemos que la IA por fin permite orquestar esas conversaciones a gran escala, sin perder lo que antes se quedaba en el aire cuando la sala era demasiado grande para escuchar a todos.'],
        ['Singularidad_', 'Creemos que ninguna compañía necesita parecerse a otra, solo necesita parecerse más a sí misma.']
      ]
    },
    mano: {
      seccion: 'QUE',
      rotulo: 'COMO LO HACEMOS',
      titular: 'Usamos tecnología para orquestar conversaciones profundas que revelan conocimiento.',
      pildoras: ['Conversación', 'Captura', 'Análisis', 'Visualización'],
      fases: [
        ['Conversación_', 'define las reglas del diálogo antes de construir nada: profundidad, contraste de ideas, ausencia de sesgo y capacidad de generar revelaciones reales, apoyada en cuestionamiento crítico y en imágenes o historias en vez de preguntas cerradas. Este diseño es el que luego le dicta al chatbot cómo comportarse.'],
        ['Captura_', 'es la implementación concreta de esas reglas: el chatbot que efectivamente conversa con las personas y guarda cada intercambio en Supabase, organizado por sesión. Su función es estrictamente recolectora; no interpreta ni analiza nada, solo asegura que la conversación quede registrada con fidelidad.'],
        ['Análisis_', 'toma esas conversaciones almacenadas y las procesa con IA para extraer insights estructurados: encuentra patrones, contrasta respuestas entre participantes y filtra ruido, hasta llegar a los hallazgos que explican qué es la organización, por qué es valiosa y en qué es distinta a otras.'],
        ['Visualización_', 'traduce esos insights en formatos gráficos predefinidos (nubes de puntos, grafos, mapas de calor, cronogramas, entre otros), usando specs ya probadas en proyectos anteriores en vez de generar cada vez un diseño desde cero. El resultado final es una sesión visual personalizada que la organización puede leer de un vistazo, cerrando el ciclo que empezó con una simple conversación de chat.']
      ]
    },
    probs: {
      rotulo: 'Dolores',
      titulo: 'Los problemas que resolvemos',
      partes: [
        ['Gerentes desconectados de la realidad de su empresa,', 'que dirigen desde el diagnóstico de hace dos años porque nadie les trajo uno más reciente.'],
        ['Comunidades reducidas a encuestas y formularios,', 'cuya voz real nunca llegó a ningún reporte porque una casilla no tiene espacio para matices.'],
        ['Equipos que viven en silos de conocimiento', 'y jamás han tenido la oportunidad de conversar con sus pares, aunque trabajen a diez metros de distancia.'],
        ['Conflictos que solo revelan la falta de una imagen completa', 'sobre el problema que los originó, y que se resuelven solos en cuanto esa imagen aparece.'],
        ['Juntas directivas que deciden sobre un consenso fabricado,', 'donde nadie se atrevió a decir en la sala lo que sí dijo en el pasillo.'],
        ['Procesos de planeación estratégica', 'que terminan pareciéndose al competidor de moda, en vez de parecerse a la organización que los escribió.'],
        ['Fusiones y alianzas que fracasan', 'porque nunca hubo una conversación real entre las culturas que se estaban uniendo, solo un comunicado de prensa.'],
        ['Líderes que heredan un cargo', 'sin heredar el conocimiento tácito que solo vivía en la cabeza de quien se fue.'],
        ['Organizaciones que confunden el ruido', 'de la voz más poderosa en la sala con la inteligencia colectiva de todo el equipo.'],
        ['Equipos que llevan años repitiendo el mismo plan', 'porque nadie sostuvo la incomodidad de nombrar en voz alta lo que ya no estaba funcionando.']
      ]
    },
    boton: 'EN',
    botonTitulo: 'Switch to English'
  },

  en: {
    header: {
      nav: ['HOME', 'THEORY', 'CONTACT'],
      seccion: 'HOME',
      cita: '\u201cI didn\u2019t feel that Augurio told us who we were; I felt that we could finally see clearly what made us valuable as an organization. It was the first time I felt we were truly heard, instead of being filed under some generic category.\u201d',
      menu: 'Menu',
      bajar: 'Go to the next section'
    },
    tagline: {
      fijo: 'Conversations that are',
      largo: 'revealing',
      palabras: ['massive', 'deep', 'revealing', 'honest', 'valuable', 'complete'],
      sr: 'Conversations that are massive, deep, revealing, honest, valuable, complete.'
    },
    gato: {
      rotulos: ['COLLECTIVE', 'EMERGENT', 'DISPERSION', 'COMPLEXITY', 'TECHNOLOGY', 'SINGULAR'],
      frases: [
        ['Depth_', 'We believe the value of a team is not in what each person knows separately, but in what it knows as a collective.'],
        ['Revelation_', 'We believe that knowledge is not declared, it is revealed through conversation.'],
        ['Granularity_', 'We believe a good conversation is not an average of opinions, it is the one that also listens to the dissenting voice.'],
        ['Ambiguity_', 'We believe a good conversation does not stay on the surface, it goes deep.'],
        ['LLM_', 'We believe AI finally makes it possible to orchestrate those conversations at scale, without losing what used to vanish into the air when the room was too big to hear everyone.'],
        ['Singularity_', 'We believe no company needs to resemble another, it only needs to resemble itself more.']
      ]
    },
    mano: {
      seccion: 'WHAT',
      rotulo: 'HOW WE DO IT',
      titular: 'We use technology to orchestrate deep conversations that reveal knowledge.',
      pildoras: ['Conversation', 'Capture', 'Analysis', 'Visualization'],
      fases: [
        ['Conversation_', 'sets the rules of the dialogue before anything is built: depth, contrast of ideas, absence of bias and the capacity to produce real revelations, grounded in critical questioning and in images or stories rather than closed questions. That design is what later tells the chatbot how to behave.'],
        ['Capture_', 'is the concrete implementation of those rules: the chatbot that actually converses with people and stores every exchange in Supabase, organized by session. Its role is strictly to collect; it interprets and analyzes nothing, it only makes sure the conversation is recorded faithfully.'],
        ['Analysis_', 'takes those stored conversations and processes them with AI to extract structured insights: it finds patterns, contrasts answers across participants and filters out noise, until it reaches the findings that explain what the organization is, why it is valuable and how it differs from others.'],
        ['Visualization_', 'translates those insights into predefined graphic formats (dot clouds, graphs, heat maps, timelines, among others), using specs already proven in earlier projects instead of designing from scratch every time. The final result is a tailored visual session the organization can read at a glance, closing the loop that began with a simple chat conversation.']
      ]
    },
    probs: {
      rotulo: 'Pains',
      titulo: 'The problems we solve',
      partes: [
        ['Managers disconnected from the reality of their company,', 'steering from a diagnosis made two years ago because nobody brought them a fresher one.'],
        ['Communities reduced to surveys and forms,', 'whose real voice never reached any report because a checkbox has no room for nuance.'],
        ['Teams living in silos of knowledge', 'who have never had the chance to talk with their peers, even when they work ten metres apart.'],
        ['Conflicts that only reveal the lack of a complete picture', 'of the problem behind them, and that resolve themselves the moment that picture appears.'],
        ['Boards that decide on a manufactured consensus,', 'where nobody dared say in the room what they did say in the hallway.'],
        ['Strategic planning processes', 'that end up resembling the competitor of the moment, instead of the organization that wrote them.'],
        ['Mergers and alliances that fail', 'because there was never a real conversation between the cultures being joined, only a press release.'],
        ['Leaders who inherit a role', 'without inheriting the tacit knowledge that lived only in the head of whoever left.'],
        ['Organizations that mistake the noise', 'of the most powerful voice in the room for the collective intelligence of the whole team.'],
        ['Teams that have spent years repeating the same plan', 'because nobody held the discomfort of naming out loud what had stopped working.']
      ]
    },
    boton: 'ES',
    botonTitulo: 'Cambiar a español'
  }
};

let IDIOMA = 'es';
const T = () => TEXTOS[IDIOMA];

/* Motor de campo de puntos.
   Toma una imagen, la lee como mapa de densidad y la reconstruye como un
   enjambre de puntos que titilan y derivan levemente. Sirve para tinta clara
   sobre fondo negro (header) y para tinta oscura sobre papel (sección). */
function createDotField(canvas, opts) {
  const o = Object.assign({
    src: null,
    dark: false,        // true = puntos oscuros sobre papel claro
    paper: 10,          // valor del fondo, 0-255
    inkFloor: 45,       // valor del punto más tenue
    inkRange: 210,      // recorrido hasta el punto más denso
    gamma: 0.6,         // curva del brillo del punto
    wFloor: 0.055,      // peso mínimo: el grano que llena el fondo
    wGamma: 1.35,       // curva de la densidad
    maxScale: 1.25,
    pxPerDot: 20,
    minDots: 18000,
    maxDots: 95000,
    drift: 1.15,
    fizz: 2.2,          // efervescencia: escala titileo y velocidades
    scatter: 0,         // dispersión del punto respecto de su píxel, en px a 1440 de ancho
    scatterFall: 1.3,   // cuánto se apaga la dispersión donde la imagen es densa
    fit: 'cover',       // 'cover' o 'contain'
    zoom: 1,            // multiplica el encuadre; 1 = tal cual
    panX: 0, panY: 0,   // corrimiento, en fracciones del lienzo
    zoomCap: 1.35,      // tope de acercamiento respecto del encuadre "contain"
    srcTop: 0,          // fracción superior de la fuente que se descarta
    prepare: null       // fn(ctx, w, h) para limpiar la fuente antes de muestrear
  }, opts || {});

  const ctx = canvas.getContext('2d', { alpha: false });
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const LUT = 1024, MASK = LUT - 1;
  const SIN = new Float32Array(LUT);
  for (let i = 0; i < LUT; i++) SIN[i] = Math.sin((i / LUT) * Math.PI * 2);

  let W = 0, H = 0, clean = null, count = 0;
  let px, py, pv, ph1, ph2, sp1, sp2, amp, dsc;
  let buf32 = null, imageData = null, lastIdx = null, lastN = 0;
  let raf = 0, resizeTimer = 0, running = false;

  // Varias opciones pueden ser función para depender del ancho de pantalla:
  // el encuadre no es el mismo en escritorio que en móvil.
  const val = (v) => (typeof v === 'function' ? v() : v);

  const BG = (0xff000000 | (o.paper << 16) | (o.paper << 8) | o.paper) >>> 0;

  function prepareSource(img) {
    const c = document.createElement('canvas');
    c.width = img.width; c.height = img.height;
    const cx = c.getContext('2d', { willReadFrequently: true });
    cx.drawImage(img, 0, 0);
    if (o.prepare) o.prepare(cx, img.width, img.height);
    clean = c;
  }

  function buildField() {
    const off = document.createElement('canvas');
    off.width = W; off.height = H;
    const octx = off.getContext('2d', { willReadFrequently: true });
    octx.fillStyle = 'rgb(' + o.paper + ',' + o.paper + ',' + o.paper + ')';
    octx.fillRect(0, 0, W, H);

    const sy = Math.round(clean.height * o.srcTop);
    const sw = clean.width, sh = clean.height - sy;
    const cover = Math.max(W / sw, H / sh);
    const contain = Math.min(W / sw, H / sh);
    // fit puede ser una función: la sección de problemas encuadra distinto en
    // móvil, donde el marco es mucho más alto que ancho.
    const modo = val(o.fit);
    let s = modo === 'contain' ? contain : Math.min(cover, contain * val(o.zoomCap));
    // zoom y paneo van encima del encuadre: la escena del gato se amplía y se
    // corre en móvil, y los números tienen que seguirla. Son fracciones del
    // lienzo, así que no dependen de la resolución.
    s *= val(o.zoom);
    const dw = sw * s, dh = sh * s;
    octx.drawImage(clean, 0, sy, sw, sh,
      (W - dw) / 2 + val(o.panX) * W, (H - dh) / 2 + val(o.panY) * H, dw, dh);

    const data = octx.getImageData(0, 0, W, H).data;
    const n = W * H;

    const weight = new Float32Array(n);
    let total = 0;
    for (let i = 0, p = 0; i < n; i++, p += 4) {
      let l = (data[p] * 0.299 + data[p + 1] * 0.587 + data[p + 2] * 0.114) / 255;
      if (o.dark) l = 1 - l;            // sobre papel, manda la oscuridad
      if (o.cut) l = Math.max(0, (l - o.cut) / (1 - o.cut));
      const w = l <= 0 && o.cut ? 0 : o.wFloor + (1 - o.wFloor) * Math.pow(l, o.wGamma);
      weight[i] = w; total += w;
    }

    const sc = o.scatter * (W / 1440);
    const target = Math.max(o.minDots, Math.min(o.maxDots, Math.round(n / val(o.pxPerDot))));
    const k = target / total;
    const cap = target * 1.4 | 0;

    px = new Float32Array(cap); py = new Float32Array(cap);
    pv = new Float32Array(cap);
    ph1 = new Uint16Array(cap); ph2 = new Uint16Array(cap);
    sp1 = new Float32Array(cap); sp2 = new Float32Array(cap);
    amp = new Float32Array(cap);
    dsc = new Float32Array(cap);   // cuánto deriva cada punto por cuadro

    let c = 0;
    for (let i = 0, p = 0; i < n && c < cap; i++, p += 4) {
      const prob = Math.min(1, weight[i] * k);
      let copies = prob | 0;
      if (Math.random() < prob - copies) copies++;
      if (!copies) continue;

      let l = (data[p] * 0.299 + data[p + 1] * 0.587 + data[p + 2] * 0.114) / 255;
      if (o.dark) l = 1 - l;
      if (o.cut) l = Math.max(0, (l - o.cut) / (1 - o.cut));
      const base = o.inkFloor + o.inkRange * Math.pow(l, o.gamma);

      // La dispersión se apaga donde la imagen es densa. Uniforme, el aerosol
      // también vacía el núcleo: los puntos que deberían llenarlo se van a los
      // lados y la cobertura cae al 60% aunque haya un punto por píxel.
      // Así el centro queda macizo y sólo el contorno se deshilacha.
      const suave = sc ? Math.pow(1 - l, o.scatterFall) : 0;
      const disp = sc * suave;

      for (let j = 0; j < copies && c < cap; j++, c++) {
        const g1 = (Math.random() + Math.random() + Math.random() - 1.5) * disp;
        const g2 = (Math.random() + Math.random() + Math.random() - 1.5) * disp;
        px[c] = (i % W) + (Math.random() - 0.5) * suave + g1;
        py[c] = (i / W | 0) + (Math.random() - 0.5) * suave + g2;
        pv[c] = Math.min(255, base * (0.8 + Math.random() * 0.4));
        ph1[c] = Math.random() * LUT | 0;
        ph2[c] = Math.random() * LUT | 0;
        sp1[c] = (0.6 + Math.random() * 2.2) * o.fizz;
        sp2[c] = (0.15 + Math.random() * 0.5) * o.fizz;
        // El titileo y la deriva siguen la misma curva que la dispersión.
        // Con amplitud pareja, el núcleo nunca queda macizo: en cada cuadro
        // la mitad de sus puntos se aclaran y la zona se lee gris.
        const vivo = sc ? suave : 1;
        amp[c] = (0.18 + Math.random() * 0.3) * o.fizz * vivo;
        dsc[c] = vivo;
      }
    }
    count = c;

    imageData = ctx.createImageData(W, H);
    buf32 = new Uint32Array(imageData.data.buffer);
    buf32.fill(BG);
    lastIdx = new Int32Array(count);
    lastN = 0;
  }

  const DARK = o.dark;

  function paint(t) {
    for (let i = 0; i < lastN; i++) buf32[lastIdx[i]] = BG;
    let ln = 0;

    for (let i = 0; i < count; i++) {
      const f = t === null ? 0 : SIN[(ph1[i] + (t * sp1[i] * LUT * 0.16 | 0)) & MASK];
      let v = pv[i] * (1 + amp[i] * f);
      if (v <= 2) continue;
      if (v > 255) v = 255;

      // Redondear, no truncar: con desplazamientos de una fracción de píxel,
      // truncar manda la mitad de los puntos al píxel anterior y el núcleo
      // queda agujereado aunque haya un punto sembrado por píxel.
      let x, y;
      if (t === null) { x = px[i] + 0.5 | 0; y = py[i] + 0.5 | 0; }
      else {
        const d1 = SIN[(ph2[i] + (t * sp2[i] * LUT * 0.16 | 0)) & MASK];
        const d2 = SIN[(ph2[i] + 256 + (t * sp2[i] * LUT * 0.11 | 0)) & MASK];
        const dv = o.drift * dsc[i];
        x = px[i] + d1 * dv + 0.5 | 0;
        y = py[i] + d2 * dv + 0.5 | 0;
      }
      if (x < 0 || y < 0 || x >= W || y >= H) continue;

      // en papel el punto oscurece; sobre negro, ilumina
      const g = (DARK ? o.paper * (1 - v / 255) : v) | 0;
      const idx = y * W + x;
      const cur = buf32[idx] & 0xff;
      if (DARK ? g < cur : g > cur) buf32[idx] = (0xff000000 | (g << 16) | (g << 8) | g) >>> 0;
      lastIdx[ln++] = idx;
    }
    lastN = ln;
    ctx.putImageData(imageData, 0, 0);
  }

  function frame(now) {
    paint(now * 0.001);
    raf = requestAnimationFrame(frame);
  }

  function start() {
    if (running || reduced || !buf32) return;
    running = true;
    raf = requestAnimationFrame(frame);
  }
  function stop() {
    running = false;
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  }

  function resize() {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, o.maxScale);
    const w = Math.max(1, Math.round(rect.width * dpr));
    const h = Math.max(1, Math.round(rect.height * dpr));
    const mismasMedidas = (w === W && h === H);

    // Salir por "no ha cambiado el tamaño" sólo vale si además ya hay campo
    // sembrado. Si un 'resize' se adelanta a la carga de la imagen —cosa
    // habitual cuando la fuente viaja por red y no por localhost—, deja el
    // lienzo dimensionado y sin campo; al llegar el onload, resize() volvía
    // a entrar, veía las mismas medidas y se iba sin sembrar nunca. El
    // lienzo se quedaba en blanco para siempre y sin error en consola.
    if (mismasMedidas && buf32) return;

    if (!mismasMedidas) {
      W = w; H = h;
      canvas.width = W; canvas.height = H;
    }
    if (!clean) return;
    buildField();
    paint(reduced ? null : 0);
  }

  const image = new Image();
  image.onload = function () {
    prepareSource(image);
    resize();
    if (!reduced) observe();
  };
  image.src = o.src;

  // no gastar cuadros mientras la sección no está a la vista
  function observe() {
    if (!('IntersectionObserver' in window)) { start(); return; }
    new IntersectionObserver(function (es) {
      es[0].isIntersecting ? start() : stop();
    }, { rootMargin: '120px' }).observe(canvas);
  }

  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 180);
  });
  document.addEventListener('visibilitychange', function () {
    document.hidden ? stop() : start();
  });

  return { start: start, stop: stop, resize: resize };
}

/* ---- header: puntos claros sobre negro ---- */
(function () {
  const c = document.getElementById('dust');
  if (!c) return;
  createDotField(c, {
    src: 'headerA.png',
    paper: 10,
    zoomCap: 1.35
    // El encuadre se deja como estaba: header3.png trae las figuras al mismo
    // tamaño y en el mismo sitio, lo que cambia es lo que va encima.
  });
})();

/* ---- sección "qué hace": la mano, puntos oscuros sobre papel ----
   La fuente (manosola.png) ya viene limpia: sin texto, sin guías y sin banda. */
(function () {
  const c = document.getElementById('mano');
  if (!c) return;
  createDotField(c, {
    src: 'mano-src.jpg',
    dark: true,
    // el papel de la referencia mide 241 de promedio y casi no tiene grano.
    // El umbral deja el fondo limpio y reserva los puntos para la mano.
    paper: 243,
    cut: 0.05,
    wFloor: 0,
    inkFloor: 20,
    inkRange: 235,
    gamma: 0.75,
    wGamma: 1.75,
    maxScale: 1,
    // En mano3 la mano se apoya en el rectángulo del centro y ocupa poco más
    // de un tercio del ancho; en móvil llena la pantalla.
    zoomCap: () => (window.innerWidth <= 900 ? 3.4 : 1.35),
    zoom: () => (window.innerWidth <= 900 ? 0.74 : 0.58),
    panX: () => (window.innerWidth <= 900 ? -0.02 : -0.026),
    panY: () => (window.innerWidth <= 900 ? -0.16 : -0.062),
    pxPerDot: 6,
    maxDots: 320000,
    drift: 0.9,
    scatter: 3.6
  });
})();

/* ---- sección "qué hace" ----
   La mano se queda quieta y los textos la cruzan: el titular de derecha a
   izquierda y la cinta de fases de izquierda a derecha, las dos atadas al
   recorrido de la sección.

   La mano lleva un campo elíptico que repele las letras: cada una se aparta
   en la dirección que la aleja del centro, se encoge y se gira un poco, tanto
   más cuanto más cerca esté. Ninguna llega a tocarla. */
(function () {
  const sec = document.getElementById('quehace');
  const marco = sec && sec.querySelector('.quehace__marco');
  const titular = document.getElementById('quehaceTitular');
  const fases = document.getElementById('quehaceFases');
  const progreso = document.getElementById('quehaceProgreso');
  const hitos = Array.from(document.querySelectorAll('.hito'));
  if (!sec || !marco || !titular || !fases) return;

  const reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // El campo se saca de la propia mano, leyendo el lienzo. Ponerlo a mano no
  // sirve: la mano cae donde la deje el encuadre —que cambia entre escritorio
  // y móvil— y un campo fijo se desalinea sin que nada avise.
  //
  // Y no es una elipse. Una mano abierta no cabe en una: los dedos se salen,
  // y una elipse que los cubra aparta el texto muchísimo más de lo necesario
  // a la altura de la palma. Se calcula un campo de distancia sobre una
  // rejilla: cada celda guarda a qué distancia está de la mano, con signo
  // (negativo dentro). El gradiente de ese campo apunta siempre hacia afuera,
  // así que empujar por él aparta cada letra por el camino más corto y el
  // texto acaba abrazando la silueta.
  const REJILLA = 120;     // columnas de la rejilla; las filas salen del alto
  const ALCANCE = 0.068;   // radio de influencia, en fracción del ancho
  const EMPUJE = 1.0;      // 1 deja la letra justo en el borde del alcance
  const ENCOGE = 0.3;      // cuánto se encoge la letra pegada a la mano
  const GIRO = 20;         // grados de giro máximo

  let campo = null;        // { gw, gh, s } con s = distancia con signo, en celdas

  // Transformada de distancia por dos pasadas (chamfer 3-4).
  function distancia(mascara, gw, gh, dentro) {
    const INF = 1e9;
    const D = new Float32Array(gw * gh);
    for (let i = 0; i < D.length; i++) D[i] = (mascara[i] === dentro) ? 0 : INF;
    const paso = (x, y, dx, dy, coste) => {
      const nx = x + dx, ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= gw || ny >= gh) return INF;
      return D[ny * gw + nx] + coste;
    };
    for (let y = 0; y < gh; y++) for (let x = 0; x < gw; x++) {
      const i = y * gw + x;
      if (D[i] === 0) continue;
      D[i] = Math.min(D[i], paso(x,y,-1,0,3), paso(x,y,0,-1,3), paso(x,y,-1,-1,4), paso(x,y,1,-1,4));
    }
    for (let y = gh - 1; y >= 0; y--) for (let x = gw - 1; x >= 0; x--) {
      const i = y * gw + x;
      if (D[i] === 0) continue;
      D[i] = Math.min(D[i], paso(x,y,1,0,3), paso(x,y,0,1,3), paso(x,y,1,1,4), paso(x,y,-1,1,4));
    }
    for (let i = 0; i < D.length; i++) D[i] /= 3;   // de coste chamfer a celdas
    return D;
  }

  function medirCampo() {
    const c = document.getElementById('mano');
    if (!c || !c.width || !c.height) return false;
    let im;
    try { im = c.getContext('2d').getImageData(0, 0, c.width, c.height).data; }
    catch (e) { return false; }
    const W = c.width, H = c.height;
    const gw = REJILLA, gh = Math.max(8, Math.round(REJILLA * H / W));
    let mascara = new Uint8Array(gw * gh);
    let tinta = 0;
    for (let gy = 0; gy < gh; gy++) {
      const y = Math.min(H - 1, Math.round((gy + 0.5) * H / gh));
      for (let gx = 0; gx < gw; gx++) {
        const x = Math.min(W - 1, Math.round((gx + 0.5) * W / gw));
        // se promedia un bloque: un punto suelto del grano no es mano
        let suma = 0, n = 0;
        for (let k = -2; k <= 2; k++) {
          const yy = Math.min(H - 1, Math.max(0, y + k * 2));
          for (let j = -2; j <= 2; j++) {
            const xx = Math.min(W - 1, Math.max(0, x + j * 2));
            suma += im[(yy * W + xx) * 4]; n++;
          }
        }
        // 195 sobre un papel de 243: entra tambien el degradado de las yemas,
        // donde la mano se deshilacha pero sigue siendo mano
        if (suma / n < 195) { mascara[gy * gw + gx] = 1; tinta++; }
      }
    }
    if (tinta < 20) return false;      // aún no ha pintado

    // Se engorda la máscara una celda. Sin esto una letra puede caer en el
    // borde de una celda tenida por papel y quedar encima de la mano: la
    // rejilla mide 12 px por celda y una letra cabe de sobra ahí dentro.
    const gorda = mascara.slice();
    for (let gy = 0; gy < gh; gy++) for (let gx = 0; gx < gw; gx++) {
      if (mascara[gy * gw + gx]) continue;
      if ((gx > 0 && mascara[gy * gw + gx - 1]) ||
          (gx < gw - 1 && mascara[gy * gw + gx + 1]) ||
          (gy > 0 && mascara[(gy - 1) * gw + gx]) ||
          (gy < gh - 1 && mascara[(gy + 1) * gw + gx])) gorda[gy * gw + gx] = 1;
    }
    mascara = gorda;

    const fuera = distancia(mascara, gw, gh, 1);   // distancia a la mano
    const dentro = distancia(mascara, gw, gh, 0);  // distancia al papel
    const s = new Float32Array(gw * gh);
    for (let i = 0; i < s.length; i++) s[i] = mascara[i] ? -dentro[i] : fuera[i];
    campo = { gw, gh, s };
    return true;
  }

  /* ---- partir en letras ----
     Cada palabra va en su propio inline-block para que el salto de línea siga
     cayendo entre palabras, y dentro cada letra en el suyo para poder
     empujarla por separado. */
  function partir(nodo, texto) {
    nodo.textContent = '';
    const frag = document.createDocumentFragment();
    texto.split(/(\s+)/).forEach(function (trozo) {
      if (!trozo) return;
      if (/^\s+$/.test(trozo)) { frag.appendChild(document.createTextNode(trozo)); return; }
      const pal = document.createElement('span');
      pal.className = 'pal';
      for (const ch of trozo) {
        const l = document.createElement('span');
        l.className = 'let';
        l.textContent = ch;
        pal.appendChild(l);
      }
      frag.appendChild(pal);
    });
    nodo.appendChild(frag);
  }

  // letras con su posición en reposo, medida una vez por maquetación
  let letras = [];          // { el, cinta, x, y }
  let anchoTitular = 0, anchoFases = 0, vw = 0, vh = 0;
  let marcoCaja = { left: 0, top: 0, width: 0, height: 0 };
  // Desplazamientos de cada pista y centros de cada fase. Se guardan aquí y no
  // se leen al pintar: leer offsetTop después de escribir transformaciones
  // obliga al navegador a recalcular la maquetación de las mil y pico letras,
  // y el cuadro pasa de milisegundos a casi un segundo.
  let desT = 0, desF = 0, centrosFase = [];

  function escribir() {
    const t = T().mano;
    partir(titular, t.titular);
    const sr = document.getElementById('quehaceTitularSR');
    if (sr) sr.textContent = t.titular;
    Array.from(fases.querySelectorAll('.quehace__fase')).forEach(function (p, i) {
      const par = t.fases[i];
      if (par) partir(p, par[0] + ' ' + par[1]);
    });
    hitos.forEach((h, i) => { if (t.pildoras[i]) h.textContent = t.pildoras[i]; });
  }

  function medirLetras() {
    const rm = marco.getBoundingClientRect();
    marcoCaja = { left: rm.left, top: rm.top, width: rm.width, height: rm.height };
    vw = rm.width; vh = rm.height;
    anchoTitular = titular.scrollWidth;
    anchoFases = fases.scrollWidth;

    desT = titular.offsetTop + titular.parentElement.offsetTop;
    desF = fases.offsetTop + fases.parentElement.offsetTop;
    centrosFase = Array.from(fases.querySelectorAll('.quehace__fase'))
      .map((c) => c.offsetLeft + c.offsetWidth / 2);

    letras = [];
    [[titular, 'titular'], [fases, 'fases']].forEach(function ([raiz, cinta]) {
      const base = raiz.getBoundingClientRect();
      raiz.querySelectorAll('.let').forEach(function (el) {
        const r = el.getBoundingClientRect();
        letras.push({ el, cinta,
          // posición en reposo, relativa al origen sin trasladar de su cinta
          x: r.left - base.left + r.width / 2,
          y: r.top - base.top + r.height / 2,
          puesta: false });
      });
    });
  }

  /* ---- recorrido ---- */
  function avance() {
    const r = sec.getBoundingClientRect();
    const alto = window.innerHeight || document.documentElement.clientHeight;
    const recorrido = Math.max(1, sec.offsetHeight - alto);
    return Math.max(0, Math.min(1, -r.top / recorrido));
  }

  // El titular entra por la derecha y sale por la izquierda; la cinta de
  // fases hace lo contrario.
  const txTitular = (q) => vw - q * (vw + anchoTitular);
  const txFases = (q) => -anchoFases + q * (anchoFases + vw);

  function pintar(q) {
    const tT = txTitular(q), tF = txFases(q);
    titular.style.transform = 'translate3d(' + tT.toFixed(1) + 'px,0,0)';
    fases.style.transform = 'translate3d(' + tF.toFixed(1) + 'px,0,0)';

    if (!campo) { if (progreso) progreso.textContent = Math.round(q * 100) + '%'; return; }
    const { gw, gh, s: campoS } = campo;
    const alcance = ALCANCE * vw;              // en px
    const celda = vw / gw;                     // px por celda
    const alcanceC = alcance / celda;          // en celdas

    const leer = (gx, gy) => campoS[Math.min(gh - 1, Math.max(0, gy)) * gw +
                                    Math.min(gw - 1, Math.max(0, gx))];

    for (let i = 0; i < letras.length; i++) {
      const L = letras[i];
      const esT = L.cinta === 'titular';
      const x = L.x + (esT ? tT : tF);
      const y = L.y + (esT ? desT : desF);

      const gx0 = Math.round(x / vw * gw), gy0 = Math.round(y / vh * gh);
      if (gx0 < -2 || gy0 < -2 || gx0 > gw + 2 || gy0 > gh + 2) {
        if (L.puesta) { L.el.style.transform = ''; L.puesta = false; }
        continue;
      }
      const d0 = leer(gx0, gy0);
      if (d0 >= alcanceC) {
        if (L.puesta) { L.el.style.transform = ''; L.puesta = false; }
        continue;
      }

      // Se avanza por el gradiente a pasitos en vez de dar un salto recto.
      // Una letra bajo la palma tiene su salida más corta hacia arriba, pero
      // en línea recta vuelve a caer sobre los dedos: siguiendo el campo paso
      // a paso, rodea la silueta y sale por el hueco.
      let sx = x, sy = y, pasos = 0;
      while (pasos < 26) {
        const cgx = Math.round(sx / vw * gw), cgy = Math.round(sy / vh * gh);
        if (leer(cgx, cgy) >= alcanceC) break;
        let ux = leer(cgx + 1, cgy) - leer(cgx - 1, cgy);
        let uy = leer(cgx, cgy + 1) - leer(cgx, cgy - 1);
        const mod = Math.hypot(ux, uy);
        if (mod < 0.0001) { uy = -1; ux = 0; } else { ux /= mod; uy /= mod; }
        sx += ux * celda; sy += uy * celda;
        pasos++;
      }

      const desX = sx - x, desY = sy - y;
      // la deformación va con lo hondo que estuviera, no con lo que viajó
      const f = Math.min(1, (alcanceC - d0) / alcanceC);
      const g = f * f;
      const esc = 1 - g * ENCOGE;
      const gir = (desX >= 0 ? 1 : -1) * g * GIRO;
      L.el.style.transform =
        'translate3d(' + desX.toFixed(1) + 'px,' + desY.toFixed(1) + 'px,0) rotate(' +
        gir.toFixed(1) + 'deg) scale(' + esc.toFixed(3) + ')';
      L.puesta = true;
    }

    if (progreso) progreso.textContent = Math.round(q * 100) + '%';

    // la fase activa es la que tiene su centro más cerca del centro del marco
    let cerca = 0, mejor = Infinity;
    for (let i = 0; i < centrosFase.length; i++) {
      const dist = Math.abs(centrosFase[i] + tF - vw / 2);
      if (dist < mejor) { mejor = dist; cerca = i; }
    }
    hitos.forEach((h, i) => h.classList.toggle('is-activo', i === cerca));
  }

  /* ---- ir a una fase al pulsar su píldora ---- */
  hitos.forEach(function (h, i) {
    h.addEventListener('click', function () {
      const centro = centrosFase[i];
      if (centro === undefined) return;
      // q tal que el centro de la fase caiga en el centro del marco
      const q = (vw / 2 - centro + anchoFases) / (anchoFases + vw);
      const alto = window.innerHeight || document.documentElement.clientHeight;
      const recorrido = sec.offsetHeight - alto;
      const arriba = sec.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: Math.round(arriba + Math.max(0, Math.min(1, q)) * recorrido),
        behavior: 'smooth' });
    });
  });

  /* ---- bucle ---- */
  // El cerrojo caduca. Si el navegador descarta el cuadro donde se libera
  // —pestaña de fondo, o un tirón de scroll— quedaría cerrado para siempre y
  // la sección dejaría de responder sin dar ningún error. Le pasó al gato y
  // está anotado en el spec; aquí también hace falta.
  let pedido = false, cuando = 0;
  function alScroll() {
    const ahora = performance.now();
    if (pedido && ahora - cuando < 300) return;
    pedido = true; cuando = ahora;
    requestAnimationFrame(function () { pedido = false; pintar(avance()); });
  }

  function rehacer() {
    medirLetras();
    medirCampo();
    pintar(avance());
  }

  // La mano tarda en pintarse: se reintenta hasta que el lienzo tenga tinta.
  (function esperarMano(intentos) {
    if (medirCampo()) { pintar(avance()); return; }
    if (intentos > 0) setTimeout(() => esperarMano(intentos - 1), 250);
  })(40);

  escribir();
  // las medidas necesitan la tipografía ya cargada, o las letras salen
  // colocadas contra una fuente que no es la definitiva
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(rehacer);
  else rehacer();
  rehacer();

  document.addEventListener('augurio:idioma', function () { escribir(); rehacer(); });
  window.addEventListener('scroll', alScroll, { passive: true });
  let temp = 0;
  window.addEventListener('resize', function () {
    clearTimeout(temp); temp = setTimeout(rehacer, 160);
  });

  if (reducido) {
    // sin movimiento: se deja la cinta a media altura del recorrido
    pintar(0.5);
    window.removeEventListener('scroll', alScroll);
  }
})();

/* ---- sección del gato ----
   El canvas y el marco usan el mismo encuadre "contain", así los números
   caen siempre sobre el mismo punto del gato. */
const MOVIL_ZOOM = 1.8;    // ver .gato__marco: width 180%
const MOVIL_PAN = 0.159;   // ver .gato__marco: translateX(8.85%)
(function () {
  const c = document.getElementById('gatoCanvas');
  if (!c) return;
  createDotField(c, {
    src: 'gato-src.jpg',
    paper: 10,
    fit: 'contain',
    // En móvil el 'contain' deja al gato en una franja de 258 px de alto: los
    // trazos que unen los números quedan de 40 px y no se leen. La maqueta lo
    // trae 1,8 veces más grande y corrido a la derecha. El mismo par de
    // números está en .gato__marco, que es quien lleva números y trazos.
    zoom: () => (window.innerWidth <= 900 ? MOVIL_ZOOM : 1),
    panX: () => (window.innerWidth <= 900 ? MOVIL_PAN : 0),
    // el gato es una figura fina: con poca densidad las zonas brillantes no
    // llegan a leerse como trazo lleno. Ampliado 1,8 veces cubre el triple de
    // área, así que en móvil hay que sembrar más para que no se adelgace.
    pxPerDot: () => (window.innerWidth <= 900 ? 5 : 9),
    maxDots: 220000,
    wGamma: 1.6,
    prepare: limpiarGato
  });
})();

/* Hay que sacarle a la referencia los seis números y la tarjeta blanca.
   Todos caen sobre fondo negro, sin tocar al gato, así que alcanza con
   rellenarlos con el promedio del anillo que los rodea.
   Medidas en el espacio original de 2560x1696. */
function limpiarGato(cx, w, h) {
  const k = w / 2560;
  const im = cx.getImageData(0, 0, w, h), d = im.data;
  const at = (x, y) => ((y * w + x) << 2);
  const lum = (x, y) => { const i = at(x, y); return d[i] * .299 + d[i + 1] * .587 + d[i + 2] * .114; };
  const S = (v) => Math.round(v * k);

  function rect(x0, y0, x1, y1) {
    x0 = S(x0); y0 = S(y0); x1 = S(x1); y1 = S(y1);
    let s = 0, n = 0;
    for (let x = x0 - 4; x < x1 + 4; x++)
      for (const y of [y0 - 4, y0 - 3, y1 + 3, y1 + 4]) {
        if (x < 0 || x >= w || y < 0 || y >= h) continue;
        s += lum(x, y); n++;
      }
    const base = n ? s / n : 10;
    for (let y = y0; y < y1; y++)
      for (let x = x0; x < x1; x++) {
        if (x < 0 || x >= w || y < 0 || y >= h) continue;
        const i = at(x, y), v = Math.max(0, base + (Math.random() - .5) * 8);
        d[i] = d[i + 1] = d[i + 2] = v;
      }
  }

  rect(1005, 300, 1085, 368);    // 1.
  rect(938, 692, 1016, 762);     // 2.
  rect(1480, 485, 1558, 555);    // 3.
  rect(582, 826, 660, 898);      // 4.
  rect(1237, 1073, 1316, 1144);  // 5.
  rect(751, 1358, 829, 1428);    // 6.
  // la tarjeta sangra hasta el filo derecho de la referencia (x=2559): si el
  // borrado se queda corto, la franja que sobra reaparece como cúmulo de puntos
  rect(1594, 735, 2560, 1055);   // tarjeta blanca

  cx.putImageData(im, 0, 0);
}

/* Los números entran cuando la escena queda fija a pantalla completa.
   Después, con el scroll, cada frase reemplaza a la anterior y se traza el
   segmento que une su número con el anterior. Reversible. */
(function () {
  const sec = document.getElementById('gato');
  const tarjeta = document.getElementById('gatoTarjeta');
  const pila = document.getElementById('gatoPila');
  if (!sec || !tarjeta || !pila) return;

  const nums = Array.from(sec.querySelectorAll('.gato__num'));
  const frases = Array.from(sec.querySelectorAll('.gato__frase'));
  const rotulo = sec.querySelector('.gato__rotulo');
  // el rótulo girado cambia con cada frase, igual que la clave del párrafo
  const ROTULOS = () => T().gato.rotulos;
  const segs = Array.from(sec.querySelectorAll('.gato__traza path'));
  const malla = document.getElementById('gatoMalla');
  const aristas = malla ? Array.from(malla.querySelectorAll('path')) : [];

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    nums.forEach((n) => n.classList.add('is-in', 'is-dicho'));
    tarjeta.classList.add('is-in');
    frases.forEach((f) => f.classList.add('is-in'));
    segs.forEach((p) => p.style.strokeDashoffset = 0);
    aristas.forEach((p) => p.style.strokeDashoffset = 0);
    return;
  }

  segs.concat(aristas).forEach(function (p) {
    const len = p.getTotalLength();
    p.dataset.len = len;
    p.style.strokeDasharray = len;
    p.style.strokeDashoffset = len;
  });

  // Los umbrales dejan un tramo libre al final: una vez cerrada la malla,
  // la escena sigue anclada un rato para poder mirarla.
  const FRASE_EN = [0.08, 0.21, 0.33, 0.45, 0.57, 0.70];
  let numeros = false, activa = -2;

  // la tarjeta se ciñe a la frase que está: hay que medirla, porque están
  // superpuestas y ninguna aporta alto al flujo
  function ajustarAlto() {
    if (activa < 0) return;
    pila.style.height = frases[activa].getBoundingClientRect().height + 'px';
  }

  function medir() {
    ticking = false;
    const r = sec.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const recorrido = Math.max(1, sec.offsetHeight - vh);
    const q = Math.max(0, Math.min(1, -r.top / recorrido));

    const verNums = r.top <= 4;
    if (verNums !== numeros) {
      numeros = verNums;
      nums.forEach((n) => n.classList.toggle('is-in', verNums));
    }

    let act = -1;
    for (let i = 0; i < FRASE_EN.length; i++) if (q >= FRASE_EN[i]) act = i;

    if (act !== activa) {
      activa = act;
      frases.forEach((f, i) => f.classList.toggle('is-in', i === act));
      if (rotulo) rotulo.textContent = ROTULOS()[Math.max(0, act)];
      // los números ya recorridos quedan encendidos: el trazo que los une
      // se mantiene, sería incoherente que ellos se apagaran
      nums.forEach((n, i) => n.classList.toggle('is-dicho', i <= act));
      tarjeta.classList.toggle('is-in', act >= 0);
      // el segmento j une el número j+1 con el j+2: se traza con esa frase
      segs.forEach((p, j) => p.style.strokeDashoffset = act >= j + 1 ? 0 : p.dataset.len);
      // cerrada la cadena en la última frase, se abre la malla completa
      const todos = act >= FRASE_EN.length - 1;
      if (malla) malla.classList.toggle('is-in', todos);
      aristas.forEach((p) => p.style.strokeDashoffset = todos ? 0 : p.dataset.len);
      ajustarAlto();
    }
  }

  // El cerrojo se libera dentro del cuadro. Si el navegador descarta ese
  // cuadro —pestaña en segundo plano, por ejemplo— quedaría cerrado para
  // siempre y la sección no volvería a responder al scroll: por eso caduca.
  let ticking = false, pedido = 0;
  function onScroll() {
    const ahora = performance.now();
    if (ticking && ahora - pedido < 300) return;
    ticking = true; pedido = ahora;
    requestAnimationFrame(medir);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function () { onScroll(); ajustarAlto(); });
  // medir() sólo actúa cuando cambia la frase activa; al cambiar de idioma no
  // cambia, así que se invalida para que repinte rótulo y tarjeta.
  document.addEventListener('augurio:idioma', function () {
    activa = -2; medir(); ajustarAlto();
  });
  medir();
})();

/* ---- sección "problemas" ---- */
(function () {
  const PARTES = () => T().probs.partes;

  const sec = document.getElementById('probs');
  const poli = document.getElementById('probsPoli');
  const arriba = document.getElementById('probsArriba');
  const abajo = document.getElementById('probsAbajo');
  const sr = document.getElementById('probsSR');
  const puntos = Array.from(document.querySelectorAll('.probs__punto'));
  if (!sec || !poli || !arriba || !abajo) return;

  // pentágono medido de la referencia, en unidades del viewBox
  const BASE = [[1109, 683], [1477, 678], [1528, 764], [1220, 898], [1134, 835]];
  // Cuánto puede moverse cada vértice: [dxMin, dxMax, dyMin, dyMax].
  // Los lados que bordean el texto sólo pueden abrirse hacia afuera; si se
  // permite que entren, hay formas que le cortan una línea a la frase.
  const RANGO = [
    [-42,  0, -26,   6],   // arriba-izq: sólo hacia afuera
    [  0, 56, -34,   8],   // arriba-der
    [  0, 62, -18,  42],   // punta derecha
    [-12, 62,   0,  48],   // punta inferior: sólo hacia abajo
    [-42,  0,  -8,  30]    // codo izquierdo
  ];

  // ruido determinista: la misma frase da siempre la misma forma
  function rnd(i, v, c) {
    const x = Math.sin(i * 127.1 + v * 311.7 + c * 74.7) * 43758.5453;
    return x - Math.floor(x);
  }
  function forma(i) {
    if (i === 0) return BASE.map((p) => p.slice());
    return BASE.map(function (p, v) {
      const r = RANGO[v];
      return [p[0] + r[0] + rnd(i, v, 0) * (r[1] - r[0]),
              p[1] + r[2] + rnd(i, v, 1) * (r[3] - r[2])];
    });
  }

  const DURACION = 900;    // lo que tarda en cambiar de forma
  const ESPERA = 6200;     // lo que dura cada frase en pantalla
  const suave = (t) => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  let actual = forma(0), destino = actual, t0 = 0, raf = 0, timer = 0, i = 0, corriendo = false;

  const pintar = (pts) => poli.setAttribute('points', pts.map((p) => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' '));

  function morph(now) {
    const k = Math.min(1, (now - t0) / DURACION), e = suave(k);
    pintar(actual.map((p, v) => [p[0] + (destino[v][0] - p[0]) * e, p[1] + (destino[v][1] - p[1]) * e]));
    if (k < 1) { raf = requestAnimationFrame(morph); return; }
    actual = destino; raf = 0;
  }

  function poner(n) {
    const lista = PARTES();
    i = ((n % lista.length) + lista.length) % lista.length;
    arriba.textContent = lista[i][0];
    abajo.textContent = lista[i][1];
    if (sr) sr.textContent = lista[i][0] + ' ' + lista[i][1];
    puntos.forEach(function (b, n) {
      b.classList.toggle('is-activo', n === i);
      b.setAttribute('aria-current', n === i ? 'true' : 'false');
    });
    destino = forma(i);
    if (raf) cancelAnimationFrame(raf);
    t0 = performance.now();
    raf = requestAnimationFrame(morph);
  }

  function siguiente() {
    sec.classList.add('is-cambiando');           // se desvanece el texto viejo
    setTimeout(function () {
      poner(i + 1);                              // cambia con el texto invisible
      sec.classList.remove('is-cambiando');
    }, 360);
  }

  function arrancar() {
    if (corriendo) return;
    corriendo = true;
    timer = setInterval(siguiente, ESPERA);
  }
  function parar() {
    corriendo = false;
    clearInterval(timer);
    if (raf) { cancelAnimationFrame(raf); raf = 0; }
  }

  poner(0);

  // el menú es navegable: al elegir una frase el reloj vuelve a empezar,
  // para no cortarla a mitad de lectura
  puntos.forEach(function (b, n) {
    b.addEventListener('click', function () {
      sec.classList.add('is-cambiando');
      setTimeout(function () {
        poner(n);
        sec.classList.remove('is-cambiando');
      }, 360);
      if (corriendo) { clearInterval(timer); timer = setInterval(siguiente, ESPERA); }
    });
  });

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // corre sola, pero sólo mientras la sección está a la vista
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) {
      es[0].isIntersecting ? arrancar() : parar();
    }, { rootMargin: '80px' }).observe(sec);
  } else {
    arrancar();
  }
  document.addEventListener('visibilitychange', () => document.hidden && parar());
  document.addEventListener('augurio:idioma', () => poner(i));
})();

/* ---- la cabeza: puntos claros sobre negro, dentro de su rectángulo ---- */
(function () {
  const c = document.getElementById('probsCanvas');
  if (!c) return;
  createDotField(c, {
    src: 'problemas-src.jpg',
    // mismos valores que la sección del gato: el negro de fondo tiene que ser
    // el mismo grano, no negro plano
    paper: 10,
    // En escritorio la cabeza cabe entera. En móvil el marco es vertical y
    // 'contain' la dejaría en una franja delgada: allí encuadra recortando.
    fit: () => (window.innerWidth <= 900 ? 'cover' : 'contain'),
    zoomCap: 2.6,
    // El recorte centrado deja la cabeza a la izquierda; la maqueta la trae
    // corrida a la derecha y algo más arriba. El zoom sobra sólo para tener
    // margen vertical que panear: con 'cover' puro el alto encaja justo.
    zoom: () => (window.innerWidth <= 900 ? 1.15 : 1),
    panX: () => (window.innerWidth <= 900 ? 0.138 : 0),
    panY: () => (window.innerWidth <= 900 ? -0.06 : 0),
    wGamma: 1.6,
    pxPerDot: 9,
    maxDots: 240000,
    prepare: limpiarProblemas
  });
})();

/* Limpieza de la referencia de "problemas": hay que quitarle el título, el
   polígono blanco y la barra inferior para quedarse sólo con la cabeza.
   Medidas en el espacio original de 2560x1452. */
function limpiarProblemas(cx, w, h) {
  const k = w / 2560;
  const im = cx.getImageData(0, 0, w, h), d = im.data;
  const at = (x, y) => ((y * w + x) << 2);
  const lum = (x, y) => { const i = at(x, y); return d[i] * .299 + d[i + 1] * .587 + d[i + 2] * .114; };
  const put = (x, y, v) => {
    if (x < 0 || x >= w || y < 0 || y >= h) return;
    const i = at(x, y), c = Math.max(0, Math.min(255, v));
    d[i] = d[i + 1] = d[i + 2] = c;
  };
  const S = (v) => Math.round(v * k);

  // el título está sobre negro puro: basta con apagarlo
  for (let y = S(216); y < S(274); y++)
    for (let x = S(678); x < S(1104); x++) put(x, y, Math.random() * 2);

  // El polígono tapa parte de la cabeza. Se rellena por barrido: en cada fila
  // se interpola entre el píxel sano de la izquierda y el de la derecha.
  const POLI = [[1021, 645], [1430, 640], [1487, 725], [1145, 858], [1049, 795]].map(p => [S(p[0]), S(p[1])]);
  const yTop = Math.min(...POLI.map(p => p[1])) - 2;
  const yBot = Math.max(...POLI.map(p => p[1])) + 2;
  for (let y = yTop; y <= yBot; y++) {
    const xs = [];
    for (let i = 0; i < POLI.length; i++) {
      const a = POLI[i], b = POLI[(i + 1) % POLI.length];
      if ((a[1] <= y && b[1] > y) || (b[1] <= y && a[1] > y))
        xs.push(a[0] + (y - a[1]) / (b[1] - a[1]) * (b[0] - a[0]));
    }
    if (xs.length < 2) continue;
    const x0 = Math.floor(Math.min(...xs)) - 3, x1 = Math.ceil(Math.max(...xs)) + 3;
    const va = lum(Math.max(0, x0 - 6), y), vb = lum(Math.min(w - 1, x1 + 6), y);
    for (let x = x0; x <= x1; x++) {
      const t = (x - x0) / Math.max(1, x1 - x0);
      put(x, y, va + (vb - va) * t + (Math.random() - .5) * 9);
    }
  }

  // la barra inferior: interpolación vertical, así la columna brillante que
  // la cruza no se corta
  const bT = S(1143), bB = S(1197), bx0 = S(680), bx1 = S(1752);
  for (let x = bx0; x < bx1; x++) {
    const a = (lum(x, bT - 3) + lum(x, bT - 5)) / 2;
    const b = (lum(x, Math.min(h - 1, bB + 3)) + lum(x, Math.min(h - 1, bB + 5))) / 2;
    for (let y = bT; y <= bB; y++)
      put(x, y, a + (b - a) * (y - bT) / (bB - bT) + (Math.random() - .5) * 9);
  }

  cx.putImageData(im, 0, 0);
}

/* ---- difuminado entre secciones ----
   Una franja donde las dos texturas de puntos se entremezclan: la del fondo
   que sale se va raleando mientras entra la del que llega, sobre una rampa
   entre los dos papeles. Evita el corte seco de negro a claro. */
function createDifuminado(canvas, opts) {
  const o = Object.assign({
    papelA: 10, tintaA: 120, densA: 0.10,   // el fondo de arriba
    papelB: 243, tintaB: 205, densB: 0.03,  // el de abajo
    extra: 0.30,      // cuánta densidad de más en el centro de la franja
    maxScale: 1.25
  }, opts || {});

  const ctx = canvas.getContext('2d', { alpha: false });
  const reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const LUT = 1024, MASK = LUT - 1;
  const SIN = new Float32Array(LUT);
  for (let i = 0; i < LUT; i++) SIN[i] = Math.sin((i / LUT) * Math.PI * 2);

  let W = 0, H = 0, count = 0, raf = 0, corriendo = false, timer = 0;
  let px, py, pv, ph, sp, amp, fondo32, buf32, imageData, lastIdx, lastN = 0;

  const suave = (t) => t * t * (3 - 2 * t);
  const mezcla = (a, b, t) => a + (b - a) * t;

  function sembrar() {
    // fondo: rampa entre los dos papeles
    imageData = ctx.createImageData(W, H);
    buf32 = new Uint32Array(imageData.data.buffer);
    fondo32 = new Uint32Array(W * H);
    for (let y = 0; y < H; y++) {
      const v = Math.round(mezcla(o.papelA, o.papelB, suave(y / (H - 1)))) & 255;
      const c = (0xff000000 | (v << 16) | (v << 8) | v) >>> 0;
      for (let x = 0; x < W; x++) fondo32[y * W + x] = c;
    }

    // puntos: los de cada lado se ralean o entran según la altura
    const est = [];
    for (let y = 0; y < H; y++) {
      const p = y / (H - 1), e = suave(p);
      const d = mezcla(o.densA, o.densB, e) + o.extra * Math.sin(Math.PI * p);
      est.push({ d: d, e: e });
    }
    let total = 0;
    for (let y = 0; y < H; y++) total += est[y].d * W;
    const cap = Math.ceil(total * 1.25);

    px = new Int32Array(cap); py = new Int32Array(cap);
    pv = new Uint8Array(cap); ph = new Uint16Array(cap);
    sp = new Float32Array(cap); amp = new Float32Array(cap);

    let c = 0;
    for (let y = 0; y < H && c < cap; y++) {
      const { d, e } = est[y];
      for (let x = 0; x < W && c < cap; x++) {
        if (Math.random() >= d) continue;
        // el punto pertenece al lado que todavía manda a esa altura
        const deA = Math.random() > e;
        const tinta = deA ? o.tintaA : o.tintaB;
        const base = mezcla(o.papelA, o.papelB, e);
        px[c] = x; py[c] = y;
        pv[c] = Math.max(0, Math.min(255, Math.round(mezcla(base, tinta, 0.65 + Math.random() * 0.35))));
        ph[c] = Math.random() * LUT | 0;
        sp[c] = (0.5 + Math.random() * 2) * 2.2;   // misma efervescencia que el resto
        amp[c] = (0.1 + Math.random() * 0.22) * 2.2;
        c++;
      }
    }
    count = c;
    lastIdx = new Int32Array(count);
    lastN = 0;
    buf32.set(fondo32);
  }

  function pintar(t) {
    for (let i = 0; i < lastN; i++) buf32[lastIdx[i]] = fondo32[lastIdx[i]];
    let ln = 0;
    for (let i = 0; i < count; i++) {
      const f = t === null ? 0 : SIN[(ph[i] + (t * sp[i] * LUT * 0.16 | 0)) & MASK];
      const idx = py[i] * W + px[i];
      const base = fondo32[idx] & 0xff;
      let v = base + (pv[i] - base) * (1 + amp[i] * f);
      if (v < 0) v = 0; else if (v > 255) v = 255;
      const g = v | 0;
      buf32[idx] = (0xff000000 | (g << 16) | (g << 8) | g) >>> 0;
      lastIdx[ln++] = idx;
    }
    lastN = ln;
    ctx.putImageData(imageData, 0, 0);
  }

  function cuadro(now) { pintar(now * 0.001); raf = requestAnimationFrame(cuadro); }
  function start() { if (corriendo || reducido || !buf32) return; corriendo = true; raf = requestAnimationFrame(cuadro); }
  function stop() { corriendo = false; if (raf) cancelAnimationFrame(raf); raf = 0; }

  function medir() {
    const r = canvas.getBoundingClientRect();
    if (!r.width || !r.height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, o.maxScale);
    const w = Math.max(1, Math.round(r.width * dpr));
    const h = Math.max(1, Math.round(r.height * dpr));
    if (w === W && h === H) return;
    W = w; H = h; canvas.width = W; canvas.height = H;
    sembrar();
    pintar(reducido ? null : 0);
  }

  medir();
  window.addEventListener('resize', function () { clearTimeout(timer); timer = setTimeout(medir, 180); });
  document.addEventListener('visibilitychange', function () { document.hidden ? stop() : start(); });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { es[0].isIntersecting ? start() : stop(); },
      { rootMargin: '100px' }).observe(canvas);
  } else start();

  return { start: start, stop: stop };
}

(function () {
  document.querySelectorAll('.difuminado canvas').forEach(function (c) {
    const d = c.parentNode.dataset;
    createDifuminado(c, {
      papelA: +d.papelA, tintaA: +d.tintaA, densA: +d.densA,
      papelB: +d.papelB, tintaB: +d.tintaB, densB: +d.densB
    });
  });
})();

/* ---- interruptor de idioma ----
   El texto que vive en el HTML se reescribe aquí; el que vive en arrays lo
   leen los módulos del diccionario en cada repintado. Al terminar se emite
   'augurio:idioma' para que cada módulo vuelva a pintar lo suyo. */
(function () {
  const boton = document.getElementById('idioma');
  if (!boton) return;

  const poner = (sel, txt) => { const e = document.querySelector(sel); if (e) e.textContent = txt; };

  // <b class="clave">Clave_</b>resto del párrafo
  function ponerConClave(nodos, pares, claseClave) {
    nodos.forEach(function (n, i) {
      if (!pares[i]) return;
      n.innerHTML = '';
      const b = document.createElement('b');
      b.className = claseClave;
      b.textContent = pares[i][0];
      n.appendChild(b);
      n.appendChild(document.createTextNode(pares[i][1]));
    });
  }

  function aplicar() {
    const t = T();
    document.documentElement.lang = IDIOMA;
    boton.textContent = t.boton;
    boton.setAttribute('aria-label', t.botonTitulo);
    boton.title = t.botonTitulo;

    const enlaces = document.querySelectorAll('.header__enlace');
    enlaces.forEach((e, i) => { if (t.header.nav[i]) e.textContent = t.header.nav[i]; });
    poner('.header__seccion', t.header.seccion);
    poner('#headerCita', t.header.cita);
    poner('#headerMenuTexto', t.header.menu);
    poner('.header__bajar .sr-only', t.header.bajar);

    poner('.tagline__fixed', t.tagline.fijo);
    poner('.tagline .sr-only', t.tagline.sr);

    ponerConClave(Array.from(document.querySelectorAll('.gato__frase')), t.gato.frases, 'gato__clave');

    // El titular, las fases y las píldoras de la mano los reescribe su propio
    // módulo al recibir 'augurio:idioma': tiene que volver a partirlos en
    // letras y a medirlas, no basta con cambiar el texto.

    poner('.probs__rotulo', t.probs.rotulo);
    poner('.probs__titulo', t.probs.titulo);

    // que cada módulo vuelva a pintar: el titular tecleado, el rótulo del
    // gato, la frase de problemas y la altura de las tarjetas
    document.dispatchEvent(new CustomEvent('augurio:idioma'));
    window.dispatchEvent(new Event('resize'));
  }

  boton.addEventListener('click', function () {
    IDIOMA = IDIOMA === 'es' ? 'en' : 'es';
    try { localStorage.setItem('augurio:idioma', IDIOMA); } catch (e) {}
    aplicar();
  });

  try {
    const guardado = localStorage.getItem('augurio:idioma');
    if (guardado === 'en' || guardado === 'es') IDIOMA = guardado;
  } catch (e) {}
  aplicar();
})();

/* ---- menú del header ----
   En móvil los tres enlaces no caben en una fila, así que se pliegan detrás
   del punto blanco de la maqueta. En escritorio el botón no existe y la fila
   se ve siempre. */
(function () {
  const boton = document.getElementById('headerMenu');
  const nav = document.getElementById('headerNav');
  if (!boton || !nav) return;

  const cerrar = () => {
    nav.classList.remove('is-abierto');
    boton.setAttribute('aria-expanded', 'false');
  };

  boton.addEventListener('click', function () {
    const abierto = nav.classList.toggle('is-abierto');
    boton.setAttribute('aria-expanded', abierto ? 'true' : 'false');
  });

  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) cerrar();
  });

  document.addEventListener('keydown', (e) => e.key === 'Escape' && cerrar());

  // al pasar a escritorio el botón desaparece: no puede quedarse un estado
  // "abierto" gobernando una fila que ya se ve entera
  window.addEventListener('resize', function () {
    if (window.innerWidth > 900) cerrar();
  });
})();
