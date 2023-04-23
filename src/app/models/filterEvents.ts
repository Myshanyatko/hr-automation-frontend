export interface Filter {
    name: string | null,
    format: 'ONLINE' | 'COMBINED' | 'OFFLINE' | null,
    fromDate: Date | null,
    toDate: Date | null,
    cityId: number | null
}