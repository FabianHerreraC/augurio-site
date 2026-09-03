# Sitio de Augurio — spec

Sitio de una sola página. Cuatro secciones sobre un mismo motor de campo de
puntos, con la coreografía atada al scroll.

    header  →  gato  →  [difuminado]  →  mano  →  [difuminado]  →  problemas

Sin dependencias ni build. Son tres archivos: `index.html`, `style.css`,
`app.js`.

---

## 1. De dónde salen las medidas

Cada sección reproduce una maqueta. Todo se ubica en **porcentajes de un marco
de referencia** con `aspect-ratio` fijo, de modo que la composición se sostiene
a cualquier ancho. Las maquetas están en `referencias/` y son la autoridad: si
un número del CSS no cuadra, se vuelve a medir sobre ellas.

| Sección | Marco | Maqueta |
|---|---|---|
| mano (`.quehace__marco`) | 2560 × 1741 | `AuguriositeDesktop.png` |
| gato (`.gato__marco`) | 2560 × 1696 | `AuguriositeDesktop.png` |
| problemas escritorio (`.probs__marco`) | 2560 × 1682 | `AuguriositeDesktop.png` |
| problemas móvil (`.probs__marco`) | 984 × 1361 | `AuguriositeMobile.png` |

La tipografía dentro de un marco va en `cqw` (proporcional al marco, no al
viewport) con un piso en px: `max(12px, 2.03cqw)`. Sin el piso, la proporción
de la maqueta da 8 px en una pantalla de 390 y no se lee.

### Anclaje al scroll

Las secciones con coreografía son una pista alta con un panel `sticky` dentro.
El progreso es `q = -rect.top / (offsetHeight - innerHeight)`, de 0 a 1.

| Sección | Pista | Umbrales |
|---|---|---|
| mano | 520svh | frase 0.02; hitos 0.22 / 0.40 / 0.58 / 0.76 |
| gato | 680svh (560svh en móvil) | frases 0.08 / 0.21 / 0.33 / 0.45 / 0.57 / 0.70 |
| problemas | automática, no por scroll | 6200 ms por frase, 900 ms de morfeo |

El último umbral del gato es 0.70 a propósito: el tramo que sobra mantiene la
malla final en pantalla el tiempo suficiente para mirarla.

---

## 2. El motor de puntos

`createDotField(canvas, opts)` convierte una imagen en un campo de puntos que
titila. Escribe en un `Uint32Array` sobre `ImageData` y **borra sólo los píxeles
que pintó en el cuadro anterior**, no el lienzo entero.

Siembra por muestreo con rechazo: cada píxel recibe un peso derivado de su
luminancia (`wFloor`, `wGamma`), y se reparte un presupuesto de puntos
proporcional a ese peso. Donde la imagen es densa los puntos se quedan quietos;
donde es tenue se dispersan y titilan más (`scatter`, `scatterFall`). Usa una
tabla de senos de 1024 entradas en vez de `Math.sin` por punto y por cuadro.

### Opciones que importan

| Opción | Qué hace |
|---|---|
| `fit` | `'cover'` o `'contain'` |
| `zoom` | multiplica el encuadre resultante |
| `panX`, `panY` | corrimiento, en **fracciones del lienzo** |
| `zoomCap` | tope de acercamiento en modo `cover`, relativo a `contain` |
| `pxPerDot` | densidad: píxeles de lienzo por punto |
| `scatter` | dispersión respecto del píxel, en px a 1440 de ancho |
| `prepare` | `fn(ctx, w, h)` para limpiar la fuente antes de muestrear |

**`fit`, `zoom`, `panX`, `panY` y `pxPerDot` aceptan una función**, que se
evalúa en cada `buildField()`. Así el encuadre puede depender del ancho de
pantalla sin duplicar la instancia.

### Instancias

| Sección | Fuente | Encuadre |
|---|---|---|
| header | `headerA.png` | cover, `zoomCap` 1.35 |
| mano | `mano-src.jpg` | sobre papel (`dark: true`), `scatter` 3.6, `pxPerDot` 6 |
| gato | `gato-src.jpg` | contain; en móvil `zoom` 1.8 y `panX` 0.159 |
| problemas | `problemas-src.jpg` | contain; en móvil cover + `zoom` 1.15, `panX` 0.138, `panY` −0.06 |

---

## 3. Acoples que no se ven en el código

Esta es la sección importante. Todo lo de aquí ya rompió algo al menos una vez.

### La tarjeta y el rótulo del gato **no** cuelgan del marco

`.gato__tarjeta` y `.gato__rotulo` son hermanos de `.gato__marco`, hijos de
`.gato__fijo`. Sus porcentajes son del **panel**, no del marco. Ampliar el
marco no los mueve, y recolocarlos con porcentajes del marco los deja del
tamaño equivocado.

### El zoom del gato en móvil vive en dos archivos

`MOVIL_ZOOM = 1.8` y `MOVIL_PAN = 0.159` en `app.js` amplían el **lienzo**.
`.gato__marco { width: 180%; transform: translateX(8.85%) }` amplía el **marco**,
que es quien lleva números, trazos y malla. Si uno cambia sin el otro, los
números dejan de caer sobre el gato.

