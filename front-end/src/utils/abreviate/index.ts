

export const abreviate = (text: string): string => {
    const words = text.split(" ");
    return words.map(word => word.charAt(0).toUpperCase()).join("");
}