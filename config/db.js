import mongoose from 'mongoose'

let connected = false

const connectDB = async () => {
  mongoose.set('strictQuery', true)

  //If DB is already connected, do not connect again
  if (connected) {
    console.log('MongoDB is connected')
    return
  }

  // Connect to MongoDB
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    connected = true
  } catch (error) {
    console.log(error)
  }
}

export default connectDB