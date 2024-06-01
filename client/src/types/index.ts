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

// USERS //

export const userSchema = authSchema
  .pick({
    name: true,
    email: true,
  })
  .extend({
    _id: z.string(),
  })

export type User = z.infer<typeof userSchema>

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
  completedBy: z.array(
    z.object({
      _id: z.string(),
      user: userSchema,
      status: taskStatuses,
    }),
  ),
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
  manager: z.string(userSchema.pick({ _id: true })),
})

export const dashboardProjectSchema = z.array(
  projectSchema.pick({
    _id: true,
    projectName: true,
    clientName: true,
    description: true,
    manager: true,
  }),
)

export type Project = z.infer<typeof projectSchema>
export type ProjectFormData = Pick<
  Project,
  'projectName' | 'clientName' | 'description'
>

// TEAM //

export const teamMemberSchema = userSchema.pick({
  _id: true,
  name: true,
  email: true,
})
export const teamMembersSchema = z.array(teamMemberSchema)

export type TeamMember = z.infer<typeof teamMemberSchema>
export type TeamMemberFormData = Pick<TeamMember, 'email'>
