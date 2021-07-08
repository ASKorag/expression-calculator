"use strict";
function expressionCalculator(expr) {
    const regExp = /\d+|\+|-|\*|\/|\(|\)/g;
    const tokens = expr.match(regExp);
    return tokens;
}
module.exports = {
    expressionCalculator,
};
