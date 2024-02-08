import { z } from 'zod'

export const CreateUserSchema = z.object({
  cpf: z.string(),
  email: z.string().email('Email inválido'),
  name: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
  mobile: z.string(),
  userId: z.number(),
  loja: z.string()
})

export type CreateUserDto = z.infer<typeof CreateUserSchema>
