const DatabaseHelper = require('../Helpers/DatabaseHelper');

class GoogleUserRepository {

    constructor(UserModel) {
        this.User = UserModel;
    }
    
    async getUser(googleUser) {
        return await this.User.findByPk(2);
        return await this.User.findOne({ where: {google_id: googleUser.id} });
    }

    async createUser(googleUser) {
        return await this.User.create({
            google_id: googleUser.id,
            email: '',
            first_name: googleUser.name.givenName,
            last_name: googleUser.name.familyName,
            profile_picture: googleUser.photos[0].value
        });
    }
}
  
module.exports = GoogleUserRepository;