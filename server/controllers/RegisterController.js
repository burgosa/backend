var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var User = mongoose.model('User');

module.exports = function(app, route) {

  return function(req, res, next) {
    
    if(!req.body.username || !req.body.password || !req.body.firstName || !req.body.lastName){

      return res.status(400).json({message: 'Please fill out all fields'});
    
    }


     if(req.body.username === 'undefined' || req.body.password === 'undefined'
      || req.body.firstName === 'undefined' || req.body.lastName === 'undefined' ){

      return res.status(400).json({message: 'Please fill out all fields'});

    }

    var user = new User();

    user.username = req.body.username;

    user.firstName = req.body.firstName;

    user.lastName = req.body.lastName;

    user.setPassword(req.body.password)

    user.save(function (err){

      if(err){ return next(err); }

      return res.json({token: user.generateJWT()})
    
    });

  };

};