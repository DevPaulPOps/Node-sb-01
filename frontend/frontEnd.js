const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const configFile = fs.readFileSync('config.json', 'utf8');
const config = JSON.parse(configFile);

const angularBuildPath = path.join(__dirname,  'angular-sb-01');

app.use(express.static(angularBuildPath));

const port = config.frontEndPort;
app.listen(port, () => {
  console.log(`Frontend écoutant sur le port ${port}`);
});
