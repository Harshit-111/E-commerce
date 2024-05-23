import mongoose from "mongoose";

const connectDb = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("database connected");
  } catch (error) {
    console.log(`ERROR: ${error.message}`);
    process.exit(1);
  }
};

export default connectDb;
