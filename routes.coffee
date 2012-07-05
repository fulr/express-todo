users=require './controllers/users'
posts=require './controllers/posts'

resource = (app, name, res, id) ->
    app.get '/'+name, res.index
    app.get '/'+name+'/new', res.new
    app.post '/'+name, res.create
    app.get '/'+name+'/:'+id+'/edit', res.edit
    app.put '/'+name+'/:'+id, res.update
    

exports.routes = (app) ->
    app.get '/', (req, res) -> res.render 'index', title: 'Express'

    app.get '/login', users.login
    app.post '/login', users.auth
    app.get '/logout', users.logout

    resource app, 'users', users, 'username'
    resource app, 'posts', posts, 'id'
    
