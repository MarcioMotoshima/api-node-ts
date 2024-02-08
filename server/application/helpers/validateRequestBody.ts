export function isNumber(value: unknown): boolean {
  const valueAsNumber = Number(value)
  return Number.isSafeInteger(valueAsNumber) && valueAsNumber > -1
}

export function missingParams(
  req: any,
  requiredFields: string[]
): string | null {
  for (const fields of requiredFields) {
    if (!req.body[fields]) {
      return `missing param: ${fields}`
    }
  }
  return null
}
