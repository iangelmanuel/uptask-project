import { getFullProject } from '@/api/ProjectAPI'
import AddTaskModal from '@/components/tasks/AddTaskModal'
import { EditTaskData } from '@/components/tasks/EditTaskData'
import { TaskList } from '@/components/tasks/TaskList'
import TaskModalDetails from '@/components/tasks/TaskModalDetails'
import useAuth from '@/hooks/useAuth'
import { isManager } from '@/utils/policies'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'

export default function ProjectDetailsPage() {
  const navigate = useNavigate()
  const params = useParams()
  const projectId = params.projectId!

  const { user, isLoading: authLoading } = useAuth()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['editProject', projectId],
    queryFn: () => getFullProject(projectId),
    retry: false,
  })

  const canEdit = useMemo(() => data?.manager === user?._id, [data, user])

  if (isLoading && authLoading) return 'Cargando...'
  if (isError) return <Navigate to="/404" />
  if (data && user)
    return (
      <>
        <h1 className="text-5xl font-black">{data.projectName}</h1>
        <p className="mt-5 text-2xl font-light text-gray-500">
          {data.description}
        </p>

        {isManager(data.manager, user._id) && (
          <nav className="my-5 flex gap-3">
            <button
              type="button"
              onClick={() => navigate(`?newTask=true`)}
              className="cursor-pointer rounded bg-purple-400 px-10 py-3 font-bold text-white transition-colors duration-300 ease-in-out hover:bg-purple-500"
            >
              Agregar Tarea
            </button>

            <Link
              to="team"
              className="cursor-pointer rounded bg-fuchsia-400 px-10 py-3 font-bold text-white transition-colors duration-300 ease-in-out hover:bg-fuchsia-500"
            >
              Colaboradores
            </Link>
          </nav>
        )}

        <TaskList tasks={data.tasks} canEdit={canEdit} />
        <AddTaskModal />
        <EditTaskData />
        <TaskModalDetails />
      </>
    )
}
