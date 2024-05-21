import { Router } from 'express'
import { body, param } from 'express-validator'
import { ProjectController } from '../controllers/ProjectController'
import handleInputErrors from '../middleware/validation'

const router: Router = Router()

router.post(
  '/',

  body('projectName')
    .notEmpty()
    .withMessage('El nombre del proyecto es requerido'),

  body('projectName')
    .notEmpty()
    .withMessage('El nombre del cliente es requerido'),

  body('projectName')
    .notEmpty()
    .withMessage('La descripción del proyecto es requerido'),

  handleInputErrors,

  ProjectController.createProject,
)

router.get('/', ProjectController.getAllProjects)

router.get(
  '/:id',

  param('id')
    .notEmpty()
    .withMessage('El ID del proyecto es requerido')
    .isMongoId()
    .withMessage('El ID del proyecto no es válido'),

  handleInputErrors,

  ProjectController.getProjectById,
)

router.put(
  '/:id',

  param('id')
    .notEmpty()
    .withMessage('El ID del proyecto es requerido')
    .isMongoId()
    .withMessage('El ID del proyecto no es válido'),

  body('projectName')
    .notEmpty()
    .withMessage('El nombre del proyecto es requerido'),

  body('projectName')
    .notEmpty()
    .withMessage('El nombre del cliente es requerido'),

  body('projectName')
    .notEmpty()
    .withMessage('La descripción del proyecto es requerido'),

  handleInputErrors,

  ProjectController.updateProject,
)

router.delete(
  '/:id',

  param('id')
    .notEmpty()
    .withMessage('El ID del proyecto es requerido')
    .isMongoId()
    .withMessage('El ID del proyecto no es válido'),

  ProjectController.deleteProject,
)

export default router
