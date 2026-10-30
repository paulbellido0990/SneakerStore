import axios from 'axios';
import type { Marca, ProductoApi, RespuestaProductos, Zapatilla, Estilo } from '../types/product';
import { seleccion } from '../data/catalogo';

export const api = axios.create({ baseURL: 'https://dummyjson.com', timeout: 7000 });

const marcas: Marca[] = ['Nike','New Balance','Jordan','Adidas'];
function reconocerMarca(p: ProductoApi): Marca | undefined {
  const nombre = `${p.brand ?? ''} ${p.title}`.toLowerCase();
  if (nombre.includes('jordan')) return 'Jordan';
  if (nombre.includes('new balance')) return 'New Balance';
  if (nombre.includes('adidas')) return 'Adidas';
  if (nombre.includes('nike')) return 'Nike';
  return undefined;
}

function adaptar(p: ProductoApi): Zapatilla | null {
  const marca = reconocerMarca(p);
  if (!marca || !marcas.includes(marca)) return null;
  if (!['mens-shoes', 'womens-shoes'].includes(p.category)) return null;
  const estilo: Estilo = marca === 'Jordan' ? 'Baloncesto' : 'Urbano';
  return {
    id: `api-${p.id}`, nombre: p.title, marca,
    genero: p.category === 'mens-shoes' ? 'Hombre' : 'Mujer', estilo,
    // El monto es ilustrativo, no una cotización ni una conversión oficial.
    precio: Math.max(149.90, Math.round((p.price * 3.7 + 80) / 10) * 10 - .10),
    descripcion: `Zapatillas ${marca} de estilo ${estilo.toLowerCase()} incluidas en el catálogo de demostración. Consulta la fotografía y los datos originales suministrados por la API pública DummyJSON.`,
    color: 'Según fotografía', imagen: p.thumbnail,
    imagenes: p.images?.length ? p.images : [p.thumbnail],
    codigo: `API-${p.id}`, origen: 'api'
  };
}

export type Fuente = 'conectada' | 'sin-conexion';
export interface CatalogoBase { productos: Zapatilla[]; fuente: Fuente; }

export async function obtenerCatalogo(): Promise<CatalogoBase> {
  const categorias = ['mens-shoes', 'womens-shoes'];
  try {
    const respuestas = await Promise.all(categorias.map(c =>
      api.get<RespuestaProductos>(`/products/category/${c}`, { params: { limit: 0 } })
    ));
    const remotos = respuestas.flatMap(r => r.data.products)
      .map(adaptar).filter((p): p is Zapatilla => Boolean(p));
    return { productos: [...seleccion, ...remotos], fuente: 'conectada' };
  } catch {
    return { productos: seleccion, fuente: 'sin-conexion' };
  }
}

export async function obtenerProducto(id: string): Promise<Zapatilla> {
  const local = seleccion.find(p => p.id === id);
  if (local) return local;
  if (!/^api-\d+$/.test(id)) throw new Error('Esta zapatilla no existe en nuestro catálogo.');
  const { data } = await api.get<ProductoApi>(`/products/${id.replace('api-', '')}`);
  const producto = adaptar(data);
  if (!producto) throw new Error('El producto solicitado no pertenece al catálogo de zapatillas.');
  return producto;
}
