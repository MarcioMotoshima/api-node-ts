import { z } from 'zod'

export const CreateUserAdminSchema = z.object({
  name: z.string(),
  cpf: z.string().min(14),
  email: z.string().email('Email inválido'),
  mobile: z.string().min(15),
  userId: z.number()
})

export type CreateUserAdminDto = z.infer<typeof CreateUserAdminSchema>
