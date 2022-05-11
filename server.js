import fetch from "node-fetch";
import express from 'express';
import bodyParser from "body-parser";
const app = express(); //Line 2
const port = process.env.PORT || 3002; //Line 3


let jsonParser = bodyParser.json()
const interns = [];


app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

fetch('http://localhost:3001/interns')
  .then(response => response.json())
  .then(data => console.log(data));

app.get('/express_backend', (req, res) => { 
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); 
}); 
app.get('/http://localhost:3001/interns', (req, res) => { 
interns = req.body;
}); 

app.post('/data',jsonParser, async (req,res) => {
  console.log('Request received from REACT ONE');    
  console.log(req.body);
  res.json('Transaction Sent');
 
});