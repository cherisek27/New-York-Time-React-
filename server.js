//Server Dependecies 
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose"); 
const PORT = process.env.PORT || 3000; 

const app = express();
//run morgan for logging 
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd/api+json"}));

app.use(express.static(process.cwd() + '../../public/index.html'));

// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect('mongodb://localhost/nytreact', 
{
  useMongoClient: true 
});
const db = mongoose.connection;

// Show any Mongoose errors
db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});

// Once logged in to the db through mongoose, log a success message
db.once('open', function() {
  console.log('Mongoose connection successful.');
});

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

  