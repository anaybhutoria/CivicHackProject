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

function futureDate(x) {
    var today = new Date();
    var future = new Date();
    future.setDate(today.getDate() + x);
    return future;
  }


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.post('/survey/add', (req, res) => {
    const today = new Date()
    const future = new Date()
    console.log(JSON.stringify(req.body))
    future.setDate(today.getDate() + req.body.future_days)
    const fields = JSON.parse(req.body.fields)
    
    const fi = fields.map(x => {
        x["tag"] = `${req.body.title.toLowerCase()}-${x["label"].toLowerCase()}`
        return x
    })

    const survey = new Surveys({
        formTitle: req.body.title,
        description: req.body.desc,
        end: future,
        fields: fi,
        maxp: req.body.max
    })
    survey.save((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Survey saved successfully!');
    }
  });

  
});


app.get('/survey/view', (req, res) => {
    const data = Surveys.find({})
    return res.json(data)
});

app.get('/survey/uni', (req, res) => {
    const data = Surveys.findById(req.body.sid)
    return res.json(data)
});


app.post('/survey/finish', (req, res) => {
    const finished = new Results({
        surveyId: req.body.sid,
        fields: req.body.field_info
    })
    finished.save()
})


app.get('/blog/get', (req,res)=>{
    const data = Blogs.find({})
    return res.json(data)
})

app.post('/blog/post', (req,res)=>{
    const blog = new Blogs({
        surveyID: req.body.sID,
        title: req.body.title,
        author: req.body.author,
        body: req.body.body,
        datePosted: req.body.date,
        likes: req.body.likes
    })
    blog.save()
})


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

