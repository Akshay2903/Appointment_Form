const Sequelize = require('sequelize');

const sequelize = new Sequelize('appointment', 'root', 'akshay',{
    dialect: 'mysql',
    host: 'localhost',
});

module.exports = sequelize;