import type { Request, Response } from 'express'
import Task from '../models/Task'

export class TaskController {
  static async createTask(req: Request, res: Response) {
    try {
      const task = new Task(req.body)

      task.project = req.project.id
      req.project.tasks.push(task.id)

      await Promise.all([req.project.save(), task.save()])

      return res.status(201).json('Tarea creada correctamente')
    } catch (error) {
      console.log(error)
      return res
        .status(500)
        .json('Error al obtener las tareas del proyecto')
    }
  }

  static async getProjectTasks(req: Request, res: Response) {
    try {
      const tasks = await Task.find({
        project: req.project.id,
      }).populate('project')

      return res.status(201).json(tasks)
    } catch (error) {
      console.log(error)
      return res
        .status(500)
        .json('Error al obtener las tareas del proyecto')
    }
  }

  static async getTasksById(req: Request, res: Response) {
    const { taskId } = req.params

    try {
      const task = await Task.findById(taskId)

      if (task.project.toString() !== req.project.id) {
        const error = new Error('Acción no autorizada')
        return res.status(400).json({ error: error.message })
      }

      if (!task) {
        const error = new Error('Tarea no encontrada')
        return res.status(404).json({ error: error.message })
      }

      return res.status(201).json(task)
    } catch (error) {
      console.log(error)
      return res.status(500).json('Error al obtener la tarea del proyecto')
    }
  }

  static async updateTask(req: Request, res: Response) {
    const { taskId } = req.params

    try {
      const task = await Task.findById(taskId)

      if (!task) {
        const error = new Error('Tarea no encontrada')
        return res.status(404).json({ error: error.message })
      }

      if (task.project.toString() !== req.project.id) {
        const error = new Error('Acción no autorizada')
        return res.status(400).json({ error: error.message })
      }

      task.name = req.body.name
      task.description = req.body.description
      await task.save()

      return res.status(201).json('Tarea actualizada correctamente')
    } catch (error) {
      console.log(error)
      return res.status(500).json('Error al actualizar la tarea')
    }
  }

  static async deleteTask(req: Request, res: Response) {
    const { taskId } = req.params

    try {
      const task = await Task.findById(taskId)

      if (!task) {
        const error = new Error('Tarea no encontrada')
        return res.status(404).json({ error: error.message })
      }

      req.project.tasks = req.project.tasks.filter(
        (task) => task.toString() !== taskId,
      )

      await Promise.all([req.project.save(), task.deleteOne()])

      return res.status(201).json('Tarea eliminada correctamente')
    } catch (error) {
      console.log(error)
      return res.status(500).json('Error al eliminar la tarea')
    }
  }
}
