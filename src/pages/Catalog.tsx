import { useCallback, useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { obtenerCatalogo } from '../api/products';
import { ProductCard } from '../components/ProductCard';
import { ProductoImagen } from '../components/ProductoImagen';
import { useFavoritos } from '../context/Favoritos';
import { seleccion } from '../data/catalogo';
import { useDebounce } from '../hooks/useDebounce';
import type { Marca, Zapatilla } from '../types/product';
import { cuenta } from '../utils/format';

const POR_PAGINA = 8;
const marcas: Marca[] = ['Nike', 'Adidas', 'Jordan', 'New Balance'];
const hero = seleccion.find(p => p.id === 's-jd-01')!;
const ordenMarcas: Marca[] = ['Jordan', 'Nike', 'Adidas', 'New Balance'];
function ordenarInicio(productos: Zapatilla[]): Zapatilla[] {
  const elegidos = Array.from({ length: 6 }, (_, i) => ordenMarcas
    .map(marca => productos.filter(p => p.origen === 'seleccion' && p.marca === marca)[i])
    .filter((p): p is Zapatilla => Boolean(p))).flat();
  const otros = productos.filter(p => p.origen === 'api');
  return [...elegidos, ...otros];
}

export function Catalog() {
  const [params, setParams] = useSearchParams();
  const cache = useQueryClient();
  const { ids } = useFavoritos();
  const texto = params.get('buscar') ?? '';
  const marca = params.get('marca') ?? 'Todas';
  const genero = params.get('genero') ?? 'Todos';
  const estilo = params.get('estilo') ?? 'Todos';
  const orden = params.get('orden') ?? 'relevancia';
  const rango = params.get('precio') ?? 'todos';
  const soloFavoritos = params.get('favoritos') === '1';
  const paginaParam = Number(params.get('pagina') || '1');
  const pagina = Number.isSafeInteger(paginaParam) && paginaParam >= 1 ? paginaParam : 1;
  const [entrada, setEntrada] = useState(texto);
  const busquedaEstable = useDebounce(entrada, 400);

  const modificar = useCallback((cambios: Record<string, string | null>, reemplazar = false) => {
    setParams(actual => {
      const nuevo = new URLSearchParams(actual);
      Object.entries(cambios).forEach(([clave, valor]) => {
        if (valor && valor !== 'Todas' && valor !== 'Todos' && valor !== 'todos' && valor !== 'relevancia') nuevo.set(clave, valor);
        else nuevo.delete(clave);
      });
      if (!('pagina' in cambios)) nuevo.delete('pagina');
      return nuevo;
    }, { replace: reemplazar, preventScrollReset: true });
  }, [setParams]);

  useEffect(() => setEntrada(texto), [texto]);
  useEffect(() => {
    if (busquedaEstable.trim() !== texto) modificar({ buscar: busquedaEstable.trim() }, true);
  }, [busquedaEstable]); // No sobrescribir la URL al retroceder/avanzar en el navegador.

  useEffect(() => {
    if (window.location.hash === '#catalogo') {
      const id = window.requestAnimationFrame(() => document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' }));
      return () => window.cancelAnimationFrame(id);
    }
  }, [marca, soloFavoritos]);

  const consulta = useQuery({
    queryKey: ['catalogo', 'pagina', { pagina, texto, marca, genero, estilo, orden, rango, favoritos: soloFavoritos ? ids : [] }],
    queryFn: async () => {
      const base = await cache.ensureQueryData({queryKey: ['catalogo','base'], queryFn: obtenerCatalogo, staleTime: 5 * 60_000});
      const normal = (s: string) => s.toLocaleLowerCase('es-PE').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const buscar = normal(texto.trim());
      let filtrados = ordenarInicio(base.productos).filter(p => {
        if (buscar && !normal(`${p.nombre} ${p.marca} ${p.color} ${p.estilo}`).includes(buscar)) return false;
        if (marca !== 'Todas' && p.marca !== marca) return false;
        if (genero !== 'Todos' && p.genero !== genero && p.genero !== 'Unisex') return false;
        if (estilo !== 'Todos' && p.estilo !== estilo) return false;
        if (soloFavoritos && !ids.includes(p.id)) return false;
        if (rango === 'menos-450' && p.precio >= 450) return false;
        if (rango === '450-700' && (p.precio < 450 || p.precio > 700)) return false;
        if (rango === 'mas-700' && p.precio <= 700) return false;
        return true;
      });
      if (orden === 'precio-asc') filtrados = filtrados.sort((a,b) => a.precio - b.precio);
      if (orden === 'precio-desc') filtrados = filtrados.sort((a,b) => b.precio - a.precio);
      if (orden === 'nombre') filtrados = filtrados.sort((a,b) => a.nombre.localeCompare(b.nombre, 'es'));
      const paginas = Math.max(1, Math.ceil(filtrados.length / POR_PAGINA));
      const paginaActual = Math.min(pagina, paginas);
      return {
        items: filtrados.slice((paginaActual - 1) * POR_PAGINA, paginaActual * POR_PAGINA),
        encontrados: filtrados.length,
        total: base.productos.length,
        paginas,
        paginaActual,
        fuente: base.fuente,
      };
    },
    placeholderData: anterior => anterior,
  });

  function cambiarPagina(nueva: number) {
    modificar({pagina: String(nueva)});
    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
  }
  const { data } = consulta;
  const filtrosActivos = [texto, marca !== 'Todas', genero !== 'Todos', estilo !== 'Todos', rango !== 'todos', soloFavoritos].some(Boolean);

  return <>
    <section className="hero"><div className="container hero-layout"><div className="hero-copy">
      <div className="hero-kicker"><span className="kicker-dash"/> UNA NUEVA FORMA DE DESCUBRIR</div>
      <h1>Tu estilo.<br/><span>Tus zapatillas.</span></h1>
      <p>Los pares que marcan tendencia, en un solo lugar. Explora Nike, Adidas, Jordan y New Balance con precios referenciales en soles.</p>
      <div className="hero-actions"><a className="primary-btn" href="#catalogo">Explorar colección <span>↗</span></a><span className="hero-side-note"><strong>24+</strong> modelos para descubrir</span></div>
      <div className="hero-micro"><span><b>04</b> marcas icónicas</span><i/><span>Catálogo de demostración</span></div>
    </div><div className="hero-visual"><div className="hero-rings"/><div className="hero-image-back"><ProductoImagen src={hero.imagen} alt="Air Jordan 1 Chicago rojo, blanco y negro" prioridad/></div><span className="hero-floating floating-top">EDICIÓN<br/><b>URBAN / 26</b></span><span className="hero-floating floating-bottom">01 / <b>ESTILO SIN LÍMITES</b></span></div></div></section>

    <section className="brands-section"><div className="container"><div className="brands-heading"><span>ELIGE TU MARCA</span><span>Cuatro nombres, infinitos estilos</span></div><div className="brand-grid">{marcas.map((m,i) => <button type="button" key={m} className={`brand-tile ${marca===m?'active':''}`} onClick={() => {modificar({marca:m}); document.getElementById('catalogo')?.scrollIntoView({behavior:'smooth'});}}><span className="brand-index">0{i+1}</span><strong>{m}</strong><span className="brand-arrow">↗</span></button>)}</div></div></section>

    <section id="catalogo" className="container catalog-section">
      <div className="catalog-heading"><div><span className="section-eyebrow">CATÁLOGO / COLECCIÓN 2026</span><h2>Encuentra tu próximo par<span>.</span></h2><p>Filtra por tu marca favorita, estilo o presupuesto.</p></div><div className="catalog-count"><span className="count-dot"/><strong>{data ? cuenta(data.encontrados) : '—'}</strong> modelos encontrados</div></div>
      <div className="catalog-layout"><aside className="sidebar"><div className="side-heading"><h3>Filtros</h3>{filtrosActivos && <button type="button" onClick={()=>{setEntrada('');setParams({}, {preventScrollReset:true});}}>Limpiar todo</button>}</div>
        <label className="filter-label" htmlFor="buscar-zapatillas">BUSCAR</label><div className="search-field"><span aria-hidden="true">⌕</span><input id="buscar-zapatillas" value={entrada} onChange={e=>setEntrada(e.target.value)} placeholder="Modelo, marca, color..." autoComplete="off" />{entrada && <button aria-label="Borrar búsqueda" onClick={()=>setEntrada('')}>×</button>}</div>
        <div className="filter-group"><div className="filter-label">MARCAS</div><div className="brand-options">{['Todas', ...marcas].map(m=><button type="button" key={m} onClick={()=>modificar({marca:m==='Todas'?null:m})} className={marca===m?'chosen':''}><span className="option-radio"/>{m}<span className="option-count">{m==='Todas'?'04':''}</span></button>)}</div></div>
        <div className="filter-group"><label htmlFor="filtrar-genero" className="filter-label">GÉNERO</label><select id="filtrar-genero" value={genero} onChange={e=>modificar({genero:e.target.value})}><option>Todos</option><option>Hombre</option><option>Mujer</option><option>Unisex</option></select></div>
        <div className="filter-group"><label htmlFor="filtrar-estilo" className="filter-label">ESTILO</label><select id="filtrar-estilo" value={estilo} onChange={e=>modificar({estilo:e.target.value})}><option>Todos</option><option>Urbano</option><option>Running</option><option>Baloncesto</option></select></div>
        <div className="filter-group"><label htmlFor="filtrar-precio" className="filter-label">PRECIO EN SOLES</label><select id="filtrar-precio" value={rango} onChange={e=>modificar({precio:e.target.value})}><option value="todos">Todos los precios</option><option value="menos-450">Menos de S/ 450</option><option value="450-700">S/ 450 a S/ 700</option><option value="mas-700">Más de S/ 700</option></select></div>
        <label className="favorites-check"><input type="checkbox" checked={soloFavoritos} onChange={e=>modificar({favoritos:e.target.checked?'1':null})}/><span>♡ Ver solo mis favoritos</span></label>
        <div className="sidebar-note"><span>✦</span><strong>Una selección para ti</strong><p>Compara los modelos y guarda tus favoritos. Esta página es una demostración académica.</p></div>
      </aside>
      <div className="results-content">
        <div className="results-toolbar"><span>{consulta.isFetching && data ? 'Actualizando resultados…' : data ? `Mostrando ${data.items.length} de ${data.encontrados} resultados` : 'Buscando zapatillas…'}</span><label>Ordenar por <select aria-label="Ordenar productos" value={orden} onChange={e=>modificar({orden:e.target.value})}><option value="relevancia">Destacados</option><option value="precio-asc">Menor precio</option><option value="precio-desc">Mayor precio</option><option value="nombre">Nombre (A–Z)</option></select></label></div>
        {data?.fuente === 'sin-conexion' && <div className="source-warning"><span>ⓘ No se pudo contactar a DummyJSON. Los 24 modelos seleccionados siguen disponibles.</span><button onClick={()=>void cache.invalidateQueries({queryKey:['catalogo']})}>Reconectar</button></div>}
        {consulta.isPending ? <div className="product-grid">{Array.from({length:8},(_,i)=><div key={i} className="skeleton-card"><div/><span/><span/><span/></div>)}</div> : consulta.isError ? <div className="feedback"><span className="feedback-icon">!</span><h3>Ocurrió un error al cargar el catálogo</h3><p>{consulta.error instanceof Error ? consulta.error.message : 'Intenta nuevamente.'}</p><button className="primary-btn" onClick={()=>void consulta.refetch()}>Reintentar</button></div> : data && data.encontrados===0 ? <div className="feedback"><span className="feedback-icon">⌕</span><h3>No encontramos zapatillas</h3><p>Prueba con otra marca, búsqueda o rango de precios.</p><button className="primary-btn" onClick={()=>{setEntrada('');setParams({});}}>Borrar filtros</button></div> : <>
          <div className="product-grid">{data?.items.map(p => <ProductCard key={p.id} producto={p}/>)}</div>
          {data && data.paginas>1 && <nav aria-label="Paginación del catálogo" className="pagination"><button disabled={data.paginaActual===1} onClick={()=>cambiarPagina(data.paginaActual-1)} aria-label="Página anterior">←</button>{Array.from({length:data.paginas},(_,i)=>i+1).filter(n=>n===1 || n===data.paginas || Math.abs(n-data.paginaActual)<=1).map((n,i,arr)=><span key={n} className="page-unit">{i>0 && n-arr[i-1]>1 && <span className="page-ellipsis">…</span>}<button aria-current={n===data.paginaActual?'page':undefined} className={n===data.paginaActual?'current':''} onClick={()=>cambiarPagina(n)}>{n}</button></span>)}<button disabled={data.paginaActual===data.paginas} onClick={()=>cambiarPagina(data.paginaActual+1)} aria-label="Página siguiente">→</button></nav>}
          <div className="bottom-disclaimer">Precios en PEN (S/). Valores ficticios para prácticas académicas; pueden no coincidir con los precios oficiales. No se realizan compras ni reservas.</div>
        </>}
      </div></div>
    </section>
    <section className="end-banner"><div className="container banner-inner"><div><span className="section-eyebrow">SNEAKERSTORE / LAB 07</span><h2>El mejor estilo comienza<br/>con el próximo paso.</h2></div><a href="#catalogo" className="light-btn">Volver al catálogo ↗</a></div></section>
  </>;
}
