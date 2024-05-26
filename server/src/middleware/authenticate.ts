import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import User, { type IUser } from '../models/Uset'

declare global {
  namespace Express {
    interface Request {
      user?: IUser
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const bearer = req.headers.authorization
  const token = bearer?.split(' ')[1]

  if (!bearer) {
    const error = new Error('No autorizado')
    return res.status(401).json({ error: error.message })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if (typeof decoded === 'object' && decoded.id) {
      const user = await User.findById(decoded.id).select('_id name email')

      if (user) {
        req.user = user
      } else {
        const error = new Error('No autorizado')
        return res.status(401).json({ error: error.message })
      }
    }
  } catch (error) {
    res.status(500).send('Hubo un error al autenticar')
  }

  next()
}
