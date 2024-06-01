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
    try {
      const task = await Task.findById(req.task.id).populate({
        path: 'completedBy.user',
        select: 'id name email',
      })
      return res.status(201).json(task)
    } catch (error) {
      console.log(error)
      return res.status(500).json('Error al obtener la tarea del proyecto')
    }
  }

  static async updateTask(req: Request, res: Response) {
    try {
      req.task.name = req.body.name
      req.task.description = req.body.description
      await req.task.save()

      return res.status(201).json('Tarea actualizada correctamente')
    } catch (error) {
      console.log(error)
      return res.status(500).json('Error al actualizar la tarea')
    }
  }

  static async deleteTask(req: Request, res: Response) {
    try {
      req.project.tasks = req.project.tasks.filter(
        (task) => task.toString() !== req.task.id.toString(),
      )

      await Promise.all([req.project.save(), req.task.deleteOne()])

      return res.status(201).json('Tarea eliminada correctamente')
    } catch (error) {
      console.log(error)
      return res.status(500).json('Error al eliminar la tarea')
    }
  }

  static async updateStatus(req: Request, res: Response) {
    const { status } = req.body

    try {
      req.task.status = status

      const data = {
        user: req.user.id,
        status,
      }

      req.task.completedBy.push(data)

      await req.task.save()

      return res
        .status(201)
        .json('Estado de la tarea actualizado correctamente')
    } catch (error) {
      console.log(error)
      return res.status(500).json('Error al cambiar el estado de la tarea')
    }
  }
}
