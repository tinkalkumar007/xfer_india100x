import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useFrappeAuth } from 'frappe-react-sdk'

const ProtectedRoute = () => {
  const { currentUser, loading } = useFrappeAuth()

  console.log(currentUser)

  if (loading) {
    return <div>Loading...</div>
  }

  if (!loading && currentUser) {
    return <Outlet />
  }

  return <Navigate to="/" replace={true} />
}

export default ProtectedRoute
