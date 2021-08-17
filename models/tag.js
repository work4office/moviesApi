const mongoose = require('mongoose');
const Joi = require('joi');

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 2,
        maxlength: 20
    },
});

const Tag = mongoose.model('Tag', tagSchema);

function validateTag(tag) {
    const schema = Joi.object({
      name: Joi.string().min(2).required()
    });
  
    return schema.validate(tag);
}

exports.tagSchema = tagSchema;
exports.Tag = Tag;
exports.validate = validateTag;