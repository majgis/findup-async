#load-package-async
Asynchronously find-up and load the package.json associated with a given directory

* Stops looking when the first package.json file is found
* Returns a promise which resolves to the loaded package.json object
* Stores a cache of promises associated with each directory requested.

#Usage

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

