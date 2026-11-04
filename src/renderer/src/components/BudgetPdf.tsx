import { Document, Image, Page, Text, View } from '@react-pdf/renderer'
import { BudgetItem, Client, Vehicle } from '@renderer/store/budgetStore'
import { calcTotals, formatCurrency } from '@renderer/utils/totals'
import logo from '@renderer/assets/logoRmSemBg.png'

const colors = {
    primary: '#ff0000',
    text: '#171a1d',
    textSecondary: '#64748b',
    border: '#d9e0e8',
    headerBg: '#f1f3f6',
    sectionBg: '#e9edf2',
    white: '#ffffff'
}

type BudgetPdfProps = {
    client: Client
    vehicle: Vehicle
    tests: BudgetItem[]
    parts: BudgetItem[]
    discount: number
}

type CellProps = {
    width: string
    align?: 'left' | 'center' | 'right'
    first?: boolean
    children: React.ReactNode
}

function Cell({ width, align = 'left', first = false, children }: CellProps): React.JSX.Element {
    return (
        <View
            style={{
                width,
                paddingVertical: 5,
                paddingHorizontal: 6,
                justifyContent: 'center',
                borderLeftWidth: first ? 0 : 1,
                borderColor: colors.border
            }}
        >
            <Text style={{ textAlign: align }}>{children}</Text>
        </View>
    )
}

type ItemRowProps = {
    item: BudgetItem
    number: number
}

function ItemRow({ item, number }: ItemRowProps): React.JSX.Element {
    return (
        <View
            wrap={false}
            style={{
                flexDirection: 'row',
                borderTopWidth: 1,
                borderColor: colors.border
            }}
        >
            <Cell width="8%" align="center" first>{number}</Cell>
            <Cell width="40%">{item.description}</Cell>
            <Cell width="10%" align="center">{item.quantity}</Cell>
            <Cell width="21%" align="right">{formatCurrency(item.unitPrice)}</Cell>
            <Cell width="21%" align="right">{formatCurrency(item.quantity * item.unitPrice)}</Cell>
        </View>
    )
}

function SectionTitle({ title }: { title: string }): React.JSX.Element {
    return (
        <View
            style={{
                backgroundColor: colors.sectionBg,
                borderTopWidth: 1,
                borderColor: colors.border,
                paddingVertical: 4,
                paddingHorizontal: 8,
                borderLeftWidth: 4,
                borderLeftColor: colors.primary
            }}
        >
            <Text style={{ fontSize: 9, fontFamily: 'Helvetica-Bold', letterSpacing: 0.5 }}>{title}</Text>
        </View>
    )
}

