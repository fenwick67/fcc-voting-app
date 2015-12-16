var _ = require('lodash');
var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var passport = require('passport');
var User = require('../models/User');
var Poll = require('../models/Poll');
var secrets = require('../config/secrets');


/**
 * GET /mypolls
 * 
 */
exports.getPoll = function(req,res,next){
  Poll.findById(req.params.id, function(err, poll) {
    if (err) {
      //console.log('cannot get poll',req.params.id)
      return next(err);
    }
    //console.log('rendering poll',poll)
    
    res.render('polls/poll',{
      poll:poll
    });

  
  });
  
}

