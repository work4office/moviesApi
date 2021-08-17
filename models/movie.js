const Joi = require('joi');
const mongoose = require('mongoose');
const { castSchema } = require('./cast');
const { genreSchema } = require('./genre');
const { tagSchema } = require('./tag');

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    poster: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    shortDesc: {
        type: String,
        required: true
    },
    genre: {
        type: [ genreSchema ],
        required: true
    },
    country: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    tag: {
        type: tagSchema,
        required: true
    },
    languages: {
        type: [ String ],
        required: true
    },
    type: {
        type: String,
        required: true
    },
    trailerLink: {
        type: String,
        required: true
    },
    cast: {
        type: castSchema,
        required: true
    },
    rating: {
        iMDBRating: {
            type: String,
        },
        rottenTomatoesRating: {
            audienceScore: {
                type: String,
            },
            tomatoMeter: {
                allCritics: {
                    type: String,
                },
                topCritics: {
                    type: String,
                }
            }
        }
    }

});

function validateCast(movie) {
    const schema = Joi.object({
      name: Joi.string().min(2).required(),
      poster: Joi.string().required(),
      duration: Joi.string().required(),
      shortDesc: Joi.string().required(),
      genreId: Joi.array().items(Joi.string()).required(),
      country: Joi.string().required(),
    //   releaseDate: Joi.Date.required(),
      tagId: Joi.string().required(),
      languages: Joi.array().items(Joi.string()).required(),
      type: Joi.string().required(),
      trailerLink: Joi.string().required(),
      castId: Joi.string().required(),
      rating: Joi.object({
        iMDBRating: Joi.string(),
        rottenTomatoesRating: Joi.object({
            audienceScore: Joi.string(),
            tomatoMeter: Joi.object({
                allCritics: Joi.string(),
                topCritics: Joi.string()
            })
        })
      })
    });
  
    return schema.validate(movie);
}

const Movie = mongoose.model('Movie', movieSchema);

exports.Movie = Movie;
exports.movieSchema = movieSchema;
exports.validate = validateCast;