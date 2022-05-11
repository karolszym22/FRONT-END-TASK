
const express = require('express'); //Line 1
const app = express(); //Line 2
const bodyParser = require('body-parser');
const port = process.env.PORT || 3002; //Line 3
const cors = require("cors")
const fetch = require('node-fetch');
const fs = require('fs');

const content = 'Some content!';


const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}


      
app.use(cors(corsOptions))
let jsonParser = bodyParser.json()
let interns = 0;
let intern = 0;
function updateInterns(intern,interns)
{
 interns.forEach(e => {
   if(e.id === parseInt(intern.id))
   {
    
     e.name = intern.name
     e.email  = intern.email
     e.internshipStart = intern.internshipStart
     e.internshipEnd= intern.internshipEnd
   }
 });
}

async function start() {
  try {
    const response = await fetch(`http://localhost:3001/interns`);
    interns = await response.json();
  } catch (error) {
    console.log(error);
  }
}

start();
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6



app.get('/express_backend', (req, res) => { 
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); 
}); 


app.post('/data',jsonParser, async (req,res) => {
  console.log('Request received from REACT ONE');    
  intern = req.body
  updateInterns(intern, interns)
  fs.writeFile('db.json',  JSON.stringify({interns: interns}), err => {
    if (err) {
      console.error(err);
    }
  })
 ;
 
});