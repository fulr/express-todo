var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var PostSchema = new Schema({
    author: String
    ,title: { type: String, required: true }
    ,body: String
    ,date: { type: Date, default: Date.now }
});

var PostModel = module.exports = mongoose.model('PostModel', PostSchema);


