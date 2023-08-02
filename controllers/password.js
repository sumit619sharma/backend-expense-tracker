require('dotenv').config(); 
const Sib = require('sib-api-v3-sdk');
const { v4: uuidv4 } = require('uuid');
const ForgotRequest = require('../models/forgotrequest')
const Auth = require('../models/auth')
 const bcrypt=require('bcrypt')

const forgotPassword = async (req,res) =>{
    const uuid = uuidv4();
const client = Sib.ApiClient.instance
const apiKey = client.authentications['api-key']
apiKey.apiKey = process.env.MAIL_API_KEY 

const user = await Auth.findOne({where:{ email: req.body.email}})
if(!user){
    res.status(401).json({message: 'no such email exist'})
}

 await ForgotRequest.create({
    id: uuid,
    isActive: true,
    authId: user.id
})

const tranEmailApi = new Sib.TransactionalEmailsApi();

const sender = {
    email: 'imsumitsharma619@gmail.com',
    name: 'sumit-sharma',
}
const receivers = [{
    email: req.body.email
}]

tranEmailApi.sendTransacEmail({
    sender,
    to: receivers,
    subject: "Click on below link to update password",
    textContent: 'clcik here to update password',
    htmlContent: `
    <h1>Click on below link to update</h1>
    <a href="http://localhost:3000/password/resetpassword/${uuid}">Update Password</a>
     `
}).then((resp)=>{console.log("backend email done",resp)
res.json({success:true,message:"forgot succesful"})
})
.catch(err => {console.log("backend email failed",err)
    res.status(400).json({success:false,message:"forgot failed"})
})

}

const resetPassword=async (req,res) =>{
    console.log("reset password req receive");
const id = req.params.uuid;
const reqst = await ForgotRequest.findOne({where:{id: id}})
if(!reqst || !reqst.isActive){
    res.status(401).json({message: 'url expired'})
}

await reqst.update({ isActive: false});

await res.status(200).send(`<html>
<script>
    function formsubmitted(e){
        e.preventDefault();
        console.log('called')
    }
</script>

<form action="/password/updatepassword/${id}" method="get">
    <label for="newpassword">Enter New password</label>
    <input name="newpassword" type="password" required></input>
    <button>reset password</button>
</form>
</html>`
)
}

const updatePassword = (req, res) => {
    console.log("update password req receive");
    try {
        const { newpassword } = req.query;
        const { resetpasswordid } = req.params;
        ForgotRequest.findOne({ where : { id: resetpasswordid }}).then(resetpasswordrequest => {
            Auth.findOne({where: { id : resetpasswordrequest.authId}}).then(user => {
                // console.log('userDetails', user)
                if(user) {
                    //encrypt the password

                    const saltRounds = 10;
                    bcrypt.genSalt(saltRounds, function(err, salt) {
                        if(err){
                            console.log(err);
                            throw new Error(err);
                        }
                        bcrypt.hash(newpassword, salt, function(err, hash) {
                            // Store hash in your password DB.
                            if(err){
                                console.log(err);
                                throw new Error(err);
                            }
                            user.update({ password: hash }).then(() => {
                                res.status(201).send( 'Successfuly update the new password')
                            })
                        });
                    });
            } else{
                return res.status(404).send( 'No user Exists')
            }
            })
        })
    } catch(error){
        return res.status(403).json({ error, success: false } )
    }

}


module.exports={
 forgotPassword,   
 resetPassword,
 updatePassword
}