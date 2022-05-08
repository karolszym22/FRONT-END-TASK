import { writeFile } from 'node:fs';
import { Buffer } from 'node:buffer'
const express = require('express');
const path = require('path');
const app = express();
const bodyparser = require('body-parser');


const data = new Uint8Array(Buffer.from('Hello Node.js'));
writeFile('message.txt', data, (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});

app.use(bodyparser.json());


app.use(express.static (path.join(__dirname, '../public/')));
app.listen(3000, () => {
    console.log('Servers is listening at http://localhost:3001/ Let\'s play a game!');
});












