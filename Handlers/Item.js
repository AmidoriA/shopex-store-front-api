'use strict';

const ItemRepository = require('../Repositories/ItemRepository');
const ItemModel = require('../Models/ItemModel');
const BundleModel = require('../Models/BundleModel');
const BundleItemModel = require('../Models/BundleItemModel');

const sequelize = require('../Helpers/Sequelize');
const { formatAndReturn } = require('../Helpers/Functions');

const Item = ItemModel(sequelize);
const Bundle = BundleModel(sequelize);
const BundleItem = BundleItemModel(sequelize);
const itemRepository = new ItemRepository(Item, Bundle, BundleItem);

module.exports.getItem = async (event, context) => {
  const itemID = event.pathParameters.itemID;
  
  const itemData = await itemRepository.find(itemID);
  return formatAndReturn(200, itemData);
};

module.exports.getItemFull = async (event, context) => {
  const itemID = event.pathParameters.itemID;

  const itemData = await itemRepository.findFull(itemID);
  return formatAndReturn(200, itemData);
};


