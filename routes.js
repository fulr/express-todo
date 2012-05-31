

exports.routes=function(app){
    app.get('/', function(req, res){
      res.render('index', { title: 'Express' })
    });

    app.resource('posts',require('./controllers/posts'), {id: 'id'})

}