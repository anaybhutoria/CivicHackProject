const express = require('express');
const cors = require('cors');
require('dotenv').config();


const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');


const app = express();

// Example code given by MongoDB

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://root:root@cluster0.pycp0uz.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });



const connectDB = require('./config/db');
connectDB();

app.get('/', (req, res) => res.send('Hello world!'));




const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.listen(port, () => {
console.log(`Server is running on port: ${port}`);
});

