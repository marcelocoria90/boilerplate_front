// services/invoices.js
import { http } from '../lib/http'
import { PaginatedInvoicesSchema } from '../models/PaginatedInvoices.schema'

const MOCK_INVOICES = [
  {
    id: '1',
    code: 'INV-001',
    status: 'Paid',
    method: 'Credit Card',
    amount: 100,
  },
  {
    id: '2',
    code: 'INV-002',
    status: 'Pending',
    method: 'Bank Transfer',
    amount: 200,
  },
  { id: '3', code: 'INV-003', status: 'Void', method: 'Cash', amount: 50 },
  {
    id: '4',
    code: 'INV-004',
    status: 'Paid',
    method: 'Credit Card',
    amount: 1200,
  },
  {
    id: '5',
    code: 'INV-005',
    status: 'Pending',
    method: 'Credit Card',
    amount: 700,
  },
  {
    id: '6',
    code: 'INV-001',
    status: 'Paid',
    method: 'Credit Card',
    amount: 100,
  },
  {
    id: '7',
    code: 'INV-002',
    status: 'Pending',
    method: 'Bank Transfer',
    amount: 200,
  },
  { id: '8', code: 'INV-003', status: 'Void', method: 'Cash', amount: 50 },
  {
    id: '9',
    code: 'INV-004',
    status: 'Paid',
    method: 'Credit Card',
    amount: 1200,
  },
  {
    id: '10',
    code: 'INV-005',
    status: 'Pending',
    method: 'Credit Card',
    amount: 700,
  },
  {
    id: '11',
    code: 'INV-001',
    status: 'Paid',
    method: 'Credit Card',
    amount: 100,
  },
  {
    id: '12',
    code: 'INV-002',
    status: 'Pending',
    method: 'Bank Transfer',
    amount: 200,
  },
  { id: '13', code: 'INV-003', status: 'Void', method: 'Cash', amount: 50 },
  {
    id: '14',
    code: 'INV-004',
    status: 'Paid',
    method: 'Credit Card',
    amount: 1200,
  },
  {
    id: '15',
    code: 'INV-005',
    status: 'Pending',
    method: 'Credit Card',
    amount: 700,
  },
  {
    id: '16',
    code: 'INV-001',
    status: 'Paid',
    method: 'Credit Card',
    amount: 100,
  },
  {
    id: '17',
    code: 'INV-002',
    status: 'Pending',
    method: 'Bank Transfer',
    amount: 200,
  },
  { id: '18', code: 'INV-003', status: 'Void', method: 'Cash', amount: 50 },
  {
    id: '19',
    code: 'INV-004',
    status: 'Paid',
    method: 'Credit Card',
    amount: 1200,
  },
  {
    id: '20',
    code: 'INV-005',
    status: 'Pending',
    method: 'Credit Card',
    amount: 700,
  },
]

export async function fetchInvoices(params = {}) {
  const { page = 1, pageSize = 10, search = '', sort = 'amount:desc' } = params

  const mode = import.meta?.env?.VITE_API_MODE || 'mock'
  // 🔁 MOCK MODE
  if (mode === 'mock') {
    const q = search.trim().toLowerCase()

    // Buscar por code o method
    const filtered = MOCK_INVOICES.filter(
      (inv) =>
        inv.code.toLowerCase().includes(q) ||
        inv.method.toLowerCase().includes(q)
    )

    // Orden simple: "field:dir"
    const [field, dir = 'asc'] = sort.split(':')
    const sorted = [...filtered].sort((a, b) => {
      const va = a[field]
      const vb = b[field]
      if (va == null && vb == null) return 0
      if (va == null) return 1
      if (vb == null) return -1
      if (typeof va === 'number' && typeof vb === 'number') {
        return dir === 'asc' ? va - vb : vb - va
      }
      return dir === 'asc'
        ? String(va).localeCompare(String(vb))
        : String(vb).localeCompare(String(va))
    })

    const start = (page - 1) * pageSize
    const data = sorted.slice(start, start + pageSize)
    const total = filtered.length

    return PaginatedInvoicesSchema.parse({ data, total })
  }

  // 🌐 REAL API
  const res = await http.get('/invoices', { params })
  // Asumimos que el backend ya devuelve { data: Invoice[], total: number }
  return PaginatedInvoicesSchema.parse(res.data)
}
