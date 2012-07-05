# Module dependencies.

express = require 'express'
routes = require('./routes').routes
mongoose = require 'mongoose' 
expressmongoose = require 'express-mongoose'

app = module.exports = express.createServer()

# Configuration

dynHelpers=(req,res) ->
    if req.session.hasOwnProperty 'user' 
        res.locals.loginuser = req.session.user
    else
        res.locals.loginuser = 'not logged in'
    res.locals.session = req.session

auth=(req,res,next) ->
    if req.session.hasOwnProperty('user') or req.url.match(/^\/(css|js|img|login)/)
       return next()
    else
       res.redirect '/login?url='+escape req.url

app.configure -> 
    app.set 'port', 3000
    app.set 'views', __dirname + '/views'
    app.set 'view engine', 'jade'

    app.locals.use dynHelpers

    app.locals.dateformat = require 'dateformat'

    app.use express.logger 'dev'
    app.use express.bodyParser()
    app.use express.methodOverride()
    app.use express.cookieParser 'fkldshafjk'
    app.use express.session() # secret: 'fdkljaflkkld'
    #app.use auth
    app.use app.router
    app.use require('connect-assets')()
    app.use express.static __dirname + '/public'
    app.use '/img', express.static __dirname + '/bootstrap/img'

app.configure 'development', ()->
    app.use express.errorHandler dumpExceptions: true, showStack: true, showMessage: true
    mongoose.connect 'mongodb://localhost/postdb'

app.configure 'production', ()->
    app.use express.errorHandler()

# Routes

routes app

app.listen app.get('port'), () ->
    console.log "Express server listening on port %d in %s mode", app.get('port'), app.settings.env
