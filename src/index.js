function expressionCalculator(expr) {
    const regExp = /\d+|\+|-|\*|\/|\(|\)/g;
    const tokens = expr.match(regExp);
    let pos = 0;
    return parse(tokens);
    function parse(tokens) {
        let result = expression();
        if (pos !== tokens.length) {
            throw 'ExpressionError: Brackets must be paired';
        }
        if (!Number.isFinite(result)) {
            throw "TypeError: Division by zero.";
        }
        return result;
    }
    function factor() {
        let value = tokens[pos];
        let result;
        if (value === '(') {
            pos++;
            result = expression();
            let closingBracket;
            if (pos < tokens.length) {
                closingBracket = tokens[pos];
            }
            else {
                throw 'ExpressionError: Brackets must be paired';
            }
            if (pos < tokens.length && closingBracket === ")") {
                pos++;
                return +result;
            }
            throw 'ccc' + closingBracket;
        }
        pos++;
        return +value;
    }
    function term() {
        let first = factor();
        while (pos < tokens.length) {
            let operator = tokens[pos];
            if (operator !== "*" && operator !== "/") {
                break;
            }
            else {
                pos++;
            }
            let second = factor();
            if (operator === "*") {
                first *= second;
            }
            else {
                first /= second;
            }
        }
        if (!Number.isFinite(first)) {
            throw "TypeError: Division by zero.";
        }
        return +first;
    }
    function expression() {
        let first = term();
        while (pos < tokens.length) {
            let operator = tokens[pos];
            if (operator !== "+" && operator !== "-") {
                break;
            }
            else {
                pos++;
            }
            let second = term();
            if (operator === "+") {
                first += second;
            }
            else {
                first -= second;
            }
        }
        return +first;
    }
}
module.exports = {
    expressionCalculator,
};
