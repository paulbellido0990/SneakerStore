import { useEffect, useState } from 'react';
export function useDebounce<T>(valor: T, demora = 400): T {
  const [estable, setEstable] = useState(valor);
  useEffect(() => {
    const temporizador = window.setTimeout(() => setEstable(valor), demora);
    return () => window.clearTimeout(temporizador);
  }, [valor, demora]);
  return estable;
}
