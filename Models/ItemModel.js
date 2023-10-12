const { Sequelize, DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class Item extends Model {}
  Item.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, { sequelize, modelName: 'Item', underscored: true });
  
  return Item;
};
