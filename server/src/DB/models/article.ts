const mongoose = require('mongoose');

const ArticleScheme = new mongoose.Schema({
      title: {
        type: String,
        required: true,
      },
      body:{
        type: String,
        required: true,
      },
    
}, { timestamps:true });

let article = mongoose.model('articles', ArticleScheme);

module.exports = article;