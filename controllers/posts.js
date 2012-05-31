var PostModel=require('../models/post');

exports.index=function(req,res){
    PostModel.find({},function(err, posts) {
        res.render('post/index',{title: 'Posts', posts: posts, errors: err});
    });
}

exports.new = function(req, res){
  res.render('post/new',{title: 'New post'});
};

exports.create = function(req, res){
    var post=new PostModel();
    var newPost=req.param('post');
    for(var key in newPost)
        post[key]=newPost[key];
    post.save(function(err){
        if(err)
            res.render('post/new',{title: 'New post', errors: err});
        else
            res.redirect('/posts');
    });
};

exports.show = function(req, res){
    PostModel.findById(req.param("id"),function(err, post) {
        res.render('post/show',{title: 'Show post', post: post, errors: err});
    });
};

exports.edit = function(req, res){
    PostModel.findById(req.param("id"),function(err, post) {
        res.render('post/edit',{title: 'Edit post', post: post, errors: err});
    });
};

exports.update = function(req, res){
    PostModel.findById(req.param("id"),function(err, post) {
        if(err)
            res.render('post/edit',{title: 'Edit post', post: post, errors: err});
        else {
            var newPost=req.param('post');
            for(var key in newPost)
                post[key]=newPost[key];
            post.save(function(err){
                if(err)
                    res.render('post/edit',{title: 'Edit post', post: post, errors: err});
                else
                    res.render('post/show',{title: 'Show post', post: post, errors: err});
            });
        }
    });
};

exports.destroy = function(req, res){
    PostModel.findById(req.param("id"),function(err, post) {
        post.remove();
        res.redirect('/posts');
    });
};
