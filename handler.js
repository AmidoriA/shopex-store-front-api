'use strict';

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const JWT_SECRET = '1234';

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${process.env.ROOT_URL}/${process.env.STAGE}/auth/google/callback`  // Adjust this
},
(accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}
));


module.exports.googleAuthUrl = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;  // Important to add this for Passport
  
  const googleAuthUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = `${process.env.ROOT_URL}/${process.env.STAGE}/auth/google/callback`;
  const scope = 'https://www.googleapis.com/auth/plus.login';

  const loginURL = `${googleAuthUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code`;

  // const loginURL = 'adasdasd';

  // Redirect the user to Google's login page
  // You can generate a URL and return it to the client if it's an API call
  // const loginURL = passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] });
  return formatAndReturn(200, {url: loginURL});
};

module.exports.googleAuthCallback = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;  // Important to add this for Passport

  const authenticate = passport.authenticate('google', { session: false }, (error, user) => {
    if (error) {
      callback(null, {
        statusCode: 401,
        body: JSON.stringify({ error: 'Authentication failed' }),
      });
    } else if (!user) {
      callback(null, {
        statusCode: 401,
        body: JSON.stringify({ error: 'Authentication failed' }),
      });
    } else {
      // User is successfully authenticated
      // Now you can use the `user` object to generate JWT or do other tasks
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(user),  // Just sending the user data for this example
      });
    }
  });

  // Create fake Express request and response objects and apply them to Passport
  const req = {
    query: event.queryStringParameters,
    session: {}
  };
  const res = {};

  authenticate(req, res);
};

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
