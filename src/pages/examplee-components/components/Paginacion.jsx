import { Button } from '../../../components/ui/button'

export const Paginacion = ({
  label1 = 'Página',
  label2 = 'de',
  label3 = 'resultados',
  page,
  totalPages,
  total,
  setPage,
}) => {
  return (
    <>
      <div className="text-sm text-muted-foreground">
        {label1} {page} {label2} {totalPages} — {total} {label3}
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() => setPage(1)}
          disabled={page === 1}
        >
          « Primero
        </Button>
        <Button
          variant="outline"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          ‹ Anterior
        </Button>
        <Button
          variant="outline"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          Siguiente ›
        </Button>
        <Button
          variant="outline"
          onClick={() => setPage(totalPages)}
          disabled={page === totalPages}
        >
          Último »
        </Button>
      </div>
    </>
  )
}
