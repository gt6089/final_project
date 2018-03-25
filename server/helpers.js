const models = require('./models')

exports.getCurrentUser = async function () {
  try {
    const user = await models.User.findById(1)
    return user
  } catch (err) {
    console.log(err)
  }
}
