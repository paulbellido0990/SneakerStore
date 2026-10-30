# SneakerStore PRO — Laboratorio 07 IS-882

Catálogo académico de zapatillas Nike, Adidas, Jordan y New Balance. Interfaz completamente en español y precios de demostración en soles peruanos (PEN, S/).

## Instalación y ejecución

1. Instala Node.js 20.19+ o 22.12+ (versión compatible con Vite 6).
2. Abre la carpeta `SneakerStore_Pro` en Visual Studio Code.
3. Ejecuta en la terminal:

```bash
npm install
npm run dev
```

4. Abre la dirección que indique Vite, normalmente `http://localhost:5173`.
5. Comprueba que compile usando `npm run build`.

## Contenido

- React 19 + TypeScript + Vite.
- Axios para peticiones HTTP a DummyJSON.
- TanStack Query para caché, estados asíncronos, paginación en queryKeys y precarga de detalle.
- React Router para catálogo, detalle y sincronización de filtros con la URL.
- 24 productos seleccionados (6 por marca), con imágenes enlazadas a terceros.
- Productos adicionales de DummyJSON (categorías `mens-shoes` / `womens-shoes`) cuando la API está disponible y el producto pertenece a las cuatro marcas.
- Búsqueda con debouncing de 400 ms, paginación de 8 productos, filtro por marca/género/estilo/precio, ordenamiento y favoritos persistidos en el navegador.
- Manejo de error 404, error de API, carga y resultados vacíos.
- Diseño adaptativo para celular, tablet y computadora.

## Importante sobre datos y fotografías

Se trata de un **catálogo demostrativo**, no de una tienda operativa. No hay pagos, carrito, inventario real ni registro de pedidos. Los precios en soles son **simulados**: no equivalen a cotizaciones oficiales ni se actualizan con un tipo de cambio. La fórmula empleada para precios de la API es exclusivamente ilustrativa. Las fotografías referenciales se cargan desde servicios externos; necesitan conexión a Internet y dependen de sus servidores, por lo que se incluye una imagen de respaldo local. Si alguna imagen deja de estar disponible, se mostrará el respaldo.

Datos REST: https://dummyjson.com/docs/products

Fotografías de muestra: páginas de producto de Nike, Adidas, tiendas multimarcas y catálogos de New Balance/Jordan. La utilización comercial requiere verificar autorización de sus respectivos titulares. Las marcas son propiedad de sus titulares; este proyecto no está afiliado a ellas.

## Pruebas sugeridas

1. Abrir inicio y comprobar las cuatro marcas.
2. Buscar "Samba" y verificar que el filtro se aplique tras 400 ms.
3. Filtrar por Nike y ordenar por menor precio.
4. Cambiar a página 2 y comprobar el parámetro `pagina=2` en la URL.
5. Abrir una zapatilla, regresar y observar la navegación.
6. Marcar y desmarcar favoritos y actualizar la página.
7. Abrir `/producto/s-ad-01` y `/producto/no-existe`.
8. Desactivar Internet y recargar para demostrar el catálogo de respaldo.
9. Ejecutar `npm run build` y guardar la captura de compilación.

## Estructura principal

- `src/data/catalogo.ts`: catálogo seleccionado local de 24 zapatillas.
- `src/api/products.ts`: Axios, consumo REST y adaptación a tipos TypeScript.
- `src/pages/Catalog.tsx`: búsqueda, filtros, queryKeys y paginación.
- `src/pages/ProductDetail.tsx`: vista individual y consulta dinámica por ID.
- `src/components/`: diseño reutilizable de tarjetas, imagen y estructura.
- `src/context/Favoritos.tsx`: preferencias del navegador.
- `src/utils/format.ts`: precios con `Intl.NumberFormat('es-PE')`.
- `src/styles.css`: estilos adaptativos.
