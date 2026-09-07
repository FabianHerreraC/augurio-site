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
| header escritorio | 2560 × 1721 | `header3.png` |
| header móvil | 984 × 1586 | `header-mobile3.png` |
| mano escritorio | 2560 × 1560 | `mano3.png` |
| mano móvil | 984 × 1578 | `mano3-mobile.png` |

La tipografía dentro de un marco va en `cqw` (proporcional al marco, no al
viewport) con un piso en px: `max(12px, 2.03cqw)`. Sin el piso, la proporción
de la maqueta da 8 px en una pantalla de 390 y no se lee.

### Anclaje al scroll

Las secciones con coreografía son una pista alta con un panel `sticky` dentro.
El progreso es `q = -rect.top / (offsetHeight - innerHeight)`, de 0 a 1.

| Sección | Pista | Umbrales |
|---|---|---|
| mano | 620svh (480svh en móvil) | continuo: las cintas y el % siguen el avance |
| gato | 680svh (560svh en móvil) | frases 0.08 / 0.21 / 0.33 / 0.45 / 0.57 / 0.70 |
| problemas | automática, no por scroll | 6200 ms por frase, 900 ms de morfeo |

El primer hito de la mano entra en 0.06, casi con la sección: la maqueta la
muestra ya con «Conversación» activa y el índice en 01.

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
| mano | `mano-src.jpg` | sobre papel (`dark: true`), `scatter` 3.6, `pxPerDot` 6; en móvil `zoomCap` 3.4 + `zoom` 0.8, `panX` −0.02, `panY` 0.05 |
| gato | `gato-src.jpg` | contain; en móvil `zoom` 1.8 y `panX` 0.159 |
| problemas | `problemas-src.jpg` | contain; en móvil cover + `zoom` 1.15, `panX` 0.138, `panY` −0.06 |

---

## 3. Acoples que no se ven en el código

Esta es la sección importante. Todo lo de aquí ya rompió algo al menos una vez.

### La mano: dos cintas y un campo que repele

El titular cruza de derecha a izquierda y la cinta de fases de izquierda a
derecha, las dos atadas al avance de la sección. El DOM de las fases va 1,2,3,4
y se invierte con `flex-direction: row-reverse`: yendo hacia la derecha, la
primera en entrar es la que queda más a la derecha, así que sin invertir se
leerían al revés.

Cada letra va en su propio `inline-block` para poder empujarla, agrupadas por
palabra para que el salto de línea siga cayendo entre palabras.

**El campo no es una elipse.** Una mano abierta no cabe en una: los dedos se
salen, y una elipse que los cubra aparta el texto muchísimo más de lo necesario
a la altura de la palma. Se calcula un campo de distancia con signo sobre una
rejilla de 120 columnas, sacado de leer el propio lienzo —no de las maquetas:
la mano cae donde la deje el encuadre, y un campo fijo se desalinea sin avisar.

**El empuje va a pasitos, no de un salto.** Una letra bajo la palma tiene su
salida más corta hacia arriba, pero en línea recta vuelve a caer sobre los
dedos. Siguiendo el gradiente paso a paso rodea la silueta y sale por el hueco.
Con el salto recto quedaban letras encima de la mano; con los pasos, ninguna.

La máscara se engorda una celda antes de la transformada: la rejilla mide 12 px
por celda y una letra cabe de sobra en el borde de una celda tenida por papel.

### En la mano no se puede leer maquetación al pintar

`pintar` no lee `offsetTop` ni `offsetLeft`: todo eso se cachea en
`medirLetras`. Leer maquetación después de escribir transformaciones obliga al
navegador a recalcularla para las mil y pico letras en cada cuadro.

Una pasada completa sobre las 1143 letras cuesta 1.3 ms, y un cuadro real sólo
toca las que están dentro del campo.

### text-indent se hereda y lo aplica cada inline-block

Las fases sangran la primera línea. Como cada letra es un `inline-block` —y por
tanto un contenedor de bloque—, cada una aplicaba la sangría a su propia línea
y acababa midiendo 6.5em de ancho. Hay que anularlo en `.pal` y `.let`.

### El header cambia de composición, no sólo de medidas

En escritorio el logo va pequeño en la barra de arriba, con el menú a la
derecha y la frase centrada. En móvil el logo baja al centro, entre las dos
figuras; la cita sube arriba; la frase baja al 75%; y los tres enlaces se
pliegan detrás del punto blanco. No es el mismo bloque movido: son dos
composiciones, y por eso `--tagline-y` se redefine en el corte de móvil.

### El canal izquierdo del header sale de un margen único

El interruptor de idioma, el rótulo vertical y —en móvil— la cita se apoyan en
`--margen`. No basta con darles el mismo `left`: el texto vertical centra sus
glifos girados sobre la línea base central, así que su tinta cae ~1.5 px por
dentro. Por eso `.header__seccion` lleva `margin-left: -0.15em`, en em para que
aguante cualquier tamaño. La caja queda corrida a propósito; lo que se alinea
es la tinta.

La sonda compara el `left` calculado, no la caja, justo por eso.

En vertical el interruptor comparte eje con el punto del menú en móvil y con el
logo y la fila de enlaces en escritorio. No se calcula: en móvil el interruptor
toma el mismo `top` y la misma altura que el punto —`--bolita`—, así que los
centros coinciden solos; en escritorio los tres se cuelgan del 2.5% del alto
con `translateY(-50%)`.

### El testimonio del header entra con retardo

`.header__cita` arranca en opacidad 0 y sube con un `animation` de 4.5 s y dos
segundos de retardo. Va en CSS y no en JS porque no depende de nada más que de
que la página se pinte. El riesgo es que un cambio lo deje clavado en 0 sin
dar ningún error, así que la sonda espera a que el fundido termine en vez de
medir y seguir.

