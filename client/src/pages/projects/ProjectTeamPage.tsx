import { getProjectTeam, removeUserFromProject } from '@/api/TeamAPI'
import AddMemberModal from '@/components/team/AddMemberModal'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/16/solid'
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { Fragment } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function TeamPage() {
  const navigate = useNavigate()
  const params = useParams()
  const queryClient = useQueryClient()

  const projectId = params.projectId!

  const { data, isLoading, isError } = useQuery({
    queryKey: ['projectTeam', projectId],
    queryFn: () => getProjectTeam(projectId),
    retry: false,
  })

  const { mutate } = useMutation({
    mutationFn: removeUserFromProject,

    onError: (error) => {
      toast.error(error.message)
    },

    onSuccess: (data) => {
      toast.success(data)
      queryClient.invalidateQueries({
        queryKey: ['projectTeam', projectId],
      })
    },
  })

  if (isLoading) return 'Loading...'
  if (isError) return <Navigate to="/404" />

  if (data)
    return (
      <>
        <h1 className="text-5xl font-black">Administrar Equipo</h1>
        <p className="mt-5 text-2xl font-light text-gray-500">
          Administra el equipo de trabajo para este proyecto
        </p>

        <nav className="my-5 flex gap-3">
          <button
            type="button"
            onClick={() => navigate(location.pathname + '?addMember=true')}
            className="cursor-pointer rounded bg-purple-400 px-10 py-3 font-bold text-white transition-colors duration-300 ease-in-out hover:bg-purple-500"
          >
            Agregar Colaborador
          </button>

          <Link
            to={`/projects/${projectId}`}
            className="cursor-pointer rounded bg-fuchsia-400 px-10 py-3 font-bold text-white transition-colors duration-300 ease-in-out hover:bg-fuchsia-500"
          >
            Volver al Proyecto
          </Link>
        </nav>

        <h2 className="my-10 text-5xl font-black">Miembros actuales</h2>
        {data.length ? (
          <ul
            role="list"
            className="mt-10 divide-y divide-gray-100 border border-gray-100 bg-white shadow-lg"
          >
            {data?.map((member) => (
              <li
                key={member._id}
                className="flex justify-between gap-x-6 px-5 py-10"
              >
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto space-y-2">
                    <p className="text-2xl font-black text-gray-600">
                      {member.name}
                    </p>
                    <p className="text-sm text-gray-400">{member.email}</p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-x-6">
                  <Menu as="div" className="relative flex-none">
                    <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                      <span className="sr-only">opciones</span>
                      <EllipsisVerticalIcon
                        className="h-9 w-9"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                        <Menu.Item>
                          <button
                            type="button"
                            onClick={() =>
                              mutate({ projectId, id: member._id })
                            }
                            className="block px-3 py-1 text-sm leading-6 text-red-500"
                          >
                            Eliminar del Proyecto
                          </button>
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="py-20 text-center">
            No hay miembros en este equipo
          </p>
        )}

        <AddMemberModal />
      </>
    )
}
