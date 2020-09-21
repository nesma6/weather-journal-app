// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
// Cors for cross origin allowance
const cors = require('cors');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));
const port = 8000;

// Setup Server
const server = app.listen(port, function listening(){
  console.log(`server running on localhost: ${port}`);
});

app.get('/all', (req, res)=>{
  res.send(projectData);
});

app.post('/addData', (req, res)=>{
  newEntry = {
    temp : req.body.temp,
    date : req.body.date,
    user_feeling: req.body.user_feeling
  };
  projectData = newEntry;
  console.log(projectData);
});
