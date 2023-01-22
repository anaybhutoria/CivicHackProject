//holds survey response

const mongoose = require("mongoose")

const { Schema } = mongoose 

const resultSchema = new Schema({
    surveyId: String,
    fields: [{
        label: String,
        value: String
    }]
})

const resultModel = mongoose.model("Result", resultSchema)

module.export = resultModel