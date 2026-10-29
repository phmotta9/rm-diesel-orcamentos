import { z } from 'zod'

export const vehicleSchema = z.object({
    model: z.string().min(1, 'Informe o modelo do veículo'),
    plate: z.union([
        z.literal(''),
        z.string().regex(/^[A-Z]{3}\d[A-Z0-9]\d{2}$/, 'Informe uma placa válida')
    ]),
    year: z.union([
        z.literal(''),
        z.string().regex(/^\d{4}$/, 'Informe um ano com 4 dígitos')
    ]),
    engine: z.string()
})

export type VehicleForm = z.infer<typeof vehicleSchema>