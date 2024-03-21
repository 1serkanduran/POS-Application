const User = require("../models/User.js");
const router = require("express").Router();
const bcrypt = require("bcryptjs");

// //get all User
// router.get("/get-all", async (req, res) => {
//   try {
//     const users = await User.find();
//     // res.send(categories);
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(400).json(error);
//   }
// });

//register
router.post("/register", async (req, res) => {
  try {
    // const newUser = new User(req.body);
    // await newUser.save();
    const {username,email,password}=req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({username,email,password:hashedPassword});
    await newUser.save();
    res.status(200).json("A new user created successfully.");
  } catch (error) {
    res.status(400).json(error);
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const user=await User.findOne({email:req.body.email});
    if (!user) {
      return res.status(404).send({ error: "User not found!" });
    }

    const validPassword=await bcrypt.compare(req.body.password,user.password);

    if(!validPassword) res.status(403).send("wrong password");
    else res.status(200).json(user);

  } catch (error) {
    res.status(400).json(error);
  }
});

// //update
// router.put("/update-User", async (req, res) => {
//   try {
//     await User.findOneAndUpdate({ _id: req.body.UserId }, req.body);
//     res.status(200).json("Item updated successfully.");
//   } catch (error) {
//     console.log(error);
//   }
// });

// //delete
// router.put("/delete-User", async (req, res) => {
//   try {
//     await User.findOneAndDelete({ _id: req.body.UserId });
//     res.status(200).json("Item updated successfully.");
//   } catch (error) {
//     console.log(error);
//   }
// });


module.exports = router;