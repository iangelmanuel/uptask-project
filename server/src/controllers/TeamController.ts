import { Request, Response } from 'express'
import Project from '../models/Project'
import User from '../models/Uset'

export class TeamController {
  static findMemberByEmail = async (req: Request, res: Response) => {
    const { email } = req.body

    try {
      const user = await User.findOne({ email }).select('id email name')

      if (!user) {
        const error = new Error('Usuario no encontrado')
        return res.status(404).json({ message: error.message })
      }

      return res.send(user)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  static getProjectTeam = async (req: Request, res: Response) => {
    try {
      const project = await Project.findById(req.project.id).populate({
        path: 'team',
        select: 'id email name',
      })

      return res.send(project.team)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  static addMemberById = async (req: Request, res: Response) => {
    const { id } = req.body

    try {
      const user = await User.findById(id).select('id')

      if (!user) {
        const error = new Error('Usuario no encontrado')
        return res.status(404).json({ message: error.message })
      }

      if (
        req.project.team.some(
          (member) => member.toString() === user.id.toString(),
        )
      ) {
        const error = new Error('El usuario ya es miembro del equipo')
        return res.status(409).json({ message: error.message })
      }

      req.project.team.push(user.id)
      await req.project.save()

      res.status(201).json('Miembro añadido al equipo correctamente')
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  static removeMemberById = async (req: Request, res: Response) => {
    const { id } = req.body

    try {
      if (!req.project.team.some((team) => team.toString() === id)) {
        const error = new Error('Usuario no encontrado en el equipo')
        return res.status(404).json({ message: error.message })
      }

      req.project.team = req.project.team.filter(
        (teamMember) => teamMember.toString() !== id,
      )

      await req.project.save()

      res.status(200).json('Miembro eliminado del equipo correctamente')
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }
}
