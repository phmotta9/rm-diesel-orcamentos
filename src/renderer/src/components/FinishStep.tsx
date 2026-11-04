import { FileText, MoveLeft, Download, TriangleAlert } from 'lucide-react'
import { Alert, Box, Button, InputAdornment, TextField, Typography } from "@mui/material";
import { pdf } from '@react-pdf/renderer';
import { useBudgetStore } from '@renderer/store/budgetStore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { finishSchema, FinishForm } from '@renderer/schemas/finishSchema';
import { calcTotals, formatCurrency } from '@renderer/utils/totals';
import { BudgetPdf } from './BudgetPdf';

const labelSx = { display: 'block', mb: 1, fontWeight: 600 }

const fieldSx = {
    '& .MuiInputBase-root': { height: 48 },
}

const buttonSx = {
    py: 1.4,
    px: 3.5,
    textTransform: 'none',
}

const toNumber = (value: unknown): number => {
    const n = Number(value)
    return Number.isFinite(n) && n > 0 ? n : 0
}

type FinishStepProps = {
    onBack: () => void
}

export function FinishStep({ onBack }: FinishStepProps): React.JSX.Element {
    const client = useBudgetStore((state) => state.client)
    const vehicle = useBudgetStore((state) => state.vehicle)
    const tests = useBudgetStore((state) => state.tests)
    const parts = useBudgetStore((state) => state.parts)
    const discount = useBudgetStore((state) => state.discount)
    const setDiscount = useBudgetStore((state) => state.setDiscount)
    const resetServices = useBudgetStore((state) => state.resetServices)

    const { register, handleSubmit, formState: { errors } } = useForm<FinishForm>({
        resolver: zodResolver(finishSchema),
        defaultValues: { discount },
    })

    const totals = calcTotals(tests, parts, discount)
    const discountTooHigh = discount > totals.subtotal

    const onSubmit = async (): Promise<void> => {
        if (discountTooHigh) return

        const blob = await pdf(
            <BudgetPdf
                client={client}
                vehicle={vehicle}
                tests={tests}
                parts={parts}
                discount={discount}
            />
        ).toBlob()

        const data = await blob.arrayBuffer()
        const fileName = `orcamento-${client.name.trim().replace(/[^a-zA-Z0-9]+/g, '-')}.pdf`

        await window.api.savePdf(data, fileName)
    }

    const handleBack = (): void => {
        resetServices()
        setDiscount(0)
        onBack()
    }

    return (
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}
            sx={{ backgroundColor: 'background.paper', borderRadius: 1, border: '1px solid', borderColor: 'divider', p: 3 }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
                <FileText height={40} width={40} />

                <Box>
                    <Typography component="h2" sx={{ color: 'text.primary', fontWeight: 600, fontSize: 20 }}>
                        Finalizar orçamento
                    </Typography>

                    <Typography sx={{ color: 'text.secondary' }}>
                        Aplique um desconto, se houver, e revise os valores.
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ maxWidth: 320 }}>
                <Typography component="label" htmlFor="discount" sx={labelSx}>
                    Desconto
                </Typography>
                <TextField
                    id="discount"
                    type="number"
                    fullWidth
                    placeholder="0,00 (opcional)"
                    sx={fieldSx}
                    {...register('discount', {
                        setValueAs: toNumber,
                        onChange: (e) => setDiscount(toNumber(e.target.value)),
                    })}
                    error={!!errors.discount || discountTooHigh}
                    helperText={
                        errors.discount?.message ??
                        (discountTooHigh ? 'O desconto não pode ser maior que o subtotal' : undefined)
                    }
                    slotProps={{
                        input: {
                            startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                        },
                        htmlInput: { min: 0, step: '0.01' },
                    }}
                />
            </Box>

            <Box sx={{ mt: 3, maxWidth: 320, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ color: 'text.secondary' }}>Subtotal</Typography>
                    <Typography>{formatCurrency(totals.subtotal)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ color: 'text.secondary' }}>Desconto</Typography>
                    <Typography>{formatCurrency(totals.discount)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontWeight: 700 }}>Total</Typography>
                    <Typography sx={{ fontWeight: 700 }}>{formatCurrency(totals.total)}</Typography>
                </Box>
            </Box>

            <Alert
                severity="warning"
                icon={<TriangleAlert size={20} />}
                sx={{ mt: 3 }}
            >
                Revise todos os dados do orçamento na prévia ao lado antes de salvar o PDF.
            </Alert>

            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Button
                    type="button"
                    variant="outlined"
                    startIcon={<MoveLeft />}
                    onClick={handleBack}
                    sx={{ ...buttonSx, color: 'text.secondary', borderColor: 'text.secondary' }}
                >
                    Voltar
                </Button>

                <Button
                    type="submit"
                    variant="contained"
                    startIcon={<Download size={20} />}
                    sx={buttonSx}
                >
                    Salvar PDF
                </Button>
            </Box>
        </Box>
    )
}