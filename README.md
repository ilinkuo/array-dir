# fs-comprehensions
Add comprehensions API to the file system 

As a JavaScripter, do you know:
* How to print out all the files in a directory?
* How to print out all the JavaScript files in a directory?
* How to print out all the files in a directory in alphabetical order?
* How to copy and append '.bkup' to all the files in a directory?

If the answer to any of these is 'no', then ask yourself why don't you know? Usually there are two reasons:
* You haven't worked with Node's file system API.
* You have to recurse through subdirectories.

To see how important the second reason is, let me ask the original questions again, but this time with an additional condition.

As a JavaScripter, if I gave you an array of all the files in a directory, do you know:
* How to print out all the files in a directory?
* How to print out all the JavaScript files in a directory?
* How to print out all the files in a directory in alphabetical order?
* How to copy and append '.bkup' to all the files in a directory?

I bet you could even write out the answers in JavaScript pseudo-code this time, given 'files' as an array:
* files.forEach( function(file) { console.log(file); })
* files.filter( function(file) { return file.indexOf('.js') > 0; })
		.forEach( function(file) { console.log(file); })
* files.sort().forEach( function(file) { console.log(file); }) 
* files.map(function(file){ return copy(file, file + '.bkup'); })
* TODO add a reduce example

(Well, this would sort all the Javascript files, rather than sorting them by directory, but close enough)





