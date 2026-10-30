export const soles = (precio: number): string =>
  new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN', minimumFractionDigits: 2 }).format(precio);
export const cuenta = (valor: number): string => new Intl.NumberFormat('es-PE').format(valor);
