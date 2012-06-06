var users=require('./controllers/users');

exports.routes=function(app){
    app.get('/', function(req, res){
      res.render('index', { title: 'Express' })
    });

    app.get('/login', users.login);
    app.post('/login', users.auth);
    app.get('/logout', users.logout);

    app.resource('posts', require('./controllers/posts'), {id: 'id'})
    app.resource('users', users, {id: 'username'})
}