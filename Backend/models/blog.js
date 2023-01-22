const mongoose = require('mongoose')

const{Schema} = mongoose

const blogSchema = new Schema ({

    surveyID: String,
    title: String,
    author: String,
    body: String,
    datePosted: { type: Date },
    likes: Number
    //Add later if able to
    //
    // comments:[{ 
    //     author: String,
    //     body: String,
    //     datePosted: Date,
    //     likes: Number
    // }]

})



const Blog = mongoose.model('Blog', blogSchema)

module.export = Blog