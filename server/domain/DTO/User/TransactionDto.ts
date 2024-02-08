import { z } from 'zod'

export const TransactionSchema = z.object({
  id: z.number(),
  type: z.number(),
  userId: z.number(),
  value: z.string()
})

export type TransactionDto = z.infer<typeof TransactionSchema>
