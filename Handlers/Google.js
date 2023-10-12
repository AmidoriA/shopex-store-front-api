'use strict';

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const JWT_SECRET = '1234';
const GoogleUserService = require('../Services/GoogleUserService');
const GoogleUserRepository = require('../Repositories/GoogleUserRepository');
const { formatAndReturn } = require('../Helpers/Functions');

const sequelize = require('../Helpers/Sequelize');
const googleUserService = new GoogleUserService(sequelize);

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${process.env.ROOT_URL}/${process.env.STAGE}/auth/google/callback`  // Adjust this
},
(accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}
));

module.exports.googleAuthCallbackTest = async () => {
    const googleUser = {"id":"107068599269702968028","displayName":"Tan Thanchirasuk","name":{"familyName":"Thanchirasuk","givenName":"Tan"},"photos":[{"value":"https://lh3.googleusercontent.com/a/ACg8ocKZCyCK5kiaGgzuGNlfy2mr8f4EQb4KrafpfzoICQnCxfNc=s96-c"}],"provider":"google","_raw":"{\n  \"sub\": \"107068599269702968028\",\n  \"name\": \"Tan Thanchirasuk\",\n  \"given_name\": \"Tan\",\n  \"family_name\": \"Thanchirasuk\",\n  \"picture\": \"https://lh3.googleusercontent.com/a/ACg8ocKZCyCK5kiaGgzuGNlfy2mr8f4EQb4KrafpfzoICQnCxfNc\\u003ds96-c\",\n  \"locale\": \"en\"\n}","_json":{"sub":"107068599269702968028","name":"Tan Thanchirasuk","given_name":"Tan","family_name":"Thanchirasuk","picture":"https://lh3.googleusercontent.com/a/ACg8ocKZCyCK5kiaGgzuGNlfy2mr8f4EQb4KrafpfzoICQnCxfNc=s96-c","locale":"en"}};

    const jwt = await googleUserService.retriveJwt(googleUser);

    // console.log(googleUser);
    // user = await GoogleUserRepository.getUser(googleUser);
    // console.log(user);

    const result = jwt;
    return formatAndReturn(200, result);
}

module.exports.googleAuthUrl = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;  // Important to add this for Passport
    
    const googleAuthUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const redirectUri = `${process.env.ROOT_URL}/${process.env.STAGE}/auth/google/callback`;
    const scope = 'https://www.googleapis.com/auth/plus.login';
    // const scope = 'https://www.googleapis.com/auth/userinfo.profile';
  
    const loginURL = `${googleAuthUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code`;
  
    return formatAndReturn(200, {url: loginURL});
};



module.exports.googleAuthCallback = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;  // Important to add this for Passport
  
    const authenticate = passport.authenticate('google', { session: false }, (error, googleUser) => {
      if (error) {
        callback(null, {
          statusCode: 401,
          body: JSON.stringify({ error: 'Authentication failed' }),
        });
      } else if (!googleUser) {
        callback(null, {
          statusCode: 401,
          body: JSON.stringify({ error: 'Authentication failed' }),
        });
      } else {
        // User is successfully authenticated
        // Now you can use the `user` object to generate JWT or do other tasks
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(googleUser),  // Just sending the user data for this example
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