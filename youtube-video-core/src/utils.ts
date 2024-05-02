export const match = (str: string, regex: RegExp) => {
    const result = str.match(regex);
    return result ? result[1] : null;
}