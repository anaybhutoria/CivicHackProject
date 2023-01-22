//holds survey questions

const mongoose = require("mongoose")

const { Schema } = mongoose 

const surveySchema = new Schema({
    formTitle: String,
    description: String,
    end: { type: Date },
    fields: [{
        label: String,
        tag: String,
        placeholder: String
    }],
    completed: Number
})

const surveyModel = mongoose.model("Survey", surveySchema)

module.export = surveyModel