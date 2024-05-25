import { updateTaskById } from '@/api/TaskAPI'
import { Task, TaskFormData } from '@/types'
import { Dialog, Transition } from '@headlessui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Fragment } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import TaskForm from './TaskForm'

type EditTaskModalProps = {
  data: Task
  taskId: Task['_id']
}

export default function EditTaskModal({
  data,
  taskId,
}: EditTaskModalProps) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const params = useParams()
  const projectId = params.projectId!

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskFormData>({
    defaultValues: {
      name: data.name,
      description: data.description,
    },
  })

  const { mutate } = useMutation({
    mutationFn: updateTaskById,

    onError: (error) => {
      toast.error(error.message)
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['editProject', projectId],
      })
      queryClient.invalidateQueries({ queryKey: ['task', taskId] })
      toast.success(data)
      reset()
      navigate(location.pathname, { replace: true })
    },
  })

  const handleEditTask = async (formData: TaskFormData) => {
    const taskData = { projectId, taskId, formData }
    console.log(taskData)
    mutate(taskData)
    reset()
  }

  return (
    <Transition appear show={true} as={Fragment}>
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
                  Editar Tarea
                </Dialog.Title>

                <p className="text-xl font-bold">
                  Realiza cambios a una tarea en {''}
                  <span className="text-fuchsia-600">este formulario</span>
                </p>

                <form
                  noValidate
                  onSubmit={handleSubmit(handleEditTask)}
                  className="mt-10 space-y-3"
                >
                  <TaskForm register={register} errors={errors} />

                  <input
                    type="submit"
                    className=" w-full cursor-pointer bg-fuchsia-600 p-3  text-xl font-black  text-white hover:bg-fuchsia-700"
                    value="Guardar Tarea"
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
