import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ProveedorFavoritos } from './context/Favoritos';
import { Catalog } from './pages/Catalog';
import { ProductDetail } from './pages/ProductDetail';
import './styles.css';
const client = new QueryClient({ defaultOptions: { queries: { retry: 1, staleTime: 5 * 60_000, refetchOnWindowFocus: false } } });
const router = createBrowserRouter([{path: '/', element: <Layout />, children: [
  { index: true, element: <Catalog /> },
  { path: 'producto/:id', element: <ProductDetail /> },
  { path: '*', element: <section className="container status-page"><h1>Esta página no existe.</h1><p>La dirección que ingresaste no corresponde a nuestro catálogo.</p><Link className="primary-btn" to="/">Volver al inicio</Link></section> }
]}]);
ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><QueryClientProvider client={client}><ProveedorFavoritos><RouterProvider router={router}/></ProveedorFavoritos></QueryClientProvider></React.StrictMode>);
