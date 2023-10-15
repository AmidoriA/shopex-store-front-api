const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class ItemFavorite extends Model {}

  ItemFavorite.init({
    // Define attributes
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'items',  // Assuming the related table is named 'items'
        key: 'id',
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    // Model options
    sequelize,
    modelName: 'ItemFavorite',
    tableName: 'item_favorites',
    timestamps: true,
    indexes: [
      {
        // Create an index on item_id and user_id
        fields: ['item_id', 'user_id'],
      },
    ],
  });

  return ItemFavorite;
};