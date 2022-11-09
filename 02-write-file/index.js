const fs = require("fs");
const path = require("path");
const { stdin, stdout } = process;

const writeStream = fs.createWriteStream(path.resolve(__dirname, "text.txt"));

stdout.write("Write something to add to the text file!\n");

stdin.on("data", (data) => {
    if (data.toString().trim() == "exit") {
        stdout.write("\nThanks, GL & HF!\n");
        process.exit();
    }
    writeStream.write(data);
    stdout.write("Written! Anything else?\n");
});

process.on("SIGINT", () => {
    stdout.write("\nThanks, GL & HF!\n");
    process.exit();
});
