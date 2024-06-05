import { checkPassword } from '@/api/AuthAPI'
import { deleteProjectById } from '@/api/ProjectAPI'
import { CheckPasswordForm } from '@/types'
import { Dialog, Transition } from '@headlessui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Fragment } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'

import { ErrorMessage } from '../ErrorMessage'

const INITIAL_VALUES: CheckPasswordForm = {
  password: '',
}

export default function DeleteProjectModal() {
  const location = useLocation()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const queryParams = new URLSearchParams(location.search)
  const deleteProjectId = queryParams.get('deleteProject')!
  const show = deleteProjectId ? true : false

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: INITIAL_VALUES })

  const checkPassMutate = useMutation({
    mutationFn: checkPassword,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
    },
  })

  const deleteProjectMutate = useMutation({
    mutationFn: deleteProjectById,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      navigate(location.pathname, { replace: true })
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })

  const handleForm = async (formData: CheckPasswordForm) => {
    await checkPassMutate.mutateAsync(formData)
    await deleteProjectMutate.mutateAsync(deleteProjectId)
  }

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => navigate(location.pathname, { replace: true })}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-16 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="my-5 text-4xl  font-black"
                >
                  Eliminar Proyecto{' '}
                </Dialog.Title>

                <p className="text-xl font-bold">
                  Confirma la eliminación del proyecto {''}
                  <span className="text-fuchsia-600">
                    colocando tu password
                  </span>
                </p>

                <form
                  className="mt-10 space-y-5"
                  onSubmit={handleSubmit(handleForm)}
                  noValidate
                >
                  <div className="flex flex-col gap-3">
                    <label
                      className="text-2xl font-normal"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      placeholder="Password Inicio de Sesión"
                      className="w-full border  border-gray-300 p-3"
                      {...register('password', {
                        required: 'El password es obligatorio',
                      })}
                    />
                    {errors.password && (
                      <ErrorMessage>
                        {errors.password.message}
                      </ErrorMessage>
                    )}
                  </div>

                  <input
                    type="submit"
                    className=" w-full cursor-pointer bg-fuchsia-600 p-3  text-xl font-black  text-white hover:bg-fuchsia-700"
                    value="Eliminar Proyecto"
                  />
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
