const {Schema, model} = require('mongoose');

const blogSchema = new Schema({

    title:{
        type: String,
        required: true,
    },
    body : {
        type: String,
        required : true,

    },
    coverImageURL: {
        type: String,
        required : false,
        default : "/images/avatar.png",
    },
    createdBy : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
      comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment', // This refers to the Comment model
    }],
},{ timestamps : true });


const Blog = model('blog', blogSchema);
module.exports = Blog;
