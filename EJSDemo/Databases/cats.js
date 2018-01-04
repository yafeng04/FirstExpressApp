var mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017");

var catSchema = new mongoose.Schema({
  name: String,
  age: Number,
  temperament: String

});

var Cat = mongoose.model("Cat", catSchema);

// var george = new Cat({
//   name: "George",
//   age: 11,
//   temperament: "Grouchy"
//
// });
//
// george.save(function(err, cat) {
//   if (err) {
//     console.log("something went wrong");
//   } else {
//     console.log("a cat is saved to database");
//     console.log(cat);
//   }
// });

Cat.create({
  name: "Snow White",
  age: 15,
  temperament: "Bland"
}, function(err, cat) {
  if (err) {
    console.log(err);
  } else {
    console.log(cat);
  }


});

Cat.find({}, function(err, cats) {
  if (err) {
    console.log("error");
    console.log(err);
  } else {
    console.log("all the cats");
    console.log(cats);
  }

});

//add caption


//retrieve cat from database
