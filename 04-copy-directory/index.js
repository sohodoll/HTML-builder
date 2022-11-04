const util = require('util');
const fs = require('fs');
const fsPromise = require('fs').promises;
const path = require('path');
const copyFilePromise = util.promisify(fs.copyFile);

let dirPath = path.resolve(__dirname, 'files' );
let copyPath = path.resolve(__dirname, 'files-copy' )

//create dir if it doesn't exists

fs.mkdir(copyPath, (err) => {
    if (err) {
    }
});

const createDir = (dir) => {
    fs.readdir(dir, (err, files) => {
        if (err) throw err;
        for (const file of files) {
          fs.unlink(path.join(dir, file), (err) => {
            if (err) throw err;
          });
        }
      });
        fs.mkdir(dir, (err) => {
            if (err) {
                console.log('doing magic');
            }
            console.log('dir copied');
        });
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
     }).catch(err => {
        console.log(err);
     });
    
}

// copy files

function copyFiles(srcDir, dir, files) {
    return Promise.all(files.map(f => {
       return copyFilePromise(path.join(srcDir, f), path.join(dir, f));
    }));
}

