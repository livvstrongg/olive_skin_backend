const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const testimonialsSchema = new Schema({
    name: { type: String, required: true},
    image: { type: String, required: true},
    testimony: { type: String, required: true },
});

const Testimonial =  mongoose.model('Testimonial', testimonialsSchema);

module.exports = Testimonial;