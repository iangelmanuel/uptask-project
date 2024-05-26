import { createAccount } from '@/api/AuthAPI'
import { ErrorMessage } from '@/components/ErrorMessage'
import { UserRegistrationForm } from '@/types/index'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function RegisterView() {
  const initialValues: UserRegistrationForm = {
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  }

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<UserRegistrationForm>({ defaultValues: initialValues })

  const { mutate } = useMutation({
    mutationFn: createAccount,

    onError: (error: Error) => {
      toast.error(error.message)
    },

    onSuccess: (data) => {
      toast.success(data)
    },
  })

  const password = watch('password')

  const handleRegister = (formData: UserRegistrationForm) => {
    mutate(formData)
    reset()
  }

  return (
    <>
      <h1 className="text-5xl font-black text-white">Crear Cuenta</h1>
      <p className="mt-5 text-2xl font-light text-white">
        Llena el formulario para {''}
        <span className=" font-bold text-fuchsia-500">
          {' '}
          crear tu cuenta
        </span>
      </p>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="mt-10 space-y-8  bg-white p-10"
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
            className="w-full border  border-gray-300 p-3"
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

        <div className="flex flex-col gap-5">
          <label className="text-2xl font-normal">Nombre</label>
          <input
            type="name"
            placeholder="Nombre de Registro"
            className="w-full border  border-gray-300 p-3"
            {...register('name', {
              required: 'El Nombre de usuario es obligatorio',
            })}
          />
          {errors.name && (
            <ErrorMessage>{errors.name.message}</ErrorMessage>
          )}
        </div>

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
          value="Registrarme"
          className="w-full cursor-pointer bg-fuchsia-600 p-3  text-xl font-black  text-white hover:bg-fuchsia-700"
        />
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to="/auth/login"
          className="text-center font-normal text-gray-300"
        >
          ¿Ya tienes una cuenta? Inicia Sesión
        </Link>
      </nav>
    </>
  )
}
