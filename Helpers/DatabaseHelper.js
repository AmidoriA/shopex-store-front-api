const mysql = require('mysql');

const connection = mysql.createConnection({
    host: process.env.STORE_DB_HOST,
    user: process.env.STORE_DB_USER,
    password: process.env.STORE_DB_PASSWORD,
    database: process.env.STORE_DB_NAME,
});

class DatabaseHelper {
    static async getData(sql, values, single = false) {
        return new Promise((resolve, reject) => {
            connection.query(sql, values, (error, results) => {
                if (error) reject(error);
                else {
                    if (single) resolve(results[0]);
                    else resolve(results)
                }
            });
        });
    }
}
  
module.exports = DatabaseHelper;

