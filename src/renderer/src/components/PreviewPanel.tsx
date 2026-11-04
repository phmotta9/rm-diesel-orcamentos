import { useEffect, useRef, useState } from 'react'
import { Box, Paper, Typography } from '@mui/material'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import { pdf } from '@react-pdf/renderer'
import * as pdfjsLib from 'pdfjs-dist'
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import { useBudgetStore } from '@renderer/store/budgetStore'
import { BudgetPdf } from './BudgetPdf'

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker

export function PreviewPanel(): React.JSX.Element {
  const client = useBudgetStore((state) => state.client)
  const vehicle = useBudgetStore((state) => state.vehicle)
  const tests = useBudgetStore((state) => state.tests)
  const parts = useBudgetStore((state) => state.parts)
  const discount = useBudgetStore((state) => state.discount)

  const pageRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState('')
  const [pageWidth, setPageWidth] = useState(0)

  useEffect(() => {
    const element = pageRef.current
    if (!element) return

    const observer = new ResizeObserver(() => {
      setPageWidth(Math.round(element.clientWidth))
    })
    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (pageWidth === 0) return

    let cancelled = false

    async function generatePdf(): Promise<void> {
      try {
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
        const doc = await pdfjsLib.getDocument({ data }).promise
        const page = await doc.getPage(1)

        const baseViewport = page.getViewport({ scale: 1 })
        const ratio = Math.max(window.devicePixelRatio || 1, 2)
        const viewport = page.getViewport({ scale: (pageWidth / baseViewport.width) * ratio })

        const canvas = document.createElement('canvas')
        canvas.width = Math.floor(viewport.width)
        canvas.height = Math.floor(viewport.height)
        canvas.style.width = '100%'
        canvas.style.height = '100%'
        canvas.style.display = 'block'

        const context = canvas.getContext('2d')
        if (!context || cancelled) return

        context.imageSmoothingEnabled = true
        context.imageSmoothingQuality = 'high'

        await page.render({ canvasContext: context, viewport, canvas }).promise

        if (cancelled || !pageRef.current) return

        pageRef.current.replaceChildren(canvas)
        setError('')
      } catch (err) {
        console.error('Erro ao gerar PDF:', err)
        setError(err instanceof Error ? err.message : String(err))
      }
    }

    const timeout = setTimeout(generatePdf, 200)

    return () => {
      cancelled = true
      clearTimeout(timeout)
    }
  }, [client, vehicle, tests, parts, discount, pageWidth])

  return (
    <Paper
      elevation={0}
      sx={{
        height: '100%',
        minHeight: 0,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 1.5,
        px: 0.5,
        borderRadius: 1,
        backgroundColor: 'background.default',
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: 1
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          alignSelf: 'stretch',
          gap: 1.5,
          mb: 1.5,
          px: 1,
          flexShrink: 0
        }}
      >
        <VisibilityOutlinedIcon />
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Prévia do orçamento
        </Typography>
      </Box>

      {error && (
        <Typography sx={{ color: 'error.main', fontSize: 12, mb: 1 }}>
          Erro ao gerar o PDF: {error}
        </Typography>
      )}

      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          display: 'flex',
          justifyContent: 'center',
          alignSelf: 'stretch',
          overflow: 'hidden'
        }}
      >
        <Box
          ref={pageRef}
          sx={{
            height: '100%',
            maxWidth: '100%',
            aspectRatio: '210 / 297',
            backgroundColor: 'common.white',
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: 3,
            overflow: 'hidden'
          }}
        />
      </Box>
    </Paper>
  )
}