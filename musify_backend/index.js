// ------------------ MongoDB Database ------------------

const mongoose = require('mongoose'); 
require('dotenv').config();

// Connect to MongoDB database
mongoose.connect("mongodb+srv://"+ process.env.MONGO_USER + ":" + process.env.MONGO_PASS + "@cluster0.2qccoqq.mongodb.net/?retryWrites=true&w=majority",
                {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                }
).then((x) => {
    console.log("Connected to MongoDB database");}
).catch((err) => {
    console.log("Error connecting to MongoDB database " + err);
});

// ------------------ Node Server ------------------

const express = require('express');
const app = express();
const port = 8000;

// Default server entry point
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start server and listen on port 8000
app.listen(port, () => {
    console.log(`Node Server is listening at http://localhost:${port}`);
});

