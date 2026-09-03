# Sitio de Augurio

Sitio de una sola página, sin dependencias ni build. Cuatro secciones sobre un
motor de campo de puntos, con la coreografía atada al scroll.

**En vivo:** https://fabianherrerac.github.io/augurio-site/

## Desarrollo

```
python3 dev/serve.py
```

Sirve el sitio en `http://127.0.0.1:8232/` **sin caché**, que es necesario:
abrirlo con `file://` o con un servidor con caché hace que el navegador reutilice
`app.js` viejo.

## Antes de dar por bueno un cambio

Correr la sonda **a los dos anchos**:

```
http://127.0.0.1:8232/dev/sonda.html?w=390&h=844
http://127.0.0.1:8232/dev/sonda.html?w=1440&h=900
```

Monta el sitio en un iframe del tamaño exacto del dispositivo y comprueba la
geometría de las cuatro secciones, la coreografía del gato y que no haya
desbordes. Casi todas las regresiones fueron de un ancho rompiendo el otro.

## Documentación

[`SPEC.md`](SPEC.md) — de dónde sale cada medida, cómo funciona el motor de
puntos y, sobre todo, los acoples que no se ven en el código.
