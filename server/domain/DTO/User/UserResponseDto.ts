import { z } from 'zod'

export const UserResponseSchema = z.object({
  id: z.number(),
  nome: z.string(),
  cpf: z.string(),
  email: z.string(),
  niver: z.string(),
  datac: z.string(),
  ponto: z.number()
})

export type UserResponseDto = z.infer<typeof UserResponseSchema>
