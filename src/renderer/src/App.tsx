import { Box } from '@mui/material'
import { AppHeader } from './components/AppHeader'
import { ClientStep } from './components/ClientStep'
import { WizardStepper } from './components/WizardStepper'
import { PreviewPanel } from './components/PreviewPanel'

export function App(): React.JSX.Element {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#F5F7FA',
        overflow: 'hidden'
      }}
    >
      <Box sx={{ flexShrink: 0 }}>
        <AppHeader />
      </Box>

      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.9fr) minmax(0, 1fr)', 
          gridTemplateRows: 'minmax(0, 1fr)',
          gap: 3,
          px: 3,
          pb: 3
        }}
      >

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            minWidth: 0,
            minHeight: 0,
            overflowY: 'auto'
          }}
        >
          <WizardStepper activeStep={1} />
          <ClientStep />
        </Box>

        <PreviewPanel />
      </Box>
    </Box>
  )
}