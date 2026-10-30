import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

type FavoritosContexto = { ids: string[]; alternar: (id: string) => void; esFavorito: (id: string) => boolean };
const Contexto = createContext<FavoritosContexto | null>(null);
const CLAVE = 'sneakerstore-favoritos-v2';
export function ProveedorFavoritos({ children }: {children: ReactNode}) {
  const [ids, setIds] = useState<string[]>(() => {
    try { const dato: unknown = JSON.parse(localStorage.getItem(CLAVE) ?? '[]'); return Array.isArray(dato) ? dato.filter((id): id is string => typeof id === 'string') : []; }
    catch { return []; }
  });
  const valor = useMemo<FavoritosContexto>(() => ({ ids,
    alternar: (id: string) => setIds(anteriores => {
      const nuevos = anteriores.includes(id) ? anteriores.filter(x=>x!==id) : [...anteriores,id];
      try { localStorage.setItem(CLAVE, JSON.stringify(nuevos)); } catch { /* navegación privada */ }
      return nuevos;
    }),
    esFavorito: (id: string) => ids.includes(id)
  }), [ids]);
  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}
export function useFavoritos() {
  const contexto = useContext(Contexto);
  if (!contexto) throw new Error('El contexto de favoritos no está disponible.');
  return contexto;
}
