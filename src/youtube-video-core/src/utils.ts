export const match = (str: string, regex: RegExp) => {
    const result = str.match(regex);
    return result ? result[1] : null;
}

export const isBrowser = () => typeof module === 'undefined' || !module.exports

export const convertToNumber = (text: string) => {
    const abbreviation: { [key: string]: number } = {
        'K': 1000,
        'M': 1000000,
        'B': 1000000000
    };

    const cleanedText = text.replace(/\s/g, '').replace(/[^0-9.,KM]/gi, '');

    const matches = cleanedText.match(/([0-9.]+)([KM]?)/i);
    if (!matches) {
        throw new Error('Invalid format');
    }

    const value = parseFloat(matches[1].replace(',', '.'));
    const unit = matches[2].toUpperCase();

    const multiplier = abbreviation[unit] || 1;
    return value * multiplier;
}
