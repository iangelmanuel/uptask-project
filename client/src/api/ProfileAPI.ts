import { api } from '@/lib/axios'
import { UpdateCurrentUserPassword, UserFormData } from '@/types'
import { isAxiosError } from 'axios'

export async function updateProfile(formData: UserFormData) {
  const url = '/auth/profile'

  try {
    const { data } = await api.put<string>(url, formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      return error.response.data
    }
  }
}

export async function changePassword(formData: UpdateCurrentUserPassword) {
  const url = '/auth/update-password'

  try {
    const { data } = await api.post<string>(url, formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      return error.response.data
    }
  }
}