### font-size en porcentaje no escala con el ancho

Un `font-size: 0.7%` se mide contra la fuente heredada, no contra el
contenedor, así que `max(10px, 0.7%)` da siempre 10px. Para que la tipografía
del header escale con la pantalla tiene que ir en `vw`. Las anchuras sí pueden
ir en `%`, que ahí sí es del contenedor.

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

### Reemplazar un bloque entero de app.js se lleva a los vecinos

Ya ha borrado tres módulos sin que nada avisara: el campo de puntos de la mano
y, dos veces, la frase del header. Los comentarios de cabecera se parecen entre
sí —varios empiezan por `sección "qué hace"`— y un corte «desde este comentario
hasta el siguiente» arrastra lo que haya en medio.

Antes de reemplazar un bloque, comprobar qué queda dentro del corte. Y después,
correr la sonda: cada módulo con animación propia tiene ahora una comprobación,
porque un módulo que desaparece no deja error en consola, sólo una página más
quieta.

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

## 4. Los dos idiomas

Todo el texto visible vive en `TEXTOS`, al principio de `app.js`, en español e
inglés. `IDIOMA` guarda el actual y `T()` devuelve el bloque que toca.

Hay dos clases de texto y se tratan distinto:

- **El que vive en arrays** (palabras del header, rótulos del gato, frases de
  problemas). Los módulos lo leen del diccionario **en el momento de pintar**,
  nunca lo capturan al arrancar: por eso `WORDS`, `ROTULOS` y `PARTES` son
  funciones, no constantes.
- **El que vive en el HTML** (frases del gato, fases de la mano, píldoras,
  rótulos, titular). Lo reescribe `aplicarIdioma()` en el módulo del
  interruptor.

Al terminar se emite `augurio:idioma`. Cada módulo con estado escucha y repinta:

| Módulo | Por qué necesita escuchar |
|---|---|
| header | rehacer los medidores: las palabras inglesas no miden lo mismo |
| mano | volver a teclear el titular y remedir el alto de la tarjeta |
| gato | `medir()` sólo actúa si cambia la frase activa, y no cambia |
| problemas | repintar la frase que esté puesta, en el otro idioma |

La elección se guarda en `localStorage` bajo `augurio:idioma`.

El interruptor va fijo arriba a la izquierda con `mix-blend-mode: difference`:
sobre el negro se ve blanco y sobre el papel se ve negro, sin necesidad de
darle un fondo. En móvil el rótulo «QUE» de la mano se corre al 14% para no
quedar debajo; con el 8% de la maqueta quedaban a 2 px.

La sonda acepta `?lang=en`, porque el texto inglés no mide lo mismo y las
maquetaciones ajustadas —la tarjeta del gato, el polígono de problemas— pueden
romperse en un idioma y no en el otro.

---

## 5. Móvil

Corte en `max-width: 900px`.

- **gato**: escena ampliada 1.8× y corrida a la derecha (§3). `pxPerDot` baja de
  9 a 5: al triplicarse el área, la misma siembra adelgaza la figura.
- **mano**: la mano va de fondo a sangre, como el gato y problemas, y todo lo
  demás se coloca encima en porcentajes del panel. Lo que hace legible el texto
  no es esconder la mano sino las cajas del propio diseño: el titular sobre
  blanco al 62%, la tarjeta sobre blanco sólido y las píldoras al 72%. Conserva
  el anclaje. Por debajo de 700 px de alto la composición no cambia, sólo se
  aprieta la tipografía y sube la tarjeta.
- **problemas**: conserva la composición de la maqueta —cuadro, polígono, barra
  y menú— con el marco 984 × 1361. El polígono se lleva a su sitio con un
  `transform` sobre el SVG, para que la animación de morfeo siga trabajando en
  las unidades del viewBox de escritorio.

---

## 6. Cómo verificar

**Nunca abrir los archivos con `file://` ni con un servidor con caché.** El
navegador sirvió `app.js` viejo tres veces y provocó tres diagnósticos falsos.

    python3 dev/serve.py          # sin caché, puerto 8232

La sonda monta el sitio en un iframe del tamaño exacto de un teléfono, que es
la única forma de que `vw`, `svh` y las media queries resuelvan bien:

    http://127.0.0.1:8232/dev/sonda.html?w=390&h=844
    http://127.0.0.1:8232/dev/sonda.html?w=1440&h=900
    …y las mismas dos con &lang=en

`&escala=0.55` encoge el iframe sólo visualmente, para poder ver un render de
escritorio entero en un panel angosto. La maquetación se sigue calculando
contra el tamaño pedido.

Pulsa **Comprobar** y verifica la geometría de las cuatro secciones y que la
coreografía del gato avance con el scroll. Correrla **a los dos anchos** después
de cada cambio: casi todas las regresiones fueron de un ancho rompiendo el otro.

### En la mano, solapar en vertical no es chocar

En escritorio el titular y la tarjeta van en columnas distintas y se solapan en
vertical sin tocarse. Cualquier comprobación de colisión tiene que cruzar los
dos ejes; mirando sólo el vertical da un falso positivo de 90 px.

### La sonda mide contra clientWidth, no contra innerWidth

`innerWidth` incluye la barra de scroll; los porcentajes del CSS se calculan
sobre `clientWidth`. Con un iframe de 390 y barra visible son 390 contra 375,
y las comprobaciones de ancho fallan por esos 15 px sin que el sitio tenga
nada malo.

### Al recortar las maquetas

`sips --cropOffset` desplaza **desde la esquina superior izquierda**, pero falla
en silencio con algunos PNG grandes y devuelve parches en negro. Si pasa, se
extrae el recorte con un canvas en el navegador.
