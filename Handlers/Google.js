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
    const googleUser = {"id":"107068599269702968028","displayName":"Tan Thanchirasuk","name":{"familyName":"Thanchirasuk","givenName":"Tan"},"emails":[{"value":"ami.o2sx@gmail.com","verified":true}],"photos":[{"value":"https://lh3.googleusercontent.com/a/ACg8ocKZCyCK5kiaGgzuGNlfy2mr8f4EQb4KrafpfzoICQnCxfNc=s96-c"}],"provider":"google","_raw":"{\n  \"sub\": \"107068599269702968028\",\n  \"name\": \"Tan Thanchirasuk\",\n  \"given_name\": \"Tan\",\n  \"family_name\": \"Thanchirasuk\",\n  \"picture\": \"https://lh3.googleusercontent.com/a/ACg8ocKZCyCK5kiaGgzuGNlfy2mr8f4EQb4KrafpfzoICQnCxfNc\\u003ds96-c\",\n  \"email\": \"ami.o2sx@gmail.com\",\n  \"email_verified\": true,\n  \"locale\": \"en\"\n}","_json":{"sub":"107068599269702968028","name":"Tan Thanchirasuk","given_name":"Tan","family_name":"Thanchirasuk","picture":"https://lh3.googleusercontent.com/a/ACg8ocKZCyCK5kiaGgzuGNlfy2mr8f4EQb4KrafpfzoICQnCxfNc=s96-c","email":"ami.o2sx@gmail.com","email_verified":true,"locale":"en"}};
    
    const jwt = await googleUserService.retriveJwt(googleUser);
    const result = jwt;
    return formatAndReturn(200, result);
}

module.exports.googleAuthUrl = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;  // Important to add this for Passport
    
    const googleAuthUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const redirectUri = `${process.env.ROOT_URL}/${process.env.STAGE}/auth/google/callback`;
    const scope = 'profile email';
    // const scope = 'https://www.googleapis.com/auth/userinfo.profile';
  
    const loginURL = `${googleAuthUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code`;
  
    return formatAndReturn(200, {url: loginURL});
};



module.exports.googleAuthCallback = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;  // Important to add this for Passport
  
    const authenticate = (req, res) => {
        return new Promise((resolve, reject) => {
            passport.authenticate('google', { session: false }, (error, googleUser) => {
                if (error) {
                    console.log(error);
                    reject({ statusCode: 401, body: { error: 'Authentication failed' } });
                } else if (!googleUser) {
                    reject({ statusCode: 401, body: { error: 'Authentication failed' } });
                } else {
                    // User is successfully authenticated
                    resolve({ statusCode: 200, body: googleUser });
                }
            })(req, res);
        });
    };
  
    // Create fake Express request and response objects and apply them to Passport
    const req = {
      query: event.queryStringParameters,
      session: {}
    };
    const res = {};
  
    const authResult = await authenticate(req, res);
    if (authResult.statusCode !== 200) {
        return formatAndReturn(authResult.statusCode, authResult.body);
    }

    const jwt = await googleUserService.retriveJwt(authResult.body);
    const result = jwt;
    return formatAndReturn(200, result);
    
};