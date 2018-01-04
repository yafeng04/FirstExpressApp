var mongoose = require('mongoose');

//USER: email, name
var userSchema = new mongoose.Schema({
  email: String,
  name: String,
  //associate to other schema
  posts: [{
  	type: mongoose.Schema.Types.ObjectId,
  	ref: 'Post'
  }]
});

module.export=mongoose.model('User', userSchema);