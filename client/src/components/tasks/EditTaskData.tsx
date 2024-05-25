import { getTaskById } from '@/api/TaskAPI'
import { useQuery } from '@tanstack/react-query'
import { Navigate, useLocation, useParams } from 'react-router-dom'

import EditTaskModal from './EditTaskModal'

export const EditTaskData = () => {
  const params = useParams()
  const projectId = params.projectId!

  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const taskId = query.get('editTask')!

  const { data, isError } = useQuery({
    queryKey: ['editTask', taskId],
    queryFn: () => getTaskById({ projectId, taskId }),
    enabled: !!taskId,
    retry: false,
  })

  if (isError) return <Navigate to="/404" />
  if (data) return <EditTaskModal data={data} taskId={taskId} />
}
