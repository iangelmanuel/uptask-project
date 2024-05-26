import { api } from '@/lib/axios'
import {
  ConfirmToken,
  ForgotPasswordForm,
  NewPasswordForm,
  RequestConfirmationCodeForm,
  UserLoginForm,
  UserRegistrationForm,
} from '@/types'
import { isAxiosError } from 'axios'

export async function createAccount(formData: UserRegistrationForm) {
  try {
    const { data } = await api.post<string>(
      '/auth/create-account',
      formData,
    )
    return data
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.error)
    }
    throw new Error('Ha ocurrido un error')
  }
}

export async function confirmAccount(token: ConfirmToken) {
  try {
    const { data } = await api.post<string>('/auth/confirm-account', token)
    return data
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.error)
    }
    throw new Error('Ha ocurrido un error')
  }
}

export async function requestConfirmationCode(
  email: RequestConfirmationCodeForm,
) {
  try {
    const { data } = await api.post<string>('/auth/request-code', email)
    return data
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.error)
    }
    throw new Error('Ha ocurrido un error')
  }
}

export async function authenticateUser(formData: UserLoginForm) {
  try {
    const { data } = await api.post<{ token: string }>(
      '/auth/login',
      formData,
    )
    localStorage.setItem('AUTH_TOKEN', data.token)

    return data
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.error)
    }
    throw new Error('Ha ocurrido un error')
  }
}

export async function forgotPassword(formData: ForgotPasswordForm) {
  try {
    const { data } = await api.post<string>(
      '/auth/forgot-password',
      formData,
    )

    return data
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.error)
    }
    throw new Error('Ha ocurrido un error')
  }
}

export async function validateToken(token: ConfirmToken) {
  try {
    const { data } = await api.post<string>('/auth/validate-token', token)

    return data
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.error)
    }
    throw new Error('Ha ocurrido un error')
  }
}

export async function updatePasswordWithToken({
  formData,
  token,
}: {
  formData: NewPasswordForm
  token: ConfirmToken['token']
}) {
  try {
    const { data } = await api.post<string>(
      `/auth/update-password/${token}`,
      formData,
    )

    return data
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.error)
    }
    throw new Error('Ha ocurrido un error')
  }
}
