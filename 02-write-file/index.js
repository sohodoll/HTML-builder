const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

const writeStream = fs.createWriteStream(path.resolve(__dirname, 'text.txt'));

stdout.write('Write something to add to the text file!');

stdin.on('data', data => {
    writeStream.on('data', (userText) => {
        fs.writeFile(
            path.join(__dirname, 'notes', 'text.txt'),
            userText,
            (err) => {
                if (err) throw err;
                console.log('File updated!');
            }
        );
    })
});

