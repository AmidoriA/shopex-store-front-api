const { Sequelize, DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class Bundle extends Model {}
  Bundle.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, { sequelize, modelName: 'Bundle' });
  
  return Bundle;
};