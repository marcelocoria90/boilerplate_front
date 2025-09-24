import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'

export const SearchBar = ({
  search,
  setSearch,
  isLoading,
  refetch,
  setPage,
}) => {
  return (
    <>
      <Input
        placeholder="Buscar por código o método…"
        value={search}
        onChange={(e) => {
          setPage(1)
          setSearch(e.target.value)
        }}
        className="w-[280px]"
      />
      <Button variant="outline" onClick={() => refetch()} disabled={isLoading}>
        {isLoading ? 'Actualizando…' : 'Refrescar'}
      </Button>
    </>
  )
}
