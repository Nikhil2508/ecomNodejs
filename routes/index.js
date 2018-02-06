var express = require('express');
var router = express.Router();
var Product = require('../models/products');
var Cart = require('../models/cart');
var Order = require('../models/orders');
var Razorpay = require('razorpay');
/* GET home page. */
router.get('/', function(req, res, next) {
Product.find(function(err, docs){

    res.render('shop/index', { title: 'hello world', products: docs});

  });
});

router.get('/add-to-cart/:id',function (req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  Product.findById(productId, function (err, product) {
    if (err) {
      return res.redirect('/');
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect('/')
  })
});

router.get('/reduce/:id',function (req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.reduceByOne(productId);
  req.session.cart = cart;
  // console.log(req.params.id);
  res.redirect('/shopping-cart');
});

router.get('/remove/:id',function (req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.remove(productId);
  req.session.cart = cart;
  // console.log(req.params.id);
  res.redirect('/shopping-cart');
});


router.get('/shopping-cart',isLoggedIn,function(req, res, next){
  if (!req.session.cart) {
    return res.render('shop/shopping-cart', {products: null});
  }
  var cart = new Cart(req.session.cart);
  res.render('shop/shopping-cart',{products: cart.generateArray(), totalPrice: cart.totalPrice});
});


router.get('/checkout',function (req, res, next) {

  if (!req.session.cart) {
    return res.redirect('/shopping-cart');
  }
  var cart = new Cart(req.session.cart);
  res.render('shop/checkout',{totalPrice: cart.totalPrice});


});

router.post('/checkout',function (req, res, next) {
    console.log(req.isAuthenticated());

    if (!req.session.cart) {
      return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);

    var rzp = new Razorpay({
  key_id: 'rzp_test_0NecubE2Lsohnk',
  key_secret: '3iVIy3vZvVsbQdhPImvGzj1H'
});

// Capture a particular payment
rzp.payments.capture(req.body.razorToken, req.body.totalPrice*100).then((data) => {
          // success
          var order = new Order({
            user: req.user,
            cart: cart,
            address: req.body.address,
            name: req.body.name,
            paymentId: req.body.razorToken
          });
          order.save(function (err, result){

            req.flash("success","Success")
            req.session.cart = null;
            res.redirect('/');

          });
}).catch((error) => {
// error
console.log(error);
res.redirect('/checkout');
})


});


module.exports = router;


function isLoggedIn(req,res,next) {
      // console.log(req.url);
    if (req.isAuthenticated()) {
      return next();
    }
    req.session.oldUrl = req.url;
    res.redirect('/user/signin');

}