`translateX` es un porcentaje del propio marco: 8.85% de 180% = 15.9% del panel,
que es `MOVIL_PAN`.

### Cada módulo tiene un guard que lo mata en silencio

Los módulos son IIFE que empiezan con `if (!sec || !x || !y) return;`. Si se
borra un elemento del HTML y queda su id en el guard, el módulo entero deja de
correr **sin error en consola**. Así desaparecieron los textos de la mano.

### El medidor oculto del titular

`.quehace__frase-sizer` reserva el ancho del titular para que la caja no salte
mientras se teclea. Depende de `visibility: hidden` en el CSS. Si esa regla se
borra, **el titular se dibuja dos veces**.

### El polígono le roba los clics al menú

`.probs__poli` es un SVG que cubre el marco entero y va después del menú en el
DOM. Sin `pointer-events: none` (y `z-index: 3` en el menú), los puntos no
responden.

Para comprobar que un botón recibe el toque hay que usar `elementFromPoint`.
`.click()` no sirve: se salta el hit-testing y pasa aunque haya algo encima.

### El cerrojo de `requestAnimationFrame` caduca

El patrón `if (ticking) return;` con `ticking = false` dentro del cuadro se
queda cerrado para siempre si el navegador descarta ese cuadro (pestaña en
segundo plano). Por eso caduca a los 300 ms.

### Redondear, no truncar

En el bucle de pintado las coordenadas van con `+ 0.5 | 0`. Con desplazamientos
de fracción de píxel, truncar manda la mitad de los puntos al píxel anterior y
el núcleo queda agujereado. Truncando, la mano llegaba al 64% de cobertura;
redondeando, al 92%.

### La baldosa del fondo se muestra a la mitad de su tamaño

`textura-negro.jpg` y `textura-papel.jpg` miden 160 px, pero van con
`background-size: 80px`. No es un descuido: en una pantalla DPR 2, mostrarlas
a 160 px CSS las amplía al doble y cada píxel de ruido pasa a ser un bloque de
2x2. A 80 px caen 1:1 y el grano vuelve a ser de un píxel.

Donde más se nota es en la mano y en problemas en móvil, que es donde el
lienzo no cubre el panel entero y la textura queda a la vista en bandas.

### Las texturas de fondo tienen que ser uniformes

`textura-negro.jpg` y `textura-papel.jpg` se repiten cada 160 px. Una sola mota
clara en la baldosa dibuja una cuadrícula visible en toda la sección. Las
actuales tienen un rango entre cuadrantes de 0.84 y 0.59 niveles de brillo.
Al cambiarlas hay que medir eso, no mirarlas.

---

## 4. Móvil

Corte en `max-width: 900px`.

- **gato**: escena ampliada 1.8× y corrida a la derecha (§3). `pxPerDot` baja de
  9 a 5: al triplicarse el área, la misma siembra adelgaza la figura.
- **mano**: el lienzo pasa al flujo en vez de ser fondo a sangre, porque el
  texto oscuro sobre la mano negra no se leía. Las patas se ocultan. Conserva
  el anclaje: el contenido apilado mide unos 700 px y entra en el panel. Por
  debajo de 700 px de alto de pantalla no cabe, y ahí se suelta el anclaje y
  la sección se lee con scroll normal.
- **problemas**: conserva la composición de la maqueta —cuadro, polígono, barra
  y menú— con el marco 984 × 1361. El polígono se lleva a su sitio con un
  `transform` sobre el SVG, para que la animación de morfeo siga trabajando en
  las unidades del viewBox de escritorio.

---

## 5. Cómo verificar

**Nunca abrir los archivos con `file://` ni con un servidor con caché.** El
navegador sirvió `app.js` viejo tres veces y provocó tres diagnósticos falsos.

    python3 dev/serve.py          # sin caché, puerto 8232

La sonda monta el sitio en un iframe del tamaño exacto de un teléfono, que es
la única forma de que `vw`, `svh` y las media queries resuelvan bien:

    http://127.0.0.1:8232/dev/sonda.html?w=390&h=844
    http://127.0.0.1:8232/dev/sonda.html?w=1440&h=900

Pulsa **Comprobar** y verifica la geometría de las cuatro secciones y que la
coreografía del gato avance con el scroll. Correrla **a los dos anchos** después
de cada cambio: casi todas las regresiones fueron de un ancho rompiendo el otro.

### La sonda mide contra clientWidth, no contra innerWidth

`innerWidth` incluye la barra de scroll; los porcentajes del CSS se calculan
sobre `clientWidth`. Con un iframe de 390 y barra visible son 390 contra 375,
y las comprobaciones de ancho fallan por esos 15 px sin que el sitio tenga
nada malo.

### Al recortar las maquetas

`sips --cropOffset` desplaza **desde la esquina superior izquierda**, pero falla
en silencio con algunos PNG grandes y devuelve parches en negro. Si pasa, se
extrae el recorte con un canvas en el navegador.
