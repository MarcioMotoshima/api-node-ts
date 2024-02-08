import { z } from 'zod'

export const RegisterEmailSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string()
})

export type RegisterEmailDto = z.infer<typeof RegisterEmailSchema>
