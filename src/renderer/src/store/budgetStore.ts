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

type BudgetStore = {
  client: Client
  setClient: (client: Client) => void
  vehicle: Vehicle
  setVehicle: (vehicle: Vehicle) => void
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
  vehicle: {
    model: '',
    plate: '',
    year: '',
    engine: ''
  },
  setVehicle: (vehicle) => set({ vehicle })
}))