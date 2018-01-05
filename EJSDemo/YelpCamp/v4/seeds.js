var mongoose = require('mongoose'),
    Campground = require('./models/campground'),
    Comment = require('./models/comment');

var data = [{
        name: 'yang mi',
        image: 'http://img0.ph.126.net/vQJKp8CplUMUbyiSlqUbSg==/6608688306027714993.jpg',
        description: 'yangmi'
    },
    {
        name: 'yang mi',
        image: 'http://img0.ph.126.net/vQJKp8CplUMUbyiSlqUbSg==/6608688306027714993.jpg',
        description: 'yangmi'
    },
    {
        name: 'yang mi',
        image: 'http://img0.ph.126.net/vQJKp8CplUMUbyiSlqUbSg==/6608688306027714993.jpg',
        description: 'yangmi'
    },
    {
        name: 'yang mi',
        image: 'http://img0.ph.126.net/vQJKp8CplUMUbyiSlqUbSg==/6608688306027714993.jpg',
        description: 'yangmi'
    }
];


//remove all campgrounds
function seedDB() {
    Comment.remove({});

    Campground.remove({}, function (err) {
        if (err) console.log(err);
        console.log('removed campgrounds!');

        //add a few campgrounds
        data.forEach(function (seed) {
            Campground.create(seed, function (err, campground) {
                if (err) console.log(err);
                else {
                    console.log('added campground');
                    Comment.create(
                        {
                        text: 'this is a nice place',
                        author: 'hammer'

                    }, function (err, comment) {
                        if (err) console.log(err);
                        else {
                            campground.comments.push(comment);
                            campground.save();
                            console.log('created new comment')
                        }
                    });
                }
            });
        });
    });





}



module.exports = seedDB;
