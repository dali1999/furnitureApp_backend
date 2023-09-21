const User = require("../models/User");

const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

module.exports = {
  createUser: async (req, res) => {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      location: req.body.location,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET
      ).toString(),
    });

    try {
      await newUser.save();
      // (201): created
      res.status(201).json({ message: "User successfully created" });
    } catch (error) {
      //(500): Internal Server Error
      res.status(500).json({ message: error });
    }
  },

  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      //(401): Unauthorized
      !user && res.status(401).json("Wrong credentials provide a valid email");

      const decryptedPassword = CryptoJS.AES.decrypt(
        user.password,
        provess.env.SECRET
      );
      const decryptedpass = decryptedPassword.toString(CryptoJS.enc.utf8);

      decryptedpass !== req.body.password &&
        res.satus(401).json("Wrong password");

      const userToken = jwt.sign(
        {
          id: user.id,
        },
        process.env.JET_SEC,
        { expiresIn: "7d" }
      );

      const { password, __v, createdAt, updatedAt, ...userData } = user._doc;

      res.status(200).json({ ...userData, token: userToken });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
};
