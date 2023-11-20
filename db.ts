import mongoose from "mongoose";

const DB_URI =
  "mongodb+srv://trithvikprince:rithvik@cluster0.y3ccxmd.mongodb.net/socialmedia";

const connectToDb = async () => {
  await mongoose.connect(DB_URI);
  console.log("Connected to Database");
};

export default connectToDb;
