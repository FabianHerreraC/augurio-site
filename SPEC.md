# Sitio de Augurio — spec

Sitio de una sola página. Cuatro secciones sobre un mismo motor de campo de
puntos, con la coreografía atada al scroll.

    header  →  gato  →  mano  →  problemas

Sin transición entre secciones: el paso de negro a papel y de papel a negro es
un corte seco. Hasta octubre de 2026 había franjas de difuminado de puntos entre
ellas; se quitaron.

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
| mano | 620svh (480svh en móvil) | menú y dedos por cuartos (cada falange se deshace en 0.09); el titular gira por tiempo, no por scroll |
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
| `zonas` | zonas que pueden dispersarse, en píxeles de la **imagen fuente**: `{x, y, dx, dy, rho, ancho}` |
| `dispersa` | cuánto se alejan los puntos de una zona dispersa, en fracción del ancho |

El objeto devuelto lleva `dispersar(k, a)` —de 0, en su sitio, a 1— y
`dispersion()`, que lee el estado y usa la sonda. Cada punto guarda al sembrar
a qué zona pertenece, con un peso que se desvanece hacia la base y los lados
de la zona y una dirección de salida propia, en abanico de ±45°. Como las
zonas van en coordenadas de la fuente, siguen al encuadre en cualquier
pantalla.

**`fit`, `zoom`, `panX`, `panY` y `pxPerDot` aceptan una función**, que se
evalúa en cada `buildField()`. Así el encuadre puede depender del ancho de
pantalla sin duplicar la instancia.

### Instancias

| Sección | Fuente | Encuadre |
|---|---|---|
| header | `headerA.png` | cover, `zoomCap` 1.35; `grano: GRANO`, `negro` [0.055, 0.09] |
| mano | `mano-src.jpg` | sobre papel (`dark: true`), `scatter` 3.6, `pxPerDot` 6; `zonas` en las cuatro falanges; escritorio `zoom` 0.58, `panX` −0.11; móvil `zoomCap` 3.4, `zoom` 0.42, `panX` −0.07, `panY` −0.19 |
| gato | `gato-src.jpg` | contain; en móvil `zoom` 1.8 y `panX` 0.159; `grano: GRANO`, `negro` [0.06, 0.10] |
| problemas | `problemas-src.jpg` | contain; en móvil cover + `zoom` 1.15, `panX` 0.138, `panY` −0.06; `grano: GRANO`, `negro` [0.008, 0.02] |

---

## 3. Acoples que no se ven en el código

Esta es la sección importante. Todo lo de aquí ya rompió algo al menos una vez.

### La mano: el titular gira a su alrededor

El titular gira en sentido horario, una vuelta cada 80 s de recorrido de la
curva, sobre una línea a medio camino entre un círculo y la silueta de la mano
(`PARECIDO` 0.6). Cada letra se coloca a mano: posición absoluta en el origen
del marco y una transformación que la lleva a su punto y la gira con la
tangente. El cuerpo se elige para que la frase, con su separador, dé justo una
vuelta (18–44 px en escritorio, 15 de mínimo en móvil).

La curva se construye así, y el orden importa:

1. **Perfil radial de la mano**, leído del lienzo: lo más lejos que llega en
   cada una de 180 direcciones desde su centro, sólo con celdas macizas (ni el
   grano suelto ni las puntas ya deshechas cuentan).
2. **La silueta se suaviza antes de mezclar:** un máximo de ±24° que cierra los
   dedos en una sola masa, y tres pasadas de media.
3. Se mezcla con el radio medio y se suaviza otra vez.
4. **Si la curva queda por dentro de la mano en algún punto, se sube entera**
   lo que haga falta.

Las versiones anteriores forzaban la curva por fuera del perfil sólo donde
hacía falta, con un máximo local al final, y eso devolvía escalones donde
asomaban los dedos: dos letras vecinas llegaban a girar 54° una respecto de la
otra y se montaban («orches·trate»). Con el desplazamiento global, cero
concavidades y como mucho 10° entre letras vecinas.

Sólo gira con la sección a la vista y con movimiento reducido se queda quieto.

### La mano: el menú de fases y los dedos

Las cuatro fases son un menú desplegable con uno abierto cada vez: el scroll
abre la siguiente por cuartos del recorrido, y el primero está abierto desde
que la sección se ancla. El cuerpo se despliega animando `grid-template-rows`
de 0fr a 1fr. Al pulsar un título, el scroll va al centro de su cuarto.

La fase abierta deshace la última falange de su dedo —índice, medio, anular,
meñique; el pulgar se queda—. **Un dedo cada vez:** al abrirse la fase el dedo
se deshace en 0.09 de recorrido y al cerrarse se recompone en otro tanto, con
el mismo fundido, mientras se deshace el siguiente. El último sigue deshecho
hasta el final. Al subir se invierte.

Las puntas (`DEDOS` en app.js) se midieron sobre mano-src.jpg con el perfil
radial desde el centroide de la mano: los picos son las puntas y los valles
entre ellos dan el largo de cada dedo; la falange es cerca de un tercio.

En escritorio la mano va corrida a la izquierda (`panX` −0.11) y el menú a la
derecha; en móvil la mano va más pequeña y arriba (`zoom` 0.42) y el menú
debajo.

Los textos de las fases salen del marco teórico de Augurio —las cuatro
tradiciones de la conversación fértil— sin nombrar autores.

### En la mano no se puede leer maquetación al pintar

