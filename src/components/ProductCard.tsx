import { Link } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { obtenerProducto } from '../api/products';
import { useFavoritos } from '../context/Favoritos';
import type { Zapatilla } from '../types/product';
import { soles } from '../utils/format';
import { ProductoImagen } from './ProductoImagen';

export function ProductCard({ producto }: { producto: Zapatilla }) {
  const cache = useQueryClient();
  const { alternar, esFavorito } = useFavoritos();
  const favorito = esFavorito(producto.id);
  const precargar = () => void cache.prefetchQuery({
    queryKey: ['producto', producto.id], queryFn: () => obtenerProducto(producto.id), staleTime: 5 * 60_000
  });
  return <article className="product-card">
    <Link className="image-link" to={`/producto/${producto.id}`} onMouseEnter={precargar} onFocus={precargar} aria-label={`Ver ${producto.nombre}`}>
      <div className="product-image">
        <ProductoImagen src={producto.imagen} alt={`Zapatilla ${producto.marca} ${producto.nombre}`} />
        {producto.etiqueta && <span className="product-tag">{producto.etiqueta}</span>}
        <span className="product-open" aria-hidden="true">↗</span>
      </div>
    </Link>
    <button type="button" aria-label={favorito ? 'Quitar de favoritos':'Añadir a favoritos'} aria-pressed={favorito} title={favorito ? 'Quitar de favoritos':'Guardar en favoritos'} className={`favorite-btn ${favorito ? 'selected':''}`} onClick={() => alternar(producto.id)}>{favorito ? '♥':'♡'}</button>
    <div className="product-info">
      <div className="product-meta"><span>{producto.marca}</span><span>{producto.genero}</span></div>
      <Link to={`/producto/${producto.id}`} onMouseEnter={precargar}><h3>{producto.nombre}</h3></Link>
      <p className="product-type">{producto.estilo} · {producto.color}</p>
      <div className="product-bottom"><div><strong>{soles(producto.precio)}</strong>{producto.anterior && <s>{soles(producto.anterior)}</s>}</div><Link aria-label={`Ver detalles de ${producto.nombre}`} className="circle-arrow" to={`/producto/${producto.id}`}>↗</Link></div>
    </div>
  </article>;
}
