const fsPromise = require('fs').promises;
const fs = require('fs');
const path = require('path');


let dirPath = path.resolve(__dirname, 'secret-folder' );

async function listFiles() {
    await findFiles(dirPath);
}

async function findFiles(folderPath) {
    const files = await fsPromise.readdir(folderPath, {withFileTypes: true});
    console.log('These are the files inside this directory:')
    for (const file of files) {
        if(!file.isDirectory()) {
            let fileName = file.name;
            let fileExt = path.extname(fileName);
            let fileSize = fs.stat(dirPath + '/' + fileName, (err, stats) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(fileName, fileExt, stats.size +'kb');
                }
            });
        };
    }
}

listFiles();


