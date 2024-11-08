const path = require('path');

const currentDirectory = __dirname;
console.log(currentDirectory);

const filePath = 'output.txt';
const fileExtension = path.extname(filePath);
console.log(fileExtension);
