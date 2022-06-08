const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productsSchema = new Schema({
    name: { type: String},
    image: { type: String},
    // price: { type: Number},
    description: { type: String},
});

const Product =  mongoose.model('Product', productsSchema);

module.exports = Product;