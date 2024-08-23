import connectToDb from "@/middleware/mongoose";
import Product from "@/schemas/Product";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const Razorpay = require("razorpay");
const handler = async (req, res) => {
  connectToDb();
  if (req.method == "POST") {
      // checking whether cart is tampered or not
      const cart=req.body.cart
      for (const slug in cart) {
        const item =await Product.findOne({slug})
        if(item.price!=cart[slug].price){
          res.status(200).json({success:false,error:'Your cart is tampered.\nPlease clear cart and try again !'})
          return;
        }
      }
      // checking out of stock
      for (const slug in cart) {
        const item =await Product.findOne({slug})
        if(item.availableQuantity<cart[slug].qty){
          res.status(200).json({success:false,error:'Some products in your cart are out of stock !'})
          return;
        }
      }
      

    try {
      const instance = new Razorpay({
        key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEYID,
        key_secret: process.env.RAZORPAY_KEYSECRET,
      });
      const resp = await instance.orders.create({
        amount: req.body.totalprice,
        currency: req.body.currency,
        receipt: req.body.receiptId,
      });

      res.status(200).json({success:true,...resp});
    } catch (error) {
      res.status(200).json(error);
    }
  } else {
    res.status(400).json({ error: "Cannot handle this type of request" });
  }
};
export default handler;
