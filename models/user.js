var mongoose = require('mongoose'),
	moment = require('moment'),
	bcrypt = require('bcryptjs');

var userSchema = mongoose.Schema({
	email: { type: String, unique: true },
	password: String
}, { collection: 'users' });

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', userSchema);