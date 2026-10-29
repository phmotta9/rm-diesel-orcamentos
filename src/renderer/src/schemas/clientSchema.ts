import { z } from 'zod'

export const clientSchema = z.object({
    name: z.string().min(1, 'Informe o nome do cliente'),
    cpfCnpj: z.union([
        z.literal(''),
        z.string().regex(
            /^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2})$/,
            'Informe um CPF ou CNPJ completo'
        )
    ]),
    telephone: z
        .string()
        .regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, 'Informe um telefone completo'),
    email: z.email('E-mail inválido').or(z.literal('')),
    address: z.string()
})

export type ClientForm = z.infer<typeof clientSchema>