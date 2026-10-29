export const maskCpfCnpj = (value: string): string => {
    const d = value.replace(/\D/g, '').slice(0, 14)

    if (d.length <= 11) {
        return d
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    }

    return d
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1/$2')
        .replace(/(\d{4})(\d{1,2})$/, '$1-$2')
}

export const maskPhone = (value: string): string => {
    const d = value.replace(/\D/g, '').slice(0, 11)

    if (d.length <= 10) {
        return d
            .replace(/^(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{4})(\d)/, '$1-$2')
    }

    return d
        .replace(/^(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
}

export const maskPlate = (value: string): string =>
    value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 7)

export const maskYear = (value: string): string =>
    value.replace(/\D/g, '').slice(0, 4)