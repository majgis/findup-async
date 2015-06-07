var Promise = require('bluebird');
var findup = require('findup');
var fs = require('fs');
var path = require('path');

var lookup = {};
var packageName = 'package.json';

function whenLoaded(resolve, reject, err, result){
  if (err){
    reject(err);
  } else {
    resolve(JSON.parse(result));
  }
}

function whenFound(emitter, found, resolve, reject, packageDirPath){
  found.true = true;
  emitter.stop();
  fs.readFile(packageDirPath + path.sep + packageName, 'utf8', whenLoaded.bind(this, resolve, reject));
}

function promised(bottomPath, resolve, reject) {
  var findupEmitter = findup(bottomPath, packageName);
  var found = {};

  findupEmitter.on('error', reject);

  findupEmitter.on('end', function(){
    if (!found.true){
      resolve(null);
    }
  });
  findupEmitter.on('found', whenFound.bind(this, findupEmitter, found, resolve, reject));
}

function loadPackageAsync(path) {
  var promise = lookup[path];
  if (!promise) {
    promise = new Promise(promised.bind(this, path));
    lookup[path] = promise;
  }
  return promise
}

loadPackageAsync.flush = function(){
  console.log(lookup);
  lookup = {};
};

module.exports = loadPackageAsync;
