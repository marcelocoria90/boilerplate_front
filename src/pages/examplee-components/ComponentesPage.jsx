import LoginCard from '../auth/login/components/Login.jsx'
import EmailManager from './components/EmailManager.jsx'

import { useMemo, useState } from 'react'
import { useInvoices } from '../../hooks/useInvoices.js'

import { TableGrid } from './components/TableGrid.jsx'
import { SearchBar } from './components/SearchBar.jsx'
import { Paginacion } from './components/Paginacion.jsx'
import { TextBox } from './components/TextBox.jsx'
import { Calendar } from '../../components/ui/calendar.jsx'
import { CalendarForm } from './components/FormCalendar.jsx'

const PAGE_SIZE = 3

export default function ComponentesPage() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('amount:desc')
  const [date, setDate] = useState(new Date())

  const query = useMemo(
    () => ({ page, pageSize: PAGE_SIZE, search, sort }),
    [page, search, sort]
  )
  const { data, isLoading, isError, error, refetch } = useInvoices(query)

  const total = data?.total ?? 0
  const rows = data?.data ?? []
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  return (
    <>
      <div className="flex justify-center items-center">
        <TextBox text={'⚡ Componentes ⚡'} variant={'title'} />
      </div>

      <div className="flex items-center justify-between mt-4">
        <CalendarForm />

        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-lg border"
        />
        <Calendar className="w-80" />
      </div>

      <div className="flex flex-col justify-center">
        <div className="flex justify-start gap-2 items-center mt-4">
          <SearchBar
            search={search}
            setSearch={setSearch}
            isLoading={isLoading}
            refetch={refetch}
            setPage={setPage}
          />
        </div>
        <div className="items-center mt-4 rounded-md border p-2 text-sm text-muted-foreground">
          <TableGrid
            setSort={setSort}
            sort={sort}
            isLoading={isLoading}
            isError={isError}
            error={error}
            rows={rows}
            page={page}
          />
        </div>
      </div>

      {/* Paginación */}
      <div className="flex items-center justify-between mt-4">
        <Paginacion
          page={page}
          totalPages={totalPages}
          total={total}
          setPage={setPage}
        />
      </div>

      <div className="flex flex-row justify-center items-center mt-4">
        <EmailManager />
      </div>
      <div className="flex flex-row justify-center items-center mt-4">
        <LoginCard />
      </div>
      <div>
        <p className="text-center mt-4">
          Esta página es un ejemplo de cómo se pueden integrar componentes
          personalizados y manejar la lógica de compoenentes en una aplicación
          React.
        </p>
      </div>
    </>
  )
}
