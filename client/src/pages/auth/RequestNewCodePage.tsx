import { requestConfirmationCode } from '@/api/AuthAPI'
import { ErrorMessage } from '@/components/ErrorMessage'
import { RequestConfirmationCodeForm } from '@/types'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function RegisterView() {
  const initialValues: RequestConfirmationCodeForm = {
    email: '',
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues })

  const { mutate } = useMutation({
    mutationFn: requestConfirmationCode,

    onError: (error: Error) => {
      toast.error(error.message)
    },

    onSuccess: (data) => {
      toast.success(data)
    },
  })

  const handleRequestCode = (formData: RequestConfirmationCodeForm) => {
    mutate(formData)
    reset()
  }

  return (
    <>
      <h1 className="text-5xl font-black text-white">
        Solicitar Código de Confirmación
      </h1>
      <p className="mt-5 text-2xl font-light text-white">
        Coloca tu e-mail para recibir {''}
        <span className=" font-bold text-fuchsia-500">
          {' '}
          un nuevo código
        </span>
      </p>

      <form
        onSubmit={handleSubmit(handleRequestCode)}
        className="mt-10 space-y-8 rounded-lg bg-white p-10"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label className="text-2xl font-normal" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full rounded-lg border border-gray-300 p-3"
            {...register('email', {
              required: 'El Email de registro es obligatorio',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'E-mail no válido',
              },
            })}
          />
          {errors.email && (
            <ErrorMessage>{errors.email.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value="Enviar Código"
          className="w-full cursor-pointer rounded-lg bg-fuchsia-600 p-3 text-xl font-black  text-white hover:bg-fuchsia-700"
        />
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to="/auth/login"
          className="text-center font-normal text-gray-300"
        >
          ¿Ya tienes cuenta? Iniciar Sesión
        </Link>
        <Link
          to="/auth/forgot-password"
          className="text-center font-normal text-gray-300"
        >
          ¿Olvidaste tu contraseña? Reestablecer
        </Link>
      </nav>
    </>
  )
}
