'use strict';
 
var fs = require('fs');
var path = require('path');
 
 
var dirArg='..';
var NOOP = function(){};
 
function makeFullPath(path, parent){
    if (!parent) { return path; }
    return parent + '/' + path;
}
 
function isDirectory(path, parent){
    return fs.lstatSync(makeFullPath(path, parent)).isDirectory();
}
 
function isEmpty(path, parent){
    if (!isDirectory(path, parent)) { return true;}
    var files = fs.readdirSync(makeFullPath(path, parent));
    return files.length === 0;
}
 
function hasJavaFiles(path, parent){
    if (!isDirectory(path, parent)) { return false;}
    var files = fs.readdirSync(makeFullPath(path, parent));
    var javaFiles = files.filter( function(item, index){
        return item.substr(-5) ==='.java';
    });
    return javaFiles.length > 0;
}
 
function asJavaPackage(dir, roots){
    if (typeof roots  === 'string') { roots = [roots]; }
    var result = '';
    var dirPath = path.resolve(dir);
    roots.forEach( function(root){
        var rootPath = path.resolve(root);
       
        if (dirPath.indexOf(rootPath) !== 0) {
            return;
        }
        var modulo = dirPath.substr(rootPath.length + 1);
        result = modulo.replace(/\\|\//g, '.');
    });
    return result;
}
 
 
/**
    Traverses the directory in a nominally depth-first recursion (if synchronous)
    @params handlers = {
        onFile: function(file, parent, depth, acc)
        onDir: function(dir, parent, depth, acc)
        accumulator:
        order: pre|post default is pre (See https://en.wikipedia.org/wiki/Tree_traversal for explanation)
        sort: sorts items
        filter: filters items
    }
*/
function depthFirstTraversal(dir, handlers, depth){
    depth = depth || 0;
 
    // need _.extend
    var handlersCopy = Object.create(handlers);
    handlersCopy.onDir = handlersCopy.onDir || NOOP;
    handlersCopy.onFile = handlersCopy.onFile || NOOP;
 
    // Apply filters and sorts
    var items = fs.readdirSync(dir);
    handlersCopy.filter && (items = items.filter(handlersCopy.filter));
    handlersCopy.sort && (items = items.sort(handlersCopy.sort));
 
    items.forEach( function(item, index){
       var isDir = isDirectory(item, dir);
       if (isDir){ // is a directory
           if (handlers.order === 'post'){ // post-order traveral
              depthFirstTraversal(makeFullPath(item, dir), handlersCopy, depth + 1);
               handlersCopy.onDir(item, dir, depth + 1, handlersCopy.acc);
           } else { // pre-order traversal
               handlersCopy.onDir(item, dir, depth + 1, handlersCopy.acc);
               depthFirstTraversal(makeFullPath(item, dir), handlersCopy, depth + 1);
           }
       } else { // is a file
           handlersCopy.onFile(item, dir, depth + 1, handlersCopy.acc);
       }
    });
}
 
 
// Example call
var SPACES = '                                        '; // This limits the indentation depth
var DRY_RUN = {
    onFile: function(file, parent, depth){
        console.log(SPACES.substr(0, 2 * depth) + 'FILE: ' + file);
    },
    onDir: function(dir, parent, depth, acc){
        var fPath = makeFullPath(dir, parent);
        if (dir === 'java') {
            acc.push(fPath);
        }
        console.log(SPACES.substr(0, 2 * depth) + 'DIR: ' + fPath );
        //console.log(SPACES.substr(0, 2 * depth) + path.resolve(fPath));
        if (hasJavaFiles(fPath)){
            console.log(SPACES.substr(0, 2 * depth) + 'PACKAGE: ' + asJavaPackage(fPath, acc) );
        }
    }//,
    //order: 'post',
    //filter: function(item, index){ return item.indexOf('.') === -1 || item.indexOf('.java') > 0; }
};
 
DRY_RUN.acc = [];
depthFirstTraversal(dirArg, DRY_RUN);


 
console.log('\n======\nDONE!\n======\n\n');

function fsc(dir){
    function wrap(callback){
        return function(dir, parent, depth, acc){
            callback(dir, depth)
        };
    }

    return {
        forEach: function(callback){
            depthFirstTraversal(dir, {
                onFile: wrap(callback),
                onDir: wrap(callback)
            })
        },
        'for': function(callbacks){
            depthFirstTraversal(dir, {
                onFile: wrap(callbacks.file),
                onDir: wrap(callbacks.dir)
            })
        }
    }
}

var cb = function(dirOrFile, depth){
    console.log(' '.repeat(depth) + dirOrFile);
}

// fsc('..').forEach(cb)

fsc('..').for({dir: cb, file: cb})