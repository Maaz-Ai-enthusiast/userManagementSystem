import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();

const connectToMongo = async () => {
 try {

  mongoose.connect(process.env.MONGO_URI)
  console.log("Connected to MongoDB");
  
 } catch (error) {
  console.log("Error connecting to MongoDB: ", error.message);
  
 }
};

export default connectToMongo;
