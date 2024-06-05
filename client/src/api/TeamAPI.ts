import { api } from '@/lib/axios'
import {
  Project,
  TeamMember,
  TeamMemberFormData,
  teamMembersSchema,
} from '@/types'
import { isAxiosError } from 'axios'

export async function findUserByEmail({
  projectId,
  formData,
}: {
  projectId: Project['_id']
  formData: TeamMemberFormData
}) {
  const url = `/projects/${projectId}/team/find`

  try {
    const { data } = await api.post(url, formData)

    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function addUserToProject({
  projectId,
  id,
}: {
  projectId: Project['_id']
  id: TeamMember['_id']
}) {
  const url = `/projects/${projectId}/team`

  try {
    const { data } = await api.post(url, { id })

    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function getProjectTeam(projectId: Project['_id']) {
  const url = `/projects/${projectId}/team`

  try {
    const { data } = await api(url)

    const response = teamMembersSchema.safeParse(data)

    if (response.success) {
      return response.data
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function removeUserFromProject({
  projectId,
  id,
}: {
  projectId: Project['_id']
  id: TeamMember['_id']
}) {
  const url = `/projects/${projectId}/team/${id}`

  try {
    const { data } = await api.delete<string>(url)

    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}
