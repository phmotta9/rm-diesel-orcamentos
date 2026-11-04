import { create } from 'zustand'

export type Client = {
  name: string
  cpfCnpj: string
  telephone: string
  email: string
  address: string
}

export type Vehicle = {
  model: string
  plate: string
  year: string
  engine: string
}

export type BudgetItem = {
  description: string
  quantity: number
  unitPrice: number
}

type BudgetStore = {
  client: Client
  setClient: (client: Client) => void
  resetClient: () => void
  vehicle: Vehicle
  setVehicle: (vehicle: Vehicle) => void
  resetVehicle: () => void
  tests: BudgetItem[]
  parts: BudgetItem[]
  setServices: (services: { tests: BudgetItem[]; parts: BudgetItem[] }) => void
  resetServices: () => void
  discount: number
  setDiscount: (discount: number) => void
}

export const useBudgetStore = create<BudgetStore>()((set) => ({
  client: {
    name: '',
    cpfCnpj: '',
    telephone: '',
    email: '',
    address: ''
  },
  setClient: (client) => set({ client }),
  resetClient: () =>
    set({
      client: {
        name: '',
        cpfCnpj: '',
        telephone: '',
        email: '',
        address: ''
      }
    }),
  vehicle: {
    model: '',
    plate: '',
    year: '',
    engine: ''
  },
  setVehicle: (vehicle) => set({ vehicle }),
  resetVehicle: () =>
    set({
      vehicle: {
        model: '',
        plate: '',
        year: '',
        engine: ''
      }
    }),
  tests: [],
  parts: [],
  setServices: ({ tests, parts }) => set({ tests, parts }),
  resetServices: () => set({ tests: [], parts: [] }),
  discount: 0,
  setDiscount: (discount) => set({ discount })
}))