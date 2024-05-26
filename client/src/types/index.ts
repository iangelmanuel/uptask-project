import { z } from 'zod'

// AUTH & USER //
const authSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  passwordConfirmation: z.string(),
  token: z.string(),
})

export type Auth = z.infer<typeof authSchema>

export type UserLoginForm = Pick<Auth, 'email' | 'password'>
export type UserRegistrationForm = Pick<
  Auth,
  'name' | 'email' | 'password' | 'passwordConfirmation'
>
export type RequestConfirmationCodeForm = Pick<Auth, 'email'>

export type ConfirmToken = Pick<Auth, 'token'>

export type ForgotPasswordForm = Pick<Auth, 'email'>

export type NewPasswordForm = Pick<
  Auth,
  'password' | 'passwordConfirmation'
>

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
