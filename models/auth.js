// const Sequelize = require('sequelize');

// const sequelize = require('../util/database');

// const Auth = sequelize.define('auth',{
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
// },
// name: Sequelize.STRING,
// email: {
//   type: Sequelize.STRING ,
//   allowNull: false
// },
// password: {
//     type: Sequelize.STRING ,
//     allowNull: false
//   },
//   isPremium: Sequelize.BOOLEAN,
//   totalCost: {
//   type: Sequelize.INTEGER,
//   defaultValue : 0,
//   } 
// });

const mongoose = require('mongoose');


const Auth = mongoose.model('auth',
{
     name: {
     type: String,
    required: true  },
  email: {
    type: String ,
 required: true,
 unique: true,
  },
  password: {
      type: String ,
      required: true
    },
      isPremium:{
        type:Boolean 
      } ,
    totalCost: {
    type: Number,
    defaultValue : 0,
    } 
  })

  const createUser  =async ()=> {
    let user = {
      name: 'Sumit',
      email: "sumitx619@gmail.com",
      password: '11111111',
      isPremium: false,
      totalCost: 10
    }
    let data = await Auth.create(user);
  }

module.exports = Auth;

