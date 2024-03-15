const User = require("../models/User.js");
const express = require("express");
const router = express.Router();

//get all User
router.get("/get-all", async (req, res) => {
  try {
    const users = await User.find();
    // res.send(users);
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json(error);
  }
});

//get a User
router.get("/", async (req, res) => {
  const userId=req.body.userId;
  try {
    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
});

// //create
// router.post("/add-bill", async (req, res) => {
//   try {
//     const newBill = new Bill(req.body);
//     await newBill.save();
//     res.status(200).json("Item added successfully.");
//   } catch (error) {
//     res.status(400).json(error);
//   }
// });

// //update
// router.put("/update-bill", async (req, res) => {
//   try {
//     await Bill.findOneAndUpdate({ _id: req.body.BillId }, req.body);
//     res.status(200).json("Item updated successfully.");
//   } catch (error) {
//     console.log(error);
//   }
// });

// //delete
// router.put("/delete-bill", async (req, res) => {
//   try {
//     await Bill.findOneAndDelete({ _id: req.body.BillId });
//     res.status(200).json("Item updated successfully.");
//   } catch (error) {
//     console.log(error);
//   }
// });


module.exports = router;