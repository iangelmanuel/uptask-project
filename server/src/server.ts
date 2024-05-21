import dotenv from 'dotenv'
import express, { Application } from 'express'
import connectDB from './config/db'

dotenv.config()
connectDB()

const app: Application = express()
export default app
