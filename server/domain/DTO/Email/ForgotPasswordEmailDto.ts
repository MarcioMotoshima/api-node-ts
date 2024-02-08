import { z } from 'zod'

export const ForgotPasswordEmailSchema = z.object({
  name: z.string(),
  email: z.string(),
  link: z.string()
})

export type ForgotPasswordEmailDto = z.infer<typeof ForgotPasswordEmailSchema>
