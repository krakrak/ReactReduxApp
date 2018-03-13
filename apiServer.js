"use strict"
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// APIs
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bookshop');

var db =  mongoose.connection;
db.on('error', console.error.bind(console, '#MongoDB - connection error: '));

//--->>> SET UP SESSIONS <<<----
app.use(session({
  secret: 'mySecretString',
  saveUninitialized: false,
  resave:true,
  cookie:{maxAge: 1000 * 60 * 60 * 24 * 2},
  store: new MongoStore({mongooseConnection: db, ttl:2 * 24 * 60})
  //ttl: 2 days * 24 hours * 60 minutes
}))

// SAVE TO SESSION
app.post('/cart', function(req, res){
  var cart = req.body;
  req.session.cart = cart;
  req.session.save(function(err){
    if(err){
      throw err;
    }
    res.json(req.session.cart)
  })
});

// GET SESSION
app.get('/cart', function(req, res){
  if(typeof req.session.cart !== 'undefined'){
    res.json(req.session.cart);
  }
});
//--->>> END SESSION SET <<<----

var Books = require ('./models/books.js');

//--->>> POST BOOKS <<<----
app.post('/books', function(req, res){
  var book = req.body;

  Books.create(book, function(err, books){
    if(err){
      throw err;
    }
    res.json(books);
  })
});

//--->>> POST BOOKS <<<----
app.get('/books', function(req, res){
  Books.find(function(err, books){
    if(err){
      throw err;
    }
    res.json(books);
  })
});

//--->>> DELETE BOOKS <<<----
app.delete('/books/:_id', function(req, res){
  var query = {_id:req.params._id};
  Books.remove(query, function(err, books){
    if(err){
      console.log('# API DELETE BOOK');
    }
    res.json(books);
  })
});

//--->>> DELETE BOOKS <<<----
app.put('/books/:_id', function(req, res){
  var book = req.body;
  var query = {_id:req.params._id};
  //If the field doesn't exist $set will set a new field
  var update = {
    '$set':{
      title:book.title,
      description:book.description,
      image:book.image,
      price:book.price
    }
  };

  //when true returns the updated document
  var options = {new: true};

  Books.findOneAndUpdate(query, update, options, function(err, books){
    if(err){
      throw err;
    }
    res.json(books);
  })
})
// END


// GET BOOKS IMAGES API
app.get('/images', function(req, res){
  const imgFolder = __dirname + '/public/images';
  //Require file system
  const fs = require('fs');
  //Read all files in the directory
  fs.readdir(imgFolder, function(err, files){
    if (err)
    {
      return console.error(err);
    }

    //Create an empty array
    const filesArr = [];
    // Iterate all images folder and add image name to array
    files.forEach(function(file){
      filesArr.push({name: file});
    })

    //Send the json response with the array
    res.json(filesArr);
  })
})

// END
app.listen(3001, function(err){
  if(err){
    return console.log(err);
  }
  console.log("API Server is listening on http://localhost:3001");
})