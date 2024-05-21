import colors from 'colors'
import mongoose from 'mongoose'
import { exit } from 'node:process'

export default async function connectDB() {
  try {
    const connection = await mongoose.connect(process.env.DB_URL)
    const url = `${connection.connection.host}/${connection.connection.port}`
    console.log(colors.blue.bold(`MongoDB connected: ${url}`))
  } catch (error) {
    console.log(colors.red.bold(`Error: ${error.message}`))
    exit(1)
  }
}
