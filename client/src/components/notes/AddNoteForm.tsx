import { creteNote } from '@/api/NoteAPI'
import { NoteFormData } from '@/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useParams, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'

import { ErrorMessage } from '../ErrorMessage'

const INITIAL_VALUES: NoteFormData = {
  content: '',
}

export const AddNoteForm = () => {
  const params = useParams()
  const location = useLocation()

  const projectId = params.projectId!
  const queryParams = new URLSearchParams(location.search)
  const taskId = queryParams.get('viewTask')!

  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: INITIAL_VALUES,
  })

  const { mutate } = useMutation({
    mutationFn: creteNote,

    onError: (error) => {
      toast.error(error.message)
    },

    onSuccess: (data) => {
      toast.success(data)
      queryClient.invalidateQueries({ queryKey: ['task', taskId] })
      reset()
    },
  })

  const handleAddNote = async (formData: NoteFormData) => {
    const data = { projectId, taskId, formData }
    mutate(data)
  }

  return (
    <form
      onSubmit={handleSubmit(handleAddNote)}
      className="space-y-3"
      noValidate
    >
      <div className="flex flex-col gap-2">
        <label className="font-bold" htmlFor="content">
          Crear Nota
        </label>

        <input
          type="text"
          id="content"
          placeholder="Contenido"
          {...register('content', { required: 'Campo requerido' })}
          className="w-full border border-gray-300 p-3"
        />
        {errors.content && (
          <ErrorMessage>{errors.content.message}</ErrorMessage>
        )}
      </div>

      <input
        type="submit"
        value="Crear Nota"
        className="w-full cursor-pointer bg-fuchsia-600 p-2 font-black text-white hover:bg-fuchsia-700"
      />
    </form>
  )
}
