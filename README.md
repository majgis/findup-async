#load-package-async
Asynchronously find-up and load the package.json associated with a given directory.

* Stops looking when the first package.json file is found
* Returns a promise which resolves to the loaded package.json object
* Stores a cache of promises associated with each directory requested.

Usage
---
The function returned by `require('load-package-async')` takes a single argument,
the path to the directory where you want to start looking:

    var loadPackage = require('load-package-async');

    loadPackage('/a/b/c/d/e/f')

      .then(function(package){
        if (package)
            console.log(package.name);
        else
            console.log('package not found');
      })

      .catch(function(error){
        console.log('there was an error')
      })

If an incorrect path is given or a correct path is given but no package.json file
is found, the promise resolves to null.

If you wish to purge the cache, you can call the `flush` method:

    loadPackage.flush()


