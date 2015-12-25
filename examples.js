var directory = require('./index.js');

// var cb = function(dirOrFile, depth){
//     console.log(' '.repeat(depth * 2) + dirOrFile);
// }

// directory('..').forEach(function(dirOrFile, depth){
//     console.log(' '.repeat(depth * 2) + dirOrFile);
// });
console.log(directory.DRY_RUN);
var DRY_RUN = directory.DRY_RUN;
DRY_RUN.filter = function(elmt, depth){
	return depth < 3;
}

directory.depthFirstTraversal('..', DRY_RUN);

// directory('..').for({dir: cb, file: cb});