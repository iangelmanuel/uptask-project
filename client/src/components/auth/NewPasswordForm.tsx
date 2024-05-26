import { updatePasswordWithToken } from '@/api/AuthAPI'
import { ErrorMessage } from '@/components/ErrorMessage'
import type { ConfirmToken, NewPasswordForm } from '@/types'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

type NewPasswordFormProps = {
  token: ConfirmToken['token']
}

export default function NewPasswordForm({ token }: NewPasswordFormProps) {
  const navigate = useNavigate()

  const initialValues: NewPasswordForm = {
    password: '',
    passwordConfirmation: '',
  }

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues })

  const { mutate } = useMutation({
    mutationFn: updatePasswordWithToken,

    onError: (error) => {
      toast.error(error.message)
    },

    onSuccess: (data) => {
      toast.success(data)
      reset()
      navigate('/auth/login')
    },
  })

  const handleNewPassword = (formData: NewPasswordForm) => {
    const data = {
      formData,
      token,
    }

    mutate(data)
    navigate('/auth/login')
  }

  const password = watch('password')

  return (
    <>
      <form
        onSubmit={handleSubmit(handleNewPassword)}
        className="mt-10 space-y-8  bg-white p-10"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label className="text-2xl font-normal">Password</label>

          <input
            type="password"
            placeholder="Password de Registro"
            className="w-full border  border-gray-300 p-3"
            {...register('password', {
              required: 'El Password es obligatorio',
              minLength: {
                value: 8,
                message: 'El Password debe ser mínimo de 8 caracteres',
              },
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <label className="text-2xl font-normal">Repetir Password</label>

          <input
            id="password_confirmation"
            type="password"
            placeholder="Repite Password de Registro"
            className="w-full border  border-gray-300 p-3"
            {...register('passwordConfirmation', {
              required: 'Repetir Password es obligatorio',
              validate: (value) =>
                value === password || 'Los Passwords no son iguales',
            })}
          />

          {errors.passwordConfirmation && (
            <ErrorMessage>
              {errors.passwordConfirmation.message}
            </ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value="Establecer Password"
          className="w-full cursor-pointer bg-fuchsia-600 p-3  text-xl font-black  text-white hover:bg-fuchsia-700"
        />
      </form>
    </>
  )
}
