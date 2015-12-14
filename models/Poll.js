var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var mongoose = require('mongoose');

var pollSchema = new mongoose.Schema({
  name:{type:String,default:"new poll"},
  options:Array,
  results:Array,
  active:Boolean
});

module.exports = mongoose.model('Poll', pollSchema);
