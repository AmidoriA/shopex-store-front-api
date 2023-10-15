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

module.exports.unfavorite = async (event, context) => {
  const itemID = event.pathParameters.itemID;
  const user = getUserFromEvent(event).user;
  if (!user) {
    return UnauthorizedResponse; 
  }

  const result = await itemService.unfavorite(user, itemID);

  return formatAndReturn(
    result ? 200 : 502
  );
};

module.exports.getFavoriteItems = async (event, context) => {
  const user = getUserFromEvent(event).user;
  if (!user) {
    return UnauthorizedResponse; 
  }

  const result = await itemRepository.getFavoritedItems(user.id);

  return formatAndReturn(200, result);
};


