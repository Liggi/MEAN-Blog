var express = require('express'),
  path = require('path'),
	mongoose = require('mongoose'),
  bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));

// Mongoose
mongoose.connect('mongodb://localhost/jason-blog');

// Init Models
var Post = require('./models/post');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback) {
	console.log("Successful database connection");
});

app.get('/api/posts', function(req, res, next) {
  var query = Post.find();
  query.exec(function(err, posts) {
    if (err) return next(err);
    res.send(posts);
  });
});

app.get('/api/posts/:postSlug', function(req, res) {
  Post.findOne({ postSlug: req.params.postSlug}, function(err, post) {
    res.send(post);
  });
});

app.listen(3000);