'use strict';

const GoogleUserRepository = require('../Repositories/GoogleUserRepository');
const jwt = require('jsonwebtoken');
const UserModel = require('../Models/UserModel');

class GoogleUserService {
    constructor(sequelize) {
        const User = UserModel(sequelize);
        this.googleUserRepository = new GoogleUserRepository(User);
    }

    async retriveJwt(googleUser) {
        const JWT_SECRET = 1234;
        let user = await this.googleUserRepository.getUser(googleUser);
        if (user == undefined) {
            user = await this.googleUserRepository.createUser(googleUser);
        }
        return user;
        // return jwt.sign(user, JWT_SECRET);
    }
}
  
module.exports = GoogleUserService;