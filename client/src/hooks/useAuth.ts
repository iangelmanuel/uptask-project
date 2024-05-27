import { getUser } from '@/api/AuthAPI'
import { useQuery } from '@tanstack/react-query'

export default function useAuth() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    retry: false,
    refetchOnWindowFocus: false,
  })

  return { user: data, isError, isLoading }
}
