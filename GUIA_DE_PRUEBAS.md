# Guía de pruebas y evidencias — Laboratorio 07, Desarrollo Web IS-882

## Relación con los requisitos de la guía

| Requisito | Implementación | Archivo |
|---|---|---|
| React con TypeScript | Componentes y tipos estrictos | `src/main.tsx`, `src/types/product.ts` |
| Consumo REST | Peticiones Axios a DummyJSON en categorías de calzado | `src/api/products.ts` |
| Asincronía y estados | `useQuery`, estado de carga, fallback y reintentos | `src/pages/Catalog.tsx` |
| Rutas dinámicas | `/producto/:id` con `useParams` | `src/pages/ProductDetail.tsx` |
| Caché de datos | `QueryClient` y claves dinámicas | `src/main.tsx`, `src/pages/Catalog.tsx` |
| Desafío 1: debouncing | Búsqueda con 400 ms y sincronización con URL | `src/hooks/useDebounce.ts` y `Catalog.tsx` |
| Desafío 2: paginación | 8 productos por página, parámetro `pagina` y consulta cacheada por página/filtros | `src/pages/Catalog.tsx` |
| Adicional: prefetch | Precarga de información al pasar el cursor sobre la tarjeta | `src/components/ProductCard.tsx` |
| Adicional: filtros en URL | `useSearchParams` y enlaces compartibles | `src/pages/Catalog.tsx` |
| Adicional: favoritos | Estado persistido en `localStorage` | `src/context/Favoritos.tsx` |

## Capturas recomendadas

1. Portada o inicio con el banner, las cuatro marcas y el encabezado del catálogo.
2. Catálogo de zapatillas en la primera página: imagen, nombre y precios S/.
3. Búsqueda por `Samba`, URL con `?buscar=Samba` y resultados filtrados.
4. Filtro de marca `New Balance`, precios en soles y ordenamiento.
5. Paginación con `?pagina=2` y botón siguiente/anterior.
6. Detalle en `/producto/s-jd-01` con descripción en español.
7. Favoritos marcados y vista de solo favoritos.
8. Consola de DevTools / pestaña Network mostrando las peticiones a `dummyjson.com`.
9. Vista móvil usando modo dispositivo del navegador.
10. Terminal con el resultado final de `npm run build`.

## Observaciones

- La API solo aporta productos adicionales que realmente correspondan a las cuatro marcas. No inventar que 24 modelos seleccionados se cargan todos desde DummyJSON: esos se almacenan en `src/data/catalogo.ts`.
- Si la API no está disponible, el sitio muestra los 24 productos locales y un aviso de conectividad.
- Los precios de demostración están en PEN. No son precios reales ni conversiones oficiales.
- Las imágenes se cargan desde direcciones externas, con SVG de reemplazo cuando fallen.
