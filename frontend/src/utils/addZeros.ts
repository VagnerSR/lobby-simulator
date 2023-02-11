export function addZeros (number: number, minLength: number) {
    const numberString = number.toString()
    if(numberString.length >= minLength) return numberString

    return "0".repeat(minLength - numberString.length) + numberString
}