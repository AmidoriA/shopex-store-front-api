'use strict';

const sequelize = require('../Helpers/Sequelize');
const { formatAndReturn } = require('../Helpers/Functions');
const { getUser, getUserFromEvent } = require('../Helpers/Auth');

const ItemRepository = require('../Repositories/ItemRepository');
const ItemModel = require('../Models/ItemModel');
const BundleModel = require('../Models/BundleModel');
const BundleItemModel = require('../Models/BundleItemModel');

const Item = ItemModel(sequelize);
const Bundle = BundleModel(sequelize);
const BundleItem = BundleItemModel(sequelize);
const itemRepository = new ItemRepository(Item, Bundle, BundleItem);

const dns = require('dns');
const axios = require('axios');

module.exports.dns = async (event) => {
  return new Promise((resolve, reject) => {
    dns.resolve('www.google.com', (err, addresses) => {
      if (err) {
        console.error('DNS resolution failed:', err);
        reject(new Error('DNS resolution failed'));
      } else {
        console.log('DNS resolution addresses:', addresses);
        resolve('DNS resolution succeeded');
      }
    });
  });
};

module.exports.internet = async (event) => {
  try {
    const response = await axios.get('https://www.google.com');
    console.log('Internet access succeeded:', response.status);
    return 'Internet access succeeded';
  } catch (error) {
    console.error('Internet access failed:', error);
    return 'Internet access failed';
  }
};

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

module.exports.authorized = async (event) => {
  const verified = getUserFromEvent(event);

  if (verified.statusCode != 200) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: verified.error })
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ user: verified.user })
  };
};