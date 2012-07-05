User = require('../models').User

exports.index = (req,res) -> 
    User.find {}, (err, users) ->
        res.render 'user/index', { title: 'Users', users: users, errors: err }

exports.new=(req,res) -> 
    res.render 'user/new', { title: 'New user' }

exports.create=(req,res) -> 
    newUser=new User req.param('user')
    newUser.save (err) ->
        if err
            res.render 'user/new', {title: 'New user', errors: err}
        else
            res.redirect '/users'

exports.edit=(req,res) ->
    User.findOne { username: req.param 'username' }, (err, user) ->
        res.render 'user/edit', { title: 'Edit user', user: user }

exports.update=(req, res, next) ->
    User.update { username: req.param 'username'  }, { $set: req.param 'user' },
        (err) ->
            if err 
                next err
            else 
                res.redirect '/users'

exports.login=(req, res) -> 
    res.render 'login', { title: 'Login' }

exports.auth=(req,res) ->
    username=req.param 'user'
    password=req.param 'password'
    url=req.param 'url'
    User.findOne { username: username }, (err, user) ->
        if err 
            res.render 'login', { title: 'Login', errors: err }
        else
            if user.password is password
                req.session.user=username
                user.lastlogin=Date.now()
                user.save()
                if url 
                    res.redirect url
                else 
                    res.redirect '/'
            else
                res.render 'login', { title: 'Login', errors: 'Auth failed'}

exports.logout=(req,res) ->
    req.session.destroy()
    res.redirect '/login'
