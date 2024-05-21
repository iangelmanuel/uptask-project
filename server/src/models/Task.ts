import mongoose, { Schema, Document, Types } from 'mongoose'

export interface ITask extends Document {
  name: string
  description: string
  project: Types.ObjectId
}

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
  },
  { timestamps: true },
)

export const Task = mongoose.model<ITask>('Task', TaskSchema)
export default Task
