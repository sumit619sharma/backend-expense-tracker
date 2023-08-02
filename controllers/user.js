
const User = require('../models/user')

exports.postAddUser = (req,res) =>{
  
    const name = req.body.name;
    const email = req.body.email;
    const contact = req.body.contact;
  User.create({
    name: name,
    email: email,
    contact: contact,
  }).then((result)=> {
    
    res.json({message: 'user created successfully'})
  }).catch((err)=>{
    
    res.json({message: 'user failed',
    error: err})
  })
  }

  exports.editAddedUser = (req,res) =>{
    console.log('edit req body==',req.body);
    const userId = req.body.id;
      const upname = req.body.name;
      const upemail = req.body.email;
      const upcontact = req.body.contact;
      
      User.findOne({
        where: {
          id: userId,
        },
      })
      .then((user)=> {
        console.log(user);
        user.name = upname;
        user.email = upemail;
        user.contact = upcontact;
        return  user.save();
      }).then(result => {
        console.log('updated user success')
        res.json({message: 'updated user success'})
      })
      .catch(err=> {console.log(err)
        res.json({message: 'failed to update user'})
      });
    
     }

     exports.deleteUser = (req,res)=>{
      const delId = req.params.id;
      console.log("delete id ====",delId);
      User.findOne({
        where: {
          id: delId,
        }
      })
      .then((delUser)=>{
        return delUser.destroy();
      })
      .then(result => {
        res.send("user deleted");
      }).catch(err=> {
        res.status(500).send("failed to delete");
      })
     }

  exports.getAddedUser = (req,res) =>{
    
    User.findAll()
    .then((result)=>{
      res.send(result);
    })
    .catch((err)=>{
      res.json({message: err});
    })
     }


     