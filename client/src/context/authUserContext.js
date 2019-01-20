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
  const [userLoading, setLoading] = useState(false)
  // const [userloggedin, setLoggedIn] = useState(false)

  const tryToLoginUser = async () => {
    setLoading(true)
    try {
      const {
        data: { me }
      } = await client.query({ query: GET_ME })
      setUser(me)
      setLoading(false)
    } catch (e) {
      setLoading(false)
    }
  }

  const loginUser = async token => {
    setLoading(true)
    await localStorage.setItem('token', token)
    await tryToLoginUser()
    setLoading(false)
    window.location.reload()
  }

  const logoutUser = async () => {
    await localStorage.removeItem('token')
    await client.resetStore()
    setUser(null)
    setLoading(false)
  }

  useEffect(() => {
    tryToLoginUser()
  }, [])

  const ctx = {
    user,
    userLoading,
    loginUser,
    logoutUser
  }

  console.log(user)

  return (
    <AuthUserContext.Provider value={ctx}>{children}</AuthUserContext.Provider>
  )
}

export default AuthUserProvider
