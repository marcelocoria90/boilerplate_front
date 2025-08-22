// Importamos `clsx`, que permite manejar clases condicionales en forma de strings.
import { clsx } from "clsx";

// Importamos `twMerge`, que optimiza y fusiona clases de Tailwind CSS, evitando duplicados o conflictos.
import { twMerge } from "tailwind-merge";

/**
 * Función `cn` para combinar y optimizar clases de Tailwind CSS.
 * 
 * @param {...any} inputs - Lista de clases CSS o expresiones condicionales.
 * @returns {string} - Una cadena con las clases combinadas y optimizadas.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs)); // Combina clases con `clsx` y las optimiza con `twMerge`.
}
