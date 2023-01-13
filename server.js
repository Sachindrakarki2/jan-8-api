import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { connectDB } from "./src/Config/ConfigDB.js";

const app = express();
const PORT = process.env.PORT || 8000;

//connect mongo DB
connectDB();

//middleware
app.use(express.json());
// app.use(morgan("dev"));
app.use(cors());

import router from "./src/Router/UserRouter.js";
app.use("/api/v1/user", router);
// golobal error

app.use((error, req, res, next) => {
  const errorCode = error.errorCode || 500;
  res
    .status(errorCode)
    .json({ status: "error", message: "system status is healthy" });
});

app.use("/", (req, res, next) => {
  const error = {
    status: "error",
    message: "500 error occured",
  };
});
app.listen(PORT, (error) => {
  error
    ? console.log("server crashed")
    : console.log(`Your server run at localhost http://localhost:${PORT}`);
});
