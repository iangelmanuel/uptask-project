import { Router } from 'express'
import { body, param } from 'express-validator'
import { NoteController } from '../controllers/NoteController'
import { ProjectController } from '../controllers/ProjectController'
import { TaskController } from '../controllers/TaskController'
import { TeamController } from '../controllers/TeamController'
import { authenticate } from '../middleware/authenticate'
import projectExists from '../middleware/project'
import {
  taskExists,
  taskBelongsToProject,
  hasAuthorization,
} from '../middleware/task'
import handleInputErrors from '../middleware/validation'

const router: Router = Router()

router.use(authenticate)

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

router.param('projectId', projectExists)

router.put(
  '/:projectId',

  param('projectId')
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
  hasAuthorization,

  ProjectController.updateProject,
)

router.delete(
  '/:projectId',

  param('projectId')
    .notEmpty()
    .withMessage('El ID del proyecto es requerido')
    .isMongoId()
    .withMessage('El ID del proyecto no es válido'),

  handleInputErrors,
  hasAuthorization,

  ProjectController.deleteProject,
)

// ROUTES FOR TASKS

router.post(
  '/:projectId/tasks',

  hasAuthorization,

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

  hasAuthorization,

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

  hasAuthorization,

  param('taskId')
    .notEmpty()
    .withMessage('El ID del proyecto es requerido')
    .isMongoId()
    .withMessage('El ID del proyecto no es válido'),

  TaskController.deleteTask,
)

router.get('/:projectId/team', TeamController.getProjectTeam)

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

router.post(
  '/:projectId/team/find',

  body('email')
    .notEmpty()
    .withMessage('El email del usuario es requerido')
    .isEmail()
    .withMessage('El email no es válido'),

  handleInputErrors,

  TeamController.findMemberByEmail,
)

router.post(
  '/:projectId/team',

  body('id')
    .notEmpty()
    .withMessage('El ID del usuario es requerido')
    .isMongoId()
    .withMessage('El ID del usuario no es válido'),

  handleInputErrors,

  TeamController.addMemberById,
)

router.delete(
  '/:projectId/team/:userId',

  param('userId')
    .notEmpty()
    .withMessage('El ID del usuario es requerido')
    .isMongoId()
    .withMessage('El ID del usuario no es válido'),

  handleInputErrors,

  TeamController.removeMemberById,
)

// ROUTES FOR NOTES

router.post(
  '/:projectId/tasks/:taskId/notes',

  body('content')
    .notEmpty()
    .withMessage('El contenido de la nota es requerido'),

  handleInputErrors,

  NoteController.createNote,
)

router.get(
  '/:projectId/tasks/:taskId/notes',

  NoteController.getTaskNotes,
)

router.delete(
  '/:projectId/tasks/:taskId/notes/:noteId',

  param('noteId')
    .notEmpty()
    .withMessage('El ID de la nota es requerido')
    .isMongoId()
    .withMessage('El ID de la nota no es válido'),

  handleInputErrors,

  NoteController.deleteNote,
)

export default router
