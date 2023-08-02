
  require('dotenv').config(); 


const path = require('path');

const express = require('express');
const Auth = require('./models/auth')
const Order = require('./models/order')
const Expense = require('./models/expense')
const Downloads = require('./models/downloads')
const ForgotRequest = require('./models/forgotrequest')

const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const cors = require('cors')
const app = express();
const helmet = require('helmet');

app.use(cors());
// app.set('view engine', 'ejs');
// app.set('views', 'views');
app.use(express.json());
app.use(helmet());
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const userRoutes = require('./routes/user');
const expenseRoutes = require('./routes/expense');
const sellerRoutes = require('./routes/seller');
const authRouter = require('./routes/auth');
const purchaseRouter = require('./routes/purchase');
const passwordRouter = require('./routes/password');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use('/user',userRoutes);
app.use('/expense',expenseRoutes);
app.use('/seller',sellerRoutes )
app.use('/auth',authRouter );
app.use('/purchase',purchaseRouter );
app.use('/password',passwordRouter );
// app.use('/shop',shopRoutes);

app.use(errorController.get404);

Auth.hasMany(Expense);
Expense.belongsTo(Auth)

Auth.hasMany(Order);
Order.belongsTo(Auth);

Auth.hasMany(ForgotRequest);
ForgotRequest.belongsTo(Auth);

Auth.hasMany(Downloads);
Downloads.belongsTo(Auth);


sequelize.sync()
.then(result => {
  //  console.log(result);
    app.listen(process.env.PORT);    
}).catch(err=> {
    console.log("sequelize error==",err);
})


