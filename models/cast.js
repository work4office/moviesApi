const Joi = require('joi');
const mongoose = require('mongoose');

const castSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    bioLink: {
        type: String,
        required: true
    }
});

const Cast = mongoose.model('Cast', castSchema);

function validateCast(cast) {
    const schema = Joi.object({
      name: Joi.string().required(),
      photo: Joi.string().required(),
      bioLink: Joi.string().required()
    });
  
    return schema.validate(cast);
}

exports.Cast = Cast;
exports.castSchema = castSchema;
exports.validate = validateCast;