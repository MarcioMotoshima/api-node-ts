import { z } from 'zod'

export const LoginDTOSchema = z.object({
  cpf: z.string(),
  password: z.string(),
  ip: z.string().optional()
})

export type LoginDTO = z.infer<typeof LoginDTOSchema>
