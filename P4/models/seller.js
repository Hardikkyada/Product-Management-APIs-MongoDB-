const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    seller_id: String,
    name: String,
    product_id: [{type :String}]
});

const seller = mongoose.model('SELLER', userSchema, 'SELLER');

module.exports = seller;
