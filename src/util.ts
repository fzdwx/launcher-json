export const trim = (str: string) => {
    if (str == null) return ''
    if (str.startsWith('"') && str.endsWith('"')) {
        return str.slice(1, -1)
    }

    return str
}
