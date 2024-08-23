import connectToDb from "@/middleware/mongoose";
import Product from "@/schemas/Product";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const handler=async (req, res)=> {
    connectToDb()
    const products=await Product.find()
    res.status(200).json({ products });
  }
export default  handler
  