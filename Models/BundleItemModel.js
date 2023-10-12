const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class BundleItem extends Model {}
  BundleItem.init({
    itemId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Item', // 'Items' refers to the table name
        key: 'id',
      },
    },
    bundleId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Bundle', // 'Bundles' refers to the table name
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'BundleItem',
  });

  return BundleItem;
};
