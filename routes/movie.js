const {Movie, validate} = require('../models/movie');
const {Genre} = require('../models/genre');
const {Tag} = require('../models/tag');
const {Cast} = require('../models/cast');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const movies = await Cast.find();
  res.send(movies);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    let genreArray = [];
    req.body.genreId.forEach(async (id) => {
        const genre = await Genre.findById(id);
        if (!genre) return res.status(400).send('Invalid genre.');
        genreArray.push(
            {
                _id: genre._id,
                name: genre.name
            }
        );
    })

    const tag = await Tag.findById(req.body.tagId);
    if (!tag) return res.status(400).send('Invalid tag.');

    const cast = await Cast.findById(req.body.castId);
    if (!cast) return res.status(400).send('Invalid cast.');

    let movie = new Movie({
        name: req.body.name,
        poster: req.body.poster,
        duration: req.body.duration,
        shortDesc: req.body.shortDesc,
        genre: genreArray,
        country: req.body.country,
        // releaseDate: req.body.releaseDate,
        tag: {
            _id: tag._id,
            name: tag.name
        },
        languages: req.body.languages,
        type: req.body.type,
        trailerLink: req.body.trailerLink,
        cast: {
            _id: cast._id,
            name: cast.name,
            photo: cast.photo,
            bioLink: cast.bioLink
        },
        rating: {
            iMDBRating: req.body.iMDBRating,
            rottenTomatoesRating: {
                audienceScore: req.body.audienceScore,
                tomatoMeter: {
                    allCritics: req.body.allCritics,
                    topCritics: req.body.topCritics
                }
            }
        }
    });
    movie = await movie.save();

    res.send(movie);
});

module.exports = router;