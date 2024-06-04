import { deleteNote } from '@/api/NoteAPI'
import useAuth from '@/hooks/useAuth'
import { Note } from '@/types'
import { formatDate } from '@/utils/formatDate'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

type NoteDetailProps = {
  note: Note
}

export const NoteDetail = ({ note }: NoteDetailProps) => {
  const { user, isLoading } = useAuth()

  const params = useParams()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  const queryClient = useQueryClient()

  const projectId = params.projectId!
  const taskId = queryParams.get('viewTask')!

  const canDelete = useMemo(
    () => user?._id === note.createdBy._id,
    [user?._id, note.createdBy._id],
  )

  const { mutate } = useMutation({
    mutationFn: deleteNote,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      toast.success(data)
      queryClient.invalidateQueries({ queryKey: ['task', taskId] })
    },
  })

  if (isLoading) return 'Cargando...'

  return (
    <div className="flex items-center justify-between p-3">
      <div>
        <p>
          {note.content} por:{' '}
          <span className="font-bold">{note.createdBy.name}</span>
        </p>

        <p className="text-xs text-gray-400">
          Agregada el: {formatDate(note.createdAt)}
        </p>
      </div>

      {canDelete && (
        <button
          type="button"
          onClick={() => mutate({ projectId, taskId, noteId: note._id })}
          className="cursor-pointer rounded bg-red-400 p-2 text-sm font-bold text-white transition-colors hover:bg-red-600"
        >
          Eliminar
        </button>
      )}
    </div>
  )
}
