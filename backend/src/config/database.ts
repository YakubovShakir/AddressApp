import mongoose from "mongoose"

const connectDatabase = async (mongoUri: string) => {
  try {
    await mongoose.connect(mongoUri)
    console.log("MongoDB connected")
  } catch (error) {
    console.error("MongoDB connection failed:", error)
    process.exit(1)
  }
}

export default connectDatabase
