var dir = require('./index.js');


var cb = function(dirOrFile, depth){
    console.log(' '.repeat(depth * 2) + dirOrFile);
}


console.log('EXAMPLE 1: Print out all the files in a directory');
dir('..').forEach(function(dirOrFile, depth){
    console.log( dirOrFile);
});

console.log('EXAMPLE 2: Print out all the files in a directory with indentation');
dir('..').forEach(function(dirOrFile, depth){
    console.log(' '.repeat(depth * 2) + dirOrFile);
});

