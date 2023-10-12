const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class BundleItem extends Model {}
  BundleItem.init({
    item_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Item', // 'Items' refers to the table name
        key: 'id',
      },
    },
    bundle_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Bundle', // 'Bundles' refers to the table name
        key: 'id',
      },
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: true,
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'BundleItem',
  });

  return BundleItem;
};
