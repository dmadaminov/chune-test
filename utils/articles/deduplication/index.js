
Tokenizer = require('./tokenizer')
DiffCalculator = require('./modular-diff-calculator')
const filter = require('lodash/filter');
const includes = require('lodash/includes');
//CheckSum = require('checksum')

module.exports = (array, target) => {
    
    var count = 0, dups = [];
    
    for(var i = 0, len = array.length; i < len; i++) {
        let a = Tokenizer(array[i].title);
        for(j = i+1; j < len; j++) {
            let b = Tokenizer(array[j].title);
            let diff = DiffCalculator(a, b);
            if (diff >= target) dups.push(array[j].ID);
        }
    }
    //console.log('Found: ', dups.length, ' duplicates out of ', array.length, ' articles');
    return filter(array, (v) => !includes(dups, v.ID));
}
