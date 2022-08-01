const fileSystem = require('fs')

//sync
var files = fileSystem.readdirSync('./')
console.log(files)

// async
fileSystem.readdir('./', function (err, files) {
    if (err) console.log('error', err)
    else console.log('result', files)
})