import { Router } from 'express'
import { body, param } from 'express-validator'
import { ProjectController } from '../controllers/ProjectController'
import { TaskController } from '../controllers/TaskController'
import projectExists from '../middleware/project'
import { taskExists, taskBelongsToProject } from '../middleware/task'
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

// ROUTES FOR TASKS

router.param('projectId', projectExists)
router.post(
  '/:projectId/tasks',

  body('name')
    .notEmpty()
    .withMessage('El nombre de la tarea es requerido'),

  body('description')
    .notEmpty()
    .withMessage('La descripción de la tarea es requerido'),

  handleInputErrors,

  TaskController.createTask,
)

router.get(
  '/:projectId/tasks',

  TaskController.getProjectTasks,
)

router.param('taskId', taskExists)
router.param('taskId', taskBelongsToProject)
router.get(
  '/:projectId/tasks/:taskId',

  param('taskId')
    .notEmpty()
    .withMessage('El ID del proyecto es requerido')
    .isMongoId()
    .withMessage('El ID del proyecto no es válido'),

  TaskController.getTasksById,
)

router.put(
  '/:projectId/tasks/:taskId',

  param('taskId')
    .notEmpty()
    .withMessage('El ID del proyecto es requerido')
    .isMongoId()
    .withMessage('El ID del proyecto no es válido'),

  body('name')
    .notEmpty()
    .withMessage('El nombre de la tarea es requerido'),

  body('description')
    .notEmpty()
    .withMessage('La descripción de la tarea es requerido'),

  TaskController.updateTask,
)

router.delete(
  '/:projectId/tasks/:taskId',

  param('taskId')
    .notEmpty()
    .withMessage('El ID del proyecto es requerido')
    .isMongoId()
    .withMessage('El ID del proyecto no es válido'),

  TaskController.deleteTask,
)

router.post(
  '/:projectId/tasks/:taskId/status',

  param('taskId')
    .notEmpty()
    .withMessage('El ID del proyecto es requerido')
    .isMongoId()
    .withMessage('El ID del proyecto no es válido'),

  body('status')
    .notEmpty()
    .withMessage('El estado de la tarea es requerido')
    .isIn(['completed', 'incompleted'])
    .withMessage('El estado de la tarea no es válido'),

  TaskController.updateStatus,
)

export default router
