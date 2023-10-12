'use strict';

const sequelize = require('../Helpers/Sequelize');
const { formatAndReturn } = require('../Helpers/Functions');

const ItemRepository = require('../Repositories/ItemRepository');
const ItemModel = require('../Models/ItemModel');
const BundleModel = require('../Models/BundleModel');
const BundleItemModel = require('../Models/BundleItemModel');

const Item = ItemModel(sequelize);
const Bundle = BundleModel(sequelize);
const BundleItem = BundleItemModel(sequelize);
const itemRepository = new ItemRepository(Item, Bundle, BundleItem);

module.exports.hello = async (event) => {
    return formatAndReturn(200, {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
    });
};

module.exports.getItemTest = async (event, context) => {
    // Use ItemService to fetch item data
    const itemData = await itemRepository.find(1);
  
    return formatAndReturn(200, itemData);
};
  
module.exports.getItemTest2 = async (event, context) => {
    // Use ItemService to fetch item data
    const itemData = await itemRepository.find(2);
  
    return formatAndReturn(200, itemData);
};