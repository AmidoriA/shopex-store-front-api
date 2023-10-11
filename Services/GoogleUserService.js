const GoogleUserRepository = require('../Repositories/GoogleUserRepository');
const jwt = require('jsonwebtoken');

class GoogleUserService {
    static async retriveJwt(googleUser) {
        const JWT_SECRET = 1234;
        let user = await GoogleUserRepository.getUser(googleUser);
        if (user == undefined) {
            user = await GoogleUserRepository.createUser(googleUser);
        }
        return user;
        // return jwt.sign(user, JWT_SECRET);
    }
}
  
module.exports = GoogleUserService;