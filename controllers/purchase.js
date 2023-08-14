require('dotenv').config(); 
const Razorpay = require('razorpay');
 
const Order = require('../models/order');
const Expense = require('../models/expense');
const Auth = require('../models/auth');   


const purchasePremium = async (req,res) =>{
     try {

    const razorpay = new Razorpay({
        key_id: process.env.Razorpay_key_id,          // Replace with your Razorpay Key Id
        key_secret: process.env.Razorpay_secret_id,  // Replace with your Razorpay Key Secret
      });

    
      
      
      const amount =2500;
  razorpay.orders.create({amount,currency: 'INR'},async  (err,order) => {
if(err){
    console.log("failed to create order==",err);
   return await res.status(404).json({message: 'faile to create order',error: err})
}
console.log('order created in razorpay backend==',order)
 
req.user.createOrder({   orderId: order.id, status: "PENDING",}).then(()=> {
    return res.status(201).json({order , key_id: razorpay.key_id})
  }).catch( err => {
    console.log("second catch==",err);
    throw new Error(err);
  })
  

  })

} catch (error) {
    console.log("last catch==",error);
    res.status(403).json({message: 'something went wrong', error: error})
}


}

const updateTransactionStatus = async (req,res) =>{
const {order_id,payment_id,status, isPremium} = req.body;

const order= await Order.findOne({where: {orderId: order_id}})
await order.update({paymentId: payment_id,status: status})
await req.user.update({isPremium: isPremium})
res.status(202).json({success: true, message: "transaaction successful"})
}

const showLeaderBoard = async (req,res)=>{
    //console.log('backed show Leaderboard');
    // const userTotalExpense ={}
    // const userList={};
    // let expItems =await  Expense.findAll({attributes: ['authId', [seq] ]}) || [];
    // console.log("expItems backend==",expItems);
    // expItems=expItems.map((expense) => expense.dataValues);
   
    // expItems.forEach((obj)=> {
    //   let curPrice = userTotalExpense[obj.authId]?userTotalExpense[obj.authId]: 0;
    //  userTotalExpense[obj.authId]=curPrice+ Number(obj.price)
    // })
    let users = await Auth.findAll({attributes: ['id','name','totalCost'],  order: [['totalCost', 'DESC']]}) || [];
     users=users.map((user) => user.dataValues);
   // console.log("users backend==",users);
    // users.forEach((obj)=> {
    // userList[obj.id]=obj.name;  
    // })
    // let leaderList=[];
    // Object.keys(userList).forEach((key) =>{
    //     const currObj = {
    //         id: key,
    //         name: userList[key],
    //         expenseAmount: userTotalExpense[key] || 0,
    //     }
    //     leaderList.push(currObj);
    // })


    // leaderList.sort((a,b)=> b.expenseAmount-a.expenseAmount);
 //  console.log("leaderboard backend==",leaderList);
res.json({success: true,message: "sorted list",leaderList: users});
}

module.exports={
    purchasePremium,
    updateTransactionStatus,
    showLeaderBoard,
    
}