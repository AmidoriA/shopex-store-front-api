const DatabaseHelper = require('../Helpers/DatabaseHelper');

class GoogleUserRepository {
    
    static async getUser(googleUser) {
        try {
            return await DatabaseHelper.getData('SELECT * FROM users WHERE google_id = ?', googleUser.id, true);
        } catch (error) {
            console.log(error);
        }
    }

    static async createUser(googleUser) {
        try {
            await DatabaseHelper.writeRaw(
                'INSERT INTO users (google_id, email, first_name, last_name, profile_picture) VALUES ?',
                [
                    [
                        googleUser.id,
                        '',
                        googleUser.name.givenName,
                        googleUser.name.familyName,
                        googleUser.photos[0].value
                    ]
                ]
            );

            return await DatabaseHelper.getData('SELECT * FROM users WHERE google_id = ?', googleUser.id, true);
        } catch (error) {
            console.log(error);
        }
    }
}
  
module.exports = GoogleUserRepository;