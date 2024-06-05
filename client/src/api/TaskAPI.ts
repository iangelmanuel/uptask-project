import { api } from '@/lib/axios'
import { Project, Task, TaskFormData, taskSchema } from '@/types/index'
import { isAxiosError } from 'axios'

type TaskAPI = {
  formData: TaskFormData
  projectId: Project['_id']
  taskId: Task['_id']
  status: Task['status']
}

export async function createTask({
  formData,
  projectId,
}: Pick<TaskAPI, 'formData' | 'projectId'>) {
  const url = `/projects/${projectId}/tasks`

  try {
    const { data } = await api.post<string>(url, formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function getTaskById({
  projectId,
  taskId,
}: Pick<TaskAPI, 'projectId' | 'taskId'>) {
  const url = `/projects/${projectId}/tasks/${taskId}`

  try {
    const { data } = await api(url)

    const response = taskSchema.safeParse(data)

    if (response.success) {
      return response.data
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function updateTaskById({
  projectId,
  taskId,
  formData,
}: Pick<TaskAPI, 'projectId' | 'taskId' | 'formData'>) {
  const url = `/projects/${projectId}/tasks/${taskId}`

  try {
    const { data } = await api.put<string>(url, formData)

    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function deleteTaskById({
  projectId,
  taskId,
}: Pick<TaskAPI, 'projectId' | 'taskId'>) {
  const url = `/projects/${projectId}/tasks/${taskId}`

  try {
    const { data } = await api.delete<string>(url)

    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function updateStatus({
  projectId,
  taskId,
  status,
}: Pick<TaskAPI, 'projectId' | 'taskId' | 'status'>) {
  const url = `/projects/${projectId}/tasks/${taskId}/status`
  try {
    const { data } = await api.post<string>(url, { status })

    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}
