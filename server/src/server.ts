import cors from 'cors'
import dotenv from 'dotenv'
import express, { Application } from 'express'
import { corsConfig } from './config/cors'
import connectDB from './config/db'
import projectRoutes from './router/projectRoutes'

dotenv.config()
connectDB()

const app: Application = express()

// CORS
app.use(cors(corsConfig))

// MIDDLEWARES
app.use(express.json())

// ROUTES
app.use('/api/projects', projectRoutes)

export default app
