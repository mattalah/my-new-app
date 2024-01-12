interface Filter {
    id: string,
    name: string,
    type: string,
    options?: Category[]
    placeHolder?: string | undefined,
    value?: string | undefined | null,
}