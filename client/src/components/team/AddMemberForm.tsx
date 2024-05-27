import { findUserByEmail } from '@/api/TeamAPI'
import { TeamMemberFormData } from '@/types'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { ErrorMessage } from '../ErrorMessage'
import SearchResult from './SearchResult'

export default function AddMemberForm() {
  const initialValues: TeamMemberFormData = {
    email: '',
  }

  const params = useParams()
  const projectId = params.projectId!

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues })

  const mutation = useMutation({
    mutationFn: findUserByEmail,
  })

  const handleSearchUser = async (formData: TeamMemberFormData) => {
    const data = {
      projectId,
      formData,
    }
    mutation.mutate(data)
  }

  const resetData = () => {
    reset()
    mutation.reset()
  }

  return (
    <>
      <form
        className="mt-10 space-y-5"
        onSubmit={handleSubmit(handleSearchUser)}
        noValidate
      >
        <div className="flex flex-col gap-3">
          <label className="text-2xl font-normal" htmlFor="name">
            E-mail de Usuario
          </label>
          <input
            id="name"
            type="text"
            placeholder="E-mail del usuario a Agregar"
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

        <input
          type="submit"
          className=" w-full cursor-pointer bg-fuchsia-600 p-3  text-xl font-black  text-white hover:bg-fuchsia-700"
          value="Buscar Usuario"
        />
      </form>

      {mutation.isPending && (
        <div className="mt-10">
          <p className="text-center">Buscando Usuario...</p>
        </div>
      )}

      {mutation.isError && (
        <div className="mt-10">
          <p className="text-center">{mutation.error.message}</p>
        </div>
      )}

      {mutation.data && (
        <SearchResult user={mutation.data} resetData={resetData} />
      )}
    </>
  )
}
