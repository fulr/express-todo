var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } , lowercase: true }
    , fullname: String
    , password: String
    , created: { type: Date, default: Date.now }
    , lastlogin: { type: Date, default: Date.now }
});

var UserModel = module.exports = mongoose.model('UserModel', UserSchema);
