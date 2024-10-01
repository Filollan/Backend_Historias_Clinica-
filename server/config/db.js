import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      `mongodb+srv://mllanten:q8VbJvuiz32KHGfO@cluster0.8ow5j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    )

    console.log(`MongoDB Conectado`)
  } catch (error) {
    console.error(error.message)
    process.exit(1)
  }
}
