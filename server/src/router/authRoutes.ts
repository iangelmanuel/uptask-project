import { Router } from 'express'
import { body, param } from 'express-validator'
import { AuthController } from '../controllers/AuthController'
import { authenticate } from '../middleware/authenticate'
import handleInputErrors from '../middleware/validation'

const router: Router = Router()

router.post(
  '/create-account',

  body('name').notEmpty().withMessage('El nombre es requerido'),

  body('email')
    .notEmpty()
    .withMessage('El email es requerido')
    .isEmail()
    .withMessage('El email no es válido'),

  body('password')
    .notEmpty()
    .withMessage('La contraseña es requerida')
    .isLength({ min: 8 })
    .withMessage('La contraseña debe tener al menos 8 caracteres'),

  body('passwordConfirmation')
    .notEmpty()
    .withMessage('La confirmación de contraseña es requerida')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Las contraseñas no coinciden')
      }
      return true
    }),

  handleInputErrors,

  AuthController.createAccount,
)

router.post(
  '/confirm-account',

  body('token').notEmpty().withMessage('El token es requerido'),

  handleInputErrors,

  AuthController.confirmAccount,
)

router.post(
  '/login',

  body('email')
    .notEmpty()
    .withMessage('El email es requerido')
    .isEmail()
    .withMessage('El email no es válido'),

  body('password').notEmpty().withMessage('La contraseña es requerida'),

  handleInputErrors,

  AuthController.login,
)

router.post(
  '/request-code',

  body('email')
    .notEmpty()
    .withMessage('El email es requerido')
    .isEmail()
    .withMessage('El email no es válido'),

  handleInputErrors,

  AuthController.requestConfirmationCode,
)

router.post(
  '/forgot-password',

  body('email')
    .notEmpty()
    .withMessage('El email es requerido')
    .isEmail()
    .withMessage('El email no es válido'),

  handleInputErrors,

  AuthController.forgotPassword,
)

router.post(
  '/validate-token',

  body('token').notEmpty().withMessage('El token es requerido'),

  handleInputErrors,

  AuthController.validateToken,
)

router.post(
  '/update-password/:token',

  param('token')
    .notEmpty()
    .withMessage('El token es requerido')
    .isNumeric()
    .withMessage('El token no es válido'),

  body('password')
    .notEmpty()
    .withMessage('La contraseña es requerida')
    .isLength({ min: 8 })
    .withMessage('La contraseña debe tener al menos 8 caracteres'),

  body('passwordConfirmation').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Las contraseñas no coinciden')
    }
    return true
  }),

  handleInputErrors,

  AuthController.updatePassworWithToken,
)

router.get('/user', authenticate, AuthController.user)

// Profile routes

router.put(
  '/profile',

  authenticate,

  body('name').notEmpty().withMessage('El nombre es requerido'),
  body('email')
    .notEmpty()
    .withMessage('El email es requerido')
    .isEmail()
    .withMessage('El email no es válido'),

  handleInputErrors,

  AuthController.updateProfile,
)

router.post(
  '/update-password',

  authenticate,

  body('currentPassword')
    .notEmpty()
    .withMessage('La contraseña actual es requerida'),

  body('newPassword')
    .notEmpty()
    .withMessage('La nueva contraseña es requerida'),

  body('newPasswordConfirmation').custom((value, { req }) => {
    if (value !== req.body.newPassword) {
      throw new Error('Las contraseñas no coinciden')
    }
    return true
  }),

  handleInputErrors,

  AuthController.updatePassword,
)

router.post(
  '/check-password',

  authenticate,

  body('password').notEmpty().withMessage('La contraseña es requerida'),

  handleInputErrors,

  AuthController.checkPassword,
)

export default router
