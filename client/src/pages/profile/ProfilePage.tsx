import ProfileForm from '@/components/profile/ProfileForm'
import useAuth from '@/hooks/useAuth'

export default function ProfilePage() {
  const { user, isLoading } = useAuth()

  if (isLoading) return 'Loading...'

  if (user) return <ProfileForm user={user} />
}
