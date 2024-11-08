const express = require('express');
const fs = require('fs');
const app = express();

app.get('/readfile', (req, res) => {
  fs.readFile('abc.txt', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading file');
    } else {
      res.send(data);
    }
  });
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/readfile');
});
