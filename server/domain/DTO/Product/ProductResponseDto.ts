import { z } from 'zod'

export const ProductResponseDtoSchema = z.object({
  id: z.number().optional(),
  nome: z.string(),
  pontos: z.string(),
  usuario: z.string()
})

export type ProductResponseDto = z.infer<typeof ProductResponseDtoSchema>
