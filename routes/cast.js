const {Cast, validate} = require('../models/cast');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const casts = await Cast.find();
  res.send(casts);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    let cast = new Cast({
        name: req.body.name,
        photo: req.body.photo,
        bioLink: req.body.bioLink
    });
    cast = await cast.save();

    res.send(cast);
});

module.exports = router;