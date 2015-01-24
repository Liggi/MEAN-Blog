var express = require('express'),
  path = require('path'),
	mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  session = require('express-session'),
  cookieParser = require('cookie-parser'),
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({ secret: 'straight up g' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
  if (req.user) {
    res.cookie('user', JSON.stringify(req.user));
  }
  next();
});

// Mongoose
mongoose.connect('mongodb://localhost/jason-blog');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback) {
  console.log("Successful database connection");
});

// Init Models
var Post = require('./models/post');
var User = require('./models/user');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy({ usernameField: 'email' }, function(email, password, done) {
  User.findOne({ email: email }, function(err, user) {
    if (err) return done(err);
    if (!user) return done(null, false);

    user.comparePassword(password, function(err, isMatch) {
      if (err) return done(err);
      if (isMatch) return done(null, user);
      return done(null, false);
    });
  });
}));

app.post('/api/login', passport.authenticate('local'), function(req, res) {
  res.cookie('user', JSON.stringify(req.user));
  res.send(req.user);
});

app.get('/api/logout', function(req, res, next) {
  req.logout();
  res.send(200);
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

app.get('/admin/dashboard', ensureAuthenticated, function(req, res, next) {
  res.redirect('/#' + req.originalUrl);
});

app.get('*', function(req, res) {
  res.redirect('/#' + req.originalUrl);
});

app.listen(3000);

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  }
  else res.send(401);
}