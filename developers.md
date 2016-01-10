Concepts for Developers

Transformations vs Actions
Methods of the dirActions are operations which actually touch the file system. Transformations are operations that don't actually touch the file system. (terminology taken from Apache Spark's DAG-based workflow). The purpose of Transformations is to set up the context for subsequent Actions. This is different from the array context where (almost) every operation is an Action that returns actual array. For the array-dir library, the returned object is a directory context 

Transformations
* filter
* sort
Actions
* map
* reduce

Using Prototypes to Detect Change

