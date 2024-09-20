'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favourite extends Model {
    static associate({ User, Housing }) {
      this.belongsTo(User, { foreignKey: 'userId' });
      this.belongsTo(Housing, { foreignKey: 'housingId' });
    }
  }
  Favourite.init(
    {
      userId: DataTypes.INTEGER,
      housingId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Favourite',
    }
  );
  return Favourite;
};
