class GoogleUserRepository {

    constructor(UserModel) {
        this.User = UserModel;
    }
    
    async getUser(googleUser) {
        return await this.User.findOne({ where: {google_id: googleUser.id} });
    }

    async createUser(googleUser) {
        return await this.User.create({
            google_id: googleUser.id,
            email: googleUser.emails[0].value,
            first_name: googleUser.name.givenName,
            last_name: googleUser.name.familyName,
            profile_picture: googleUser.photos[0].value
        });
    }
}
  
module.exports = GoogleUserRepository;