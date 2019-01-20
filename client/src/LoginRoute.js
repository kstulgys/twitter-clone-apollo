import React, { useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuthUser } from './context/authUserContext'
// import auth from "./auth";

export default function LoginRoute({ component: Component, ...rest }) {
  const { user, userLoading } = useAuthUser()
  // let mounted = false

  // useEffect(() => {
  //   mounted = true
  //   return () => {
  //     mounted = false
  //   }
  // }, [])
  // console.log(mounted)
  if (!user && !userLoading)
    return <Route render={props => <Component {...rest} />} />

  if (user && !userLoading)
    return <Route render={props => <Redirect to='/' />} />

  return null
}
