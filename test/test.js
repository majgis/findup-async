var lpa = require('./../index');
lpa('./a/b')

  .then(function (result) {
    console.log('result', result);
  })

  .catch(function(err) {
    console.log('error', err);
  });


