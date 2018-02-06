var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ordersSchema = new Schema({
  user:{type: Schema.Types.ObjectId, ref: 'user'},
  cart: {type: Object, required: true},
  address: {type: String, required: false},
  name: {type: String, required: false},
  paymentId: {type: String, required: true}
});

module.exports = mongoose.model('Orders',ordersSchema);
