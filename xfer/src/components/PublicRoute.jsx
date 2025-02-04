import { useFrappeAuth } from 'frappe-react-sdk'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
const PublicRoute = () => {
  const { currentUser, isLoading } = useFrappeAuth()
  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="spinner w-14 h-14 rounded-full border-4 border-gray-200 border-r-blue-500 animate-spin"></div>
      </div>
    )
  }
  if (!isLoading && !currentUser) {
    return <Outlet />
  }
  return <Navigate to="/business-dashboard" />
}
export default PublicRoute
