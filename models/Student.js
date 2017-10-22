/**
 * This model is responsible for information related
 * to a Students.
 */
var db = require(__dirname + '/db');

var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

/**
 * Scehma of the Students object.
 */
var studentSchema = db.Schema({

	id: String,

	firstName: String,
	lastName: String,

	email: String,
	dob: Date,

});


module.exports = db.model('Student', studentSchema);
