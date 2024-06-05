import { updateStatus } from '@/api/TaskAPI'
import { statusTraslations } from '@/locales/es'
import { TaskProject, TaskStatus } from '@/types'
import { DndContext } from '@dnd-kit/core'
import { DragEndEvent } from '@dnd-kit/core'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { DropTask } from './DropTask'
import { TaskCard } from './TaskCard'

type TaskListProps = {
  tasks: TaskProject[]
  canEdit: boolean
}

type GroupTask = {
  [key: string]: TaskProject[]
}

const INITIAL_STATUS_GROUPS: GroupTask = {
  pending: [],
  onHold: [],
  inProgress: [],
  underReview: [],
  completed: [],
}

const statusStyles: { [key: string]: string } = {
  pending: 'border-t-slate-500',
  onHold: 'border-t-red-500',
  inProgress: 'border-t-blue-500',
  underReview: 'border-t-amber-500',
  completed: 'border-t-emerald-500',
}

export const TaskList = ({ tasks, canEdit }: TaskListProps) => {
  const params = useParams()
  const queryClient = useQueryClient()

  const projectId = params.projectId!

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
    },
  })

  const groupedTasks = tasks.reduce((acc, task) => {
    let currentGroup = acc[task.status] ? [...acc[task.status]] : []

    currentGroup = [...currentGroup, task]

    return { ...acc, [task.status]: currentGroup }
  }, INITIAL_STATUS_GROUPS)

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e

    if (over && over.id) {
      const taskId = active.id.toString()
      const status = over.id as TaskStatus

      mutate({ projectId, taskId, status })
      queryClient.setQueryData(['project', projectId], (prevData) => {
        const updatedStatusTask = prevData.tasks.map(
          (task: TaskProject) => {
            if (task._id === taskId) {
              return { ...task, status }
            }

            return task
          },
        )

        return { ...prevData, tasks: updatedStatusTask }
      })
    }
  }

  return (
    <>
      <h2 className="my-10 text-5xl font-black">Tareas</h2>

      <div className="flex gap-5 overflow-x-scroll pb-32 2xl:overflow-auto">
        <DndContext onDragEnd={handleDragEnd}>
          {Object.entries(groupedTasks).map(([status, tasks]) => (
            <div
              key={status}
              className="min-w-[300px] 2xl:w-1/5 2xl:min-w-0"
            >
              <h3
                className={`border-t- border border-t-8 border-slate-300 bg-white p-3 text-xl font-light capitalize ${statusStyles[status]}`}
              >
                {statusTraslations[status]}
              </h3>

              <DropTask status={status} />

              <ul className="mt-5 space-y-5">
                {tasks.length === 0 ? (
                  <li className="pt-3 text-center text-gray-500">
                    No Hay tareas
                  </li>
                ) : (
                  tasks.map((task) => (
                    <TaskCard
                      key={task._id}
                      task={task}
                      canEdit={canEdit}
                    />
                  ))
                )}
              </ul>
            </div>
          ))}
        </DndContext>
      </div>
    </>
  )
}
