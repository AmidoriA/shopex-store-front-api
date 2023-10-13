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
        const token = jwt.sign(
            {
                id: user.id,
                google_id: user.google_id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                profile_picture: user.profile_picture,
            }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        return token;
    }
}
  
module.exports = GoogleUserService;