import { z } from 'zod'

export const ForgotPasswordSchema = z.object({
  cpf: z.string()
})

export type ForgotPasswordDto = z.infer<typeof ForgotPasswordSchema>