export function BudgetPdf({ client, vehicle, tests, parts, discount }: BudgetPdfProps): React.JSX.Element {
    const totals = calcTotals(tests, parts, discount)

    const today = new Date()

    return (
        <Document>
            <Page size="A4" style={{ padding: 30, paddingBottom: 100, fontSize: 11, fontFamily: 'Helvetica', color: colors.text }}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: 10, borderBottomWidth: 1, borderColor: colors.textSecondary }}>
                    <Image src={logo} style={{ width: 110 }} />
                    <Text style={{ fontSize: 11, fontFamily: 'Helvetica-Bold', textAlign: 'right', marginTop: 10 }}>
                        Precisão, tecnologia{'\n'}e confiança no seu motor.
                    </Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: 12, marginBottom: 12 }}>
                    <View>
                        <Text style={{ fontSize: 20, fontFamily: 'Helvetica-Bold' }}>ORÇAMENTO</Text>
                        <Text style={{ fontSize: 15, marginTop: 3 }}>RM DIESEL</Text>
                    </View>

                    <View style={{ width: 100 }}>
                        <View style={{ flexDirection: 'row', marginBottom: 4 }}>
                            <Text style={{ fontSize: 10 }}>DATA: </Text>
                            <Text style={{ fontSize: 10 }}>{today.toLocaleDateString('pt-BR')}</Text>
                        </View>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10, marginBottom: 10, borderTopWidth: 1, borderBottomWidth: 1, borderColor: colors.border }}>
                    <View style={{ flex: 1, paddingRight: 14 }}>
                        <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', marginBottom: 5 }}>DADOS DO CLIENTE</Text>
                        <Text style={{ fontFamily: 'Helvetica-Bold', marginBottom: 3 }}>{client.name}</Text>
                        {client.cpfCnpj ? <Text style={{ marginBottom: 3 }}>CPF/CNPJ: {client.cpfCnpj}</Text> : null}
                        {client.telephone ? <Text style={{ marginBottom: 3 }}>Telefone: {client.telephone}</Text> : null}
                        {client.email ? <Text style={{ marginBottom: 3 }}>E-mail: {client.email}</Text> : null}
                        {client.address ? <Text style={{ marginBottom: 3 }}>Endereço: {client.address}</Text> : null}
                    </View>

                    <View style={{ flex: 1, paddingLeft: 14, borderLeftWidth: 1, borderColor: colors.border }}>
                        <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', marginBottom: 5 }}>DADOS DO VEÍCULO</Text>
                        <Text style={{ fontFamily: 'Helvetica-Bold', marginBottom: 3 }}>{vehicle.model}</Text>
                        {vehicle.plate ? <Text style={{ marginBottom: 3 }}>Placa: {vehicle.plate}</Text> : null}
                        {vehicle.year ? <Text style={{ marginBottom: 3 }}>Ano: {vehicle.year}</Text> : null}
                        {vehicle.engine ? <Text style={{ marginBottom: 3 }}>Motor: {vehicle.engine}</Text> : null}
                    </View>
                </View>

                <View style={{ borderWidth: 1, borderColor: colors.border }}>
                    <View style={{ flexDirection: 'row', backgroundColor: colors.headerBg, fontFamily: 'Helvetica-Bold', fontSize: 9 }}>
                        <Cell width="8%" align="center" first>ITEM</Cell>
                        <Cell width="40%">DESCRIÇÃO</Cell>
                        <Cell width="10%" align="center">QTD.</Cell>
                        <Cell width="21%" align="right">VALOR UNIT.</Cell>
                        <Cell width="21%" align="right">VALOR TOTAL</Cell>
                    </View>

                    {tests.length > 0 && (
                        <View>
                            <SectionTitle title="TESTES" />
                            {tests.map((item, index) => (
                                <ItemRow key={`test-${index}`} item={item} number={index + 1} />
                            ))}
                        </View>
                    )}

                    {parts.length > 0 && (
                        <View>
                            <SectionTitle title="PEÇAS E SERVIÇOS" />
                            {parts.map((item, index) => (
                                <ItemRow key={`part-${index}`} item={item} number={tests.length + index + 1} />
                            ))}
                        </View>
                    )}
                </View>

                <View wrap={false} style={{ marginTop: 10, marginLeft: 'auto', width: 240, borderWidth: 1, borderColor: colors.border }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5, paddingHorizontal: 8, borderBottomWidth: 1, borderColor: colors.border }}>
                        <Text>Subtotal</Text>
                        <Text>{formatCurrency(totals.subtotal)}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5, paddingHorizontal: 8 }}>
                        <Text>Desconto</Text>
                        <Text>{formatCurrency(totals.discount)}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 7, paddingHorizontal: 8, backgroundColor: colors.primary, color: colors.white, fontFamily: 'Helvetica-Bold', fontSize: 13 }}>
                        <Text>TOTAL</Text>
                        <Text>{formatCurrency(totals.total)}</Text>
                    </View>
                </View>

                <View
                    fixed
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: 0,
                        height: 85,
                        backgroundColor: colors.text,
                        color: colors.white,
                        paddingVertical: 15,
                        paddingHorizontal: 30,
                        justifyContent: 'center',
                        fontSize: 10,
                        overflow: 'hidden'
                    }}
                >
                    <Text style={{ fontSize: 12, fontFamily: 'Helvetica-BoldOblique', marginBottom: 7 }}>RM DIESEL</Text>

                    <Text style={{ marginBottom: 4 }}>Tel: (00) 0 0000-0000</Text>
                    <Text>E-mail: example@email.com</Text>

                    <View
                        style={{
                            position: 'absolute',
                            right: -2,
                            top: -10,
                            width: 26,
                            height: 115,
                            backgroundColor: colors.primary,
                            transform: 'skewX(-20deg)'
                        }}
                    />
                </View>
            </Page>
        </Document>
    )
}