import { api } from '@/lib/axios'
import { Note, NoteFormData, Project, Task } from '@/types'
import { isAxiosError } from 'axios'

type NoteAPIType = {
  formData: NoteFormData
  projectId: Project['_id']
  taskId: Task['_id']
  noteId: Note['_id']
}

export async function creteNote({
  projectId,
  taskId,
  formData,
}: Pick<NoteAPIType, 'projectId' | 'taskId' | 'formData'>) {
  const url = `/projects/${projectId}/tasks/${taskId}/notes`

  try {
    const { data } = await api.post<string>(url, formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message)
    }
  }
}

export async function deleteNote({
  projectId,
  taskId,
  noteId,
}: Pick<NoteAPIType, 'projectId' | 'taskId' | 'noteId'>) {
  const url = `/projects/${projectId}/tasks/${taskId}/notes/${noteId}`

  try {
    const { data } = await api.delete<string>(url)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message)
    }
  }
}
