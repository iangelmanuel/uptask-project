import { addUserToProject } from '@/api/TeamAPI'
import { TeamMember } from '@/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

type TeamMemberFormData = {
  user: TeamMember
  resetData: () => void
}

export default function SearchResult({
  user,
  resetData,
}: TeamMemberFormData) {
  const navigate = useNavigate()
  const params = useParams()
  const queryClient = useQueryClient()

  const projectId = params.projectId!

  const { mutate } = useMutation({
    mutationFn: addUserToProject,

    onError: (error) => {
      toast.error(error.message)
    },

    onSuccess: (data) => {
      toast.success(data)
      resetData()
      navigate(location.pathname, { replace: true })
      queryClient.invalidateQueries({
        queryKey: ['projectTeam', projectId],
      })
    },
  })

  const handleAddUserToProject = () => {
    const data = {
      projectId,
      id: user._id,
    }
    mutate(data)
  }

  return (
    <>
      <p className="mt-10 text-center font-bold">Resultado:</p>
      <div className="flex items-center justify-between">
        <p>{user.name}</p>

        <button
          onClick={handleAddUserToProject}
          className="cursor-pointer px-10 py-3 font-bold text-purple-600 hover:bg-purple-100"
        >
          Agregar al Proyecto
        </button>
      </div>
    </>
  )
}
