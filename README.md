# array-dir
Add comprehensions API to the file system 

Off the top of your head, do you know how to use JavaScript to:
* Print out all the files in a directory?
* Print out all the JavaScript files in a directory?
* Print out all the files in a directory in alphabetical order?
* Add '.bkup' to all the names of files in a directory?

If the answer to any of these is 'no', then ask yourself why don't you know? Usually there are two reasons:
* You haven't worked with Node's file system API.
* You have to recurse through subdirectories.

To see how important the second reason is, let me ask the original questions again, but this time with an additional condition.

Off the top of your head, if I gave you an array of all the files in a directory, would you know how to use JavaScript to:
* Print out all the files in a directory?
* Print out all the JavaScript files in a directory?
* Print out all the files in a directory in alphabetical order?
* Add '.bkup' to all the names of files in a directory?


The answer would look something like this in JavaScript pseudo-code:
* files.forEach( function(file) { console.log(file); })
* files.filter( function(file) { return file.indexOf('.js') > 0; })
		.forEach( function(file) { console.log(file); })
* files.sort().forEach( function(file) { console.log(file); }) 
* files.map(function(file){ file.suffix += ".bkup"; return file; })


* TODO add a reduce example
* TODO add a chained example





