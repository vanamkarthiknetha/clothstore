// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectToDb from "@/middleware/mongoose";
import Order from "@/schemas/Order";
import Product from "@/schemas/Product";
import {
  validatePaymentVerification,
  validateWebhookSignature,
} from "razorpay/dist/utils/razorpay-utils";
const handler = async (req, res) => {
  connectToDb();
  if (req.method == "POST") {
    const { order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const order = await new Order({
      email: req.body.data.email,
      address: req.body.data.address,
      amount: req.body.data.totalprice / 100,
      orderId: order_id,
      razorpayFields: {},
      status: "pending",
      products: req.body.data.cart,
    });

    await order.save();
    const signatureStatus = validatePaymentVerification(
      { order_id, payment_id: razorpay_payment_id },
      razorpay_signature,
      process.env.RAZORPAY_KEYSECRET
    );
    let doc;
    if (signatureStatus) {
      // updating stock available in store
      const cart=req.body.data.cart
      for (const slug in cart) {
        const item =await Product.findOneAndUpdate({slug},{ $inc: { availableQuantity: -cart[slug].qty } })  
      }
      doc=await Order.findOneAndUpdate(
        { orderId: order_id },
        { status: "paid", razorpayFields: req.body }
      );
      res.status(200).json({ success: true,doc });
      return;
    }
    doc=await Order.findOneAndUpdate(
      { orderId: order_id },
      { status: "failed", razorpayFields: req.body }
    );
    res.status(200).json({ success: false,doc });
  } else {
    res.status(400).json({ error: "Cannot handle this type of request" });
  }
};
export default handler;
