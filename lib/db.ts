
import mongoose from "mongoose";
 
const mongoURL: string = process.env.NEXT_PUBLIC_MONGO_ATLAS_URL || "mongodb+srv://pp3082295:pranavjeyan@cluster0.eaozimi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
;
 
let isConnected: boolean = false;
 
const connectMongo: () => Promise<void> = async () => {
  if (isConnected) {
    return;
  }
 
  try {
    await mongoose.connect(mongoURL);
    isConnected = true;
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    isConnected = false;
  }
};
 
export default connectMongo;
