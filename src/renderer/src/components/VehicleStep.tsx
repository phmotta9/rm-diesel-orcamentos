import { Truck, MoveRight, MoveLeft } from 'lucide-react'
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { useBudgetStore } from '@renderer/store/budgetStore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { vehicleSchema, VehicleForm } from '@renderer/schemas/vehicleSchema';
import { maskPlate, maskYear } from '@renderer/utils/masks';

const labelSx = { display: 'block', mb: 1, fontWeight: 600 }

const fieldSx = {
    '& .MuiInputBase-root': { height: 48 },
}

const buttonSx = {
    py: 1.4,
    px: 3.5,
    textTransform: 'none',
}

type VehicleStepProps = {
    onNext: () => void
    onBack: () => void
}

export function VehicleStep({ onNext, onBack }: VehicleStepProps): React.JSX.Element {
    const vehicle = useBudgetStore((state) => state.vehicle)
    const setVehicle = useBudgetStore((state) => state.setVehicle)

    const { register, handleSubmit, formState: { errors } } = useForm<VehicleForm>({
        resolver: zodResolver(vehicleSchema),
        defaultValues: vehicle,
    })

    const onSubmit = (data: VehicleForm): void => {
        setVehicle(data)
        onNext()
    }

    return (
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}
            sx={{ backgroundColor: 'background.paper', borderRadius: 1, border: '1px solid', borderColor: 'divider', p: 3 }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
                <Truck height={40} width={40} />

                <Box>
                    <Typography component="h2" sx={{ color: 'text.primary', fontWeight: 600, fontSize: 20 }}>
                        Dados do veículo
                    </Typography>

                    <Typography sx={{ color: 'text.secondary' }}>
                        Informe os dados do veículo que será atendido.
                    </Typography>
                </Box>
            </Box>

            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)',
                columnGap: 2,
                rowGap: 3,
                width: '100%'
            }}>
                <Box>
                    <Typography component="label" htmlFor="vehicle-model" sx={labelSx}>
                        Modelo
                    </Typography>
                    <TextField
                        id="vehicle-model"
                        fullWidth
                        placeholder="Ex: Scania R450"
                        sx={fieldSx}
                        {...register('model')}
                        error={!!errors.model}
                        helperText={errors.model?.message}
                    />
                </Box>

                <Box>
                    <Typography component="label" htmlFor="vehicle-plate" sx={labelSx}>
                        Placa
                    </Typography>
                    <TextField
                        id="vehicle-plate"
                        fullWidth
                        placeholder="ABC1D23 (opcional)"
                        sx={fieldSx}
                        {...register('plate', {
                            onChange: (e) => {
                                e.target.value = maskPlate(e.target.value)
                            },
                        })}
                        error={!!errors.plate}
                        helperText={errors.plate?.message}
                    />
                </Box>

                <Box>
                    <Typography component="label" htmlFor="vehicle-year" sx={labelSx}>
                        Ano
                    </Typography>
                    <TextField
                        id="vehicle-year"
                        fullWidth
                        placeholder="2021 (opcional)"
                        sx={fieldSx}
                        {...register('year', {
                            onChange: (e) => {
                                e.target.value = maskYear(e.target.value)
                            },
                        })}
                        error={!!errors.year}
                        helperText={errors.year?.message}
                        slotProps={{ htmlInput: { inputMode: 'numeric' } }}
                    />
                </Box>

                <Box>
                    <Typography component="label" htmlFor="vehicle-engine" sx={labelSx}>
                        Motor
                    </Typography>
                    <TextField
                        id="vehicle-engine"
                        fullWidth
                        placeholder="Ex: DC13 450 (opcional)"
                        sx={fieldSx}
                        {...register('engine')}
                    />
                </Box>
            </Box>

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
                    onClick={onBack}
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