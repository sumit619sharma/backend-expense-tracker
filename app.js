
  //require('dotenv').config(); 

const mongoose = require('mongoose')

// const path = require('path');

// const express = require('express');
// const Auth = require('./models/auth')
// const Order = require('./models/order')
// const Expense = require('./models/expense')
// const Downloads = require('./models/downloads')
// const ForgotRequest = require('./models/forgotrequest')

// const bodyParser = require('body-parser');

// const errorController = require('./controllers/error');
// const sequelize = require('./util/database');
// const cors = require('cors')
// const app = express();
// const helmet = require('helmet');

// app.use(cors());

// app.use(express.json());
// app.use(helmet());

// const expenseRoutes = require('./routes/expense');
// const authRouter = require('./routes/auth');
// const purchaseRouter = require('./routes/purchase');
// const passwordRouter = require('./routes/password');
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));


// app.use('/expense',expenseRoutes);
// app.use('/auth',authRouter );
// app.use('/purchase',purchaseRouter );
// app.use('/password',passwordRouter );


// app.use(errorController.get404);

// Auth.hasMany(Expense);
// Expense.belongsTo(Auth)

// Auth.hasMany(Order);
// Order.belongsTo(Auth);

// Auth.hasMany(ForgotRequest);
// ForgotRequest.belongsTo(Auth);

// Auth.hasMany(Downloads);
// Downloads.belongsTo(Auth);




// sequelize.sync()
// .then(result => {
//   //  console.log(result);
//   console.log('=====nkjrnkrejv',sequelize)
//     app.listen(process.env.PORT);    
// }).catch(err=> {
//     console.log("sequelize error==",err);
// })


const db_link = 'mongodb+srv://Green_619:QoYPBLkIGo6ChadM@cluster0.3goowmc.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(db_link,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then((db)=> {
  console.log('mongo db connected')
}).catch((err)=> {
  console.log('error',err);
})




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
     
  })

  async function createUser() {
try {
  let user = {
    name: 'Sumit',
    email: "sumitx619@gmail.com",
    password: '12345678',
    
  };
  let data = await Auth.create(user);
  console.log(data);  
} catch (error) {
  console.log('error',error);
}
 };
  createUser();
//   isPremium:{
//     type:Boolean 
//   } ,
// totalCost: {
// type: Number,
// defaultValue : 0,
// }