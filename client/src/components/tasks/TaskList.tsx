import { statusTraslations } from '@/locales/es'
import { Task } from '@/types'

import { TaskCard } from './TaskCard'

type TaskListProps = {
  tasks: Task[]
}

type GroupTask = {
  [key: string]: Task[]
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

export const TaskList = ({ tasks }: TaskListProps) => {
  const groupedTasks = tasks.reduce((acc, task) => {
    let currentGroup = acc[task.status] ? [...acc[task.status]] : []

    currentGroup = [...currentGroup, task]

    return { ...acc, [task.status]: currentGroup }
  }, INITIAL_STATUS_GROUPS)

  return (
    <>
      <h2 className="my-10 text-5xl font-black">Tareas</h2>

      <div className="flex gap-5 overflow-x-scroll pb-32 2xl:overflow-auto">
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
            <ul className="mt-5 space-y-5">
              {tasks.length === 0 ? (
                <li className="pt-3 text-center text-gray-500">
                  No Hay tareas
                </li>
              ) : (
                tasks.map((task) => (
                  <TaskCard key={task._id} task={task} />
                ))
              )}
            </ul>
          </div>
        ))}
      </div>
    </>
  )
}
