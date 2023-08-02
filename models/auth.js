const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Auth = sequelize.define('auth',{
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
},
name: Sequelize.STRING,
email: {
  type: Sequelize.STRING ,
  allowNull: false
},
password: {
    type: Sequelize.STRING ,
    allowNull: false
  },
  isPremium: Sequelize.BOOLEAN,
  totalCost: {
  type: Sequelize.INTEGER,
  defaultValue : 0,
  } 
});

module.exports = Auth;