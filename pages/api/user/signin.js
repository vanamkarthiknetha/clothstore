// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectToDb from "@/middleware/mongoose";
import User from "@/schemas/User";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
const handler = async (req, res) => {
    connectToDb();
    if (req.method == "POST") {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const bytes = CryptoJS.AES.decrypt(
                user.password,
                process.env.SECRET_KEY_PW_HASH
            );
            const originalText = bytes.toString(CryptoJS.enc.Utf8);
            if (originalText == req.body.password) {
                const token = jwt.sign({ name:user.name,email:user.email },process.env.SECRET_KEY_JWT);
                res.status(200).json({ success: true,token,email:user.email});
            }
            else {
                res.status(400).json({ success: false, error: "Invalid Credentials" });
            }
        } else {
            res.status(400).json({ success: false, error: "User does not exists !" });
        }
    } else {
        res.status(400).json({ error: "Cannot handle this type of request" });
    }
};
export default handler;
