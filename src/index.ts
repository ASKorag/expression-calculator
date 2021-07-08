function expressionCalculator(expr: string) {
  const regExp = /\d+|\+|-|\*|\/|\(|\)/g
  const tokens = expr.match(regExp) || []
  let pos = 0
  return parse(tokens)

  function parse(tokens: RegExpMatchArray): number {
    const result: number = expression()
    if (pos !== tokens.length) {
      throw 'ExpressionError: Brackets must be paired'
    }
    return result
  }

  function expression(): number {
    let firstTerm = term()
    while (pos < tokens.length) {
      const operator = tokens[pos]
      if (operator !== '+' && operator !== '-') {
        break
      } else {
        pos++
      }
      const secondTerm = term()
      operator === '+' ? (firstTerm += secondTerm) : (firstTerm -= secondTerm)
    }
    return firstTerm
  }

 

  function term(): number {
    let firstFactor = factor()
    while (pos < tokens.length) {
      const operator = tokens[pos]
      if (operator !== '*' && operator !== '/') {
        break
      } else {
        pos++
      }
      const secondFactor = factor()
      if (operator === '*') {
        firstFactor *= secondFactor
      } else {
        if (secondFactor === 0) {
          throw 'TypeError: Division by zero.'
        }
        firstFactor /= secondFactor
      }
    }
    return firstFactor
  }

  function factor(): number {
    const token = tokens[pos]
    if (token === '(') {
      pos++
      let value = expression()
      let closingBracket
      if (pos < tokens.length) {
        closingBracket = tokens[pos]
      } else {
        throw 'ExpressionError: Brackets must be paired'
      }
      if (pos < tokens.length && closingBracket === ')') {
        pos++
        return value
      }
      throw 'ExpressionError: Brackets must be paired'
    }
    pos++
    return +token
  }
}

module.exports = {
  expressionCalculator,
}
