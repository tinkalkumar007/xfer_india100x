import { useFrappeAuth } from 'frappe-react-sdk'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PublicRoute = () => {
  const { currentUser } = useFrappeAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  if (!loading && currentUser) {
    return <Navigate to="/business-dashboard" />
  }

  if (!loading && !currentUser) {
    return <Outlet />
  }
s
}

export default PublicRoute
