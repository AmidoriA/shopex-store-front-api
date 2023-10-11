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
  


module.exports.googleAuthUrl = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;  // Important to add this for Passport
    
    const googleAuthUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const redirectUri = `${process.env.ROOT_URL}/${process.env.STAGE}/auth/google/callback`;
    const scope = 'https://www.googleapis.com/auth/plus.login';
  
    const loginURL = `${googleAuthUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code`;
  
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