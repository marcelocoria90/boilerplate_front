import { z } from 'zod'
import { InvoiceSchema } from './Invoices.schema.js'

export const PaginatedInvoicesSchema = z.object({
  data: z.array(InvoiceSchema),
  total: z.number().int().nonnegative(),
})
