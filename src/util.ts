export const trim = (str: string) => {
    if (str == null) return ''
    if (str.startsWith('"') && str.endsWith('"')) {
        return str.slice(1, -1)
    }

    return str
}

export const prettyJson = (input: string) => {
    const value = trim(input).replace(/\\/g, "")
    const json = JSON.parse(value)
    return JSON.stringify(json, null, 2);
}

export const compressAndAddEscape = (input: string) => {
    return JSON.stringify(JSON.parse(input)).replace(/"/g, '\\"')
}
