import type { Request, Response } from 'express'
import User from '../models/Uset'
import { hashPassword } from '../utils/hashPassword'

export class AuthController {
  static createAccount = async (req: Request, res: Response) => {
    try {
      const { password, email } = req.body

      const userExists = await User.findOne({ email })

      if (userExists) {
        const error = new Error('El email ya está en uso')
        return res.status(409).json({ error: error.message })
      }

      const user = new User(req.body)

      // HASH PASSWORD
      user.password = await hashPassword(password)

      await user.save()
      res.status(201).send('Cuenta creada')
    } catch (error) {
      res.status(500).send('Error al crear la cuenta')
    }
  }
}
