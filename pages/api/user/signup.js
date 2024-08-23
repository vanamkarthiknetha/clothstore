// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectToDb from "@/middleware/mongoose";
import User from "@/schemas/User";
import CryptoJS from "crypto-js";

const handler=async (req, res)=> {
    connectToDb()
    if(req.method=="POST"){
        const user=await User.findOne({email:req.body.email})
        if(user){
            res.status(400).json({ success:false,error:"Account already exists with this email id !" });
        }
        else{
            const ciphertext = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY_PW_HASH).toString();
            const newUser=await new User({...req.body,password:ciphertext})
            await newUser.save();
            res.status(200).json({success:true});

        }
    }
    else{
        res.status(400).json({ error:"Cannot handle this type of request" });
    }
  }
export default handler