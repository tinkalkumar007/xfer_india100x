import { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useFrappeAuth } from 'frappe-react-sdk'

const ProtectedRoute = () => {
  const { currentUser, isLoading } = useFrappeAuth()

  useEffect(() => {
    console.log(`Loading: ${isLoading}, currentUser: ${currentUser}!`)
  }, [isLoading, currentUser])

  if (isLoading) {
    return <div>isLoading...</div>
  }

  if (!isLoading && currentUser) {
    return <Outlet />
  }

  return <Navigate to="/" replace={true} />
}

export default ProtectedRoute
