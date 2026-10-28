import { User, Truck, Wrench, FileText } from 'lucide-react'
import { Box, Card, Step, StepLabel, Stepper, StepConnector } from "@mui/material";

const steps = [
    { label: 'Cliente', icon: <User /> },
    { label: 'Veículo', icon: <Truck /> },
    { label: 'Peças e serviços', icon: <Wrench /> },
    { label: 'Finalizar', icon: <FileText /> },
];

export function WizardStepper({ activeStep }: { activeStep: number }): React.JSX.Element {
    return (
        <Card sx={{
            backgroundColor: 'background.default',
            boxShadow: 'none',
        }}>
            <Stepper 
            alternativeLabel 
            activeStep={activeStep}
            connector={
                <StepConnector
                sx={{
                    '& .MuiStepConnector-line': {
                    borderTopWidth: 3,
                    borderColor: 'divider',
                    borderRadius: 1,
                    transition: 'border-color 0.3s',
                    },
                    '&.MuiStepConnector-alternativeLabel': {
                    top: 20,
                    left: 'calc(-50% + 40px)',
                    right: 'calc(50% + 40px)',
                    },
                    '&.Mui-active .MuiStepConnector-line': {
                    borderColor: 'primary.main',
                    },
                    '&.Mui-completed .MuiStepConnector-line': {
                    borderColor: 'primary.main',
                    },
                }}
                />
            }
            >
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel 
                        icon={
                            <Box sx={{
                                display: 'flex',
                                color: 'background.paper',
                                backgroundColor: index <= activeStep ? 'primary.main' : 'text.secondary',
                                height: 40,
                                width: 40,
                                borderRadius: '50%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                transition: 'border-color 0.3s',
                            }} 
                            >
                                {step.icon}
                            </Box>
                        }
                        sx={{
                            color: 'text.secondary',
                            '& .MuiStepLabel-label.Mui-active': {
                                color: 'primary.main',
                            },
                            '& .MuiStepLabel-label.Mui-completed': {
                                color: 'primary.main',
                            },
                        }}
                        >
                            {step.label}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Card>
    );
}