const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    product_id:String,
    title:String,
    price:String,
    category:[{ type: String }],
    company_id:String,
    seller_id:[{ type : String }]
});

const product = mongoose.model('PRODUCT', userSchema, 'PRODUCT');

module.exports = product;