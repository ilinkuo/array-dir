Concepts for Developers
=======================


Transformations
---------------
* filter
* sort

Actions
-------
* forEach
* map
* reduceUp
* reduceDown

Orders
---------------
* preorder (default, dispatch)
* postorder (dispatch)
* parentFirst (completion, implicit)
* childFirst (completion, implicit)
* sortorder (completion, explicit)

Transformations vs Actions
--------------------------
Actions are operations which actually touch the file system. Transformations are operations that don't actually touch the file system. (terminology inspired by Apache Spark's DAG-based workflow). The purpose of Transformations is to set up the context for subsequent Actions. This is different from the array context where (almost) every operation is an Action that returns actual array. For the array-dir library, the returned object is a directory context.

For example, let's look at the following sample array-dir code:

	// Find all the JavaScript files
	var myJsFiles = dir('.').filter( file => file.name.indexOf('.js') > 1);
	myJsFiles.forEach( file => console.log(file.name) );

	// ... later
	myJsFiles.forEach( file => console.log(file.name) );

The two invocations of .forEach may print out a different list of files if the underlying file system has been changed in between the invocations. This is because the file system is not actually touched until the .forEach invocation.

If we compare it to the following array code:

	var myJSFiles = [conf.js, /* ... */];
	myJsFiles.forEach( file => console.log(file.name) );

	// ... later
	myJsFiles.forEach( file => console.log(file.name) );

We see that the two invocations of .forEach will always print out the same list of files.


Filters Commute with Sorts
--------------------------
In all cases except one, each operation will be performed in the order you specified. The exception is with filters and sorts -- filters will be rearranged so they happen ahead of sorts. So

	dir('.').sort(mySortFunction).filter(myDirectoryFilter).filter(myFileFilter)

will be the same as

	dir('.').filter(myDirectoryFilter).filter(myFileFilter).sort(mySortFunction)


Synchronous Callback Actions and Order
-----------------------------
Life is simple when the callback function you provide to an action --  .forEach, .map, .reduce -- is synchronous. In that case, if you care, you can choose the order in which directory is traversed (pre- or post-order), and you can choose the order in which siblings are processed (.sort). If no order is specified, preorder is used by default.


Asynchronous Actions and Order
------------------------------
When the callback function you provide to an action is asynchronous, then "order" becomes a much more complicated thing. There is dispatch order -- the order in which your async callback is dispatched -- and there is completion order -- the order in which your async callbacks complete. If completion order matters to you, then array-dir provides order functions -- .parentFirst, .childFirst, .sortOrder -- which guarantee completion order by delaying dispatch until completion of the previous action. Use these with caution as they move the needle from uncoordinated async execution towards a single-threaded execution model with according performance impact.




Using Prototypes to Detect Change
---------------------------------


