import cors from 'cors'
import dotenv from 'dotenv'
import express, { Application } from 'express'
import morgan from 'morgan'
import { corsConfig } from './config/cors'
import connectDB from './config/db'
import authRoutes from './router/authRoutes'
import projectRoutes from './router/projectRoutes'

dotenv.config()
connectDB()

const app: Application = express()

// CORS
app.use(cors(corsConfig))

// MORGAN
app.use(morgan('dev'))

// MIDDLEWARES
app.use(express.json())

// ROUTES
app.use('/api/auth', authRoutes)
app.use('/api/projects', projectRoutes)

export default app
