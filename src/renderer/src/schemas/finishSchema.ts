import { z } from 'zod'

export const finishSchema = z.object({
    discount: z
        .number({ message: 'Informe um valor válido' })
        .min(0, 'O desconto não pode ser negativo')
})

export type FinishForm = z.infer<typeof finishSchema>