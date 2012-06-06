
/**
 * Module dependencies.
 */

var express = require('express')
    , Resource = require('express-resource')
    , routes = require('./routes').routes
    , mongoose = require('mongoose')
    , expressmongoose = require('express-mongoose');


var app = module.exports = express.createServer();

// Configuration

Date.prototype.toString=function () {
    return this.getFullYear()+"-"+this.getMonth()+"-"+this.getDate()+" "
        +this.getHours()+":"+this.getMinutes()+":"+this.getSeconds();
}


app.configure(function (){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');

    app.dynamicHelpers({
        loginuser: function (req,res) {
            if(req.session.hasOwnProperty('user'))
                return req.session.user;
            else
                return 'not logged in';
        },
        session: function (req,res) {
            return req.session;
        }
    })

    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.compiler({ src: __dirname + '/public', enable: ['less'] }));
    app.use(express.cookieParser('fkldshafjk'));
    app.use(express.session({ secret: 'fdkljaflkkldja'}));
    /**/
    app.use(function (req,res,next) {
        if(req.session.hasOwnProperty('user')
            || req.url.match(/^\/(stylesheets|img|login)/))
           return next();
        else
           res.redirect('/login?url='+escape(req.url));
    });
    /**/
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
    app.use('/img',express.static(__dirname + '/bootstrap/img'));

});

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true, showMessage: true }));
    mongoose.connect('mongodb://localhost/postdb');
});

app.configure('production', function(){
    app.use(express.errorHandler());
});

// Routes

routes(app);

app.listen(3000, function(){
   console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
