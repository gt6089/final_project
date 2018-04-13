const models = require('../models');
const validator = require('validator');
const _ = require('lodash');

function validateInput(data) {
  let errors = {};

  if (validator.isEmpty(data.email)) {
    errors.email = 'This field is required';
  }
  if (validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (validator.isEmpty(data.password)) {
    errors.password = 'This field is required';
  }
  if (validator.isEmpty(data.passwordConfirmation)) {
    errors.passwordConfirmation = 'This field is required';
  }
  if (!validator.equals(data.password, data.passwordConfirmation)) {
    errors.passwordConfirmation = 'Passwords must match';
  }
  if (validator.isEmpty(data.timezone)) {
    errors.timezone = 'This field is required';
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  }
}

exports.createUser = async (req, res) => {
  try {
    const { errors, isValid } = validateInput(req.body);

    if (!isValid) {
      res.status(400).json(errors);
    }
    const user = await models.User.create(req.body);
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
};
