import type { Request, Response, NextFunction } from 'express'
import Task, { type ITask } from '../models/Task'

declare global {
  namespace Express {
    interface Request {
      task: ITask
    }
  }
}

export async function taskExists(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { taskId } = req.params

  try {
    const task = await Task.findById(taskId)

    if (!task) {
      const error = new Error('Tarea no encontrada')
      return res.status(404).json({ error: error.message })
    }

    req.task = task

    next()
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Hubo un error' })
  }
}

export function taskBelongsToProject(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (req.task.project.toString() !== req.project.id.toString()) {
    const error = new Error('Acción no autorizada')
    return res.status(400).json({ error: error.message })
  }
  next()
}
