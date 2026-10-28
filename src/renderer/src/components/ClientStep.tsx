import { User, Phone, Mail, MapPin, MoveRight, MoveLeft } from 'lucide-react'
import { Alert, Box, Button, InputAdornment, TextField, Typography } from "@mui/material";

const labelSx = { display: 'block', mb: 1, fontWeight: 600 }

const fieldSx = {
    '& .MuiInputBase-root': { height: 48 },
}

const buttonSx = {
    py: 1.4,
    px: 3.5,
    textTransform: 'none',
}

export function ClientStep(): React.JSX.Element {
    return (
        <Box sx={{ backgroundColor: 'background.paper', borderRadius: 1, border: '1px solid', borderColor: 'divider', p: 3 }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
                <User height={40} width={40} />

                <Box>
                    <Typography component="h2" sx={{ color: 'text.primary', fontWeight: 600, fontSize: 20 }}>
                        Dados do cliente
                    </Typography>

                    <Typography sx={{ color: 'text.secondary' }}>
                        Informe os dados do cliente que irá solicitar o orçamento.
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
                    <Typography component="label" htmlFor="client-name" sx={labelSx}>
                        Nome do Cliente
                    </Typography>
                    <TextField id="client-name" fullWidth placeholder="Digite o nome do cliente" sx={fieldSx} />
                </Box>

                <Box>
                    <Typography component="label" htmlFor="client-document" sx={labelSx}>
                        CPF/CNPJ
                    </Typography>
                    <TextField id="client-document" fullWidth placeholder="Digite o CPF ou CNPJ" sx={fieldSx} />
                </Box>

                <Box>
                    <Typography component="label" htmlFor="client-phone" sx={labelSx}>
                        Telefone / WhatsApp
                    </Typography>
                    <TextField
                        id="client-phone"
                        fullWidth
                        placeholder="(67) 00000-0000"
                        sx={fieldSx}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Phone size={20} />
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                </Box>

                <Box>
                    <Typography component="label" htmlFor="client-email" sx={labelSx}>
                        E-mail
                    </Typography>
                    <TextField
                        id="client-email"
                        fullWidth
                        placeholder="contato@exemplo.com"
                        sx={fieldSx}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Mail size={20} />
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                </Box>
            </Box>

            <Box sx={{ mt: 3 }}>
                <Typography component="label" htmlFor="client-address" sx={labelSx}>
                    Endereço
                </Typography>
                <TextField
                    id="client-address"
                    fullWidth
                    placeholder="Rua, número, bairro, cidade - (opcional)"
                    sx={fieldSx}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <MapPin size={20} />
                                </InputAdornment>
                            ),
                        },
                    }}
                />
            </Box>

            <Alert
                severity="info"
                sx={{
                    mt: 2,
                    backgroundColor: 'action.hover',
                    color: 'text.secondary',
                    '& .MuiAlert-icon': { color: 'text.secondary' },
                }}
            >
                Esses dados serão exibidos no PDF do orçamento.
            </Alert>

            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Button
                    variant="outlined"
                    startIcon={<MoveLeft />}
                    sx={{ ...buttonSx, color: 'text.secondary', borderColor: 'text.secondary' }}
                >
                    Sair
                </Button>

                <Button variant="contained" endIcon={<MoveRight />} sx={buttonSx}>
                    Continuar
                </Button>
            </Box>
        </Box>
    )
}