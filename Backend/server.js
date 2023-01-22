const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const mongoose = require('mongoose');
const config = require('config');

const Surveys = require("./models/survey")
const Blogs = require("./models/blog")
const Results = require("./models/result")

const db = config.get('mongoURI');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.post('/survey/add', (req, res) => {
    const d = new Date()
    d.setDate(new Date().getDate() + res.body.future_days)
    const fields = req.body.fields
    const fi = fields.map(x => {
        x["tag"] = `${req.body.title.lower()}-${x["label"].lower()}`
    })
    const newForm = new Surveys({
        formTitle: req.body.title,
        description: req.body.desc,
        end: d,
        fields: fi,
        completed: 0
    })
    newForm.save()
});

app.get('/survey/view', (req, res) => {
    const data = Surveys.find({})
    return data
});

app.get('/survey/finish', (req, res) => {
    const finished = new Results({
        surveyId: req.body.sid,
        fields: req.body.field_info
    })
    finished.save()
})



app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

