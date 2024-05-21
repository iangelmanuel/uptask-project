import dotenv from 'dotenv'
import express, { Application } from 'express'
import connectDB from './config/db'
import projectRoutes from './router/projectRoutes'

dotenv.config()
connectDB()

const app: Application = express()

// MIDDLEWARES
app.use(express.json())

// ROUTES
app.use('/api/projects', projectRoutes)

export default app
