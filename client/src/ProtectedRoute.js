import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuthUser } from './context/authUserContext'

// import auth from "./auth";

export default function ProtectedRoute({ component: Component, ...rest }) {
  const { user, userLoading } = useAuthUser()

  if (user && !userLoading)
    return <Route render={props => <Component {...rest} />} />
  if (!user && !userLoading)
    return <Route render={props => <Redirect to='/auth' />} />

  return null
}
