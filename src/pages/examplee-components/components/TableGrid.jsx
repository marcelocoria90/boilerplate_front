// ./components/TableGrid.jsx
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table'
import { Skeleton } from '../../../components/ui/skeleton' // ajustá el path si difiere

export const TableGrid = ({
  setSort,
  sort,
  isLoading,
  isError,
  error,
  rows = [],
  page, // 👈 importante: lo usamos para la key compuesta
}) => {
  // Deduplicar por id|code antes de renderizar (defensivo)
  const seen = new Set()
  const safeRows = rows.filter((r, i) => {
    const k = String(r.id ?? r.code ?? `idx-${i}`)
    if (seen.has(k)) return false
    seen.add(k)
    return true
  })

  // Helper para una key robusta y estable en paginación
  const rowKey = (inv, i) => {
    const base = String(inv.id ?? inv.code ?? `idx-${i}`)
    // si tus ids se repiten entre páginas, agregamos page
    return `${base}-p${page ?? '0'}`
  }

  // Para accesibilidad visual del sort
  const sortArrow = (field) =>
    sort.startsWith(field) ? (sort.endsWith('asc') ? '↑' : '↓') : ''

  return (
    <Table>
      <TableCaption>Listado de facturas recientes</TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead
            className="w-[140px] cursor-pointer select-none"
            aria-sort={
              sort.startsWith('code')
                ? sort.endsWith('asc')
                  ? 'ascending'
                  : 'descending'
                : 'none'
            }
            onClick={() =>
              setSort((s) => (s === 'code:asc' ? 'code:desc' : 'code:asc'))
            }
          >
            Invoice {sortArrow('code')}
          </TableHead>

          <TableHead>Status</TableHead>

          <TableHead
            className="cursor-pointer select-none"
            aria-sort={
              sort.startsWith('method')
                ? sort.endsWith('asc')
                  ? 'ascending'
                  : 'descending'
                : 'none'
            }
            onClick={() =>
              setSort((s) =>
                s === 'method:asc' ? 'method:desc' : 'method:asc'
              )
            }
          >
            Method {sortArrow('method')}
          </TableHead>

          <TableHead
            className="text-right cursor-pointer select-none"
            aria-sort={
              sort.startsWith('amount')
                ? sort.endsWith('asc')
                  ? 'ascending'
                  : 'descending'
                : 'none'
            }
            onClick={() =>
              setSort((s) =>
                s === 'amount:asc' ? 'amount:desc' : 'amount:asc'
              )
            }
          >
            Amount {sortArrow('amount')}
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <TableRow key={`sk-${page ?? 0}-${i}`}>
              <TableCell>
                <Skeleton className="h-4 w-[100px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[80px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[140px]" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-4 w-[60px] ml-auto" />
              </TableCell>
            </TableRow>
          ))
        ) : isError ? (
          <TableRow>
            <TableCell colSpan={4} className="text-red-600">
              Error cargando datos: {error?.message ?? 'desconocido'}
            </TableCell>
          </TableRow>
        ) : safeRows.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={4}
              className="text-center text-muted-foreground"
            >
              No hay resultados
            </TableCell>
          </TableRow>
        ) : (
          safeRows.map((inv, i) => (
            <TableRow key={rowKey(inv, i)}>
              <TableCell
                className="font-medium truncate max-w-[160px]"
                title={inv.code}
              >
                {inv.code}
              </TableCell>
              <TableCell className="truncate max-w-[140px]" title={inv.status}>
                {inv.status}
              </TableCell>
              <TableCell className="truncate max-w-[220px]" title={inv.method}>
                {inv.method}
              </TableCell>
              <TableCell className="text-right">
                {(inv.amount ?? 0).toLocaleString('es-AR', {
                  style: 'currency',
                  currency: 'ARS',
                })}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}
