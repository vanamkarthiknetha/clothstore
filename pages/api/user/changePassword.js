// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectToDb from "@/middleware/mongoose";
import User from "@/schemas/User";
import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";
const handler = async (req, res) => {
  connectToDb();
  if (req.method == "PUT") {
    const token = req.body.token;
    try {
      const payload = jwt.verify(token, process.env.SECRET_KEY_JWT);
      const user = await User.findOne({ email: payload.email });
      const bytes = CryptoJS.AES.decrypt(
        user.password,
        process.env.SECRET_KEY_PW_HASH
    );
      const oldPassword = bytes.toString(CryptoJS.enc.Utf8);
      if (req.body.currPassword != oldPassword) {
        res
          .status(200)
          .json({ success: false, msg: "Wrong password entered !" });
        return;
      }

      if (req.body.newPassword != req.body.confirmNewPassword) {
        res
          .status(200)
          .json({
            success: false,
            msg: "New passwords are not matched !",
          });
        return;
      }
      if (req.body.newPassword == oldPassword) {
        res
          .status(200)
          .json({ success: false, msg: "Cannot set same old password !" });
        return;
      }

      const ciphertext = CryptoJS.AES.encrypt(
        req.body.newPassword,
        process.env.SECRET_KEY_PW_HASH
      ).toString();

      await User.findOneAndUpdate(
        { email: payload.email },
        {
          password: ciphertext,
        }
      );
      res.status(200).json({ success: true,msg:"Password Changed Successfully !" });
    } catch (error) {
      res.status(200).json({ success: false,msg:"Authentication Failed !" });
    }
  } else {
    res.status(400).json({ error: "Cannot handle this type of request" });
  }
};
export default handler;
