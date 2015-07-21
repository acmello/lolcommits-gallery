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

function exists(path, fn){
  fs.stat(path, function(err, stats) {
    if(err) {
      throw error
    } else if (!stats.isDirectory()) {
      throw new Error(path + ' is not a directory.');
    }

    fn.call(this, path);
  });
}
