import { BudgetItem } from '@renderer/store/budgetStore'

export const calcSubtotal = (tests: BudgetItem[], parts: BudgetItem[]): number =>
    [...tests, ...parts].reduce((acc, item) => acc + item.quantity * item.unitPrice, 0)

export const calcTotals = (
    tests: BudgetItem[],
    parts: BudgetItem[],
    discount: number
): { subtotal: number; discount: number; total: number } => {
    const subtotal = calcSubtotal(tests, parts)
    const appliedDiscount = Math.min(Math.max(discount, 0), subtotal)
    return {
        subtotal,
        discount: appliedDiscount,
        total: subtotal - appliedDiscount
    }
}

export const formatCurrency = (value: number): string =>
    (Number.isFinite(value) ? value : 0).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })