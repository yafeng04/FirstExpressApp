var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
	title: String,
	content: String
});

module.export=mongoose.model('Post', postSchema);