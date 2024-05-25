import { z } from 'zod'

// TASKS //

export type TaskTatus =
  | 'pending'
  | 'onHold'
  | 'inProgress'
  | 'underReview'
  | 'completed'

export type TaskStatus = z.infer<typeof taskStatuses>

export const taskStatuses = z.enum([
  'pending',
  'onHold',
  'inProgress',
  'underReview',
  'completed',
])

export const taskSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  project: z.string(),
  status: taskStatuses,
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type Task = z.infer<typeof taskSchema>
export type TaskFormData = Pick<Task, 'name' | 'description'>

// PROJECTS //

export const projectSchema = z.object({
  _id: z.string(),
  projectName: z.string(),
  clientName: z.string(),
  description: z.string(),
})

export const dashboardProjectSchema = z.array(
  projectSchema.pick({
    _id: true,
    projectName: true,
    clientName: true,
    description: true,
  }),
)

export type Project = z.infer<typeof projectSchema>
export type ProjectFormData = Pick<
  Project,
  'projectName' | 'clientName' | 'description'
>
