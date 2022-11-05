const fs = require('fs');
const fsPromise = require('fs').promises;
const path = require('path');

const stylesDir = path.resolve(__dirname, 'styles' );
const writeStream = fs.createWriteStream(path.resolve(__dirname, 'project-dist/bundle.css' ));
let stylesArr = [];


async function listFiles(dir) {
    await findFiles(dir);
}

async function findFiles(dir) {
    const files = await fsPromise.readdir(dir, {withFileTypes: true});
    console.log('These are the files inside this directory:')
    for (const file of files) {
        if(!file.isDirectory()) {
            let fileName = file.name.substr(0, file.name.lastIndexOf("."));
            let fileExt = path.extname(file.name);
            let fileSize = fs.stat(dir + '/' + file.name, (err, stats) => {
                if (err) {
                    console.log(err);
                } else {
                    if (fileExt == '.css') {
                        let readStream = fs.createReadStream(path.resolve(__dirname, `styles/${file.name}`));
                        readStream.pipe(writeStream);
                        console.log(file.name);
                    }
                }
            });
        };
    }
}


listFiles(stylesDir);