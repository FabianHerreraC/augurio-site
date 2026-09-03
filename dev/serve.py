#!/usr/bin/env python3
"""Servidor de desarrollo sin caché.

El navegador sirvió app.js viejo varias veces y provocó diagnósticos falsos:
se concluyó que un módulo no tenía listener cuando el archivo cargado ni
siquiera lo contenía. De ahí el no-store.

    python3 dev/serve.py
"""
import functools, http.server, os, socketserver

PUERTO = 8232
RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


class SinCache(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def log_message(self, formato, *args):
        pass


if __name__ == '__main__':
    socketserver.TCPServer.allow_reuse_address = True
    handler = functools.partial(SinCache, directory=RAIZ)
    with socketserver.TCPServer(('127.0.0.1', PUERTO), handler) as httpd:
        print(f'http://127.0.0.1:{PUERTO}/')
        print(f'http://127.0.0.1:{PUERTO}/dev/sonda.html?w=390&h=844')
        httpd.serve_forever()
