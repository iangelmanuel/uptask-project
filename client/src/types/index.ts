import { z } from 'zod'

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
