Post=require('../models').Post

exports.index=(req,res) ->
    Post.find {}, (err, posts) -> 
        res.render 'post/index', { title: 'Posts', posts: posts, errors: err }

exports.new = (req, res) -> res.render 'post/new', { title: 'New post' }

exports.create = (req, res) ->
    post=new Post req.param 'post'
    post.save (err) ->
        if err
            res.render 'post/new', { title: 'New post', errors: err }
        else
            res.redirect '/posts'

exports.show = (req, res) ->
    id=req.param "id"
    Post.findById id, (err, post) ->
        res.render 'post/show', { title: 'Show post', post: post, errors: err }

exports.edit = (req, res) ->
    Post.findById req.param("id"), (err, post) ->
        res.render 'post/edit', { title: 'Edit post', post: post, errors: err}

exports.update = (req, res) ->
    post=req.param 'post'
    Post.update { _id: req.param("id") }, { $set: post }, (err) ->
        if err
            res.render 'post/edit', { title: 'Edit post', post: post, errors: err }
        else
            res.redirect '/posts'

exports.destroy = (req, res) ->
    Post.findById req.param("id"), (err, post) ->
        post.remove()
        res.redirect '/posts'
