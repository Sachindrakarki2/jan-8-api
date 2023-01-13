import express from "express";
import { comparePassword, hashPassword } from "../helper/bcrypt.js";
import { createUser, getUserByEmail } from "../models/UserModels.js";
const router = express.Router();

router.post("/", async (req, res, next) => {
  const { email } = req.body;
  try {
    const userExists = await getUserByEmail(email);
    if (userExists) {
      return res.json({
        status: "error",
        message: "User already exists Please try different",
      });
    }
    //encrypt password
    const hashPass = hashPassword(req.body.password);
    if (hashPass) {
      req.body.password = hashPass;
      const user = await createUser(req.body);
      if (user?._id) {
        return res.json({
          status: "success",
          message: "User has been created successfully",
        });
      }
      return res.json({
        status: "error",
        message: "User not created please try again",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await getUserByEmail(email);

    if (user?._id) {
      const isPassMatch = comparePassword(req.body.password, user.password);

      if (isPassMatch) {
        user.password = undefined;
        return res.json({
          status: "success",
          message: "login successful",
          user,
        });
      }
    }

    res.json({
      status: "error",
      message: "User not found please register",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default router;
