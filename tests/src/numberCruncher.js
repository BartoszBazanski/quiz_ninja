'use strict';

function factorsOf(n) {
    if(n < 0) {
        throw new RangeError("Argument Error: Number must be positive");
    }
    if(Math.floor(n) !== n) {
        throw new RangeError("Argument Error: Number must be an integer");
    }
    var factors = [];
    for(var i=1, max = Math.sqrt(n); i<=max; i++) {
        if(n%i === 0) {
            factors.push(i, n/i);
        }
    }
    function sortNumbers(a, b) {
        return a - b;
    }
    return factors.sort(sortNumbers);
}

function isPrime(n) {
    var result;
    try {
        result = factorsOf(n).length === 2;
    } catch(error) {
        result = false;
    } finally {
        return result;
    }
}
