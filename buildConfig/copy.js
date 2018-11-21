const fs = require('fs');
const path = require('path');

const env= process.argv[2];

if(env === 'dev') {
    fs.copyFileSync(path.join(__dirname, './dev-build-config.js'), path.join(__dirname, '../src/config.js'));
} else if(env === 'prod') {
    fs.copyFileSync(path.join(__dirname, './prod-build-config.js'), path.join(__dirname, '../src/config.js'));
} else {
    console.log("Copying nothing");
}