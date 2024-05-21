import type { Request, Response, NextFunction } from 'express'
import Project, { type IProject } from '../models/Project'

declare global {
  namespace Express {
    interface Request {
      project: IProject
    }
  }
}

export default async function validateProjectExists(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { projectId } = req.params

  try {
    const project = await Project.findById(projectId)

    if (!project) {
      const error = new Error('Proyecto no encontrado')
      return res.status(404).json({ message: error.message })
    }

    req.project = project

    next()
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Hubo un error' })
  }
}
