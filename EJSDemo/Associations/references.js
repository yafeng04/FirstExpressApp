var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog_demo');

var Post = require('./models/post');
var User = require('./models/user');

Post.create(
	{title: 'how to have something',
	 content: 'fajiojfia'
}, function(err, post){
	User.findOne({email: 'bob@gmail.com'}, function(err, foundUser){
		if(err) console.log(err);
		else {
			foundUser.posts.push(post);
			foundUser.save(function(err, data){
				if(err) console.log(err);
				else {
					console.log(data);
				}
			});
		}
	});

});