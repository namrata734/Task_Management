const router = require("express").Router();

const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const authorize = require("../middleware/authorize");

//register

router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });
    
    const user = await newUser.save();
    
    const jwtToken = jwtGenerator(JSON.stringify(user._id));
    //console.log(jwtToken);
    return res.json({ jwtToken });
    //res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.send(400).json("wrong credentials!");

    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated && res.send(400).json("wrong credentials!");

    const { password, ...other } = user._doc;
    //console.log(ObjectId(other._id).valueOf());
    const jwtToken = jwtGenerator(JSON.stringify(other._id));
    return res.json({ jwtToken });
    //res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/verify", authorize, (req, res) => {
    try {
      res.json(true);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  });

module.exports = router;