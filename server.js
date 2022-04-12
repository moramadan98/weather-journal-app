const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
// Start up an instance of app
app = express();


/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());


// Initialize the main project folder
app.use(express.static('website'));

// add post end point
app.post('/add',(req,res)=>{
    
    projectData.temp = req.body.temp;
    projectData.date = req.body.date;
    projectData.content = req.body.content;
    res.send(projectData);
});


//add get end point
app.get('/all',(req,res)=>{
    res.send(projectData);
})





// Setup Server

const port = process.env.PORT || 3000

app.listen(port , ()=>{
    console.log(`listening ${port}............`)
});


