var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
Username:String,
Password:String
});

module.exports = mongoose.model('users', userSchema);   


