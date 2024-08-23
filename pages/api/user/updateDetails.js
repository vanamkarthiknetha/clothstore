// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectToDb from "@/middleware/mongoose";
import User from "@/schemas/User";
import jwt from "jsonwebtoken";
const handler=async (req, res)=> {
    connectToDb()
    if(req.method=="PUT"){
        const token=req.body.token
        try{

            const payload= jwt.verify(token, process.env.SECRET_KEY_JWT)
            const user=await User.findOneAndUpdate({email:payload.email},{
                name:req.body.name,
                address:req.body.address,
                phone:req.body.phone,
                pincode:req.body.pincode,
            })
            res.status(200).json({success:true,user})
        }catch(error){
            res.status(200).json({success:false})
        }
    }
    else{
        res.status(400).json({ error:"Cannot handle this type of request" });
    }
  }
export default handler