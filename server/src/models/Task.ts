import mongoose, { Schema, Document, Types } from 'mongoose'
import Note from './Note'

export type TaskStatus = (typeof taskStatus)[keyof typeof taskStatus]

export interface ITask extends Document {
  name: string
  description: string
  project: Types.ObjectId
  status: TaskStatus
  completedBy: {
    user: Types.ObjectId
    status: TaskStatus
  }[]
  notes: Types.ObjectId[]
}

const taskStatus = {
  PENDING: 'pending',
  ON_HOLD: 'onHold',
  IN_PROGRESS: 'inProgress',
  UNDER_REVIEW: 'underReview',
  COMPLETED: 'completed',
} as const

const TaskSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    project: {
      type: Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(taskStatus),
      default: taskStatus.PENDING,
    },
    completedBy: [
      {
        user: {
          type: Types.ObjectId,
          ref: 'User',
          default: null,
        },
        status: {
          type: String,
          enum: Object.values(taskStatus),
          default: taskStatus.PENDING,
        },
      },
    ],
    notes: [
      {
        type: Types.ObjectId,
        ref: 'Note',
      },
    ],
  },
  { timestamps: true },
)

TaskSchema.pre(
  'deleteOne',
  { document: true, query: false },
  async function (next) {
    const taskId = this._id
    if (!taskId) return
    await Note.deleteMany({ task: taskId })
    next()
  },
)

export const Task = mongoose.model<ITask>('Task', TaskSchema)
export default Task
