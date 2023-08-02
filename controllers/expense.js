
const Downloads = require('../models/downloads');
const Expense = require('../models/expense')
const sequelize = require('../util/database');
require('dotenv').config(); 

const AWS = require('aws-sdk')

exports.postAddExpense =async (req,res) =>{
  const t = await sequelize.transaction();  
try {
  
  console.log('req user===',req.user);
  const product = req.body.product;
  const price = req.body.price;
  const category = req.body.category;

    const resp = await req.user.createExpense({ product, price, category},{transaction: t}  )

   await  req.user.update({totalCost: req.user.totalCost + Number(price)}, {transaction: t})

  await t.commit();
  res.json({message: 'Expense created', data: resp})

} catch (error) {
  await t.rollback();
  res.status(400).json({message: 'Expense failed', error: error})
}
}

  exports.editAddedExpense = async (req,res) =>{
    const t = await sequelize.transaction();  

    try {

      
    console.log('edit req body==',req.body);
    const expId = req.body.id;
      const upname = req.body.product;
      const upprice = req.body.price;
      const upcat = req.body.category;
      
 const user=  await   Expense.findOne({
        where: {
          id: expId,
          authId: req.user.id,
        },
      },{transaction: t})
      
  
  console.log(user);
  let diffPrice = Number(upprice)-Number(user.price) 
  user.product = upname;  user.price = upprice;  user.category = upcat;
   await  user.save();
      
   
  await  req.user.update({totalCost: req.user.totalCost + Number(diffPrice)},{transaction: t})
  await t.commit();     
  res.json({success: true, message: "updated succefully"})
      
      
    } catch (error) {
      await t.rollback();
      res.status(500).json({message: 'failed to update Expense',error})
    }

      }

     exports.deleteExpense =async  (req,res)=>{
      const t = await sequelize.transaction();
      try {
  const delId = req.params.id;
     
  const delUser= await   Expense.findOne({
       where: {
         id: delId,
         authId: req.user.id
       }
     },{transaction: t})
     
       await delUser.destroy();
       await  req.user.update({totalCost: req.user.totalCost - Number(delUser.price)}, {transaction: t})
    
       await t.commit();
     await  res.send("Expense deleted");
  
} catch (error) {
  await t.rollback();
  res.status(500).send("failed to delete Expense");
}


      
      
      
      
     }

     exports.getExpenseById = (req,res)=>{
        const getId = req.params.id;
        console.log("delete id ====",getId);
        Expense.findOne({
          where: {
            id: getId,
          }
        })
        .then((getExp)=>{
          res.json(getExp);
        })
        .catch(err=> {
          res.status(500).send("failed to get Expense");
        })
       }

  exports.getAddedExpense =async (req,res) =>{
    const page = Number(req.query.page) || 1;
    const ITEMS_PER_PAGE = Number(req.query.limit) || 5;
    console.log('get page==',page);
    const totalExp = await Expense.count({
      where: { authId: req.user.id}
    })
    console.log('total exp count==',totalExp)
      
     Expense.findAll({where:{authId: req.user.id,  }, offset: (page-1)* ITEMS_PER_PAGE, limit: ITEMS_PER_PAGE })
    .then((result)=>{
     // console.log('restricted expense==',result);
     const paginationInfo = {
      currentPage: page,
      hasNextPage: (ITEMS_PER_PAGE * page) < totalExp,
      nextPage: page +1,
      hasPreviousPage: page>1,
      lastPage: Math.ceil(totalExp/ITEMS_PER_PAGE),
     }

      res.status(200).json({products: result, paginationInfo});
    })
    .catch((err)=>{
      res.json({message: err});
    })
     }

    async function uploadToS3(data,filename){
      const BUCKET_NAME = process.env.BUCKET_NAME;
      const IAM_USER_KEY =process.env.IAM_USER_KEY;
      const IAM_USER_SECRET =process.env.IAM_USER_SECRET;

      let s3bucket = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET,
      
      })
        
      var params = {
          Bucket: BUCKET_NAME,
          Key: filename,
          Body: data,
          ACL: 'public-read'
        }
        return new Promise((resolve,reject) => {
          s3bucket.upload(params, (err,resp) =>{
            if(err){
  console.log("s3 error==",err);
  reject(err);
            }
            else{
  resolve( resp.Location);
            }
           });

        })
         
         

     }

     exports.downloadExpense =async (req,res) =>{
      
     try {
  const expenses= await  Expense.findAll({where:{authId: req.user.id} })
      const stringifiedExpense = JSON.stringify(expenses);
      const filename = `Expense${req.user.id}/${new Date()}.txt`;
      const fileUrl = await uploadToS3(stringifiedExpense,filename)
    
    await  req.user.createDownload({ url: fileUrl})
      res.status(200).json({fileUrl,success: true})
      
} catch (error) {
  res.status(500).json({fileUrl: '',success: false})
}

      }

      exports.previousDownloads =async (req,res)=>{
        console.log('called previous download==');
    try {
      const list=await  Downloads.findAll({where: {authId: req.user.id}})
 console.log('backend download list===',list);
      res.status(200).json({downloads: list});
    } catch (error) {
      res.status(500).json({message: 'server error',error})
    }
      }