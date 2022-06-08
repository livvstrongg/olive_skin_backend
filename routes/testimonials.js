const router = require('express').Router();
let Testimonial = require('../models/testimonials.model');

router.route('/').get((req, res) => {
  Testimonial.find()
    .then(testimonials => res.json(testimonials))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const image = req.body.image;

  const newTestimonial = new Testimonial({
    name,
    description,
    image,
  });

  newTestimonial.save()
  .then(() => res.json('Testimony added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Testimonial.findById(req.params.id)
    .then(testimonials => res.json(testimonials))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Testimonials.findByIdAndDelete(req.params.id)
    .then(() => res.json('Testimonial deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Testimonial.findById(req.params.id)
    .then(testimonials => {
      testimonials.name = req.body.name;
      testimonials.description = req.body.description;
      testimonials.image = req.body.image;
     
      testimonials.save()
        .then(() => res.json('Testimony updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;