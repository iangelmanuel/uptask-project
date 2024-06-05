import { useDroppable } from '@dnd-kit/core'

type DropTaskProps = { status: string }

export const DropTask = ({ status }: DropTaskProps) => {
  const { isOver, setNodeRef } = useDroppable({ id: status })
  return (
    <div
      ref={setNodeRef}
      className={`mt-5 grid place-content-center border border-dashed border-slate-500 p-2 text-xs font-semibold uppercase text-slate-500 ${
        isOver ? 'bg-slate-100' : ''
      }`}
    >
      Soltar tarea aquí
    </div>
  )
}
