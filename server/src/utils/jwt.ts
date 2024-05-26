import jwt from 'jsonwebtoken'
import type { Types } from 'mongoose'

type UserPayload = {
  id: Types.ObjectId
}

export const generateJWT = (payload: UserPayload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '6m',
  })

  return token
}
