const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const ForgotRequest = sequelize.define('forgotrequest',{
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
},
isActive: Sequelize.BOOLEAN,
authId: Sequelize.INTEGER,

});

module.exports = ForgotRequest;