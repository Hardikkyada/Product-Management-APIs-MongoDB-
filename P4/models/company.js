const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    company_id: String,
    name: String,
    product_id: [{ type : String}]
});

const company = mongoose.model('COMPANY', userSchema, 'COMPANY');

module.exports = company;