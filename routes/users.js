var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
var Product = require('../models/products');
var Order = require('../models/orders');
var Cart = require('../models/cart');

var csrfProtection = csrf();

router.use(csrfProtection);

router.get('/profile',isLoggedIn,function(req, res, next){
  Order.find({user:req.user}, function(err, orders){
    if (err) {
      return res.write("Error Occured!!");
    }
    var cart;
    orders.forEach(function(order){
      cart = new Cart(order.cart);
      order.items = cart.generateArray();
    })
    res.render('user/profile',{orders: orders});
  });
});

router.get('/logout',isLoggedIn,function(req, res, next){
  req.logout();
    req.session.cart = null;
  res.redirect('/');
});
router.use('/',notLoggedIn, function (req, res, next) {
  next();
});
router.get('/signup', function(req, res, next) {

  res.render('user/signup',{csrfProtection: req.csrfToken(), message: req.flash('signupMessage')});

});



router.post('/signup', passport.authenticate('local-signup',{
  failureRedirect: '/user/signup',
  failureFlash: true
}),function (req, res, next) {
  var OldUrl =  req.session.oldUrl;
  req.session.oldUrl = null;
    if (OldUrl) {
      res.redirect(OldUrl);

    }else {
      res.redirect('/user/profile');
    }

});


router.get('/signin', function(req, res, next) {

  res.render('user/signin',{csrfProtection: req.csrfToken(), message: req.flash('loginMessage')});

});


router.post('/signin', passport.authenticate('local-login',{
  failureRedirect: '/user/signin',
  failureFlash: true
}),function (req, res, next) {
var OldUrl =  req.session.oldUrl;
req.session.oldUrl = null;
  if (OldUrl) {
    res.redirect(OldUrl);

  }else {
    res.redirect('/user/profile');
  }

});



module.exports = router;


function isLoggedIn(req,res,next) {

    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');

}

function notLoggedIn(req,res,next) {

    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');

}
