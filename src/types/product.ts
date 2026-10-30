export type Marca = 'Nike' | 'New Balance' | 'Jordan' | 'Adidas';
export type Genero = 'Hombre' | 'Mujer' | 'Unisex';
export type Estilo = 'Urbano' | 'Running' | 'Baloncesto';

export interface Zapatilla {
  id: string;
  nombre: string;
  marca: Marca;
  genero: Genero;
  estilo: Estilo;
  precio: number;
  anterior?: number;
  descripcion: string;
  color: string;
  imagen: string;
  imagenes: string[];
  etiqueta?: string;
  codigo: string;
  origen: 'seleccion' | 'api';
}

export interface RespuestaProductos {
  products: ProductoApi[];
  total: number;
  skip: number;
  limit: number;
}
export interface ProductoApi {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  brand?: string;
  thumbnail: string;
  images?: string[];
}
