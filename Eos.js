const express = require('express');
const os = require('os');
const app = express();

app.get('/systeminfo', (req, res) => {
  const systemInfo = {
    platform: os.platform(),
    architecture: os.arch(),
    totalMemory: os.totalmem(),
    freeMemory: os.freemem(),
    hostname: os.hostname()
  };
  res.json(systemInfo);
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/systeminfo');
});
