var mongoose = require('mongoose'),
	moment = require('moment');

var postSchema = mongoose.Schema({
	title: String,
	datetime: Date,
	description: String,
	content: String,
  postSlug: String
}, { collection: 'posts' });
postSchema.virtual('displayDate').get(function() {
  return moment(this.datetime).format('Do MMMM YYYY');
});
postSchema.virtual('formattedDate').get(function() {
  return moment(this.datetime).format('YYYY-MM-DD');
});

module.exports = mongoose.model('Post', postSchema);