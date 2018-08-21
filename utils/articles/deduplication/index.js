
Tokenizer = require('./tokenizer')
DiffCalculator = require('./modular-diff-calculator')
//CheckSum = require('checksum')
const tokenize = (input, lower_case) => {
    return Tokenizer(input, lower_case);
}

const diff = (a, b) => {
    return DiffCalculator(a,b);
}

module.exports = {tokenize, diff}
