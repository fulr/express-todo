mongoose = require 'mongoose'
Schema = mongoose.Schema

exports.PostSchema = new Schema 
    author: String
    title: { type: String, required: true }
    body: String
    date: { type: Date, default: Date.now }

exports.Post = mongoose.model 'Post', exports.PostSchema

exports.UserSchema = new Schema
    username: { type: String, required: true, index: { unique: true } , lowercase: true }
    fullname: String
    password: String
    created: { type: Date, default: Date.now }
    lastlogin: { type: Date, default: Date.now }

exports.User = mongoose.model 'User', exports.UserSchema
