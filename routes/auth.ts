import { Request, Response, Router } from "express";
import bcrypt from "bcryptjs";
import userModel from "../models/userModel";
import transport from "../utils/nodemialer";
import jwt from "jsonwebtoken";
const router = Router();
const JWT_SECRET = "!@#$#@!@#rtyuioiuyt";
router.post("/register", async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json("Please enter all the credentials");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await userModel.create({
      email,
      password: hashedPassword,
      username,
    });

    transport.sendMail({
      to: email,
      subject: "Verification Process",
      html: `<h1>Please click on this <a href = "http://localhost:5000/auth/verify/${user.id}">Link</a> to get verified</h1>`,
    });
    return res.status(200).json({
      message:
        "Registered Successfuly. MAil has been sent to your email. Please verify to Login",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json("Something went wrong... Please try again later.");
  }
});

router.get("/verify/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) return res.status(404).json("Invalid User ID");
    await userModel.findByIdAndUpdate(
      { _id: userId },
      {
        verified: true,
      }
    );
    return res.send(
      "<h1>You are now verified. Click <a href = `http://localhost:3000/login`>here</a> to login.</h1>"
    );
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json("Something went wrong... Please try again later");
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json("Please enter all the credentials");
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json("Invalid Credentials");
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(400).json("Invalid Credentials");
    }
    if (!user.verified) {
      return res.status(400).json("Please verify your account");
    }
    const data = {
      id: user._id,
    };
    const token = jwt.sign(data, JWT_SECRET);
    return res.status(200).cookie("token", token).json("Login successfully");
  } catch (error) {
    console.log(error);
    return res.status(400).json("Something went wrong");
  }
});

router.put("/editprofile", async (req: Request, res: Response) => {
  try {
    const { username, email, profliePicture } = req.body;
    if (!username || !profliePicture) {
      return res.status(400).json("Please enter all the credentials");
    }
    await userModel.findOneAndUpdate({ email }, { username, profliePicture });
    return res.status(200).json("Updated Successfully");
  } catch (error) {
    return res.status(400).json("Something went wrong");
  }
});

export default router;
