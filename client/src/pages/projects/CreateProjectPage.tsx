import { createProject } from '@/api/ProjectAPI'
import ProjectForm from '@/components/projects/ProjectForm'
import type { ProjectFormData } from '@/types'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const INITIAL_VALUES: ProjectFormData = {
  projectName: '',
  clientName: '',
  description: '',
}

export default function CreateProjectPage() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: INITIAL_VALUES })

  const { mutate } = useMutation({
    mutationFn: createProject,

    onError: (error) => {
      toast.error(error.message)
    },

    onSuccess: (data) => {
      toast.success(data)
      navigate('/')
    },
  })

  const onSubmit = (formData: ProjectFormData) => mutate(formData)

  return (
    <>
      <div className="mx-auto max-w-3xl">
        <h1 className="text-5xl font-black">Crear Proyecto</h1>
        <p className="mt-5 text-2xl font-light text-gray-500">
          Llena el siguiente formulario para agregar un proyecto
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
            value="Crear Proyecto"
            className="w-full cursor-pointer rounded-md bg-fuchsia-600 p-3 font-bold uppercase text-white transition-colors duration-300 ease-in-out hover:bg-fuchsia-700"
          />
        </form>
      </div>
    </>
  )
}
