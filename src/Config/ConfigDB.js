import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    if (!process.env.MONGO_URL) {
      return console.log(
        "MONGO_URL  is not defined . Please provide a connection string."
      );
    }
    mongoose.set("strictQuery", true);
    const conn = await mongoose.connect(process.env.MONGO_URL);
    conn
      ? console.log("mongo connection established")
      : console.error("unable to stablish connection");
  } catch (error) {
    console.log(error);
  }
};
