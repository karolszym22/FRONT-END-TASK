import { writeFile } from 'node:fs';
const express = require('express');
const path = require('path');
const app = express();
const bodyparser = require('body-parser');


const name = {
  "interns": [{
          "id": 1,
          "name": "Bird Ramsey",
          "email": "birdramsey@nimon.com",
          "internshipStart": "2021-07-01T00:00+00Z",
          "internshipEnd": "2021-09-30T00:00+00Z"
      },
      {
          "id": 2,
          "name": "Lillian Burgess",
          "email": "lillianburgess@luxuria.com",
          "internshipStart": "2021-07-01T00:00+00Z",
          "internshipEnd": "2021-09-30T00:00+00Z"
      },
      {
          "id": 3,
          "name": "Kristie Cole",
          "email": "kristiecole@quadeebo.com",
          "internshipStart": "2020-07-01T00:00+00Z",
          "internshipEnd": "2020-09-30T00:00+00Z"
      },
     
  ]
}
const data = JSON.stringify(name);
writeFile('db.json', data, (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});

app.use(bodyparser.json());

app.post("/values", async (req, res) =>{
  const {values} = req.body
  console.log(values)
})

app.use(express.static (path.join(__dirname, 'build')));
app.get('*', function(req, res){
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

app.listen(3000);












