const fs = require('fs');
const path = require('path');

const env= process.argv[2];

const configDestination = path.join(__dirname, '../src/generated/config.js');
ensureDirectoryExistence(configDestination);

if(env === 'dev') {
    fs.copyFileSync(path.join(__dirname, './dev-build-config.js'), configDestination);
} else if(env === 'prod') {
    fs.copyFileSync(path.join(__dirname, './prod-build-config.js'), configDestination);
} else {
    console.log("Copying nothing");
}

function ensureDirectoryExistence(filePath) {
    var dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
      return true;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
  }