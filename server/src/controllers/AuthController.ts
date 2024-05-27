import type { Request, Response } from 'express'
import { AuthEmail } from '../emails/AuthEmail'
import Token from '../models/Token'
import User from '../models/Uset'
import { generateToken } from '../utils/generateToken'
import { checkPassword, hashPassword } from '../utils/hashPassword'
import { generateJWT } from '../utils/jwt'

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

      const token = new Token()
      token.token = generateToken()
      token.user = user.id

      // SEND EMAIL
      AuthEmail.sendConfirmationEmail({
        email: user.email,
        name: user.name,
        token: token.token,
      })

      await Promise.allSettled([user.save(), token.save()])

      res
        .status(201)
        .send('Te hemos enviado un email para confirmar tu cuenta')
    } catch (error) {
      console.log(error)
      res.status(500).send('Hubo un error al crear la cuenta')
    }
  }

  static confirmAccount = async (req: Request, res: Response) => {
    try {
      const { token } = req.body

      const tokenExists = await Token.findOne({ token })

      if (!tokenExists) {
        const error = new Error('El token no es válido')
        return res.status(404).json({ error: error.message })
      }

      const user = await User.findById(tokenExists.user)

      if (!user) {
        const error = new Error('El usuario no existe')
        return res.status(404).json({ error: error.message })
      }

      user.confirmed = true

      await Promise.allSettled([user.save(), tokenExists.deleteOne()])

      res.status(200).send('Cuenta confirmada correctamente')
    } catch (error) {
      res.status(500).send('Hubo un error al confirmar la cuenta')
    }
  }

  static login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body

      const user = await User.findOne({ email })

      if (!user) {
        const error = new Error('El usuario no existe')
        return res.status(404).json({ error: error.message })
      }

      if (!user.confirmed) {
        const token = new Token()
        token.user = user.id
        token.token = generateToken()

        await token.save()

        AuthEmail.sendConfirmationEmail({
          email: user.email,
          name: user.name,
          token: token.token,
        })

        const error = new Error(
          'La cuenta no ha sido confirmada, hemos enviado un email para confirmarla',
        )
        return res.status(401).json({ error: error.message })
      }

      const isMatch = await checkPassword(password, user.password)

      if (!isMatch) {
        const error = new Error('La contraseña no es válida')
        return res.status(401).json({ error: error.message })
      }

      const token = generateJWT({ id: user.id })
      return res.status(200).json({ token })
    } catch (error) {
      res.status(500).send('Hubo un error al iniciar sesión')
    }
  }

  static requestConfirmationCode = async (req: Request, res: Response) => {
    try {
      const { email } = req.body

      const user = await User.findOne({ email })

      if (!user) {
        const error = new Error('El usuario no está registrado')
        return res.status(404).json({ error: error.message })
      }

      if (user.confirmed) {
        const error = new Error('La cuenta ya ha sido confirmada')
        return res.status(403).json({ error: error.message })
      }

      const token = new Token()
      token.token = generateToken()
      token.user = user.id

      // SEND EMAIL
      AuthEmail.sendConfirmationEmail({
        email: user.email,
        name: user.name,
        token: token.token,
      })

      await Promise.allSettled([user.save(), token.save()])

      res
        .status(201)
        .send('Se envio un email con el código de confirmación nuevamente')
    } catch (error) {
      console.log(error)
      res.status(500).send('Hubo un error al crear la cuenta')
    }
  }

  static forgotPassword = async (req: Request, res: Response) => {
    try {
      const { email } = req.body

      const user = await User.findOne({ email })

      if (!user) {
        const error = new Error('El usuario no está registrado')
        return res.status(404).json({ error: error.message })
      }

      const token = new Token()
      token.token = generateToken()
      token.user = user.id
      await token.save()

      // SEND EMAIL
      AuthEmail.sendPasswordResetToken({
        email: user.email,
        name: user.name,
        token: token.token,
      })

      res
        .status(201)
        .send('Se envio un email con el código de confirmación')
    } catch (error) {
      console.log(error)
      res.status(500).send('Hubo un error al crear la cuenta')
    }
  }

  static validateToken = async (req: Request, res: Response) => {
    try {
      const { token } = req.body

      const tokenExists = await Token.findOne({ token })

      if (!tokenExists) {
        const error = new Error('El token no es válido')
        return res.status(404).json({ error: error.message })
      }

      res
        .status(201)
        .send('Token válido, puedes reestablecer tu contraseña')
    } catch (error) {
      console.log(error)
      res.status(500).send('Hubo un error al crear la cuenta')
    }
  }

  static updatePassworWithToken = async (req: Request, res: Response) => {
    try {
      const { token } = req.params
      const { password } = req.body

      const tokenExists = await Token.findOne({ token })

      if (!tokenExists) {
        const error = new Error('El token no es válido')
        return res.status(404).json({ error: error.message })
      }

      const user = await User.findById(tokenExists.user)
      user.password = await hashPassword(password)

      await Promise.allSettled([user.save(), tokenExists.deleteOne()])

      res.status(201).send('Contraseña actualizada correctamente')
    } catch (error) {
      console.log(error)
      res.status(500).send('Hubo un error al crear la cuenta')
    }
  }

  static user = async (req: Request, res: Response) => {
    return res.json(req.user)
  }
}
