// function eval() {
//   // Do not use eval!!!
//   return
// }

function expressionCalculator(expr: string) {
  const regExp = /\d+|\+|-|\*|\/|\(|\)/g
  const tokens = expr.match(regExp)
  return tokens
}

module.exports = {
  expressionCalculator,
}
