import React, { useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuthUser } from './context/authUserContext'
// import auth from "./auth";

export default function LoginRoute({ component: Component, ...rest }) {
  const { user, userLoading } = useAuthUser()

  if (userLoading) return null
  if (!user && !userLoading)
    return <Route render={props => <Component {...rest} />} />
  if (user && !userLoading)
    return <Route render={props => <Redirect to="/" />} />
  return null
}
