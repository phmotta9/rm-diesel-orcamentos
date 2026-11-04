import { z } from 'zod'

const itemSchema = z.object({
    description: z.string().min(1, 'Informe a descrição'),
    quantity: z
        .number({ message: 'Informe a quantidade' })
        .int('Use um número inteiro')
        .min(1, 'Mínimo 1'),
    unitPrice: z
        .number({ message: 'Informe o valor' })
        .min(0, 'Valor inválido')
})

export const servicesSchema = z.object({
    tests: z.array(itemSchema),
    parts: z.array(itemSchema)
})

export type ServicesForm = z.infer<typeof servicesSchema>