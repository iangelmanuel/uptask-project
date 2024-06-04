import { getTaskById, updateStatus } from '@/api/TaskAPI'
import { statusTraslations } from '@/locales/es'
import { TaskStatus } from '@/types'
import { formatDate } from '@/utils/formatDate'
import { Dialog, Transition } from '@headlessui/react'
import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import React, { Fragment } from 'react'
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom'
import { toast } from 'react-toastify'

import { NotesPanel } from '../notes/NotesPanel'

export default function TaskModalDetails() {
  const location = useLocation()
  const navigate = useNavigate()
  const params = useParams()
  const queryClient = useQueryClient()

  const queryParams = new URLSearchParams(location.search)
  const taskId = queryParams.get('viewTask')!
  const projectId = params.projectId!

  const shadowTaskModal = taskId ? true : false

  const { data, isError, error } = useQuery({
    queryKey: ['task', taskId],
    queryFn: () => getTaskById({ taskId, projectId }),
    enabled: !!taskId,
    retry: false,
  })

  const { mutate } = useMutation({
    mutationFn: updateStatus,

    onError: (error) => {
      toast.error(error.message, { toastId: 'error' })
    },

    onSuccess: (data) => {
      toast.success(data)
      queryClient.invalidateQueries({
        queryKey: ['editProject', projectId],
      })
      queryClient.invalidateQueries({ queryKey: ['task', taskId] })
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value as TaskStatus
    const data = { projectId, taskId, status }
    mutate(data)
  }

  if (isError) {
    toast.error(error.message, { toastId: 'error' })
    return <Navigate to="/404" />
  }

  if (data)
    return (
      <>
        <Transition appear show={shadowTaskModal} as={Fragment}>
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
                    <p className="text-sm text-slate-400">
                      Agregada el: {formatDate(data.createdAt)}
                    </p>
                    <p className="text-sm text-slate-400">
                      Última actualización: {formatDate(data.updatedAt)}
                    </p>
                    <Dialog.Title
                      as="h3"
                      className="my-5 text-4xl font-black text-slate-600"
                    >
                      {data.name}
                    </Dialog.Title>
                    <p className="mb-2 text-lg text-slate-500">
                      Descripción: {data.description}
                    </p>

                    {data.completedBy.length ? (
                      <>
                        <p className="font-bol my-5 text-2xl text-slate-600">
                          Historial de Cambios
                        </p>

                        <ul className="list-decimal">
                          {data.completedBy.map((activityLog) => (
                            <li key={activityLog._id}>
                              <span>
                                {statusTraslations[activityLog.status]}
                              </span>{' '}
                              por: {activityLog.user.name}
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : null}

                    <div className="my-5 space-y-3">
                      <label className="font-bold">Estado Actual:</label>

                      <select
                        className="w-full border border-gray-300 bg-white p-3"
                        defaultValue={data.status}
                        onChange={handleChange}
                      >
                        {Object.entries(statusTraslations).map(
                          ([key, value]) => (
                            <option key={key} value={key}>
                              {value}
                            </option>
                          ),
                        )}
                      </select>
                    </div>

                    <NotesPanel notes={data.notes} />
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    )
}
