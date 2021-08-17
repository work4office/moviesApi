const {Tag, validate} = require('../models/tag');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const tags = await Tag.find();
  res.send(tags);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    let tag = new Tag({ name: req.body.name });
    tag = await tag.save();

    res.send(tag);
});

module.exports = router;