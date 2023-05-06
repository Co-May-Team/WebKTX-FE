export default function formatCurrency(number) {
  if (!Number.isFinite(number)) {
    return ""
  }

  const numString = number.toString()
  const numArray = numString.split(".")
  let integerPart = numArray[0]
  let decimalPart = numArray.length > 1 ? numArray[1] : ""

  let formattedIntegerPart = ""
  let count = 0
  for (let i = integerPart.length - 1; i >= 0; i--) {
    if (count === 3) {
      formattedIntegerPart = "." + formattedIntegerPart
      count = 0
    }
    formattedIntegerPart = integerPart[i] + formattedIntegerPart
    count++
  }

  // if (decimalPart.length > 0) {
  //   decimalPart = decimalPart.padEnd(2, "0").substring(0, 2)
  // } else {
  //   decimalPart = "00"
  // }

  return formattedIntegerPart + " ₫"
}
