'use strict';

const ItemController = require('./Controllers/ItemController');
const ItemService = require('./Services/ItemService');
const ItemRepository = require('./Repositories/ItemRepository');
const ItemModel = require('./Models/ItemModel');
const BundleModel = require('./Models/BundleModel');
const BundleItemModel = require('./Models/BundleItemModel');

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('shopex', 'root', '12345678', {
  host: 'localhost',
  dialect: 'mysql',
  define: {
    underscored: true,
  }
});

const Item = ItemModel(sequelize);
const Bundle = BundleModel(sequelize);
const BundleItem = BundleItemModel(sequelize);
const itemRepository = new ItemRepository(Item, Bundle, BundleItem);

const formatAndReturn = (statusCode, data) => {
  return {
    statusCode: statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(data),
  }; 
};

module.exports.formatAndReturn = formatAndReturn;

module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

module.exports.formatAndReturn = (statusCode, data) => {
  return {
    statusCode: statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(data),
  }; 
};

module.exports.getItem = async (event, context) => {
  const itemID = event.pathParameters.itemID;
  
  // Use ItemService to fetch item data
  // const itemData = await ItemService.getItem(itemID);
  const itemData = await itemRepository.find(itemID);

  return formatAndReturn(200, itemData);
};

module.exports.getItemFull = async (event, context) => {
  const itemID = event.pathParameters.itemID;
  

  const itemData = await itemRepository.findFull(itemID);
  return formatAndReturn(200, itemData);
};

module.exports.getItemTest = async (event, context) => {
  // Use ItemService to fetch item data
  const itemData = await ItemService.getItem(1);

  return formatAndReturn(200, itemData);
};

module.exports.getItemTest2 = async (event, context) => {
  // Use ItemService to fetch item data
  const itemData = await ItemService.getItem(1);

  return formatAndReturn(200, itemData);
};