`pintar` no lee el sitio de las letras: se cachea en `medirLetras`, en reposo y
una vez por maquetación. Leerlo después de escribir transformaciones obliga al
navegador a recalcular la maquetación en cada cuadro.

### El header cambia de composición, no sólo de medidas

En escritorio el logo va pequeño en la barra de arriba, con el menú a la
derecha y la frase centrada. En móvil el logo baja al centro, entre las dos
figuras; la frase baja al 75%; y los tres enlaces se
pliegan detrás del punto blanco. No es el mismo bloque movido: son dos
composiciones, y por eso `--tagline-y` se redefine en el corte de móvil.

### El canal izquierdo del header sale de un margen único

El interruptor de idioma y el rótulo vertical se apoyan en
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

### El orden de las reglas del interruptor importa

La regla de móvil de `.idioma` va **después** de su regla base, en su propio
`@media`. Dentro del bloque de móvil, que está más arriba en el archivo, perdía
contra ella por orden con la misma especificidad, y nunca se aplicaba. Parecía
alineado con el punto del menú sólo porque a 390×844 el 2.5% del alto cae casi
donde su centro; a 375×667 quedaba 1.6 px desfasado.

### El header espera a su fondo

El contenido del header —y el interruptor de idioma— arrancan en opacidad 0 y
entran cuando el campo de puntos ha pintado por primera vez. El motor avisa con
`onListo`, y el header pone `is-listo` en `<html>`, que es donde puede verlo
también el interruptor, que cuelga del `body`.

Con un plazo de seguridad de 3.5 s: si la imagen no llegara, el header no puede
quedarse en blanco para siempre. La sonda comprueba que la marca acabe puesta,
porque ese fallo no daría ningún error.

Medido: el fondo pinta a los ~300 ms, el contenido entra sobre el segundo 1 y
la cita completa su fundido hacia el 7.

### font-size en porcentaje no escala con el ancho

Un `font-size: 0.7%` se mide contra la fuente heredada, no contra el
contenedor, así que `max(10px, 0.7%)` da siempre 10px. Para que la tipografía
del header escale con la pantalla tiene que ir en `vw`. Las anchuras sí pueden
ir en `%`, que ahí sí es del contenedor.

### El gato: escena a un lado, ficha al otro

`.gato__fijo` es una rejilla de dos piezas: `.gato__escena` (lienzo, marco de
números y rótulo) y `.gato__tarjeta`, la ficha blanca. En escritorio, columnas
58% · 42%, con la ficha a toda altura; en móvil, filas 56% · 44%, con la ficha
a todo el ancho debajo. La ficha está siempre; lo que entra con la primera
frase es su texto (`.gato__pila`).

El rótulo vive dentro de la escena y se mide contra ella.

### El zoom del gato vive en dos archivos

El lienzo y el marco de los números parten del encuadre contain **de la
escena** y se amplían y corren igual:

| | ampliación | corrimiento (en % del marco ampliado) |
|---|---|---|
| escritorio | 1.6 | 9.5% |
| móvil | 1.8 | 8.85% |

En `app.js` son `GATO_ZOOM` y `GATO_PAN`; en `style.css`, `--gz` y `--gt` de
`.gato__fijo`. Si uno cambia sin el otro, los números dejan de caer sobre el
gato. La sonda lo comprueba midiendo el ancho del marco contra la escena.

El lienzo expresa su corrimiento en fracción de su propio ancho y el marco en
fracción del suyo; sólo coinciden si el encuadre llena el ancho de la escena.
Por eso `panX` se convierte con el ancho real del encuadre,
`min(ancho, alto × 2560/1696)`, y aguanta escenas apaisadas.

La ampliación existe porque la fuente trae mucho margen alrededor del gato:
sin ella, en media pantalla, la constelación abarcaba un 35% de la escena y los
trazos entre números no se leían. Ahora abarca un 56% en escritorio y un 63% en
móvil.

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

### El texto del polígono va en su parte ancha

El pentágono es ancho arriba y se estrecha hacia una punta inferior desplazada
a la izquierda. La frase más larga ocupa cuatro líneas, y con el texto bajo
(46.8% en móvil, 42.4% en escritorio) la última salía por el lado diagonal en
móvil —7 px fuera— y en escritorio quedaba a menos de un píxel del lado
inferior izquierdo, mientras sobraban 16–42 px arriba. Ahora va a 43.5% en
móvil y 41.8% en escritorio.

Margen mínimo medido en las 10 frases, las dos lenguas: 2.7 px a 360, 8.7 a 390,
3.9 a 1024, 5.2 a 1440, 7.1 a 1920.

La sonda comprobaba antes la altura del texto contra la caja del polígono, y
eso no ve la forma: pasaba con la línea fuera. Ahora mira cada esquina de cada
línea contra el polígono ya dibujado, tras el morfeo, y exige 1 px de margen.

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

### La sonda mide contra clientWidth, no contra innerWidth

`innerWidth` incluye la barra de scroll; los porcentajes del CSS se calculan
sobre `clientWidth`. Con un iframe de 390 y barra visible son 390 contra 375,
y las comprobaciones de ancho fallan por esos 15 px sin que el sitio tenga
nada malo.

### Al recortar las maquetas

`sips --cropOffset` desplaza **desde la esquina superior izquierda**, pero falla
en silencio con algunos PNG grandes y devuelve parches en negro. Si pasa, se
extrae el recorte con un canvas en el navegador.


El testimonio del header («No sentí que Augurio me dijera…») se quitó el 2026-09-23.
