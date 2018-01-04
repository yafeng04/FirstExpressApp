var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog_demo');

//POST - title, content
var postSchema = new mongoose.Schema({
  title: String,
  content: String

});
var Post = mongoose.model('Post', postSchema);


//USER: email, name
var userSchema = new mongoose.Schema({
  email: String,
  name: String,
  //associate to other schema
  posts: [postSchema]
});
var User = mongoose.model('User', userSchema);

var newUser = new User({
  email: "aaa@aa.com",
  name: "aa bb"

});

newUser.posts.push({
  title: 'another title',
  content: 'another content'
});

newUser.save(function(err, user) {
  if (err) {
    console.log(err);
  } else console.log(user);
});

// var newUser = new User({
//   email: "aaa@aa.com",
//   name: "aa bb"
//
// });
//
// newUser.save(function(err, user) {
//   if (err) {
//     console.log(err);
//   } else console.log(user);
// });

// var newPost = new Post({
//   title: "some title",
//   content: "some content"
//
// });
//
// newPost.save(function(err, post) {
//   if (err) {
//     console.log(err);
//   } else console.log(post);
// });

User.findOne({name: "aa bb"}, function(err, user) {
  if(err){
    console.log(err);
  }
  else{
    user.posts.push({
      title: "aaa bbb",
      content: "aaa bbb"
    });
    user.save(function(err, user) {
      if(err){
        console.log(err);
      }
      else console.log(user);
    });
  }
})
