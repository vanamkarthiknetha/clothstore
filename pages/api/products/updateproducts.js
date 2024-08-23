// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectToDb from "@/middleware/mongoose";
import Product from "@/schemas/Product";
const handler=async (req, res)=> {
    connectToDb()
    if(req.method=="POST"){
        for(let i=0;i<req.body.length;i++){
            await Product.findByIdAndUpdate(req.body[i]._id,req.body[i])
        }
        res.status(200).json({ success:"success" });
    }
    else{
        res.status(400).json({ error:"Cannot handle this type of request" });
    }
  }
export default handler