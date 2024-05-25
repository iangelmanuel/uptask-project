import { createTask } from '@/api/TaskAPI'
import { TaskFormData } from '@/types'
import { Dialog, Transition } from '@headlessui/react'
import { useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import { Fragment } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import TaskForm from './TaskForm'

const INITIAL_VALUES = {
  name: '',
  description: '',
}

export default function AddTaskModal() {
  // Leer si modal Existe
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const modalTask = queryParams.get('newTask')
  const show = modalTask ? true : false

  // Obtener ProjectID
  const params = useParams()
  const projectId = params.projectId!

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: INITIAL_VALUES })

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: createTask,

    onError: (error) => {
      toast.error(error.message)
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['editProject', projectId],
      })
      navigate(location.pathname, { replace: true })
      toast.success(data)
    },
  })

  const handleCreateTask = (formData: TaskFormData) => {
    const data = {
      formData,
      projectId,
    }

    mutate(data)
    reset()
  }

  return (
    <>
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
                    Nueva Tarea
                  </Dialog.Title>

                  <p className="text-xl font-bold">
                    Llena el formulario y crea {''}
                    <span className="text-fuchsia-600">una tarea</span>
                  </p>

                  <form
                    className="mt-10 space-y-3"
                    onSubmit={handleSubmit(handleCreateTask)}
                    noValidate
                  >
                    <TaskForm register={register} errors={errors} />

                    <input
                      type="submit"
                      value="Crear Tarea"
                      className="w-full cursor-pointer rounded-md bg-fuchsia-600 p-3 font-bold uppercase text-white transition-colors duration-300 ease-in-out hover:bg-fuchsia-700"
                    />
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
