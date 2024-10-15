// external modules
import express from 'express';
import dotenv from 'dotenv';

// local modules

// load .env variables
dotenv.config();

// program constants
const app = express();
// const uri = process.env.MONGO_URI;

// middleware 


// app.get + app.post endpoints
app.get('/', (req, res) => {
  res.send(`Hello`);
});

// helper fns


// init app 
const port = process.env.PORT || 3000;
app.listen(port);