// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectToDb from "@/middleware/mongoose";
import User from "@/schemas/User";
import jwt from "jsonwebtoken";
const handler=async (req, res)=> {
    connectToDb()
    if(req.method=="POST"){
        const token=req.body.token
        const payload= jwt.verify(token, process.env.SECRET_KEY_JWT)
        const user=await User.findOne({email:payload.email})
        res.status(200).json(user)
    }
    else{
        res.status(400).json({ error:"Cannot handle this type of request" });
    }
  }
export default handler