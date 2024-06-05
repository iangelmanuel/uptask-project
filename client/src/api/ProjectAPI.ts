import { api } from '@/lib/axios'
import {
  type Project,
  ProjectFormData,
  dashboardProjectSchema,
  editProjectSchema,
  projectSchema,
} from '@/types'
import { isAxiosError } from 'axios'

export async function createProject(formData: ProjectFormData) {
  const url = '/projects'

  try {
    const { data } = await api.post(url, formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function getProjects() {
  const url = '/projects'

  try {
    const { data } = await api(url)
    const response = dashboardProjectSchema.safeParse(data)
    if (response.success) return response.data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function getProjectById(id: Project['_id']) {
  const url = `/projects/${id}`

  try {
    const { data } = await api(url)
    const response = editProjectSchema.safeParse(data)

    if (response.success) {
      return response.data
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function getFullProject(id: Project['_id']) {
  const url = `/projects/${id}`

  try {
    const { data } = await api(url)
    const response = projectSchema.safeParse(data)

    if (response.success) {
      return response.data
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

type ProjectAPIType = {
  formData: ProjectFormData
  projectId: Project['_id']
}

export async function updateProjectById({
  formData,
  projectId,
}: ProjectAPIType) {
  const url = `/projects/${projectId}`

  try {
    const { data } = await api.put<string>(url, formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function deleteProjectById(id: Project['_id']) {
  const url = `/projects/${id}`

  try {
    const { data } = await api.delete<string>(url)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}
