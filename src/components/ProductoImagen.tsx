import { useEffect, useState } from 'react';
export function ProductoImagen({ src, alt, className = '', prioridad = false }: { src: string; alt: string; className?: string; prioridad?: boolean }) {
  const [fallo, setFallo] = useState(false);
  useEffect(() => setFallo(false), [src]);
  return <img className={className} src={fallo ? '/zapatilla-placeholder.svg' : src} alt={alt} loading={prioridad ? 'eager':'lazy'} onError={() => setFallo(true)}/>;
}
