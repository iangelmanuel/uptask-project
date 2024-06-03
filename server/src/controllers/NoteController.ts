import type { Request, Response } from 'express'
import { Types } from 'mongoose'
import Note, { INote } from '../models/Note'

type NoteParams = {
  noteId: Types.ObjectId
}

export class NoteController {
  static createNote = async (
    req: Request<{}, {}, INote>,
    res: Response,
  ) => {
    const { content } = req.body
    const { id: taskId } = req.task

    const note = new Note()
    note.content = content
    note.createdBy = req.user.id
    note.task = taskId

    req.task.notes.push(note.id)

    try {
      await Promise.allSettled([req.task.save(), note.save()])
      res.status(201).send('Nota creada con éxito')
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }

  static getTaskNotes = async (req: Request, res: Response) => {
    try {
      const notes = await Note.find({ task: req.task.id })
      res.status(200).json(notes)
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }

  static deleteNote = async (req: Request<NoteParams>, res: Response) => {
    const { noteId } = req.params

    try {
      const note = await Note.findById(noteId)

      if (!note) {
        const error = new Error('Nota no encontrada')
        return res.status(404).send(error.message)
      }

      if (note.createdBy.toString() !== req.user.id) {
        const error = new Error(
          'No tienes permisos para eliminar esta nota',
        )
        return res.status(403).send(error.message)
      }

      req.task.notes = req.task.notes.filter(
        (note) => note.toString() !== noteId.toString(),
      )

      await Promise.allSettled([req.task.save(), note.deleteOne()])

      res.status(200).send('Nota eliminada con éxito')
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }
}
