import mongoose from "mongoose";
mongoose.set("strictQuery", false);

const connectDatabase = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDb Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error`, error);
    process.exit(1);
  }
};

export default connectDatabase;
