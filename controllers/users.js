var UserModel=require('../models/user');

exports.index = {
    default: function (req,res) {
        res.render('user/index', {
            title: 'Users'
            , users: UserModel.find({})
        });
    }
    , json: function (req,res) {
        res.send(UserModel.find({}));
    }
}

exports.new=function (req,res) {
    res.render('user/new',{ title: 'New user' });
}

exports.create=function (req,res) {
    var newUser=new UserModel(req.param('user'));
    newUser.save(function (err) {
        if(err)
            res.render('user/new', {title: 'New user', errors: err});
        else
            res.redirect('/users');
    });
}

exports.edit=function (req,res) {
    res.render('user/edit', { 
            title: 'Edit user'
            , user: UserModel.findOne({ username: req.param('username') })
        });
}

exports.update=function (req, res, next) {
    UserModel.update({ username: req.param('username') }
        , { $set: req.param('user') }
        , function (err) {
        if(err)
            next(err);
        else
            res.redirect('/users');
    });
}

exports.login=function (req, res){
    res.render('login', { title: 'Login' });
}

exports.auth=function (req,res){
    var username=req.param('user');
    var password=req.param('password');
    var url=req.param('url');
    UserModel.findOne({ username: username, password: password }, function (err, user) {
        if(err)
            res.render('login', { title: 'Login', errors: err });
        else {
            req.session.user=username;
            user.lastlogin=Date.now();
            user.save();
            if(url)
                res.redirect(url);
            else
                res.redirect('/');
        }
    });
}

exports.logout=function (req,res){
    req.session.destroy();
    res.redirect('/login');
}