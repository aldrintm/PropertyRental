import { getServerSession } from 'next-auth'
import { authOptions } from '@/utils/authOptions'

export const getSessionUser = async () => {
  const session = await getServerSession(authOptions)

  // check if there's a session
  if (!session || !session.user) {
    return null
  }

  return {
    user: session.user,
    userId: session.user.id,
  }
}
