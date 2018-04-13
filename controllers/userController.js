const models = require('../models');

exports.createUser = async (req, res) => {
  try {
    const user = await models.User.create(req.body);
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
};
