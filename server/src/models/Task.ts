import mongoose, { Schema, Document, Types } from 'mongoose'

export type TaskStatus = (typeof taskStatus)[keyof typeof taskStatus]

export interface ITask extends Document {
  name: string
  description: string
  project: Types.ObjectId
  status: TaskStatus
}

const taskStatus = {
  PENDING: 'PENDING',
  ON_HOLD: 'ON_HOLD',
  IN_PROGRESS: 'IN_PROGRESS',
  UNDER_REVIEW: 'UNDER_REVIEW',
  COMPLETED: 'COMPLETED',
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
  },
  { timestamps: true },
)

export const Task = mongoose.model<ITask>('Task', TaskSchema)
export default Task
