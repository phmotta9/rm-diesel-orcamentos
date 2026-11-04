import { useState } from 'react'
import { Box } from '@mui/material'
import { AppHeader } from './components/AppHeader'
import { ClientStep } from './components/ClientStep'
import { VehicleStep } from './components/VehicleStep'
import { ServicesStep } from './components/ServicesStep'
import { FinishStep } from './components/FinishStep'
import { WizardStepper } from './components/WizardStepper'
import { PreviewPanel } from './components/PreviewPanel'

export function App(): React.JSX.Element {
  const [step, setStep] = useState(0)

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'background.default',
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
          gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)',
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
          <WizardStepper activeStep={step} />

          {step === 0 && <ClientStep onNext={() => setStep(1)} />}
          {step === 1 && <VehicleStep onNext={() => setStep(2)} onBack={() => setStep(0)} />}
          {step === 2 && <ServicesStep onNext={() => setStep(3)} onBack={() => setStep(1)} />}
          {step === 3 && <FinishStep onBack={() => setStep(2)} />}
        </Box>

        <PreviewPanel />
      </Box>
    </Box>
  )
}