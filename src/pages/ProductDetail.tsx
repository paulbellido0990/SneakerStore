import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { obtenerProducto } from '../api/products';
import { ProductCard } from '../components/ProductCard';
import { ProductoImagen } from '../components/ProductoImagen';
import { useFavoritos } from '../context/Favoritos';
import { seleccion } from '../data/catalogo';
import { soles } from '../utils/format';

export function ProductDetail() {
  const { id } = useParams<{id:string}>();
  const [imagen, setImagen] = useState(0);
  const [mensaje, setMensaje] = useState('');
  const { esFavorito, alternar } = useFavoritos();
  const query = useQuery({
    queryKey: ['producto', id],
    queryFn: () => obtenerProducto(id!),
    enabled: Boolean(id),
    retry: (intentos, error) => !(axios.isAxiosError(error) && error.response?.status === 404) && intentos < 1,
  });
  useEffect(() => { setImagen(0); setMensaje(''); window.scrollTo({top:0,behavior:'auto'}); }, [id]);
  if (!id) return <section className="container status-page"><h1>Dirección inválida</h1><Link to="/">Volver al catálogo</Link></section>;
  if (query.isPending) return <section className="container status-page"><div className="loading-spinner"/><h2>Cargando los detalles de la zapatilla…</h2></section>;
  if (query.isError || !query.data) return <section className="container status-page"><span className="feedback-icon">!</span><h1>Producto no disponible</h1><p>{axios.isAxiosError(query.error) && query.error.response?.status === 404 ? 'No encontramos una zapatilla con ese código.' : query.error instanceof Error ? query.error.message : 'No fue posible consultar el producto.'}</p><div className="status-actions"><button className="primary-btn" onClick={()=>void query.refetch()}>Reintentar</button><Link className="outline-btn" to="/">Ir al catálogo</Link></div></section>;
  const p = query.data;
  const recomendados = seleccion.filter(x=>x.marca===p.marca && x.id!==p.id).slice(0,3);
  return <>
    <div className="container breadcrumbs"><Link to="/">Inicio</Link><span>/</span><Link to={`/?marca=${encodeURIComponent(p.marca)}#catalogo`}>{p.marca}</Link><span>/</span><span>{p.nombre}</span></div>
    <section className="container detail-section"><div className="detail-grid">
      <div className="detail-gallery"><div className="detail-image"><ProductoImagen src={p.imagenes[imagen] ?? p.imagen} alt={`Fotografía de ${p.nombre}`} prioridad/>{p.etiqueta && <span className="detail-tag">{p.etiqueta}</span>}</div>{p.imagenes.length > 1 && <div className="detail-thumbnails">{p.imagenes.slice(0,5).map((url,i)=><button type="button" key={`${url}-${i}`} aria-label={`Ver imagen ${i+1}`} aria-pressed={imagen===i} className={imagen===i?'active':''} onClick={()=>setImagen(i)}><ProductoImagen src={url} alt={`Miniatura de ${p.nombre}`}/></button>)}</div>}</div>
      <div className="detail-copy"><div className="detail-overline">{p.marca.toUpperCase()} <span>·</span> COLECCIÓN {p.estilo.toUpperCase()}</div><h1>{p.nombre}</h1><p className="detail-sku">Código de referencia: {p.codigo}</p>
        <div className="detail-pricing"><strong>{soles(p.precio)}</strong>{p.anterior && <s>{soles(p.anterior)}</s>}</div><div className="detail-price-note">Precio referencial en soles peruanos (PEN)</div>
        <hr/><h3>Descripción del modelo</h3><p className="detail-description">{p.descripcion}</p>
        <div className="spec-grid"><div><span>Marca</span><strong>{p.marca}</strong></div><div><span>Género</span><strong>{p.genero}</strong></div><div><span>Estilo</span><strong>{p.estilo}</strong></div><div><span>Color</span><strong>{p.color}</strong></div></div>
        <div className="detail-actions"><button className={`primary-btn save-btn ${esFavorito(p.id)?'saved':''}`} onClick={()=>alternar(p.id)}>{esFavorito(p.id)?'♥ Guardado en favoritos':'♡ Guardar en favoritos'}</button><button className="outline-btn" onClick={async()=>{try {await navigator.clipboard.writeText(window.location.href);setMensaje('¡Enlace copiado!');} catch {setMensaje('Copia la dirección desde la barra del navegador.');}}}>↗ Compartir</button></div>{mensaje && <p className="copy-feedback" role="status">{mensaje}</p>}
        <div className="demo-alert"><strong>ⓘ Información importante</strong><p>SneakerStore es un catálogo académico. Los precios son simulados y no representan disponibilidad, ofertas o ventas reales.</p></div>
      </div>
    </div></section>
    {recomendados.length > 0 && <section className="container related"><div className="related-head"><div><span className="section-eyebrow">SIGUE EXPLORANDO</span><h2>También te puede interesar</h2></div><Link to={`/?marca=${encodeURIComponent(p.marca)}#catalogo`}>Ver más de {p.marca} ↗</Link></div><div className="related-grid">{recomendados.map(x=><ProductCard key={x.id} producto={x}/>)}</div></section>}
  </>;
}
