import React from 'react'
import { Navigate } from 'react-router'

const ProtectedRoute = ({children}) => {
  const isLoggedIn = localStorage.getItem("authToken")

  if(!isLoggedIn){
    return <Navigate to='/login' replace />
  }
  // else{
  //   return <Navigate to='/' replace />
  // }

  return children
}

export default ProtectedRoute