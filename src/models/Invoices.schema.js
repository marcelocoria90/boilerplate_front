import { z } from 'zod'

export const InvoiceSchema = z.object({
  id: z.string(),
  code: z.string(), // INV001
  status: z.enum(['Paid', 'Pending', 'Void']),
  method: z.string(), // "Credit Card"
  amount: z.number(), // 250.00
})
