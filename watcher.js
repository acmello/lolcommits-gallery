var program = require('commander');
var fs = require('fs');
var request = require('request');

program
  .version("0.0.1")
  .option('-v, --version', 'lolcommits-gallery is currently on version 0.0.1')
  .option('-d, --directory', "lolcommits directory")
  .parse(process.argv);

var DEFAULT_DIR = "test";
var CURRENT_DIR = program.directory ? process.argv[3] : DEFAULT_DIR;
var DEFAULT_URL = "http://localhost:8000/save";

//console.log(fs.createReadStream(DEFAULT_DIR + '/teste3.html'));

exists(CURRENT_DIR, function(exists) {
  watch(CURRENT_DIR);
});

function watch(directory) {
  fs.watch('test', function(event, filename) {
    if(filename) {
      console.log('creating a stream ' + directory + '/' + filename);
      request.post({
        'url': DEFAULT_URL,
        'formData': {
          'file': 'i'
        }
      }, function(error, response, body) {
        if(error) { throw error }
        console.log('succesfully sent: ', body);
      });
    }
  });
}

function exists(directory, fn) {
  var directory = directory || DEFAULT_DIR;
  fs.exists(directory, function(exists) {
    fn(exists);
  });
}
