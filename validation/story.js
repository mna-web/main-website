const isEmpty = require('./is-empty');
const Validator = require('validator');

module.exports = function validateStoryInput(data) {
  const errors = {};

  data.text = !isEmpty(data.text) ? data.text : '';

  if (!Validator.isLength(data.text, { min: 10, max: 1000 })) {
    errors.text = 'Story must be between 10 and 1000 characters';
  }

  if (Validator.isEmail(data.text)) {
    errors.text = 'Text field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
