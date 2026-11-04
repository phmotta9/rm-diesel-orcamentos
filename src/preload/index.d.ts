import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      savePdf: (data: ArrayBuffer, fileName: string) => Promise<boolean>
    }
  }
}