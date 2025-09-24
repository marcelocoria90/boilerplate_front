import { useQuery } from '@tanstack/react-query'
import { fetchInvoices } from '../services/fetchInvoces'

export function useInvoices(q) {
  return useQuery({
    queryKey: ['invoices', q],
    queryFn: () => fetchInvoices(q),
    staleTime: 1000 * 30, // 30 segundos de caché
    gcTime: 1000 * 60 * 5,
    retry: 1,
  })
}
