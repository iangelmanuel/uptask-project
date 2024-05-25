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
  try {
    const { data } = await api.post<string>(
      `/projects/${projectId}/tasks`,
      formData,
    )
    return data
  } catch (error) {
    if (isAxiosError(error) && error.message) {
      throw new Error(error.response?.data.message)
    }
    throw new Error('Ha ocurrido un error')
  }
}

export async function getTaskById({
  projectId,
  taskId,
}: Pick<TaskAPI, 'projectId' | 'taskId'>) {
  try {
    const { data } = await api.get(
      `/projects/${projectId}/tasks/${taskId}`,
    )

    const response = taskSchema.safeParse(data)

    if (response.success) {
      return response.data
    }
  } catch (error) {
    if (isAxiosError(error) && error.message) {
      throw new Error(error.response?.data.message)
    }
    throw new Error('Ha ocurrido un error')
  }
}

export async function updateTaskById({
  projectId,
  taskId,
  formData,
}: Pick<TaskAPI, 'projectId' | 'taskId' | 'formData'>) {
  try {
    const { data } = await api.put<string>(
      `/projects/${projectId}/tasks/${taskId}`,
      formData,
    )

    return data
  } catch (error) {
    if (isAxiosError(error) && error.message) {
      throw new Error(error.response?.data.message)
    }
    throw new Error('Ha ocurrido un error')
  }
}

export async function deleteTaskById({
  projectId,
  taskId,
}: Pick<TaskAPI, 'projectId' | 'taskId'>) {
  try {
    const { data } = await api.delete<string>(
      `/projects/${projectId}/tasks/${taskId}`,
    )

    return data
  } catch (error) {
    if (isAxiosError(error) && error.message) {
      throw new Error(error.response?.data.message)
    }
    throw new Error('Ha ocurrido un error')
  }
}

export async function updateStatus({
  projectId,
  taskId,
  status,
}: Pick<TaskAPI, 'projectId' | 'taskId' | 'status'>) {
  try {
    const { data } = await api.post<string>(
      `/projects/${projectId}/tasks/${taskId}/status`,
      { status },
    )

    return data
  } catch (error) {
    if (isAxiosError(error) && error.message) {
      throw new Error(error.response?.data.message)
    }
    throw new Error('Ha ocurrido un error')
  }
}
