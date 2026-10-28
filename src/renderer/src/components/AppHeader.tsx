import { AppBar, Toolbar, Typography, Box, Divider } from "@mui/material"
import logo from '../assets/logoRmSemBg.png'

export function AppHeader(): React.JSX.Element {
    return (
        <AppBar
            position="static"
            elevation={0}
            sx={{ backgroundColor: 'background.default', height: 120 }}
        >
            <Toolbar
                sx={{
                    width: '90%',
                    maxWidth: 1200,
                    mx: 5,
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                }}
            >
                <Box
                    component="img"
                    src={logo}
                    alt="Logo"
                    sx={{ height: 75, objectFit: 'contain' }}
                />

                <Divider
                    orientation="vertical"
                    flexItem
                    sx={{ borderColor: 'divider', borderRightWidth: 3, my: 3 }}
                />

                <Box>
                    <Typography sx={{ color: 'text.primary', fontWeight: 700, fontSize: 25 }}>
                        Criar Orçamento
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                        Preencha os dados e gere seu PDF.
                    </Typography>
                </Box>
            </Toolbar>
        </AppBar>
    )
}