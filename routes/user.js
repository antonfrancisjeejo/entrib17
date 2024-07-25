const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const verifyToken = require("../middlewares/verify");

const email = "antonfrancisjeejoyt@gmail.com";
const pwd = "zwzbkryvjhferkbn";

router.get("/", (req, res) => {
  res.send("User Route is working");
});

router.post("/signup", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password,
    });
    const data = await user.save();

    const token = jwt.sign({ id: data._id }, "secretkey");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: email,
        pass: pwd,
      },
    });

    let info = await transporter.sendMail({
      from: "Tech Blasters <antonfrancisjeejoyt@gmail.com>",
      to: req.body.email,
      subject: "Verify your Email  - Tech Blasters",
      html: `
      <div>
      <strong>${req.body.name}</strong>, we welcome to our platform.
      <a style="background-color:green;color:white" href="https://melodious-entremet-7855f1.netlify.app/user/verify/${token}">Verify Email</a>
      <div>
      <p>Thanks and Regards</p>
      <p>From Tech Blasters</p>
      </div>
      </div>
      `,
    });
    console.log(info);

    res.json({ msg: "Signed up successfully" });
  } catch (error) {
    res.json({ msg: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (user.verified) {
        const result = await bcrypt.compare(req.body.password, user.password);
        if (result) {
          const token = jwt.sign({ id: user._id }, "secretkey");
          return res.json(token);
        } else {
          return res.json({ msg: "Wrong Password" });
        }
      } else {
        return res.json({ msg: "Please verify your email" });
      }
    } else {
      return res.json({ msg: "No user found" });
    }
  } catch (error) {
    return res.json({ msg: error.message });
  }
});

router.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;
    jwt.verify(token, "secretkey", async (err, decoded) => {
      if (err) {
        return res.json({ msg: "Invalid url" });
      } else {
        await User.findByIdAndUpdate(decoded.id, { verified: true });
      }
      return res.json({ msg: "Account verified" });
    });
  } catch (error) {}
});

router.get("/data", verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password");
    res.json(user);
  } catch (error) {
    return res.json({ msg: error.message });
  }
});

module.exports = router;
