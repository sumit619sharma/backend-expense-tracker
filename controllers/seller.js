
const Seller = require('../models/seller')

exports.postAddProduct = (req,res) =>{
  console.log("post req==",req.body);
    const productName = req.body.name;
    const sellingPrice = req.body.price;
  Seller.create({
    productName,
    sellingPrice,
  }).then((result)=> {
    console.log("created done==",result);
    res.json({message: 'product created successfully',data: result})
  }).catch((err)=>{
    console.log("false done==",err);
    res.json({message: 'product failed',
    error: err})
  })
  }

  

     exports.deleteProduct = (req,res)=>{
      const delId = req.params.id;
      console.log("delete id ====",delId);
      Seller.findOne({
        where: {
          id: delId,
        }
      })
      .then((delProd)=>{
        return delProd.destroy();
      })
      .then(result => {
        res.send("user deleted");
      }).catch(err=> {
        res.status(500).send("failed to delete");
      })
     }

  exports.getAddedProduct = (req,res) =>{
    
    Seller.findAll()
    .then((result)=>{
      res.send(result);
    })
    .catch((err)=>{
      res.json({message: err});
    })
     }