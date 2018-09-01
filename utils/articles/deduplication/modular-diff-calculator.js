// Here we are simply checking if the word exists in the other
// By this point we only really want word stems and word lemas 
module.exports = (a, b) => {
    if (!a || !b) return 0.0;
    // We choose a set since it has constant time lookup
    const set = new Set(a);
    count = 0;
    b.forEach(w => {
        if(set.has(w)){
            count++;
        }
    });
    return count / ((a.length + b.length)/2);
}
