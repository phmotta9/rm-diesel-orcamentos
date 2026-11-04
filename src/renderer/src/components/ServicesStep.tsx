import { Wrench, MoveRight, MoveLeft, Plus, Trash2 } from 'lucide-react'
import { Alert, Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { useBudgetStore } from '@renderer/store/budgetStore';
import { Control, UseFormRegister, FieldErrors, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { servicesSchema, ServicesForm } from '@renderer/schemas/servicesSchema';

const fieldSx = {
    '& .MuiInputBase-root': { height: 48 },
}

const buttonSx = {
    py: 1.4,
    px: 3.5,
    textTransform: 'none',
}

const rowSx = {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 2fr) 90px 140px 140px 48px',
    columnGap: 2,
    alignItems: 'start',
}

const formatCurrency = (value: number): string =>
    (Number.isFinite(value) ? value : 0).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    })

type SectionProps = {
    name: 'tests' | 'parts'
    title: string
    addLabel: string
    placeholder: string
    control: Control<ServicesForm>
    register: UseFormRegister<ServicesForm>
    errors: FieldErrors<ServicesForm>
}

function ItemsSection({ name, title, addLabel, placeholder, control, register, errors }: SectionProps): React.JSX.Element {
    const { fields, append, remove } = useFieldArray({ control, name })
    const items = useWatch({ control, name })

    return (
        <Box sx={{ mt: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography component="h3" sx={{ color: 'text.primary', fontWeight: 600, fontSize: 16 }}>
                    {title}
                </Typography>

                <Button
                    type="button"
                    variant="outlined"
                    startIcon={<Plus size={18} />}
                    onClick={() => append({ description: '', quantity: 1, unitPrice: 0 })}
                    sx={{ textTransform: 'none' }}
                >
                    {addLabel}
                </Button>
            </Box>

            {fields.length === 0 && (
                <Typography sx={{ color: 'text.secondary' }}>Nenhum item adicionado.</Typography>
            )}

            {fields.length > 0 && (
                <Box sx={{ ...rowSx, mb: 1 }}>
                    <Typography sx={{ fontWeight: 600 }}>Descrição</Typography>
                    <Typography sx={{ fontWeight: 600 }}>Qtd.</Typography>
                    <Typography sx={{ fontWeight: 600 }}>Valor unit.</Typography>
                    <Typography sx={{ fontWeight: 600 }}>Valor total</Typography>
                    <span />
                </Box>
            )}

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {fields.map((field, index) => {
                    const item = items?.[index]
                    const total = (Number(item?.quantity) || 0) * (Number(item?.unitPrice) || 0)
                    const itemErrors = errors[name]?.[index]

                    return (
                        <Box key={field.id} sx={rowSx}>
                            <TextField
                                fullWidth
                                placeholder={placeholder}
                                sx={fieldSx}
                                {...register(`${name}.${index}.description`)}
                                error={!!itemErrors?.description}
                                helperText={itemErrors?.description?.message}
                            />

                            <TextField
                                type="number"
                                sx={fieldSx}
                                {...register(`${name}.${index}.quantity`, { valueAsNumber: true })}
                                error={!!itemErrors?.quantity}
                                helperText={itemErrors?.quantity?.message}
                                slotProps={{ htmlInput: { min: 1, step: 1 } }}
                            />

                            <TextField
                                type="number"
                                sx={fieldSx}
                                {...register(`${name}.${index}.unitPrice`, { valueAsNumber: true })}
                                error={!!itemErrors?.unitPrice}
                                helperText={itemErrors?.unitPrice?.message}
                                slotProps={{ htmlInput: { min: 0, step: '0.01' } }}
                            />

                            <TextField
                                value={formatCurrency(total)}
                                sx={fieldSx}
                                slotProps={{ htmlInput: { readOnly: true } }}
                            />

                            <IconButton
                                aria-label="Remover item"
                                onClick={() => remove(index)}
                                sx={{ height: 48, width: 48 }}
                            >
                                <Trash2 size={20} />
                            </IconButton>
                        </Box>
                    )
                })}
            </Box>
        </Box>
    )
}

type ServicesStepProps = {
    onNext: () => void
    onBack: () => void
}

export function ServicesStep({ onNext, onBack }: ServicesStepProps): React.JSX.Element {
    const tests = useBudgetStore((state) => state.tests)
    const parts = useBudgetStore((state) => state.parts)
    const setServices = useBudgetStore((state) => state.setServices)
    const resetVehicle = useBudgetStore((state) => state.resetVehicle)

    const { register, control, handleSubmit, formState: { errors } } = useForm<ServicesForm>({
        resolver: zodResolver(servicesSchema),
        defaultValues: { tests, parts },
    })

    const onSubmit = (data: ServicesForm): void => {
        setServices(data)
        onNext()
    }

    const handleBack = (): void => {
        resetVehicle()
        onBack()
    }

    return (
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}
            sx={{ backgroundColor: 'background.paper', borderRadius: 1, border: '1px solid', borderColor: 'divider', p: 3 }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
                <Wrench height={40} width={40} />

                <Box>
                    <Typography component="h2" sx={{ color: 'text.primary', fontWeight: 600, fontSize: 20 }}>
                        Peças e serviços
                    </Typography>

                    <Typography sx={{ color: 'text.secondary' }}>
                        Adicione os testes, as peças e os serviços do orçamento.
                    </Typography>
                </Box>
            </Box>

            <ItemsSection
                name="tests"
                title="Testes"
                addLabel="Adicionar teste"
                placeholder="Ex: Diagnóstico eletrônico"
                control={control}
                register={register}
                errors={errors}
            />

            <ItemsSection
                name="parts"
                title="Peças e serviços"
                addLabel="Adicionar peça/serviço"
                placeholder="Ex: Filtro de óleo do motor"
                control={control}
                register={register}
                errors={errors}
            />

            <Alert
                severity="info"
                sx={{
                    mt: 3,
                    backgroundColor: 'action.hover',
                    color: 'text.secondary',
                    '& .MuiAlert-icon': { color: 'text.secondary' },
                }}
            >
                Esses dados serão exibidos no PDF do orçamento.
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

                <Button type="submit" variant="contained" endIcon={<MoveRight />} sx={buttonSx}>
                    Continuar
                </Button>
            </Box>
        </Box>
    )
}