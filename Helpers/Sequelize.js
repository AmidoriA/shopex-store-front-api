const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.STORE_DB_NAME, 
    process.env.STORE_DB_USER, 
    process.env.STORE_DB_PASSWORD, 
    {
        host: process.env.STORE_DB_HOST,
        dialect: 'mysql',
        define: {
            underscored: true,
        }
    }
);

module.exports = sequelize;