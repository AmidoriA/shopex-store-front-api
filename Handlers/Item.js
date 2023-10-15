'use strict';

const itemRepository = require('../Repositories/ItemRepository');
const itemService = require('../Services/ItemService');

const sequelize = require('../Helpers/Sequelize');
const { formatAndReturn, UnauthorizedResponse } = require('../Helpers/Functions');
const { getUserFromEvent } = require('../Helpers/Auth');

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

module.exports.favoriteItem = async (event, context) => {
  const itemID = event.pathParameters.itemID;
  const user = getUserFromEvent(event).user;
  if (!user) {
    return UnauthorizedResponse; 
  }

  const result = await itemService.favorite(user, itemID);
  console.log(result);

  return formatAndReturn(
    result ? 200 : 502
  );
};

