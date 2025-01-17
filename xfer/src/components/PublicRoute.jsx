import { useFrappeAuth } from 'frappe-react-sdk'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PublicRoute = () => {
  const { currentUser, isLoading } = useFrappeAuth()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isLoading && !currentUser) {
    return <Outlet />
  }

  return <Navigate to="/business-dashboard" />
}

export default PublicRoute
