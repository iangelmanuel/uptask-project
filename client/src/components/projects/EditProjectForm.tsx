import { updateProjectById } from '@/api/ProjectAPI'
import { Project, ProjectFormData } from '@/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import ProjectForm from './ProjectForm'

type EditProjectFormProps = {
  data: ProjectFormData
  projectId: Project['_id']
}

export const EditProjectForm = ({
  data,
  projectId,
}: EditProjectFormProps) => {
  const INITIAL_VALUES: ProjectFormData = {
    projectName: data.projectName,
    clientName: data.clientName,
    description: data.description,
  }

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: INITIAL_VALUES })

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: updateProjectById,

    onError: (error) => {
      toast.error(error.message)
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })

      queryClient.invalidateQueries({
        queryKey: ['editProject', projectId],
      })

      toast.success(data)

      navigate('/')
    },
  })

  const onSubmit = (formData: ProjectFormData) => {
    const updatedData = { formData, projectId }
    mutate(updatedData)
  }
  return (
    <>
      <div className="mx-auto max-w-3xl">
        <h1 className="text-5xl font-black">Editar Proyecto</h1>
        <p className="mt-5 text-2xl font-light text-gray-500">
          Llena el siguiente formulario para editar el proyecto
        </p>

        <nav className="my-5">
          <Link
            to="/"
            className="mt-5 cursor-pointer rounded-md bg-purple-400 px-5 py-2 text-white transition-colors duration-300 ease-in-out hover:bg-purple-500"
          >
            Ver Proyectos
          </Link>
        </nav>

        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="mt-10 rounded-md bg-white p-10 shadow-lg"
        >
          <ProjectForm register={register} errors={errors} />

          <input
            type="submit"
            value="Guardar Cambios"
            className="w-full cursor-pointer rounded-md bg-fuchsia-600 p-3 font-bold uppercase text-white transition-colors duration-300 ease-in-out hover:bg-fuchsia-700"
          />
        </form>
      </div>
    </>
  )
}
