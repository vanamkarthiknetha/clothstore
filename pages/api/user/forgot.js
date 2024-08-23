// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectToDb from "@/middleware/mongoose";
import User from "@/schemas/User";
import Forgot from "@/schemas/Forgot";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";

const handler = async (req, res) => {
  connectToDb();
  if (req.method == "POST") {
    try {
    // check if user exists with the email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(200).json({
        success: false,
        msg: "User does not exists with this email !",
      });
      return;
    }

    // if exists,then send link to email to change password
    const config = {
      host: process.env.NODEMAILER_HOST,
      port: process.env.NODEMAILER_PORT,
      auth: {
          user: process.env.NODEMAILER_USER,
          pass: process.env.NODEMAILER_PASS,
      },

    };

    const transporter = nodemailer.createTransport(config);


      // Generating Token
      const token = jwt.sign(
        { email: user.email },
        process.env.SECRET_KEY_JWT,
        {
          expiresIn: "24h",
        }
      );

      const message = {
        from: "mailtrap@demomailtrap.com ", // sender address
        to: user.email, // list of receivers
        subject: "Password Reset Request", // Subject line
        html: `Hello ${user.name},
                <br/>
                We received a request to reset your password on our website ClothStore.com.
                <br/>
                To proceed with resetting your password, please click the link below:
                <br/>
                <br/>
                <a href='${process.env.NEXT_PUBLIC_HOST}/navpages/forgot?token=${token}'>Reset My Password</a>
                <br/>
                <br/>
                For your security, this link will expire in 24 hours. If you didn't request a password reset, please ignore this email or contact our support team.
                <br/>
                Security Tip: Do not share this link with anyone.
                <br/>
                Thank you,<br/>
                ClothStore Support Team<br/>
                sender@example.com`, // html body
      };
      const info = await transporter.sendMail(message);
      //Saving an entry into db
      const F0 = await Forgot.findOne({ email: req.body.email });
      if (F0) {
        await Forgot.findOneAndUpdate({ email: req.body.email }, { token });
      } else {
        const F1 = await new Forgot({
          email: user.email,
          token,
        });
        await F1.save();
      }

      res.status(200).json({
        success: true,
        msg: "Email has been sent successfully !",
        // preview: nodemailer.getTestMessageUrl(info),
      });
    } catch (error) {
      res.status(200).json({ success: false, msg: 'Some error occured !' });
    }
  } else if (req.method == "PUT") {
    try{
        
    // check if token is a valid one
    const { passwordObj, token } = req.body;
    if (passwordObj.newPassword != passwordObj.confirmNewPassword) {
        res
          .status(200)
          .json({
            success: false,
            msg: "New passwords are not matched !",
          });
        return;
      }
    if (passwordObj.newPassword.length==0) {
        res
          .status(200)
          .json({
            success: false,
            msg: "Password cannot be empty !",
          });
        return;
      }
        // finding entry in db
    const F0 = await Forgot.findOne({ token });
    if (!F0) {
      res
        .status(200)
        .json({
          success: false,
          msg: "Verification failed !",
        });
        return;
    }
        // verify token
    const payload = jwt.verify(token, process.env.SECRET_KEY_JWT);
    if(payload.email!=F0.email){
        await Forgot.deleteOne(
            { email: payload.email }
          );
        res
          .status(200)
          .json({
            success: false,
            msg: "Verification failed !",
          });
          return;
      }
      // verify token expiry
      const currTimeInSecs= Math.floor(new Date().getTime() / 1000)
      if(currTimeInSecs>payload.exp){
        await Forgot.deleteOne(
            { email: payload.email }
          );
        res
          .status(200)
          .json({
            success: false,
            msg: "This verification link is expired !",
          });
          return;
      }
    // if valid token,then change password
    const ciphertext = CryptoJS.AES.encrypt(
        passwordObj.newPassword,
        process.env.SECRET_KEY_PW_HASH
      ).toString();

      await User.findOneAndUpdate(
        { email: payload.email },
        {
          password: ciphertext,
        }
      );
      await Forgot.deleteOne(
        { email: payload.email }
      );
    res
      .status(200)
      .json({ success: true, msg: "Password has been changed successfully !" });
    } catch (error) {
        res.status(200).json({ success: false, msg: 'Some error occured !' });
      }
  } else {
    res.status(400).json({ error: "Cannot handle this type of request" });
  } 
};
export default handler;
