const fs = require('fs');

const content = 'Hello, this is a test content!';

fs.writeFile('output.txt', content, 'utf8', (err) => {
  if (err) {
    console.error('Error writing to file:', err);
  } else {
    console.log('File has been saved!');
  }
});
