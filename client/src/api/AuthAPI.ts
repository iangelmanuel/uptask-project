import { api } from '@/lib/axios'
import {
  CheckPasswordForm,
  ConfirmToken,
  ForgotPasswordForm,
  NewPasswordForm,
  RequestConfirmationCodeForm,
  UserLoginForm,
  UserRegistrationForm,
  userSchema,
} from '@/types'
import { isAxiosError } from 'axios'

export async function createAccount(formData: UserRegistrationForm) {
  const url = '/auth/create-account'

  try {
    const { data } = await api.post<string>(url, formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function confirmAccount(token: ConfirmToken) {
  const url = '/auth/confirm-account'

  try {
    const { data } = await api.post<string>(url, token)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function requestConfirmationCode(
  email: RequestConfirmationCodeForm,
) {
  const url = '/auth/request-code'

  try {
    const { data } = await api.post<string>(url, email)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function authenticateUser(formData: UserLoginForm) {
  const url = '/auth/login'

  try {
    const { data } = await api.post<{ token: string }>(url, formData)
    localStorage.setItem('AUTH_TOKEN', data.token)

    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function forgotPassword(formData: ForgotPasswordForm) {
  const url = '/auth/forgot-password'
  try {
    const { data } = await api.post<string>(url, formData)

    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function validateToken(token: ConfirmToken) {
  const url = '/auth/validate-token'

  try {
    const { data } = await api.post<string>(url, token)

    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function updatePasswordWithToken({
  formData,
  token,
}: {
  formData: NewPasswordForm
  token: ConfirmToken['token']
}) {
  const url = `/auth/update-password/${token}`

  try {
    const { data } = await api.post<string>(url, formData)

    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function getUser() {
  const url = '/auth/user'

  try {
    const { data } = await api(url)

    const response = userSchema.safeParse(data)

    if (response.success) {
      return response.data
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function checkPassword(formData: CheckPasswordForm) {
  const url = '/auth/check-password'

  try {
    const { data } = await api.post<string>(url, formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}
