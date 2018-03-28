'use strict'
const bcrypt = require('bcrypt-nodejs')
const bcrypt_p = require('bcrypt-promise')
require('../helpers')

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define(
    'User',
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      yesMsg: DataTypes.STRING,
      noMsg: DataTypes.STRING,
      maybeMsg: DataTypes.STRING
    },
    {}
  )
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Event, { foreignKey: 'userId' })
    User.hasMany(models.Message, { foreignKey: 'userId' })
  }

  // User.beforeSave(async (user, options) => {
  //   let err;
  //   if (user.changed('password')) {
  //     let salt, hash;
  //     [err, salt] = await to(bcrypt.genSalt(10));
  //     if (err) {
  //       throw new Error(err)
  //     };
  //     [err, hash] = await to(bcrypt.hash(user.password, salt));
  //     if (err) {
  //       throw new Error(err)
  //     }
  //     user.password = hash
  //   }
  // })

  User.prototype.comparePassword = async function (pw) {
    let err, pass;
    console.log('checking password');
    console.log('pw', pw);
    console.log('user pw', this.password);
    if (!this.password) {
      throw new Error('password not set')
    };
    if (pw === this.password) {
      console.log('password match');
      console.log(this);
      return this;
    } else {
      throw new Error('invalid password');
      return;
    }
  }

  return User
}
