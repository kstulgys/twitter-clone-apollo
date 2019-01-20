import React, { useContext, useEffect, useState } from 'react'
import gql from 'graphql-tag'

const GET_ME = gql`
  query me {
    me {
      username
      email
    }
  }
`
const AuthUserContext = React.createContext(null)

export const useAuthUser = () => useContext(AuthUserContext)

function AuthUserProvider({ children, client }) {
  const [user, setUser] = useState(null)
  const [userLoading, setLoading] = useState(true)
  // const [userloggedin, setLoggedIn] = useState(false)

  const tryToLoginUser = async () => {
    try {
      const {
        data: { me }
      } = await client.query({ query: GET_ME })
      setUser(me)
      setLoading(false)
      // window.location.reload()
    } catch (e) {
      setLoading(false)
    }
  }

  const signupOrLoginUser = token => {
    setLoading(true)
    localStorage.setItem('token', token)
    tryToLoginUser()
    window.location.reload()
    setLoading(false)
  }

  const logoutUser = async () => {
    setLoading(true)
    localStorage.removeItem('token')
    client.resetStore()
    setUser(null)
    setLoading(false)
  }

  useEffect(() => {
    tryToLoginUser()
  }, [])

  const ctx = {
    user,
    userLoading,
    signupOrLoginUser,
    logoutUser
  }

  return (
    <AuthUserContext.Provider value={ctx}>{children}</AuthUserContext.Provider>
  )
}

export default AuthUserProvider
