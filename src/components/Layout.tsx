import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { useFavoritos } from '../context/Favoritos';
export function Layout() {
  const { ids } = useFavoritos();
  const location = useLocation();
  return <>
    <div className="announcement">EDICIÓN LABORATORIO 07 <span>·</span> CATÁLOGO DEMOSTRATIVO <span>·</span> PRECIOS REFERENCIALES EN SOLES</div>
    <header className="topbar"><div className="container header-inner">
      <Link className="wordmark" to="/" aria-label="SneakerStore, ir al inicio"><span className="logo-mark">S<span>7</span></span><span>SNEAKER<strong>STORE</strong><i>.</i></span></Link>
      <nav aria-label="Navegación principal" className="main-nav"><NavLink to="/" end>Inicio</NavLink><Link to="/#catalogo" onClick={() => {if(location.pathname==='/') document.getElementById('catalogo')?.scrollIntoView({behavior:'smooth'});}}>Catálogo</Link><Link to="/?marca=Nike#catalogo">Nike</Link><Link to="/?marca=New%20Balance#catalogo">New Balance</Link><Link to="/?marca=Jordan#catalogo">Jordan</Link><Link to="/?marca=Adidas#catalogo">Adidas</Link></nav>
      <Link className="header-favorites" to="/?favoritos=1#catalogo" aria-label={`${ids.length} zapatillas favoritas`}><span aria-hidden="true">♡</span><span className="heart-count">{ids.length}</span></Link>
    </div></header>
    <main><Outlet /></main>
    <footer><div className="container footer-columns"><div><Link className="footer-logo" to="/">SNEAKER<span>STORE.</span></Link><p>Un espacio para descubrir zapatillas y practicar desarrollo web con React, TypeScript y APIs REST.</p></div><div><strong>Explora</strong><Link to="/?marca=Nike#catalogo">Nike</Link><Link to="/?marca=New%20Balance#catalogo">New Balance</Link><Link to="/?marca=Jordan#catalogo">Jordan</Link><Link to="/?marca=Adidas#catalogo">Adidas</Link></div><div><strong>Sobre el proyecto</strong><p>UNSCH · Desarrollo Web · Laboratorio 07</p><p>Catálogo académico sin ventas ni stock real.</p><p>Precios en soles solo con fines ilustrativos.</p></div></div><div className="container footer-bottom"><span>© 2026 SneakerStore · Proyecto de demostración</span><span>Hecho con React + TypeScript</span></div></footer>
  </>;
}
