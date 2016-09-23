const os = require('os');
const fs = require('fs');
const https = require('https');
const path = require('path');
const zlib = require('zlib');

var repo = "Teradata";
var project = "covalent-data";
var ver = process.argv[2];
var platform = os.platform();
var arch = os.arch();
var zipfile = project + "-" + ver + "-" + platform + "-" + arch + ".gz";
var repo = "https://github.com/" + repo + "/" + project + "/releases/download/"
var url = repo + ver + "/" + zipfile;
var retry = 0;
// the .prg is there only because windows is horrible.
var writeto = "./node/bin/" + project + ".prg";


// create a bin directory if one doesn't exist
fs.access("./node/bin", (err) => {
  if (err) {
    if (err.code === "ENOENT") {
      console.log('creating bin directory');
      fs.mkdirSync("./node/bin");
    } else {
      throw err;
    }
  } else {
    console.log('node/bin directory already exists');
  };
});

var download = function(uri, dest) {
  if (retry === 3) {
    console.log("Retried 3 times.  Sorry.");
    return;
  }
  console.log("Downloading " + platform + " " + arch + " executable...")
  https.get(uri, function(res) {
    // github will redirect
    if (res.statusCode > 300 && res.statusCode < 400 && res.headers.location) {
      uri = res.headers.location;
      console.log("Redirecting and retrying ...")
      download(uri, dest);
    } else if (res.statusCode === 200) {
      saveAndUnzip(res, uri, dest);
    } else {
    // something bad happened, return the status code and exit.
    console.log("could not download zip archive- " + res.statusCode + " ...Retrying");
    retry ++;
    download(uri, dest);
    }
  });
};

var saveAndUnzip = function(response, uri, dest) {
  console.log("Extracting ...")

  var file = fs.createWriteStream(dest);
  response.pipe(zlib.createGunzip()).pipe(file);

  file.on('finish', function() {
    // close the file
    file.close(function() {
      console.log("Done!");
    });
  });

  // something went wrong.  unlink the file.
  file.on('error', function() {
    fs.unlink(file);
    console.log("Something went wrong while downloading or unzipping ...Retrying");
    retry++;
    download(uri, dest);
  });
}

download(url, writeto);
