const fs = require('fs').promises;
const path = require('path');


let dirPath = path.resolve(__dirname, 'secret-folder' );

async function listFiles() {
    await findFiles(dirPath);
}

async function findFiles(folderPath) {
    const files = await fs.readdir(folderPath, {withFileTypes: true});
    console.log('These are the files inside this directory:')
    for (const file of files) {
        if(!file.isDirectory()) {
            console.log(file.name);
        };
    }
}

listFiles();


