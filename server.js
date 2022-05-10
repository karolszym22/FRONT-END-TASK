const express = require('express'); //Line 1
const app = express(); //Line 2
const port = process.env.PORT || 3002; //Line 3
const bodyParser = require('body-parser');
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration


app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

// create a GET route
app.get('/express_backend', (req, res) => { //Line 9
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Line 10
}); //

app.post('/data', async (req,res) => {
  console.log('Request received from REACT ONE');    
  console.log(req.body);
  res.json('Transaction Sent');
});