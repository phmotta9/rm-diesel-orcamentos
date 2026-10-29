import { Box, Paper, Typography } from '@mui/material'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import { useBudgetStore } from '@renderer/store/budgetStore'

export function PreviewPanel(): React.JSX.Element {
  const client = useBudgetStore((state) => state.client)

  return (
    <Paper
      elevation={0}
      sx={{
        height: '100%',
        minHeight: 0,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        p: 2.5,
        borderRadius: 1,
        backgroundColor: 'background.default',
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: '0 2px 12px rgba(16, 24, 40, 0.06)'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2, flexShrink: 0 }}>
        <VisibilityOutlinedIcon />
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Prévia do orçamento
        </Typography>
      </Box>

      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          containerType: 'size',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
   
        <Box
          sx={{
            width: 'min(100cqw, calc(100cqh * 210 / 297))',
            aspectRatio: '210 / 297',
            backgroundColor: '#fff',
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: '0 4px 20px rgba(16, 24, 40, 0.10)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2
          }}
        >
          {client.name}

          {client.cpfCnpj}
        
        </Box>
      </Box>
    </Paper>
  )
}