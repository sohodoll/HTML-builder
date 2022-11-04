const util = require('util');
const fs = require('fs');
const fsPromise = require('fs').promises;
const path = require('path');
const copyFilePromise = util.promisify(fs.copyFile);

let dirPath = path.resolve(__dirname, 'files' );
let copyPath = path.resolve(__dirname, 'files-copy' )

//create dir if it doesn't exists

const doesExist = (dir) => {
    fs.access(dir, err => {
        if (err) {
            result = 'NO'
        } else {
            result = 'YE';
        }
        console.log(result);
    })
}

const createDir = (dir) => {
    if (result = 'NO') {
        fs.mkdir(dir, (err) => {
            if (err) {
                return console.log('already exists!');
            }
            console.log('dir copied');
        });
    }
};

createDir(copyPath);

// read and copy files

let filesInDir = [];
let fileNames = [];

async function listFiles() {
    await findFiles(dirPath);
}

listFiles();

async function findFiles(folderPath) {
    const files = await fsPromise.readdir(folderPath, {withFileTypes: true});
    for (const file of files) {
        filesInDir.push(file)
        };
    filesInDir.forEach(file => {
        fileNames.push(file.name);
    })

    copyFiles(dirPath, copyPath, fileNames).then(() => {
        console.log("done");
     }).catch(err => {
        console.log(err);
     });
    
}

// copy files

function copyFiles(srcDir, destDir, files) {
    return Promise.all(files.map(f => {
       return copyFilePromise(path.join(srcDir, f), path.join(destDir, f));
    }));
}

