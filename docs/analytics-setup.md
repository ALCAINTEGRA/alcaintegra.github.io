# ALCAINTEGRA Analytics
Estado: preparado, desactivado. No se ha creado una propiedad GA4 ni se han recogido estadísticas.
1. Crear propiedad ALCAINTEGRA Web en GA4, zona horaria Ciudad de México y moneda MXN.
2. Flujo web: https://alcaintegra.github.io/ . Obtener ID G-... (identificador público, no contraseña ni secreto).
3. Desactivar medición mejorada automática para no registrar búsquedas, URL con parámetros ni interacciones no previstas; desactivar Google signals, personalización de anuncios y vinculaciones publicitarias. Revisar retención y aviso de privacidad propio del responsable antes de activar.
4. Insertar ID en analytics.js. Solo se carga la etiqueta Google después de aceptación explícita. Rechazar no carga etiqueta; revocar deshabilita y recarga. No incluir el script en el sistema municipal.
5. Probar en Tag Assistant y Tiempo real: sin aceptación, cero solicitudes a Google; con aceptación, page_view, demo_view, demo_open, pricing_view (si sección visible tras cargar), demo_module, share_click y contact_info_open. Rechazo, revocación y navegación entre páginas. No enviar folios, texto de búsqueda, datos de formularios ni parámetros de URL.
6. contact_info_open solo mide interés; no es un cliente potencial confirmado. No hay formulario habilitado. No reconstruir visitas pasadas. Los visitantes no se identifican nominalmente. Reportes agregados, sujetos a consentimiento, bloqueadores y umbrales.
7. Control Center: futura integración servidor con GA4 Data API, acceso de solo lectura, sin publicar credenciales. No exponer métricas privadas en GitHub Pages.
