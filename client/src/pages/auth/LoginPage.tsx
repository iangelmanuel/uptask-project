import { authenticateUser } from '@/api/AuthAPI'
import { ErrorMessage } from '@/components/ErrorMessage'
import { UserLoginForm } from '@/types/index'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const INITIAL_VALUES: UserLoginForm = {
  email: '',
  password: '',
}

export default function LoginView() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: INITIAL_VALUES })

  const { mutate } = useMutation({
    mutationFn: authenticateUser,

    onError: (error) => {
      toast.error(error.message)
    },

    onSuccess: () => {
      toast.success('Has iniciado sesión correctamente')
      reset()
    },
  })

  const handleLogin = (formData: UserLoginForm) => {
    mutate(formData)
  }

  return (
    <>
      <h1 className="text-5xl font-black text-white">Iniciar sesión</h1>
      <p className="mt-5 text-2xl font-light text-white">
        Comienza a planear tus proyectos {''}
        <span className=" font-bold text-fuchsia-500">
          {' '}
          iniciando sesión en este formulario
        </span>
      </p>

      <form
        onSubmit={handleSubmit(handleLogin)}
        className="mt-10 space-y-8 bg-white p-10"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label className="text-2xl font-normal">Email</label>

          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full border  border-gray-300 p-3"
            {...register('email', {
              required: 'El Email es obligatorio',
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
          <label className="text-2xl font-normal">Password</label>

          <input
            type="password"
            placeholder="Password de Registro"
            className="w-full border  border-gray-300 p-3"
            {...register('password', {
              required: 'El Password es obligatorio',
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value="Iniciar Sesión"
          className="w-full cursor-pointer bg-fuchsia-600 p-3  text-xl font-black  text-white hover:bg-fuchsia-700"
        />
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to="/auth/register"
          className="text-center font-normal text-gray-300"
        >
          ¿No tienes cuenta? Regístrate
        </Link>

        <Link
          to="/auth/forgot-password"
          className="text-center font-normal text-gray-300"
        >
          ¿Olvidaste tu contraseña? Recupérala
        </Link>
      </nav>
    </>
  )
}
