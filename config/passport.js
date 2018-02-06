var passport = require('passport');
var User = require('../models/user');
var localStrategy = require('passport-local').Strategy;


passport.serializeUser(function(user, done){
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    done(err, user);
  })
});

passport.use('local-signup', new localStrategy({
  usernameField:'email',
  passwordField:'password',
  passReqToCallback: true
}, function(req, email, password, done){
  // asynchronous
          // User.findOne wont fire unless data is sent back
          process.nextTick(function() {

          // find a user whose email is the same as the forms email
          // we are checking to see if the user trying to login already exists
          User.findOne({ 'email' :  email }, function(err, user) {
              // if there are any errors, return the error
              if (err)
                  return done(err);

              // check to see if theres already a user with that email
              if (user) {
                  return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
              } else {

                  // if there is no user with that email
                  // create the user
                  var newUser            = new User();

                  // set the user's local credentials
                  newUser.email    = email;
                  newUser.password = newUser.generateHash(password);

                  // save the user
                  newUser.save(function(err) {
                      if (err)
                          throw err;
                      return done(null, newUser);
                  });
              }

          });

          });

}));


passport.use('local-login', new localStrategy({
  usernameField:'email',
  passwordField:'password',
  passReqToCallback: true
},

 function(req, email, password, done){
   // find a user whose email is the same as the forms email
         // we are checking to see if the user trying to login already exists
         User.findOne({ 'email' :  email }, function(err, user) {
             // if there are any errors, return the error before anything else
             if (err)
                 return done(err);

             // if no user is found, return the message
             if (!user)
                 return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

             // if the user is found but the password is wrong
             if (!user.validPassword(password))
                 return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

             // all is well, return successful user
             return done(null, user);
         });

}));
