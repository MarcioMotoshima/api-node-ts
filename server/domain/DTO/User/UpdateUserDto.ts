import { z } from 'zod'

export const UpdateUserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email('Email inválido'),
  cpf: z.string(),
  mobile: z.string()
})

export type UpdateUserDto = z.infer<typeof UpdateUserSchema>
