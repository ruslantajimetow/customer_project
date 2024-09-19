'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({}) {}
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: {
        type: DataTypes.ENUM('admin', 'customer'), // Enum for roles
        defaultValue: 'customer', // Default to 'customer'
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
