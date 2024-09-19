'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Housing extends Model {
    static associate({ Category }) {
      this.belongsTo(Category, { foreignKey: 'categoryId' });
    }
  }
  Housing.init(
    {
      title: DataTypes.STRING,
      desc: DataTypes.STRING,
      image: DataTypes.STRING,
      price: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Housing',
    }
  );
  return Housing;
};
