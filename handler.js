'use strict';

const ItemController = require('./Controllers/ItemController');
const ItemService = require('./Services/ItemService');

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
  const itemData = await ItemService.getItem(itemID);

  return formatAndReturn(200, itemData);
};

module.exports.getItemFull = async (event, context) => {
  const itemID = event.pathParameters.itemID;
  
  // Use ItemController to fetch item data
  const itemData = await ItemController.getItem(itemID);

  return formatAndReturn(200, itemData);
};

